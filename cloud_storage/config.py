import os

# Folder penyimpanan cloud simulasi
CLOUD_DIR = "simulated_cloud"

# Buat folder jika belum ada
if not os.path.exists(CLOUD_DIR):
    os.makedirs(CLOUD_DIR)
