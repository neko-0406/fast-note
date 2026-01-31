use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub enum Theme {
    System,
    Dark,
    Light
}

#[derive(Serialize, Deserialize)]
pub struct AppConfig {
    pub theme: Theme,
    pub work_dir: String
}

impl AppConfig {
    pub fn new() -> AppConfig {
        Self {
            theme: Theme::System,
            work_dir: String::new()
        }
    }
}