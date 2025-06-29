import java.util.Scanner;

public class KonversiAngka {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Masukkan angka (1-10): ");
        int angka = scanner.nextInt();
        
        switch (angka) {
            case 1: System.out.println("Satu"); break;
            case 2: System.out.println("Dua"); break;
            case 3: System.out.println("Tiga"); break;
            case 4: System.out.println("Empat"); break;
            case 5: System.out.println("Lima"); break;
            case 6: System.out.println("Enam"); break;
            case 7: System.out.println("Tujuh"); break;
            case 8: System.out.println("Delapan"); break;
            case 9: System.out.println("Sembilan"); break;
            case 10: System.out.println("Sepuluh"); break;
            default: System.out.println("Angka tidak valid.");
        }
        scanner.close();
    }
}
