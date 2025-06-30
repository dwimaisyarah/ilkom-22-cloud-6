# main.py
"""
Program Utama CLI Sistem Perpustakaan
"""

from menu import tampilkan_menu

def main():
    while True:
        tampilkan_menu()

if __name__ == "__main__":
    main()
# menu.py
from buku import *
from anggota import *
from peminjaman import *
from utils import clear_screen

def tampilkan_menu():
    print("="*40)
    print(" SISTEM PERPUSTAKAAN ".center(40, "="))
    print("1. Kelola Buku")
    print("2. Kelola Anggota")
    print("3. Peminjaman Buku")
    print("4. Pengembalian Buku")
    print("5. Keluar")
    print("="*40)
    pilihan = input("Masukkan pilihan: ")

    if pilihan == "1":
        menu_buku()
    elif pilihan == "2":
        menu_anggota()
    elif pilihan == "3":
        menu_peminjaman()
    elif pilihan == "4":
        menu_pengembalian()
    elif pilihan == "5":
        print("Terima kasih telah menggunakan sistem ini.")
        exit()
    else:
        print("Pilihan tidak valid!")
# anggota.py
# Modul untuk mengelola data anggota perpustakaan

import csv
from file_handler import simpan_data, muat_data

ANGGOTA_FILE = 'data/anggota.csv'

def tambah_anggota():
    print("\n== Tambah Anggota Baru ==")
    nama = input("Nama: ")
    alamat = input("Alamat: ")
    no_hp = input("No HP: ")

    anggota_baru = {
        "id": generate_id(),
        "nama": nama,
        "alamat": alamat,
        "no_hp": no_hp
    }

    data = muat_data(ANGGOTA_FILE)
    data.append(anggota_baru)
    simpan_data(ANGGOTA_FILE, data)
    print("Anggota berhasil ditambahkan.")

def tampilkan_anggota():
    print("\n== Daftar Anggota ==")
    data = muat_data(ANGGOTA_FILE)
    for anggota in data:
        print(f"{anggota['id']} | {anggota['nama']} | {anggota['alamat']} | {anggota['no_hp']}")

def generate_id():
    import uuid
    return str(uuid.uuid4())[:8]

def menu_anggota():
    while True:
        print("\n--- Menu Anggota ---")
        print("1. Tambah Anggota")
        print("2. Lihat Daftar Anggota")
        print("3. Kembali")
        pilihan = input("Pilih: ")
        if pilihan == '1':
            tambah_anggota()
        elif pilihan == '2':
            tampilkan_anggota()
        elif pilihan == '3':
            break
        else:
            print("Pilihan tidak valid.")
# buku.py
# Modul untuk mengelola data buku perpustakaan

import csv
from file_handler import simpan_data, muat_data

BUKU_FILE = 'data/buku.csv'

def tambah_buku():
    print("\n== Tambah Buku Baru ==")
    judul = input("Judul: ")
    penulis = input("Penulis: ")
    stok = input("Stok: ")

    buku_baru = {
        "id": generate_id(),
        "judul": judul,
        "penulis": penulis,
        "stok": stok
    }

    data = muat_data(BUKU_FILE)
    data.append(buku_baru)
    simpan_data(BUKU_FILE, data)
    print("Buku berhasil ditambahkan.")

def tampilkan_buku():
    print("\n== Daftar Buku ==")
    data = muat_data(BUKU_FILE)
    for buku in data:
        print(f"{buku['id']} | {buku['judul']} | {buku['penulis']} | Stok: {buku['stok']}")

def generate_id():
    import uuid
    return str(uuid.uuid4())[:8]

def menu_buku():
    while True:
        print("\n--- Menu Buku ---")
        print("1. Tambah Buku")
        print("2. Lihat Daftar Buku")
        print("3. Kembali")
        pilihan = input("Pilih: ")
        if pilihan == '1':
            tambah_buku()
        elif pilihan == '2':
            tampilkan_buku()
        elif pilihan == '3':
            break
        else:
            print("Pilihan tidak valid.")
# peminjaman.py
# Modul peminjaman dan pengembalian buku

from file_handler import muat_data, simpan_data
from buku import BUKU_FILE
from anggota import ANGGOTA_FILE
import datetime

PEMINJAMAN_FILE = 'data/peminjaman.csv'

def menu_peminjaman():
    print("\n== Peminjaman Buku ==")
    anggota_id = input("ID Anggota: ")
    buku_id = input("ID Buku: ")
    tanggal_pinjam = str(datetime.date.today())
    tanggal_kembali = str(datetime.date.today() + datetime.timedelta(days=7))

    pinjaman = {
        "id": generate_id(),
        "anggota_id": anggota_id,
        "buku_id": buku_id,
        "tanggal_pinjam": tanggal_pinjam,
        "tanggal_kembali": tanggal_kembali,
        "status": "dipinjam"
    }

    data = muat_data(PEMINJAMAN_FILE)
    data.append(pinjaman)
    simpan_data(PEMINJAMAN_FILE, data)
    print("Peminjaman berhasil dicatat.")

def menu_pengembalian():
    print("\n== Pengembalian Buku ==")
    id_peminjaman = input("ID Peminjaman: ")
    data = muat_data(PEMINJAMAN_FILE)
    ditemukan = False
    for p in data:
        if p['id'] == id_peminjaman and p['status'] == 'dipinjam':
            p['status'] = 'dikembalikan'
            ditemukan = True
            break
    if ditemukan:
        simpan_data(PEMINJAMAN_FILE, data)
        print("Buku berhasil dikembalikan.")
    else:
        print("Peminjaman tidak ditemukan atau sudah dikembalikan.")

def generate_id():
    import uuid
    return str(uuid.uuid4())[:8]
# peminjaman.py
# Modul peminjaman dan pengembalian buku

from file_handler import muat_data, simpan_data
from buku import BUKU_FILE
from anggota import ANGGOTA_FILE
import datetime

PEMINJAMAN_FILE = 'data/peminjaman.csv'

def menu_peminjaman():
    print("\n== Peminjaman Buku ==")
    anggota_id = input("ID Anggota: ")
    buku_id = input("ID Buku: ")
    tanggal_pinjam = str(datetime.date.today())
    tanggal_kembali = str(datetime.date.today() + datetime.timedelta(days=7))

    pinjaman = {
        "id": generate_id(),
        "anggota_id": anggota_id,
        "buku_id": buku_id,
        "tanggal_pinjam": tanggal_pinjam,
        "tanggal_kembali": tanggal_kembali,
        "status": "dipinjam"
    }

    data = muat_data(PEMINJAMAN_FILE)
    data.append(pinjaman)
    simpan_data(PEMINJAMAN_FILE, data)
    print("Peminjaman berhasil dicatat.")

def menu_pengembalian():
    print("\n== Pengembalian Buku ==")
    id_peminjaman = input("ID Peminjaman: ")
    data = muat_data(PEMINJAMAN_FILE)
    ditemukan = False
    for p in data:
        if p['id'] == id_peminjaman and p['status'] == 'dipinjam':
            p['status'] = 'dikembalikan'
            ditemukan = True
            break
    if ditemukan:
        simpan_data(PEMINJAMAN_FILE, data)
        print("Buku berhasil dikembalikan.")
    else:
        print("Peminjaman tidak ditemukan atau sudah dikembalikan.")

def generate_id():
    import uuid
    return str(uuid.uuid4())[:8]
