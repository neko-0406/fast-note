use std::path::Path;

use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub enum Node {
    Directory,
    File,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct FileItem {
    pub name: String,
    pub abs_path: String,
    pub node: Node,
    pub level: i32,
    pub children: Vec<FileItem>,
}

impl FileItem {
    pub fn new() -> FileItem {
        Self {
            name: String::new(),
            abs_path: String::new(),
            node: Node::Directory,
            level: 0,
            children: Vec::new(),
        }
    }

    // 絶対パスを渡すこと
    pub fn init(root_path: &str) -> FileItem {
        let mut file_item = FileItem::new();
        let path_obj = Path::new(root_path);

        if path_obj.is_absolute() {
            file_item.abs_path = String::from(root_path);
        } else {
            file_item.abs_path = String::new();
        }

        match path_obj.file_name() {
            Some(name) => file_item.name = name.to_string_lossy().to_string(),
            None => file_item.name = String::new(),
        }

        if path_obj.is_dir() {
            file_item.node = Node::Directory;
        } else {
            file_item.node = Node::File;
        }

        file_item.level = 0;
        file_item.children = Vec::new();

        file_item
    }

    pub fn create_tree(&mut self) {
        FileItem::walk_tree(self);
    }

    // 再帰的にファイルツリーを構築
    fn walk_tree(root_item: &mut FileItem) {
        let root_path = Path::new(&root_item.abs_path);
        let entry_result = root_path.read_dir();

        let entry = match entry_result {
            Ok(entry) => Some(entry),
            Err(error) => {
                println!("{}", error.to_string());
                None
            }
        };

        if let Some(entry) = entry {
            for item_result in entry {
                if let Ok(item) = item_result {
                    let file_type = match item.file_type() {
                        Ok(f_type) => f_type,
                        Err(_) => continue,
                    };
                    //　子要素のファイルアイテムの作成
                    let mut new_item = FileItem::new();
                    new_item.name = item.file_name().to_string_lossy().to_string();
                    new_item.abs_path = item.path().to_string_lossy().to_string();
                    new_item.level = root_item.level + 1;
                    if file_type.is_dir() {
                        new_item.node = Node::Directory;
                        FileItem::walk_tree(&mut new_item);
                    } else if file_type.is_file() {
                        new_item.node = Node::File;
                    }
                    // 親アイテムのchildrenに追加
                    root_item.children.push(new_item);
                }
            }
        }
    }
}
