import sqlite3
import re

# 驗證 Email 格式
def is_valid_email(email):
    return re.match(r'^[\w\.-]+@gmail\.com$', email)

# 驗證密碼是否符合規則
def validate_password(pw):
    errors = []
    if len(pw) < 8:
        errors.append("密碼必須超過8個字元")
    if not re.search(r'[A-Z]', pw):
        errors.append("密碼需包含大寫英文")
    if not re.search(r'[a-z]', pw):
        errors.append("密碼需包含小寫英文")
    if not re.search(r'[!@#$%^&*(),.?":{}|<>]', pw):
        errors.append("密碼需包含特殊字元")
    if re.search(r'012|123|234|345|456|567|678|789', pw):
        errors.append("密碼不能包含連號")
    return errors

# 註冊功能
def sign_up():
    name = input("請輸入姓名: ")

    while True:
        email = input("請輸入Email (xxx@gmail.com): ")
        if not is_valid_email(email):
            print("Email格式不符，請重新輸入")
        else:
            break

    while True:
        password = input("請輸入密碼: ")
        pw_errors = validate_password(password)
        if pw_errors:
            print("密碼不符合規定:")
            for err in pw_errors:
                print(" -", err)
            print("請重新輸入。")
        else:
            break

    print(f"save {name} | {email} | {password} | Y / N ?")
    choice = input().lower()
    if choice == 'y':
        conn = sqlite3.connect('users.db')
        c = conn.cursor()
        c.execute("SELECT * FROM user_data WHERE email = ?", (email,))
        user = c.fetchone()
        if user:
            print("此 Email 已存在。是否更新此 Email 資訊? (Y / N)")
            update_choice = input().lower()
            if update_choice == 'y':
                c.execute("UPDATE user_data SET name=?, password=? WHERE email=?", (name, password, email))
                print("資料已更新。")
        else:
            c.execute("INSERT INTO user_data (name, email, password) VALUES (?, ?, ?)", (name, email, password))
            print("註冊成功。")
        conn.commit()
        conn.close()
    else:
        print("已返回主選單。")

# 登入功能
def sign_in():
    name = input("請輸入姓名: ")
    email = input("請輸入Email: ")

    conn = sqlite3.connect('users.db')
    c = conn.cursor()
    c.execute("SELECT * FROM user_data WHERE name=? AND email=?", (name, email))
    user = c.fetchone()

    if not user:
        print("名字或Email錯誤")
        print("(a) sign up / (b) sign in")
        choice = input("請選擇操作: ").lower()
        if choice == 'a':
            sign_up()  # 返回註冊模式
        elif choice == 'b':
            print("請重新輸入登入資訊。")
            sign_in()  # 重新進入登入模式
        else:
            print("無效選項，請重新選擇。")
            sign_in()  # 重新讓用戶選擇登入或註冊
        conn.close()
        return

    while True:
        password = input("請輸入密碼: ")
        if password != user[2]:
            print("密碼錯誤，忘記密碼 Y / N ?")
            forget = input().lower()
            if forget == 'y':
                conn.close()
                sign_up()
                return
            else:
                continue
        else:
            print("登入成功！")
            conn.close()
            return

# 主流程
def main():
    while True:
        print("\n請選擇模式: (a) sign up / (b) sign in / (q) quit")
        choice = input("輸入選項: ").lower()
        if choice == 'a':
            sign_up()
        elif choice == 'b':
            sign_in()
        elif choice == 'q':
            print("結束程式")
            break
        else:
            print("無效選項，請重新輸入。")

if __name__ == "__main__":
    main()