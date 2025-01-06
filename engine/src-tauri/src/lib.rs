use std::env;
use std::fs::File;
use std::io::Write;

fn add_to_recently(name: String, path: String) -> Result<(), String> {
    let user_name = env::var("USERNAME").map_err(|e| e.to_string())?;
    let file_path = format!("C:\\Users\\{}\\AppData\\Roaming\\WhereEngine\\recently.json", user_name);
    
    let mut content = String::new();
    if std::path::Path::new(&file_path).exists() {
        content = std::fs::read_to_string(&file_path).map_err(|e| e.to_string())?;
    } else {
        content.push_str("{}");
    }

    let mut json: serde_json::Value = serde_json::from_str(&content).map_err(|e| e.to_string())?;
    json[name] = serde_json::Value::from(path);
    
    let mut file = File::create(&file_path).map_err(|e| e.to_string())?;
    file.write_all(serde_json::to_string(&json).map_err(|e| e.to_string())?.as_bytes()).map_err(|e| e.to_string())?;
    
    Ok(())
}

//project structure
// /
//project.project
//src/
//scenes/
//assets/

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn create_project(projectName: String, projectType: String, template: String, path: String) -> Result<(), String> {
    println!("Creating project at path: {}", path);

    let path = std::path::Path::new(&path);
    
    // Check if the path exists
    if path.exists() {
        println!("Path exists: {}", path.display());
    } else {
        println!("Path does not exist: {}", path.display());
        return Err(format!("Path does not exist: {}", path.display()));
    }

    add_to_recently(projectName.clone(), path.to_str().unwrap().to_string())?;

    // Log directory creation
    if let Err(e) = std::fs::create_dir_all(path.join("src")) {
        println!("Error creating src directory: {}", e);
        return Err(e.to_string());
    }
    if let Err(e) = std::fs::create_dir_all(path.join("scenes")) {
        println!("Error creating scenes directory: {}", e);
        return Err(e.to_string());
    }
    if let Err(e) = std::fs::create_dir_all(path.join("assets")) {
        println!("Error creating assets directory: {}", e);
        return Err(e.to_string());
    }

    let project_file_path = path.join("project.project");
    println!("Creating project file: {}", project_file_path.display()); // Logging before file creation
    let mut project_file = File::create(&project_file_path).map_err(|e| {
        println!("Error creating project file: {}", e);
        e.to_string()
    })?;
    println!("Project file successfully created: {}", project_file_path.display()); // Logging after file creation

    let project_content = format!(
        "name={}\ntype={}\ntemplate={}\npath={}\nversion=\"\"\ntarget=\"\"\nbuild_target=\"\"\nauthor=\"\"",
        projectName, projectType, template, path.display()
    );
    project_file.write_all(project_content.as_bytes()).map_err(|e| {
        println!("Error writing to project file: {}", e);
        e.to_string()
    })?;

    Ok(())
}

#[tauri::command]
fn return_files_and_directories(_path: String) -> Result<Vec<String>, String> {
    let entries = std::fs::read_dir(_path).map_err(|e| e.to_string())?;
    let mut files_and_dirs = Vec::new();

    for entry in entries {
        let entry = entry.map_err(|e| e.to_string())?;
        let name = entry.file_name().to_string_lossy().into_owned();
        files_and_dirs.push(name);
    }
    
    Ok(files_and_dirs)
}


#[tauri::command]
fn create_recently() -> Result<(), String> {
    let user_name = env::var("USERNAME").map_err(|e| e.to_string())?;
    let path = format!("C:\\Users\\{}\\AppData\\Roaming\\WhereEngine\\recently.json", user_name);
    let mut file = File::create(&path).map_err(|e| e.to_string())?;
    file.write_all(b"{}").map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
fn get_recently() -> Result<String, String> {
    let user_name = env::var("USERNAME").map_err(|e| e.to_string())?;
    let path = format!("C:\\Users\\{}\\AppData\\Roaming\\WhereEngine\\recently.json", user_name);
    let content = std::fs::read_to_string(&path).map_err(|e| e.to_string())?;
    Ok(content)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![create_project, get_recently, create_recently, return_files_and_directories])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}