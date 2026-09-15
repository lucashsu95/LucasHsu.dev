import java.util.Scanner;

public class BuyProductArray {
    public static void main(String[] args) {
        String[] products = { "cola", "sandwich", "chips", "cookie", "juice" };
        int[] prices = { 30, 65, 45, 35, 40 };
        int[] stock = { 10, 5, 8, 12, 7 };

        try (Scanner scanner = new Scanner(System.in)) {
            while (true) {
                printProducts(products, prices, stock);

                System.out.print("請輸入商品編號（輸入 0 結束）：");
                int productIndex = scanner.nextInt() - 1;
                if (productIndex == -1) {
                    System.out.println("謝謝光臨！");
                    break;
                }

                if (productIndex < 0 || productIndex >= products.length) {
                    System.out.println("找不到這個商品");
                    continue;
                }

                System.out.print("請輸入購買數量：");
                int quantity = scanner.nextInt();
                if (quantity <= 0) {
                    System.out.println("購買數量必須大於 0");
                } else if (quantity > stock[productIndex]) {
                    System.out.println("購買失敗：庫存不足");
                } else {
                    stock[productIndex] -= quantity;
                    System.out.println("購買成功！");
                    System.out.println("商品：" + products[productIndex]);
                    System.out.println("價格：" + prices[productIndex]);
                    System.out.println("剩餘庫存：" + stock[productIndex]);
                }
            }
        }
    }

    private static void printProducts(String[] products, int[] prices, int[] stock) {
        System.out.println("\n===== 商品列表 =====");
        for (int index = 0; index < products.length; index++) {
            System.out.printf("%d. %s｜%d 元｜庫存 %d 件%n",
                    index + 1, products[index], prices[index], stock[index]);
        }
    }
}
