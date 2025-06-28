from config import CLOUD_DIR
import shutil
import os

def download(file_name, target_dir="."):
    file_path = os.path.join(CLOUD_DIR, file_name)
    if not os.path.isfile(file_path):
        print("File tidak ditemukan di cloud.")
        return
    shutil.copy(file_path, target_dir)
    print(f"Berhasil mengunduh {file_name} ke {target_dir}.")

# Contoh penggunaan
# download("data.txt", "downloads")
