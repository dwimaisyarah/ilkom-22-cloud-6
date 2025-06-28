from config import CLOUD_DIR
import os

def list_files():
    files = os.listdir(CLOUD_DIR)
    if not files:
        print("Cloud kosong.")
    else:
        print("Daftar file di cloud:")
        for file in files:
            print("-", file)

# Contoh penggunaan
# list_files()
