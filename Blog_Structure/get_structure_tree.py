import os

def generate_tree(startpath, exclude_dirs=None, level=0):
    if exclude_dirs is None:
        exclude_dirs = []  # 默认不排除任何目录
    
    tree_structure = ""
    for root, dirs, files in os.walk(startpath):
        # 过滤掉排除的目录
        dirs[:] = [d for d in dirs if os.path.join(root, d) not in exclude_dirs]

        # 添加当前目录的结构
        level_indent = '│   ' * level
        root_name = os.path.basename(root)
        tree_structure += f"{level_indent}├── {root_name}/\n" if level > 0 else f"{root_name}/\n"
        level += 1

        # 添加文件列表
        for file in sorted(files):
            tree_structure += f"{level_indent}│   └── {file} \n"
        
        # 遍历子目录并递归生成结构
        for dir_name in sorted(dirs):
            tree_structure += generate_tree(os.path.join(root, dir_name), exclude_dirs, level)
        break  # 确保只递归到第一层子目录

    return tree_structure

def save_to_md(content, filename="directory_structure.md"):
    with open(filename, 'w') as f:
        f.write(content)
    print(f"Directory structure saved to {filename}")

# 设置项目路径
project_path = "D:/Objects/blog/src"

# 设置要排除的目录列表
exclude_dirs = [
    "src/components",
    "src/config",
    "src/constants",
    "src/contexts",
    "src/data",
    "src/features",
    "src/hooks",
    "src/utils",
    "src/styles",
    "src/types",
    "src/app",
    "src/hooks",
    "src/lib",
    "src/services",
    "src/state",
    "src/types"
]

# 生成目录结构
dir_structure = generate_tree(project_path, exclude_dirs)

# 保存到 .md 文件
save_to_md(dir_structure)
