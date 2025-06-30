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
# file_handler.py
# Modul bantu untuk menyimpan dan memuat file CSV

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
# utils.py
# Fungsi utilitas

import os

def clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')
# menu.py
from buku import menu_buku
from anggota import menu_anggota
from peminjaman import menu_peminjaman, menu_pengembalian
from utils import clear_screen

def tampilkan_menu():
    while True:
        clear_screen()
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
            break
        else:
            print("Pilihan tidak valid!")
# fungsi_tambahan.py
# Fungsi-fungsi tambahan untuk memperkaya sistem perpustakaan

from file_handler import muat_data, simpan_data
from buku import BUKU_FILE
from anggota import ANGGOTA_FILE
from peminjaman import PEMINJAMAN_FILE

def cari_buku_berdasarkan_judul():
    print("\n== Cari Buku Berdasarkan Judul ==")
    keyword = input("Masukkan kata kunci judul: ").lower()
    data = muat_data(BUKU_FILE)
    hasil = [b for b in data if keyword in b['judul'].lower()]
    if hasil:
        for b in hasil:
            print(f"{b['id']} | {b['judul']} | {b['penulis']} | Stok: {b['stok']}")
    else:
        print("Tidak ditemukan buku dengan judul tersebut.")

def cari_anggota_berdasarkan_nama():
    print("\n== Cari Anggota Berdasarkan Nama ==")
    keyword = input("Masukkan nama anggota: ").lower()
    data = muat_data(ANGGOTA_FILE)
    hasil = [a for a in data if keyword in a['nama'].lower()]
    if hasil:
        for a in hasil:
            print(f"{a['id']} | {a['nama']} | {a['alamat']} | {a['no_hp']}")
    else:
        print("Tidak ditemukan anggota.")

def daftar_peminjaman_aktif():
    print("\n== Daftar Peminjaman Aktif ==")
    data = muat_data(PEMINJAMAN_FILE)
    aktif = [p for p in data if p['status'] == 'dipinjam']
    if aktif:
        for p in aktif:
            print(f"ID: {p['id']}, Anggota: {p['anggota_id']}, Buku: {p['buku_id']}, Tgl Pinjam: {p['tanggal_pinjam']}")
    else:
        print("Tidak ada peminjaman aktif.")

def jumlah_total_buku():
    data = muat_data(BUKU_FILE)
    total = sum(int(b['stok']) for b in data)
    print(f"Total stok semua buku: {total}")

def jumlah_total_anggota():
    data = muat_data(ANGGOTA_FILE)
    print(f"Total anggota terdaftar: {len(data)}")

def statistik_peminjaman():
    print("\n== Statistik Peminjaman ==")
    data = muat_data(PEMINJAMAN_FILE)
    total = len(data)
    aktif = len([p for p in data if p['status'] == 'dipinjam'])
    kembali = total - aktif
    print(f"Total peminjaman: {total}")
    print(f"Masih dipinjam: {aktif}")
    print(f"Sudah dikembalikan: {kembali}")
