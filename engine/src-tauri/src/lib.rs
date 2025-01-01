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
fn create_project(_project_name: String, _project_type: String, _template: String, _path: String) -> Result<(), String> {
    add_to_recently(_project_name.clone(), _path.clone())?;

    std::fs::create_dir_all(format!("{}/src", _path)).map_err(|e| e.to_string())?;
    std::fs::create_dir_all(format!("{}/scenes", _path)).map_err(|e| e.to_string())?;
    std::fs::create_dir_all(format!("{}/assets", _path)).map_err(|e| e.to_string())?;
    
    let project_file_path = format!("{}/project.project", _path);
    let mut project_file = File::create(&project_file_path).map_err(|e| e.to_string())?;
    project_file.write_all(b"test").map_err(|e| e.to_string())?;

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