use std::{
    fs::{self, File},
    io::{BufWriter, Write},
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

use tauri_commands:: {
    get_app_theme,
    get_app_work_dir
};

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
        .invoke_handler(tauri::generate_handler![
            get_app_theme,
            get_app_work_dir
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

// アプリの設定ファイルと設定の初期化
fn setup_config(app: &App) {
    let app_handle = app.app_handle();
    let data_dir = app_handle
        .path()
        .app_data_dir()
        .expect("データフォルダの取得に失敗しました");
    // フォルダが無ければ作成
    if !data_dir.exists() {
        fs::create_dir_all(&data_dir).expect("データフォルダの作成に失敗しました");
    }
    // コンフィグファイル
    let config_file_path = data_dir.join("app_config.json");
    // コンフィグファイルがなければ作成・初期化
    if !config_file_path.exists() {
        let file = File::create(&config_file_path).expect("コンフィグファイルの生成に失敗しました");
        let app_config = AppConfig::new();

        let writer = BufWriter::new(file);
        serde_json::to_writer_pretty(writer, &app_config)
            .expect("コンフィグファイルの初期化に失敗しました");
    }
    // コンフィグファイルをロード
    let reader = File::open(&config_file_path).expect("コンフィグファイルの取得に失敗しました");
    let app_config: AppConfig =
        serde_json::from_reader(reader).expect("コンフィグファイルのロードに失敗しました");
    app.manage(Mutex::new(app_config));
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
