#include <iostream>
using namespace std;

void penjumlahanMatriks(int a[10][10], int b[10][10], int hasil[10][10], int baris, int kolom) {
    for (int i = 0; i < baris; i++)
        for (int j = 0; j < kolom; j++)
            hasil[i][j] = a[i][j] + b[i][j];
}

int main() {
    int a[10][10], b[10][10], hasil[10][10], baris, kolom;

    cout << "Masukkan jumlah baris: ";
    cin >> baris;
    cout << "Masukkan jumlah kolom: ";
    cin >> kolom;

    cout << "Masukkan elemen matriks A:\n";
    for (int i = 0; i < baris; i++)
        for (int j = 0; j < kolom; j++)
            cin >> a[i][j];

    cout << "Masukkan elemen matriks B:\n";
    for (int i = 0; i < baris; i++)
        for (int j = 0; j < kolom; j++)
            cin >> b[i][j];

    penjumlahanMatriks(a, b, hasil, baris, kolom);

    cout << "Hasil Penjumlahan Matriks:\n";
    for (int i = 0; i < baris; i++) {
        for (int j = 0; j < kolom; j++)
            cout << hasil[i][j] << " ";
        cout << endl;
    }

    return 0;
}
