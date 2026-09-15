import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Scanner;

public class BuyProduct {
    public static void main(String[] args) throws Exception {
        initializeDatabase();

        try (Connection connection = DriverManager.getConnection("jdbc:sqlite:products.db");
                Scanner scanner = new Scanner(System.in)) {
            while (true) {
                printProducts(connection);

                System.out.print("請輸入商品 id（輸入 0 結束）：");
                int productId = scanner.nextInt();
                if (productId == 0) {
                    System.out.println("謝謝光臨！");
                    break;
                }

                System.out.print("請輸入購買數量：");
                int quantity = scanner.nextInt();
                buyProduct(connection, productId, quantity);
            }
        }
    }

    private static void printProducts(Connection connection) throws Exception {
        String querySql = "SELECT id, name, price, stock FROM products ORDER BY id";
        try (PreparedStatement statement = connection.prepareStatement(querySql);
                ResultSet result = statement.executeQuery()) {
            System.out.println("\n===== 商品列表 =====");
            while (result.next()) {
                System.out.printf("%d. %s｜%d 元｜庫存 %d 件%n",
                        result.getInt("id"),
                        result.getString("name"),
                        result.getInt("price"),
                        result.getInt("stock"));
            }
        }
    }

    private static void buyProduct(Connection connection, int productId, int quantity)
            throws Exception {
        if (quantity <= 0) {
            System.out.println("購買數量必須大於 0");
            return;
        }

        String updateSql = "UPDATE products "
                + "SET stock = stock - ? "
                + "WHERE id = ? AND stock >= ?";
        try (PreparedStatement statement = connection.prepareStatement(updateSql)) {
            statement.setInt(1, quantity);
            statement.setInt(2, productId);
            statement.setInt(3, quantity);

            if (statement.executeUpdate() == 1) {
                System.out.println("購買成功！");
                printProduct(connection, productId);
            } else {
                System.out.println("購買失敗：庫存不足或找不到商品");
            }
        }
    }

    private static void printProduct(Connection connection, int productId) throws Exception {
        String querySql = "SELECT name, price, stock FROM products WHERE id = ?";
        try (PreparedStatement statement = connection.prepareStatement(querySql)) {
            statement.setInt(1, productId);
            try (ResultSet result = statement.executeQuery()) {
                if (result.next()) {
                    System.out.println("商品：" + result.getString("name"));
                    System.out.println("價格：" + result.getInt("price"));
                    System.out.println("剩餘庫存：" + result.getInt("stock"));
                }
            }
        }
    }

    private static void initializeDatabase() throws Exception {
        try (Connection connection = DriverManager.getConnection("jdbc:sqlite:products.db")) {
            String createTableSql = "CREATE TABLE IF NOT EXISTS products ("
                    + "id INTEGER PRIMARY KEY, "
                    + "name TEXT NOT NULL, "
                    + "price INTEGER NOT NULL, "
                    + "stock INTEGER NOT NULL)";

            try (PreparedStatement statement = connection.prepareStatement(createTableSql)) {
                statement.executeUpdate();
            }

            String countSql = "SELECT COUNT(*) FROM products";
            try (PreparedStatement statement = connection.prepareStatement(countSql);
                    ResultSet result = statement.executeQuery()) {
                if (result.next() && result.getInt(1) == 0) {
                    String insertSql = "INSERT INTO products (name, price, stock) VALUES (?, ?, ?)";
                    try (PreparedStatement insert = connection.prepareStatement(insertSql)) {
                        String[][] products = {
                                { "cola", "30", "10" },
                                { "sandwich", "65", "5" },
                                { "chips", "45", "8" },
                                { "cookie", "35", "12" },
                                { "juice", "40", "7" }
                        };
                        for (String[] product : products) {
                            insert.setString(1, product[0]);
                            insert.setInt(2, Integer.parseInt(product[1]));
                            insert.setInt(3, Integer.parseInt(product[2]));
                            insert.addBatch();
                        }
                        insert.executeBatch();
                    }
                }
            }
        }
    }
}
