import httpx

def send_notification(title):
    token = "az3w99qdawwgcdfv78irvf2xxstftv"
    user_key = "uy6w4inm4mtwqnjj6oh7bmcvtf3g9p"
    url = "https://api.pushover.net/1/messages.json"
    payload = {
        "token": token,
        "user": user_key,
        "message": title
    }

    headers = {
        "Content-Type": "application/x-www-form-urlencoded"
    }

    response = httpx.post(url, data=payload, headers=headers)
    print(f"Notif status: {response.status_code}, Respon: {response.text}")
    return response.status_code
