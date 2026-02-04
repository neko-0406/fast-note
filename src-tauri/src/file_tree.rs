use std::path::Path;

pub enum Node {
    Directory,
    File
}

pub struct FileItem {
    pub name: String,
    pub abs_path: String,
    pub node: Node,
    pub level: i32,
    pub children: Vec<FileItem>
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

    pub fn createTree(root_item: &mut FileItem) {
        
    }
}