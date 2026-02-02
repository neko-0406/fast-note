use std::{
    fs::{self, File},
    io::{BufReader, BufWriter},
    sync::Mutex,
};

use tauri::{
    menu::{MenuBuilder, SubmenuBuilder},
    App, AppHandle, Manager,
};
use tauri_plugin_dialog::DialogExt;

use crate::app_config::AppConfig;

mod app_config;
mod tauri_commands;

use tauri_commands::get_app_config;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .setup(|app| {
            setup_config(&app);
            setup_window_menu(&app);
            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![get_app_config])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

// アプリの設定ファイルと設定の初期化
fn setup_config(app: &App) {
    let app_handle = app.app_handle();
}

// windowメニューの初期化
fn setup_window_menu(app: &App) {
    let file_menu = SubmenuBuilder::new(app, "ファイル")
        .text("open_dir", "フォルダを開く")
        .build()
        .unwrap();

    let window_menu = MenuBuilder::new(app).items(&[&file_menu]).build().unwrap();

    app.set_menu(window_menu).unwrap();

    app.on_menu_event(move |app_handle: &AppHandle, event| {
        println!("menu event {:?}", event.id());
        match event.id().0.as_str() {
            "open_dir" => {
                let selected_dir = app_handle
                    .dialog()
                    .file()
                    .set_title("作業用のフォルダを選択してください")
                    .blocking_pick_folder();
                match selected_dir {
                    Some(dir_path) => {
                        let config = app_handle.state::<Mutex<AppConfig>>();
                        let mut lock = config.lock().unwrap();
                        lock.work_dir = dir_path.to_string();
                    }
                    None => {}
                }
            }
            _ => {}
        }
    });
}