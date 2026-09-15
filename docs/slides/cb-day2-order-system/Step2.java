import java.util.Scanner;

public class Step2 {
    public static void main(String[] args) throws Exception {
        // 陣列：把多筆商品資料暫時放在程式記憶體裡
        String[] products = { "cola", "sandwich", "chips", "cookie", "juice" };
        int[] prices = { 30, 65, 45, 35, 40 };

        int totalAmount = 0; // 總金額
        int orderCount = 0; // 買了幾個
        try (Scanner scanner = new Scanner(System.in)) {
            while (true) {
                System.out.println("商品列表：");
                for (int i = 0; i < products.length; i++) {
                    System.out.println((i + 1) + ". " + products[i] + " → " + prices[i] + " 元");
                }
                System.out.println("0. 結帳");
                System.out.print("請選擇商品編號：");
                int choice = scanner.nextInt();

                if (choice == 0) {
                    break; // 結帳跳出迴圈
                }

                if (choice >= 1 && choice <= products.length) {
                    System.out.print("買幾個？");
                    int quantity = scanner.nextInt();
                    int subtotal = prices[choice - 1] * quantity;
                    totalAmount += subtotal;
                    orderCount += quantity;
                }
            }
        }

        System.out.println("總共購買：" + orderCount + " 件");
        System.out.println("總金額：" + totalAmount + " 元");
    }
}
