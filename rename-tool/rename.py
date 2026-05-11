import os
import sys

folder_path = "sample-files"
files = sorted(os.listdir(folder_path))

image_extensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"]

prefix = input("新しいファイル名の先頭を入力してください：").strip()

if prefix == "":
    print("名前が空です。処理を中止しました。")
    sys.exit()

target_files = []

for file_name in files:
    old_path = os.path.join(folder_path, file_name)

    if not os.path.isfile(old_path):
        continue

    _, ext = os.path.splitext(file_name)
    ext = ext.lower()

    if ext not in image_extensions:
        print(f"スキップ: {file_name}")
        continue

    target_files.append(file_name)

if len(target_files) == 0:
    print("対象の画像ファイルがありません。処理を中止しました。")
    sys.exit()

print("\n変更予定のファイル:")
for index, file_name in enumerate(target_files, start=1):
    _, ext = os.path.splitext(file_name)
    ext = ext.lower()
    new_name = f"{prefix}_{index:03}{ext}"
    print(f"{file_name} → {new_name}")

confirm = input("\nこの内容で変更しますか？ (y/n)：").strip().lower()

if confirm != "y":
    print("処理を中止しました。")
    sys.exit()

for index, file_name in enumerate(target_files, start=1):
    old_path = os.path.join(folder_path, file_name)
    _, ext = os.path.splitext(file_name)
    ext = ext.lower()

    new_name = f"{prefix}_{index:03}{ext}"
    new_path = os.path.join(folder_path, new_name)

    if os.path.exists(new_path):
        print(f"同じ名前のファイルがすでにあります: {new_name}")
        print("処理を中止しました。")
        sys.exit()

for index, file_name in enumerate(target_files, start=1):
    old_path = os.path.join(folder_path, file_name)
    _, ext = os.path.splitext(file_name)
    ext = ext.lower()

    new_name = f"{prefix}_{index:03}{ext}"
    new_path = os.path.join(folder_path, new_name)

    os.rename(old_path, new_path)
    print(f"{file_name} → {new_name}")

print("完了しました。")