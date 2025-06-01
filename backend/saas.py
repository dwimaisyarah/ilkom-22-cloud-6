import httpx

#Fungsi untuk mengirim notifikasi menggunakan layanan Pushover.
def send_notification(judul: str, deskripsi: str, user_key: str):
    token = "ar1fcrfigf1rbtjsrjsa2nfkzzfst9"
    url = "https://api.pushover.net/1/messages.json"
    payload = {
        "token": token,
        "user": user_key,
        "title": judul,
        "message": deskripsi
    }
#Header HTTP untuk memberitahu server bahwa data dikirim dalam format x-www-form-urlencoded.
    headers = {
        "Content-Type": "application/x-www-form-urlencoded"
    }

    response = httpx.post(url, data=payload, headers=headers) # Melakukan permintaan POST ke API Pushover menggunakan httpx.
    print(f"Notif status: {response.status_code}, Respon: {response.text}") # Menampilkan status dan isi respon dari permintaan.
    return response.status_code # Mengembalikan status kode HTTP dari respons (misalnya 200 jika sukses).
