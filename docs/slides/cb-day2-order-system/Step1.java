import java.util.Scanner;

public class Step1 {
    public static void main(String[] args) throws Exception {
        // 陣列：把多筆商品資料暫時放在程式記憶體裡
        String[] products = {"cola", "sandwich", "chips", "cookie", "juice"};
        int[] prices = {30, 65, 45, 35, 40};

        // 印出商品選單
        for (int i = 0; i < products.length; i++) {
            System.out.println((i + 1) + ". " + products[i] + " → " + prices[i] + " 元");
        }

        // 讓使用者選購
        Scanner scanner = new Scanner(System.in);
        System.out.print("請輸入想買的商品編號 (1-" + products.length + ")：");
        int choice = scanner.nextInt();

        System.out.println("你選擇了：" + products[choice - 1]);
        System.out.println("價格：" + prices[choice - 1] + " 元");
    }
}
