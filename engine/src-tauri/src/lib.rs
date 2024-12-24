use std::env;
use std::fs::File;
use std::io::Write;

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn create_project(_project_name: String, _project_type: String, _template: String) {
    
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
        .invoke_handler(tauri::generate_handler![create_project, get_recently, create_recently])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}