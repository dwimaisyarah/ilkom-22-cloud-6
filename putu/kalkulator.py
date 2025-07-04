def tambah(x, y):
    return x + y
def kurang(x, y):
    return x - y

def kali(x, y):
    return x * y

def bagi(x, y):
    if y == 0:
        return "Error: Pembagian dengan nol!"
    return x / y
def main():
    print("=== Kalkulator Sederhana ===")
    print("Pilih operasi:")
    print("1. Tambah (+)")
    print("2. Kurang (-)")
    print("3. Kali (*)")
    print("4. Bagi (/)")
    pilihan = input("Masukkan pilihan (1/2/3/4): ")

    if pilihan not in ['1', '2', '3', '4']:
        print("Pilihan tidak valid.")
        return

    try:
        angka1 = float(input("Masukkan angka pertama: "))
        angka2 = float(input("Masukkan angka kedua: "))
    except ValueError:
        print("Input tidak valid. Harus berupa angka.")
        return
    if pilihan == '1':
        hasil = tambah(angka1, angka2)
        operasi = "+"
    elif pilihan == '2':
        hasil = kurang(angka1, angka2)
        operasi = "-"
    elif pilihan == '3':
        hasil = kali(angka1, angka2)
        operasi = "*"
    elif pilihan == '4':
        hasil = bagi(angka1, angka2)
        operasi = "/"
        print(f"Hasil: {angka1} {operasi} {angka2} = {hasil}")

if _name_ == "_main_":
    main()
