use tauri::{async_runtime::Mutex, State};

use crate::app_config::AppConfig;

#[tauri::command]
pub async fn get_app_config(app_config: State<'_, Mutex<AppConfig>>) -> Result<AppConfig, ()> {
    let lock = app_config.lock().await;
    Ok(lock.clone())
}
