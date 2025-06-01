1. Judul Proyek
    Todo App - Aplikasi Manajemen Tugas Berbasis Web

2. Deskripsi
    Aplikasi ini memungkinkan pengguna untuk membuat, membaca, mengedit, dan menghapus daftar tugas (CRUD task) serta mengirimkan notifikasi via Pushover jika menambahkan tugas dan memberitahu batas dari deadline tugas tersebut. Dibangun menggunakan FastAPI sebagai backend dan HTML/CSS sederhana untuk frontend. 

3. Cara Menjalankan
    1. Clone repositori:
        (https://github.com/dwimaisyarah/ilkom-22-cloud-6.git)
    2. Masuk ke direktori:
        cd todo-app
    3. Install library:
        pip install -r requirements.txt
    4. Jalankan server:
        uvicorn app:app --reload

4. Requirement.txt
    Berisi daftar dependensi (library pihak ketiga) yang dibutuhkan oleh proyek. Bisa disebutkan satu per satu atau diarahkan ke file requirements.txt. Tujuannya agar pengguna tahu apa yang harus di-install sebelum menjalankan proyek.
        contoh: fastapi, sqlalchemy, uvicorn, httpx, python-jose
        
5. Catatan
    Untuk notifikasi, harus memiliki akun Pushover dan user key