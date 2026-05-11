import csv
import sys

input_file = "sample.csv"
output_file = "cleaned.csv"

with open(input_file, newline="", encoding="utf-8") as infile:
    reader = csv.reader(infile)
    rows = list(reader)

if len(rows) == 0:
    print("CSVが空です。処理を終了します。")
    sys.exit()

header = rows[0]
data_rows = rows[1:]

print("列一覧:")
for i, col in enumerate(header, start=1):
    print(f"{i}: {col}")

selected = input("残したい列番号を入力してください（例: 1,2）: ").strip()

if selected == "":
    print("入力が空です。処理を終了します。")
    sys.exit()

try:
    selected_indexes = []
    parts = selected.split(",")

    for p in parts:
        num = int(p.strip())
        selected_indexes.append(num - 1)

except ValueError:
    print("入力形式が正しくありません。")
    sys.exit()

for index in selected_indexes:
    if index < 0 or index >= len(header):
        print("列番号が範囲外です。処理を終了します。")
        sys.exit()

# 並び替え設定
sort_input = input("並び替えする列番号（例: 2、なしならEnter）: ").strip()

sort_index = None

if sort_input != "":
    try:
        sort_index = int(sort_input) - 1
    except ValueError:
        print("数字を入力してください。")
        sys.exit()

    if sort_index < 0 or sort_index >= len(header):
        print("列番号が範囲外です。")
        sys.exit()

    order = input("昇順: 1 / 降順: 2 を入力してください: ").strip()

    if order not in ["1", "2"]:
        print("入力が正しくありません。")
        sys.exit()

# 重複削除するか
remove_dup = input("重複を削除しますか？ (y/n): ").strip().lower()

seen = set()
cleaned_rows = []

for row in data_rows:
    if all(cell.strip() == "" for cell in row):
        continue

    cleaned_row = []

    for i in selected_indexes:
        if i < len(row):
            cleaned_row.append(row[i])
        else:
            cleaned_row.append("")

    # 重複チェック
    if remove_dup == "y":
        row_tuple = tuple(cleaned_row)

        if row_tuple in seen:
            continue

        seen.add(row_tuple)

    cleaned_rows.append(cleaned_row)

# 並び替え
if sort_index is not None and sort_index in selected_indexes:
    sort_pos = selected_indexes.index(sort_index)

    reverse = (order == "2")

    try:
        cleaned_rows.sort(
            key=lambda x: int(x[sort_pos]) if x[sort_pos].isdigit() else x[sort_pos],
            reverse=reverse
        )
    except:
        print("並び替えに失敗しました。")
        sys.exit()

# ヘッダー作成
new_header = []
for i in selected_indexes:
    new_header.append(header[i])

cleaned_rows.insert(0, new_header)

with open(output_file, "w", newline="", encoding="utf-8") as outfile:
    writer = csv.writer(outfile)
    writer.writerows(cleaned_rows)

print("CSVの整理が完了しました。")
print(f"保存先: {output_file}")