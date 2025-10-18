import sqlite3
import re

# 連接 SQLite
conn = sqlite3.connect('ID_data.db')
cursor = conn.cursor()

# 取得字母對應的整數（如 A=10）
def get_letter_number(letter):
    cursor.execute("SELECT number FROM county WHERE code = ?", (letter,))
    result = cursor.fetchone()
    return result[0] if result else None

# 計算驗證碼
def calculate_checksum(id9):
    if not re.match(r'^[A-Z][1289][0-9]{7}$', id9):
        return None
    letter = id9[0]
    number = get_letter_number(letter)
    if number is None:
        return None
    n1 = number // 10
    n2 = number % 10
    digits = [n1, n2] + [int(d) for d in id9[1:]]
    weights = [1, 9, 8, 7, 6, 5, 4, 3, 2, 1]
    total = sum([d * w for d, w in zip(digits, weights)])
    return (10 - total % 10) % 10

# 驗證身分證
def is_valid_id(id10):
    if not re.match(r'^[A-Z][1289][0-9]{8}$', id10):
        return False
    return calculate_checksum(id10[:-1]) == int(id10[-1])

#取得縣市
def County(code):
    cursor.execute("SELECT county FROM county WHERE code = ?", (code,))
    result = cursor.fetchone()
    return result[0] if result else "未知縣市"

#取得性別
def Gender(num):
    if num == '1':
        return '男性'
    elif num == '2':
        return '女性'
    elif num in ('8', '9'):
        return '居留證'
    return '未知'

#取得國籍
def Citizenship(num):
    if num == '6':
        return '入籍國民，原為外國人'
    elif num == '7':
        return '入籍國民，原為無國籍國民'
    elif num == '8':
        return '入籍國民，原為香港居民或澳門居民'
    elif num == '9':
        return '入籍國民，原為大陸地區居民'
    else:
        return '在臺灣出生之本籍國民'

# 取得 ID 列表
cursor.execute("SELECT rowid, ID FROM ID_table")
rows = cursor.fetchall()

for row in rows:
    rowid = row[0]
    raw_id = str(row[1]).strip().upper()
    full_id = None

    if len(raw_id) == 9:
        checksum = calculate_checksum(raw_id)
        if checksum is not None:
            full_id = raw_id + str(checksum)
    elif len(raw_id) == 10:
        if is_valid_id(raw_id):
            full_id = raw_id

    if full_id and is_valid_id(full_id):
        county = County(full_id[0])
        gender = Gender(full_id[1])
        citizenship = Citizenship(full_id[2])
        cursor.execute("""
            UPDATE ID_table
            SET ID = ?, country = ?, gender = ?, citizenship = ?
            WHERE rowid = ?
        """, (full_id, county, gender, citizenship, rowid))
    else:
        cursor.execute("DELETE FROM ID_table WHERE rowid = ?", (rowid,))

conn.commit()

# 顯示結果
cursor.execute("SELECT ID, country, gender, citizenship FROM ID_table")
updated_rows = cursor.fetchall()

print("✔ 剩餘正確身份證字號與資料：\n")
for row in updated_rows:
    print(f'{row[0]}：{row[1]} {row[2]} {row[3]}')

# 查詢功能
def query_id(id_input):
    id_input = id_input.strip().upper()
    if not re.match(r'^[A-Z][1289][0-9]{8}$', id_input):
        return "❌ 格式錯誤，請重新輸入"
    if not is_valid_id(id_input):
        return "❌ 此身份證字號為假，請重新輸入"
    letter = id_input[0]
    county = County(letter)
    gender = Gender(id_input[1])
    citizenship = Citizenship(id_input[2])
    return f'{id_input}：{county} {gender} {citizenship}'

# 查詢測試
print("\n🔍 查詢範例：")
print(query_id("A123456789"))
print(query_id("N126807298"))
print(query_id("D123456789"))

cursor.close()
conn.close()
