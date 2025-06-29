import java.util.ArrayList;
import java.util.Scanner;

class Buku {
    String judul;
    String penulis;

    Buku(String judul, String penulis) {
        this.judul = judul;
        this.penulis = penulis;
    }

    @Override
    public String toString() {
        return "Judul: " + judul + ", Penulis: " + penulis;
    }
}

class Perpustakaan {
    ArrayList<Buku> koleksi = new ArrayList<>();

    void tambahBuku(Buku buku) {
        koleksi.add(buku);
        System.out.println("Buku telah ditambahkan: " + buku);
    }

    void tampilkanKoleksi() {
        System.out.println("Koleksi Buku:");
        for (Buku buku : koleksi) {
            System.out.println(buku);
        }
    }
}

public class Perpustakaan {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Perpustakaan perpustakaan = new Perpustakaan();

        while (true) {
            System.out.println("\n1. Tambah Buku");
            System.out.println("2. Tampilkan Koleksi");
            System.out.println("3. Keluar");
            System.out.print("Pilih opsi: ");
            int pilihan = scanner.nextInt();
            scanner.nextLine(); // membersihkan buffer

            if (pilihan == 1) {
                System.out.print("Masukkan judul buku: ");
                String judul = scanner.nextLine();
                System.out.print("Masukkan penulis buku: ");
                String penulis = scanner.nextLine();
                perpustakaan.tambahBuku(new Buku(judul, penulis));
            } else if (pilihan == 2) {
                perpustakaan.tampilkanKoleksi();
            } else if (pilihan == 3) {
                System.out.println("Keluar dari program.");
                break;
            } else {
                System.out.println("Pilihan tidak valid.");
            }
        }
        scanner.close();
    }
}
