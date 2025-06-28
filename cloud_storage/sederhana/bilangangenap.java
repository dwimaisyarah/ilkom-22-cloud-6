import java.util.ArrayList;
import java.util.Scanner;

public class BilanganGenap {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        ArrayList<Integer> bilanganGenap = new ArrayList<>();

        System.out.print("Masukkan jumlah bilangan: ");
        int n = scanner.nextInt();

        for (int i = 0; i < n; i++) {
            System.out.print("Masukkan bilangan ke-" + (i + 1) + ": ");
            int bilangan = scanner.nextInt();
            if (bilangan % 2 == 0) {
                bilanganGenap.add(bilangan);
            }
        }

        System.out.println("Bilangan genap yang dimasukkan: " + bilanganGenap);
        scanner.close();
    }
}
