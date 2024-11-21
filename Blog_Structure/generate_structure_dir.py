import os

def create_directory(path):
    """创建目录，如果目录不存在。"""
    if not os.path.exists(path):
        os.makedirs(path)
        print(f"目录已创建：{path}")
    else:
        print(f"目录已存在：{path}")

def create_file(path):
    """创建文件，如果文件不存在。"""
    if not os.path.exists(path):
        with open(path, 'w') as file:
            print(f"文件已创建：{path}")
    else:
        print(f"文件已存在：{path}")

def main(base_path):
    # 定义目录结构
    directory_structure = {
        "styles": {},
        "styles/abstracts": {
            "_functions.scss": None,
            "_mixins.scss": None,
            "_theme-config.scss": None,
            "_variables.scss": None,
            "_index.scss": None
        },
        "styles/base": {
            "_animations.scss": None,
            "_base.scss": None,
            "_reset.scss": None,
            "_typography.scss": None,
            "_index.scss": None
        },
        "styles/components": {
            "_alerts.scss": None,
            "_badges.scss": None,
            "_buttons.scss": None,
            "_card.scss": None,
            "_forms.scss": None,
            "_modals.scss": None,
            "_navigation.scss": None,
            "_tables.scss": None,
            "_tooltips.scss": None,
            "_index.scss": None
        },
        "styles/layouts": {
            "_card-grid.scss": None,
            "_containers.scss": None,
            "_footer.scss": None,
            "_grid.scss": None,
            "_header.scss": None,
            "_main-layout.scss": None,
            "_section.scss": None,
            "_sidebar.scss": None,
            "_two-column.scss": None,
            "_index.scss": None
        },
        "styles/themes": {
            "_theme-mixins.scss": None,
            "_theme-variables.scss": None,
            "_index.scss": None,
            "schemes": {
                "_dark.scss": None,
                "_light.scss": None
            }
        },
        "styles/utilities": {
            "_borders.scss": None,
            "_display.scss": None,
            "_flexbox.scss": None,
            "_helpers.scss": None,
            "_position.scss": None,
            "_spacing.scss": None,
            "_text.scss": None,
            "_index.scss": None
        }
    }

    # 创建目录和文件
    for dir_path, files in directory_structure.items():
        full_dir_path = os.path.join(base_path, dir_path)
        create_directory(full_dir_path)
        if isinstance(files, dict):
            for file_name in files:
                file_path = os.path.join(full_dir_path, file_name)
                create_file(file_path)

if __name__ == "__main__":
    base_path = input("请输入基础路径，以创建目录结构：")
    main(base_path)