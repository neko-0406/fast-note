use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum Theme {
    System,
    Dark,
    Light
}

#[derive(Debug, Clone, Serialize, Deserialize)]
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