def cari_elemen(lst, elemen):
    return elemen in lst

def main():
    lst = [1, 2, 3, 4, 5]
    elemen = int(input("Masukkan elemen yang dicari: "))
    if cari_elemen(lst, elemen):
        print(f"{elemen} ditemukan dalam list.")
    else:
        print(f"{elemen} tidak ditemukan dalam list.")

if __name__ == "__main__":
    main()
