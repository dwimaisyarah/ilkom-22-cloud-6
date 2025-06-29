import java.util.Scanner;

public class PenukaranBilangan {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Masukkan bilangan pertama: ");
        int a = scanner.nextInt();
        System.out.print("Masukkan bilangan kedua: ");
        int b = scanner.nextInt();

        System.out.println("Sebelum penukaran: a = " + a + ", b = " + b);
        int temp = a;
        a = b;
        b = temp;
        System.out.println("Setelah penukaran: a = " + a + ", b = " + b);
        
        scanner.close();
    }
}
