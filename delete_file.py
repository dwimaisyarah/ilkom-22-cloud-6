from config import CLOUD_DIR
import os

def delete_file(file_name):
    file_path = os.path.join(CLOUD_DIR, file_name)
    if os.path.isfile(file_path):
        os.remove(file_path)
        print(f"{file_name} berhasil dihapus dari cloud.")
    else:
        print("File tidak ditemukan.")

# Contoh penggunaan
# delete_file("data.txt")
