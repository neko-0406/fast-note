use std::sync::Mutex;

use tauri::{State};

use crate::app_config::{AppConfig, Theme};

// アプリテーマをフロントに渡す関数
#[tauri::command]
pub async fn get_app_theme(app_config: State<'_, Mutex<AppConfig>>) -> Result<String, String> {
    let config = app_config.lock().unwrap();
    let theme = match config.theme {
        Theme::System => String::from("System"),
        Theme::Light => String::from("Light"),
        Theme::Dark => String::from("Dark")
    };
    return Ok(theme);
}
// 作業ディレクトリパスをフロントに渡す関数
#[tauri::command]
pub async fn get_app_work_dir(app_config: State<'_, Mutex<AppConfig>>) -> Result<String, String> {
    let config = app_config.lock().unwrap();
    let work_dir = String::from(&config.work_dir);
    return Ok(work_dir);
}
// AppConfigをフロントに渡す関数
#[tauri::command]
pub async fn get_app_config(app_config: State<'_, Mutex<AppConfig>>) -> Result<AppConfig, String> {
    let config = app_config.lock().unwrap();
    return Ok(config.clone());
}
// 作業ディレクトリのマッピングをする関数
#[tauri::command]
pub async fn get_work_dir_tree() {
    
}