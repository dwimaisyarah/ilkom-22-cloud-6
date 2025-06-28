class Kontak:
    def __init__(self, nama, nomor):
        self.nama = nama
        self.nomor = nomor

class ManajemenKontak:
    def __init__(self):
        self.kontak_list = []

    def tambah_kontak(self, nama, nomor):
        kontak = Kontak(nama, nomor)
        self.kontak_list.append(kontak)
        print(f"Kontak {nama} telah ditambahkan.")

    def tampilkan_kontak(self):
        print("Daftar Kontak:")
        for kontak in self.kontak_list:
            print(f"Nama: {kontak.nama}, Nomor: {kontak.nomor}")

    def cari_kontak(self, nama):
        for kontak in self.kontak_list:
            if kontak.nama.lower() == nama.lower():
                print(f"Ditemukan: {kontak.nama}, Nomor: {kontak.nomor}")
                return
        print("Kontak tidak ditemukan.")

def main():
    manajemen = ManajemenKontak()
    while True:
        print("\n1. Tambah Kontak")
        print("2. Tampilkan Kontak")
        print("3. Cari Kontak")
        print("4. Keluar")
        pilihan = input("Pilih opsi: ")

        if pilihan == '1':
            nama = input("Masukkan nama: ")
            nomor = input("Masukkan nomor: ")
            manajemen.tambah_kontak(nama, nomor)
        elif pilihan == '2':
            manajemen.tampilkan_kontak()
        elif pilihan == '3':
            nama = input("Masukkan nama yang dicari: ")
            manajemen.cari_kontak(nama)
        elif pilihan == '4':
            print("Keluar dari program.")
            break
        else:
            print("Pilihan tidak valid.")

if __name__ == "__main__":
    main()
