use tauri::{State, async_runtime::Mutex};

use crate::app_config::AppConfig;


#[tauri::command]
pub async fn get_app_config(app_config: State<'_, Mutex<AppConfig>>) -> Result<AppConfig, ()> {
    let lock = app_config.lock().await;
    Ok(lock.clone())
}