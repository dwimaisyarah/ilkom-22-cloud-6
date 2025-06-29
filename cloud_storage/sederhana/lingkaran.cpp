#include <iostream>
#include <cmath>
using namespace std;

class Lingkaran {
private:
    double radius;

public:
    Lingkaran(double r) : radius(r) {}

    double hitungLuas() {
        return M_PI * radius * radius;
    }

    double hitungKeliling() {
        return 2 * M_PI * radius;
    }
};

int main() {
    double r;
    cout << "Masukkan jari-jari lingkaran: ";
    cin >> r;

    Lingkaran lingkaran(r);
    cout << "Luas: " << lingkaran.hitungLuas() << endl;
    cout << "Keliling: " << lingkaran.hitungKeliling() << endl;

    return 0;
}
