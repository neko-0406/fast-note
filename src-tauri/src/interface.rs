use serde::Serialize;

use crate::file_tree::FileItem;

#[derive(Serialize, Clone)]
pub struct OpenFolderEvent {
    pub new_file_item: FileItem
}