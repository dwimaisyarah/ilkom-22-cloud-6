import httpx

def send_notification(judul: str, deskripsi: str, user_key: str):
    token = "ar1fcrfigf1rbtjsrjsa2nfkzzfst9"
    url = "https://api.pushover.net/1/messages.json"
    payload = {
        "token": token,
        "user": user_key,
        "title": judul,
        "message": deskripsi
    }

    headers = {
        "Content-Type": "application/x-www-form-urlencoded"
    }

    response = httpx.post(url, data=payload, headers=headers)
    print(f"Notif status: {response.status_code}, Respon: {response.text}")
    return response.status_code
