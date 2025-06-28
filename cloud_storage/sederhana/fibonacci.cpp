#include <iostream>
using namespace std;

void cetakFibonacci(int n) {
    int t1 = 0, t2 = 1, nextTerm = 0;
    cout << "Deret Fibonacci: " << t1 << ", " << t2 << ", ";
    for (int i = 3; i <= n; ++i) {
        nextTerm = t1 + t2;
        cout << nextTerm << ", ";
        t1 = t2;
        t2 = nextTerm;
    }
}

int main() {
    int n;
    cout << "Masukkan jumlah bilangan Fibonacci yang ingin ditampilkan: ";
    cin >> n;
    cetakFibonacci(n);
    return 0;
}
