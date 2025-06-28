from config import CLOUD_DIR
import shutil

def upload(file_path):
    if not os.path.isfile(file_path):
        print("File tidak ditemukan.")
        return
    shutil.copy(file_path, CLOUD_DIR)
    print(f"Berhasil meng-upload {file_path} ke cloud.")

# Contoh penggunaan
# upload("data.txt")
