class Barang:
    def __init__(self, nama, jumlah, harga):
        self.nama = nama
        self.jumlah = jumlah
        self.harga = harga

    def __str__(self):
        return f"Nama: {self.nama}, Jumlah: {self.jumlah}, Harga: {self.harga}"

class Inventaris:
    def __init__(self):
        self.barang_list = []

    def tambah_barang(self, nama, jumlah, harga):
        barang = Barang(nama, jumlah, harga)
        self.barang_list.append(barang)
        print(f"Barang {nama} telah ditambahkan.")

    def tampilkan_barang(self):
        print("Daftar Barang:")
        for barang in self.barang_list:
            print(barang)

    def cari_barang(self, nama):
        for barang in self.barang_list:
            if barang.nama.lower() == nama.lower():
                print(f"Ditemukan: {barang}")
                return
        print("Barang tidak ditemukan.")

def main():
    inventaris = Inventaris()
    while True:
        print("\n1. Tambah Barang")
        print("2. Tampilkan Barang")
        print("3. Cari Barang")
        print("4. Keluar")
        pilihan = input("Pilih opsi: ")

        if pilihan == '1':
            nama = input("Masukkan nama barang: ")
            jumlah = int(input("Masukkan jumlah: "))
            harga = float(input("Masukkan harga: "))
            inventaris.tambah_barang(nama, jumlah, harga)
        elif pilihan == '2':
            inventaris.tampilkan_barang()
        elif pilihan == '3':
            nama = input("Masukkan nama barang yang dicari: ")
            inventaris.cari_barang(nama)
        elif pilihan == '4':
            print("Keluar dari program.")
            break
        else:
            print("Pilihan tidak valid.")

if __name__ == "__main__":
    main()
