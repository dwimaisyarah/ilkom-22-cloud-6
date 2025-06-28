import java.util.ArrayList;
import java.util.Scanner;

class Siswa {
    String nama;
    int usia;

    Siswa(String nama, int usia) {
        this.nama = nama;
        this.usia = usia;
    }

    @Override
    public String toString() {
        return "Nama: " + nama + ", Usia: " + usia;
    }
}

class PengelolaanSiswa {
    ArrayList<Siswa> daftarSiswa = new ArrayList<>();

    void tambahSiswa(Siswa siswa) {
        daftarSiswa.add(siswa);
        System.out.println("Siswa telah ditambahkan: " + siswa);
    }

    void tampilkanSiswa() {
        System.out.println("Daftar Siswa:");
        for (Siswa siswa : daftarSiswa) {
            System.out.println(siswa);
        }
    }

    void cariSiswa(String nama) {
        for (Siswa siswa : daftarSiswa) {
            if (siswa.nama.equalsIgnoreCase(nama)) {
                System.out.println("Ditemukan: " + siswa);
                return;
            }
        }
        System.out.println("Siswa tidak ditemukan.");
    }
}

public class PengelolaanSiswa {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        PengelolaanSiswa pengelolaan = new PengelolaanSiswa();

        while (true) {
            System.out.println("\n1. Tambah Siswa");
            System.out.println("2. Tampilkan Siswa");
            System.out.println("3. Cari Siswa");
            System.out.println("4. Keluar");
            System.out.print("Pilih opsi: ");
            int pilihan = scanner.nextInt();
            scanner.nextLine(); // membersihkan buffer

            if (pilihan == 1) {
                System.out.print("Masukkan nama siswa: ");
                String nama = scanner.nextLine();
                System.out.print("Masukkan usia siswa: ");
                int usia = scanner.nextInt();
                pengelolaan.tambahSiswa(new Siswa(nama, usia));
            } else if (pilihan == 2) {
                pengelolaan.tampilkanSiswa();
            } else if (pilihan == 3) {
                System.out.print("Masukkan nama siswa yang dicari: ");
                String nama = scanner.nextLine();
                pengelolaan.cariSiswa(nama);
            } else if (pilihan == 4) {
                System.out.println("Keluar dari program.");
                break;
            } else {
                System.out.println("Pilihan tidak valid.");
            }
        }
        scanner.close();
    }
}
