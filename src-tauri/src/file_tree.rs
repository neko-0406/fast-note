use std::{fs::File, path::Path};

pub enum Node {
    Directory,
    File
}

pub struct FileItem {
    pub name: String,
    pub abs_path: String,
    pub node: Node,
    pub level: i32,
    pub children: Vec<&FileItem>
}

impl FileItem {
    pub fn new() -> FileItem {
        Self { name: String::new(), abs_path: String::new(), node: Node::Directory, level: 0, children: Vec::new() }
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
            None => file_item.name = String::new()
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

    pub fn create_tree(&mut self, root_item: Option<FileItem>) {
        let root_path = Path::new(&self.abs_path);
        // root_itemの中のディレクトリを取得
        if let Ok(directories) = root_path.read_dir() {
            for entry_result in directories {
                // entryのエラーチェック
                let entry = match entry_result {
                    Ok(e) => e,
                    Err(_) => continue,
                };
                
                if let Ok(ft) = entry.file_type() {
                    let path_str = entry.path().to_string_lossy().to_string();
                    let mut new_item = FileItem::init(&path_str);
                    
                    if ft.is_dir() {
                        self.children.push(&new_item);
                        self.create_tree(Some(new_item));
                    } else if ft.is_file() {
                        self.children.push(&new_item);
                    }
                }
            }
        }
    }
}