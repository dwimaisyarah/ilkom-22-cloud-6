# main.py
"""
Program Utama - Sistem Rekam Medis Sederhana (CLI)
"""

from menu import tampilkan_menu

def main():
    while True:
        tampilkan_menu()

if __name__ == "__main__":
    main()
# menu.py
from pasien import menu_pasien
from dokter import menu_dokter
from rekam_medis import menu_rekam_medis
from laporan import menu_laporan
from utils import clear_screen

def tampilkan_menu():
    while True:
        clear_screen()
        print("="*50)
        print(" SISTEM REKAM MEDIS SEDERHANA ".center(50, " "))
        print("="*50)
        print("1. Manajemen Pasien")
        print("2. Manajemen Dokter")
        print("3. Rekam Medis")
        print("4. Laporan dan Statistik")
        print("5. Keluar")
        print("="*50)
        pilihan = input("Pilih menu: ")

        if pilihan == '1':
            menu_pasien()
        elif pilihan == '2':
            menu_dokter()
        elif pilihan == '3':
            menu_rekam_medis()
        elif pilihan == '4':
            menu_laporan()
        elif pilihan == '5':
            print("Terima kasih telah menggunakan sistem ini.")
            break
        else:
            print("Pilihan tidak valid.")
            input("Tekan Enter untuk kembali...")
# utils.py
import os

def clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')

def tekan_enter():
    input("\nTekan Enter untuk melanjutkan...")

def cetak_garis(panjang=50):
    print("=" * panjang)

def validasi_tanggal(tanggal):
    import datetime
    try:
        datetime.datetime.strptime(tanggal, "%Y-%m-%d")
        return True
    except ValueError:
        return False

def input_dengan_validasi(prompt, validasi_fungsi, pesan_error="Input tidak valid"):
    while True:
        nilai = input(prompt)
        if validasi_fungsi(nilai):
            return nilai
        print(pesan_error)
# file_handler.py
import csv
import os

def muat_data(nama_file):
    if not os.path.exists(nama_file):
        return []
    with open(nama_file, mode='r', newline='', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        return list(reader)

def simpan_data(nama_file, data):
    if len(data) == 0:
        return
    with open(nama_file, mode='w', newline='', encoding='utf-8') as file:
        writer = csv.DictWriter(file, fieldnames=data[0].keys())
        writer.writeheader()
        writer.writerows(data)

def generate_id(prefix):
    from uuid import uuid4
    return f"{prefix.upper()}-{str(uuid4())[:8]}"
# pasien.py
from file_handler import muat_data, simpan_data, generate_id
from utils import clear_screen, tekan_enter, cetak_garis

DATA_FILE = 'data/pasien.csv'

def tambah_pasien():
    clear_screen()
    cetak_garis()
    print(" TAMBAH PASIEN BARU ".center(50, " "))
    cetak_garis()
    nama = input("Nama lengkap     : ")
    umur = input("Umur             : ")
    alamat = input("Alamat           : ")
    no_hp = input("No HP            : ")

    pasien = {
        "id": generate_id("PSN"),
        "nama": nama,
        "umur": umur,
        "alamat": alamat,
        "no_hp": no_hp
    }

    data = muat_data(DATA_FILE)
    data.append(pasien)
    simpan_data(DATA_FILE, data)
    print("✅ Pasien berhasil ditambahkan.")
    tekan_enter()

def lihat_pasien():
    clear_screen()
    cetak_garis()
    print(" DAFTAR PASIEN ".center(50, " "))
    cetak_garis()
    data = muat_data(DATA_FILE)
    if not data:
        print("Belum ada data pasien.")
    else:
        for d in data:
            print(f"{d['id']} | {d['nama']} | Umur: {d['umur']} | {d['alamat']} | {d['no_hp']}")
    tekan_enter()

def cari_pasien():
    clear_screen()
    cetak_garis()
    print(" CARI PASIEN ".center(50, " "))
    cetak_garis()
    keyword = input("Masukkan nama/ID: ").lower()
    data = muat_data(DATA_FILE)
    hasil = [p for p in data if keyword in p['nama'].lower() or keyword in p['id'].lower()]
    if hasil:
        for d in hasil:
            print(f"{d['id']} | {d['nama']} | Umur: {d['umur']} | {d['alamat']} | {d['no_hp']}")
    else:
        print("Pasien tidak ditemukan.")
    tekan_enter()

def edit_pasien():
    clear_screen()
    cetak_garis()
    print(" EDIT DATA PASIEN ".center(50, " "))
    cetak_garis()
    pasien_id = input("Masukkan ID Pasien: ")
    data = muat_data(DATA_FILE)
    ditemukan = False
    for p in data:
        if p['id'] == pasien_id:
            print(f"Nama sebelumnya: {p['nama']}")
            p['nama'] = input("Nama baru       : ") or p['nama']
            p['umur'] = input("Umur baru       : ") or p['umur']
            p['alamat'] = input("Alamat baru     : ") or p['alamat']
            p['no_hp'] = input("No HP baru      : ") or p['no_hp']
            ditemukan = True
            break
    if ditemukan:
        simpan_data(DATA_FILE, data)
        print("✅ Data pasien diperbarui.")
    else:
        print("❌ Pasien tidak ditemukan.")
    tekan_enter()

def hapus_pasien():
    clear_screen()
    cetak_garis()
    print(" HAPUS PASIEN ".center(50, " "))
    cetak_garis()
    pasien_id = input("Masukkan ID Pasien: ")
    data = muat_data(DATA_FILE)
    data_baru = [p for p in data if p['id'] != pasien_id]
    if len(data) != len(data_baru):
        simpan_data(DATA_FILE, data_baru)
        print("✅ Data pasien berhasil dihapus.")
    else:
        print("❌ Pasien tidak ditemukan.")
    tekan_enter()

def menu_pasien():
    while True:
        clear_screen()
        cetak_garis()
        print(" MENU MANAJEMEN PASIEN ".center(50, " "))
        cetak_garis()
        print("1. Tambah Pasien")
        print("2. Lihat Daftar Pasien")
        print("3. Cari Pasien")
        print("4. Edit Pasien")
        print("5. Hapus Pasien")
        print("6. Kembali")
        cetak_garis()
        pilihan = input("Pilih menu: ")

        if pilihan == '1':
            tambah_pasien()
        elif pilihan == '2':
            lihat_pasien()
        elif pilihan == '3':
            cari_pasien()
        elif pilihan == '4':
            edit_pasien()
        elif pilihan == '5':
            hapus_pasien()
        elif pilihan == '6':
            break
        else:
            print("Pilihan tidak valid.")
            tekan_enter()
# dokter.py
from file_handler import muat_data, simpan_data, generate_id
from utils import clear_screen, tekan_enter, cetak_garis

DATA_FILE = 'data/dokter.csv'

def tambah_dokter():
    clear_screen()
    cetak_garis()
    print(" TAMBAH DOKTER BARU ".center(50, " "))
    cetak_garis()
    nama = input("Nama Dokter      : ")
    spesialis = input("Spesialis        : ")
    no_hp = input("No HP            : ")

    dokter = {
        "id": generate_id("DR"),
        "nama": nama,
        "spesialis": spesialis,
        "no_hp": no_hp
    }

    data = muat_data(DATA_FILE)
    data.append(dokter)
    simpan_data(DATA_FILE, data)
    print("✅ Dokter berhasil ditambahkan.")
    tekan_enter()

def lihat_dokter():
    clear_screen()
    cetak_garis()
    print(" DAFTAR DOKTER ".center(50, " "))
    cetak_garis()
    data = muat_data(DATA_FILE)
    if not data:
        print("Belum ada data dokter.")
    else:
        for d in data:
            print(f"{d['id']} | {d['nama']} | Spesialis: {d['spesialis']} | {d['no_hp']}")
    tekan_enter()

def cari_dokter():
    clear_screen()
    cetak_garis()
    print(" CARI DOKTER ".center(50, " "))
    cetak_garis()
    keyword = input("Masukkan nama/ID: ").lower()
    data = muat_data(DATA_FILE)
    hasil = [d for d in data if keyword in d['nama'].lower() or keyword in d['id'].lower()]
    if hasil:
        for d in hasil:
            print(f"{d['id']} | {d['nama']} | Spesialis: {d['spesialis']} | {d['no_hp']}")
    else:
        print("Dokter tidak ditemukan.")
    tekan_enter()

def edit_dokter():
    clear_screen()
    cetak_garis()
    print(" EDIT DATA DOKTER ".center(50, " "))
    cetak_garis()
    dokter_id = input("Masukkan ID Dokter: ")
    data = muat_data(DATA_FILE)
    ditemukan = False
    for d in data:
        if d['id'] == dokter_id:
            print(f"Nama sebelumnya: {d['nama']}")
            d['nama'] = input("Nama baru       : ") or d['nama']
            d['spesialis'] = input("Spesialis baru  : ") or d['spesialis']
            d['no_hp'] = input("No HP baru      : ") or d['no_hp']
            ditemukan = True
            break
    if ditemukan:
        simpan_data(DATA_FILE, data)
        print("✅ Data dokter diperbarui.")
    else:
        print("❌ Dokter tidak ditemukan.")
    tekan_enter()

def hapus_dokter():
    clear_screen()
    cetak_garis()
    print(" HAPUS DOKTER ".center(50, " "))
    cetak_garis()
    dokter_id = input("Masukkan ID Dokter: ")
    data = muat_data(DATA_FILE)
    data_baru = [d for d in data if d['id'] != dokter_id]
    if len(data) != len(data_baru):
        simpan_data(DATA_FILE, data_baru)
        print("✅ Data dokter berhasil dihapus.")
    else:
        print("❌ Dokter tidak ditemukan.")
    tekan_enter()

def menu_dokter():
    while True:
        clear_screen()
        cetak_garis()
        print(" MENU MANAJEMEN DOKTER ".center(50, " "))
        cetak_garis()
        print("1. Tambah Dokter")
        print("2. Lihat Daftar Dokter")
        print("3. Cari Dokter")
        print("4. Edit Dokter")
        print("5. Hapus Dokter")
        print("6. Kembali")
        cetak_garis()
        pilihan = input("Pilih menu: ")

        if pilihan == '1':
            tambah_dokter()
        elif pilihan == '2':
            lihat_dokter()
        elif pilihan == '3':
            cari_dokter()
        elif pilihan == '4':
            edit_dokter()
        elif pilihan == '5':
            hapus_dokter()
        elif pilihan == '6':
            break
        else:
            print("Pilihan tidak valid.")
            tekan_enter()
# rekam_medis.py
from file_handler import muat_data, simpan_data, generate_id
from utils import clear_screen, tekan_enter, cetak_garis, validasi_tanggal, input_dengan_validasi

PASIEN_FILE = 'data/pasien.csv'
DOKTER_FILE = 'data/dokter.csv'
REKAM_FILE = 'data/rekam_medis.csv'

def tambah_rekam_medis():
    clear_screen()
    cetak_garis()
    print(" TAMBAH REKAM MEDIS ".center(50, " "))
    cetak_garis()

    pasien_id = input("ID Pasien      : ")
    dokter_id = input("ID Dokter      : ")
    tanggal = input_dengan_validasi("Tanggal (YYYY-MM-DD): ", validasi_tanggal, "Format tanggal salah.")
    keluhan = input("Keluhan        : ")
    diagnosa = input("Diagnosa       : ")
    tindakan = input("Tindakan       : ")

    rekam = {
        "id": generate_id("RM"),
        "pasien_id": pasien_id,
        "dokter_id": dokter_id,
        "tanggal": tanggal,
        "keluhan": keluhan,
        "diagnosa": diagnosa,
        "tindakan": tindakan
    }

    data = muat_data(REKAM_FILE)
    data.append(rekam)
    simpan_data(REKAM_FILE, data)
    print("✅ Rekam medis berhasil ditambahkan.")
    tekan_enter()

def lihat_semua_rekam_medis():
    clear_screen()
    cetak_garis()
    print(" SEMUA REKAM MEDIS ".center(50, " "))
    cetak_garis()
    data = muat_data(REKAM_FILE)
    if not data:
        print("Belum ada rekam medis.")
    else:
        for r in data:
            print(f"{r['id']} | Pasien: {r['pasien_id']} | Dokter: {r['dokter_id']} | Tgl: {r['tanggal']}")
            print(f"Keluhan: {r['keluhan']} | Diagnosa: {r['diagnosa']} | Tindakan: {r['tindakan']}")
            print("-" * 50)
    tekan_enter()

def cari_riwayat_pasien():
    clear_screen()
    cetak_garis()
    print(" RIWAYAT PASIEN ".center(50, " "))
    cetak_garis()
    keyword = input("Masukkan ID/Nama Pasien: ").lower()
    pasien_data = muat_data(PASIEN_FILE)
    cocok = [p for p in pasien_data if keyword in p['id'].lower() or keyword in p['nama'].lower()]
    if not cocok:
        print("Pasien tidak ditemukan.")
        tekan_enter()
        return

    pasien_id = cocok[0]['id']
    data = muat_data(REKAM_FILE)
    riwayat = [r for r in data if r['pasien_id'] == pasien_id]

    if not riwayat:
        print("Belum ada rekam medis untuk pasien ini.")
    else:
        print(f"Rekam medis untuk {cocok[0]['nama']} ({pasien_id}):")
        for r in riwayat:
            print(f"{r['tanggal']} | Dokter: {r['dokter_id']}")
            print(f"Keluhan: {r['keluhan']}")
            print(f"Diagnosa: {r['diagnosa']}")
            print(f"Tindakan: {r['tindakan']}")
            print("-" * 50)
    tekan_enter()

def menu_rekam_medis():
    while True:
        clear_screen()
        cetak_garis()
        print(" MENU REKAM MEDIS ".center(50, " "))
        cetak_garis()
        print("1. Tambah Rekam Medis")
        print("2. Lihat Semua Rekam Medis")
        print("3. Cari Riwayat Pasien")
        print("4. Kembali")
        cetak_garis()
        pilihan = input("Pilih menu: ")

        if pilihan == '1':
            tambah_rekam_medis()
        elif pilihan == '2':
            lihat_semua_rekam_medis()
        elif pilihan == '3':
            cari_riwayat_pasien()
        elif pilihan == '4':
            break
        else:
            print("Pilihan tidak valid.")
            tekan_enter()
# laporan.py
from file_handler import muat_data
from utils import clear_screen, tekan_enter, cetak_garis
from collections import Counter

PASIEN_FILE = 'data/pasien.csv'
DOKTER_FILE = 'data/dokter.csv'
REKAM_FILE = 'data/rekam_medis.csv'

def jumlah_pasien():
    data = muat_data(PASIEN_FILE)
    print(f"📋 Jumlah total pasien     : {len(data)}")

def jumlah_dokter():
    data = muat_data(DOKTER_FILE)
    print(f"👨‍⚕️ Jumlah total dokter     : {len(data)}")

def jumlah_rekam_medis():
    data = muat_data(REKAM_FILE)
    print(f"📝 Jumlah total rekam medis: {len(data)}")

def tindakan_terbanyak():
    data = muat_data(REKAM_FILE)
    tindakan_list = [r['tindakan'] for r in data if r['tindakan'].strip() != '']
    if tindakan_list:
        hitung = Counter(tindakan_list)
        paling_banyak = hitung.most_common(3)
        print("💉 Tindakan paling sering:")
        for tindakan, jumlah in paling_banyak:
            print(f"  - {tindakan}: {jumlah} kali")
    else:
        print("Belum ada tindakan yang tercatat.")

def laporan_ringkas():
    clear_screen()
    cetak_garis()
    print(" LAPORAN RINGKAS SISTEM ".center(50, " "))
    cetak_garis()
    jumlah_pasien()
    jumlah_dokter()
    jumlah_rekam_medis()
    tindakan_terbanyak()
    tekan_enter()

def menu_laporan():
    while True:
        clear_screen()
        cetak_garis()
        print(" MENU LAPORAN & STATISTIK ".center(50, " "))
        cetak_garis()
        print("1. Tampilkan Laporan Ringkas")
        print("2. Kembali")
        cetak_garis()
        pilihan = input("Pilih menu: ")

        if pilihan == '1':
            laporan_ringkas()
        elif pilihan == '2':
            break
        else:
            print("Pilihan tidak valid.")
            tekan_enter()
