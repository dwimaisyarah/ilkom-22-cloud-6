#include <iostream>
#include <vector>
using namespace std;

class Nilai {
private:
    vector<int> nilai_list;

public:
    void tambahNilai(int nilai) {
        nilai_list.push_back(nilai);
    }

    double hitungRataRata() {
        if (nilai_list.empty()) return 0;
        int total = 0;
        for (int n : nilai_list) {
            total += n;
        }
        return static_cast<double>(total) / nilai_list.size();
    }

    void tampilkanNilai() {
        cout << "Nilai yang dimasukkan: ";
        for (int n : nilai_list) {
            cout << n << " ";
        }
        cout << endl;
    }
};

int main() {
    Nilai nilai;
    int input;

    while (true) {
        cout << "Masukkan nilai (masukkan -1 untuk berhenti): ";
        cin >> input;
        if (input == -1) break;
        nilai.tambahNilai(input);
    }

    nilai.tampilkanNilai();
    cout << "Rata-rata nilai: " << nilai.hitungRataRata() << endl;

    return 0;
}
