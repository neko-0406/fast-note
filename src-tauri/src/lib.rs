use std::{fs::File, io::{BufReader, BufWriter}};

use tauri::{App, Manager, async_runtime::Mutex, menu::MenuBuilder};

use crate::app_config::AppConfig;

mod app_config;
mod tauri_commands;

use tauri_commands::get_app_config;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            setup_window_menu(&app)?;
            setup_config(&app)?;
            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            get_app_config
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn setup_config(app: &App) -> anyhow::Result<()> {
    let app_handle = app.app_handle();
    let data_dir = app_handle.path().app_data_dir()?;
    let config_json_path = data_dir.join("app_config.json");

    if !config_json_path.exists() {
        let config_file = File::create(&config_json_path)?;
        let writer = BufWriter::new(config_file);

        let app_config = AppConfig::new();
        serde_json::to_writer_pretty(writer, &app_config)?;
    }

    let config_file = File::open(&config_json_path)?;
    let reader = BufReader::new(config_file);

    let app_config: AppConfig = serde_json::from_reader(reader)?;
    let mutex_app_config = Mutex::new(app_config);
    app.manage(mutex_app_config);
    Ok(())
}

fn setup_window_menu(app: &App) -> anyhow::Result<()> {
    let window_menu = MenuBuilder::new(app)
        .text("file", "ファイル")
        .text("edit", "編集")
        .build()?;
    app.set_menu(window_menu)?;
    Ok(())
}
