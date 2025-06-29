#include <iostream>
using namespace std;

class Kalkulator {
public:
    void tambah(double a, double b) {
        cout << "Hasil: " << a + b << endl;
    }

    void kurang(double a, double b) {
        cout << "Hasil: " << a - b << endl;
    }

    void kali(double a, double b) {
        cout << "Hasil: " << a * b << endl;
    }

    void bagi(double a, double b) {
        if (b != 0)
            cout << "Hasil: " << a / b << endl;
        else
            cout << "Error: Pembagian dengan nol!" << endl;
    }
};

int main() {
    Kalkulator kalkulator;
    double a, b;
    int pilihan;

    while (true) {
        cout << "\n1. Tambah\n2. Kurang\n3. Kali\n4. Bagi\n5. Keluar\n";
        cout << "Pilih operasi: ";
        cin >> pilihan;

        if (pilihan == 5) {
            cout << "Keluar dari program." << endl;
            break;
        }

        cout << "Masukkan dua angka: ";
        cin >> a >> b;

        switch (pilihan) {
            case 1:
                kalkulator.tambah(a, b);
                break;
            case 2:
                kalkulator.kurang(a, b);
                break;
            case 3:
                kalkulator.kali(a, b);
                break;
            case 4:
                kalkulator.bagi(a, b);
                break;
            default:
                cout << "Pilihan tidak valid." << endl;
        }
    }

    return 0;
}
