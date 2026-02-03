use std::path::Path;

pub enum Node {
    Directory,
    File
}

pub struct FileItem {
    pub name: String,
    pub node: Node,
    pub level: i32,
    pub children: Vec<FileItem>
}

impl FileItem {
    pub fn new() -> FileItem {
        Self { name: String::new(), node: Node::Directory, level: 0, children: Vec::new() }
    }

    pub fn createTree(root_path: String) {
        
    }
}