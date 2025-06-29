def hitung_kata(teks):
    kata = teks.split()
    return len(kata)

def main():
    teks = input("Masukkan teks: ")
    jumlah_kata = hitung_kata(teks)
    print(f"Jumlah kata: {jumlah_kata}")

if __name__ == "__main__":
    main()
