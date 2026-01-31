use std::{fs::File, io::{BufReader, BufWriter}};

use anyhow::Context;
use tauri::{App, Manager, async_runtime::Mutex, menu::MenuBuilder};

use crate::app_config::AppConfig;

mod app_config;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            let window_menu = MenuBuilder::new(app)
                .text("file", "ファイル")
                .text("edit", "編集")
                .build()?;
            app.set_menu(window_menu)?;
            setup_config(&app)?;
            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn setup_config(app: &App) -> anyhow::Result<()> {
    let data_dir = app.path().data_dir()
        .with_context(|| String::from("failed to get AppDataDir"))?;
    let config_json_path = data_dir.join("com.app.fast-note/app_config.json");

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
