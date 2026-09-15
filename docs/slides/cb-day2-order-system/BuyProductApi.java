import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.HashMap;
import java.util.Map;

public class BuyProductApi {
    private static final String DATABASE_URL = "jdbc:sqlite:products.db";

    public static void main(String[] args) throws Exception {
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
        server.createContext("/", BuyProductApi::serveFrontend);
        server.createContext("/api/products", BuyProductApi::handleProducts);
        server.createContext("/api/buy", BuyProductApi::handleBuy);
        server.start();

        System.out.println("購物前端：http://localhost:8080");
    }

    private static void serveFrontend(HttpExchange exchange) throws IOException {
        if (!exchange.getRequestMethod().equals("GET")
                || !exchange.getRequestURI().getPath().equals("/")) {
            sendJson(exchange, 404, "{\"error\":\"找不到頁面\"}");
            return;
        }

        byte[] content = Files.readAllBytes(Path.of("shop.html"));
        exchange.getResponseHeaders().set("Content-Type", "text/html; charset=UTF-8");
        exchange.sendResponseHeaders(200, content.length);
        try (OutputStream output = exchange.getResponseBody()) {
            output.write(content);
        }
    }

    private static void handleProducts(HttpExchange exchange) throws IOException {
        if (!exchange.getRequestMethod().equals("GET")) {
            sendJson(exchange, 405, "{\"error\":\"只允許 GET\"}");
            return;
        }

        StringBuilder json = new StringBuilder("[");
        try (Connection connection = DriverManager.getConnection(DATABASE_URL);
                PreparedStatement statement = connection.prepareStatement(
                        "SELECT id, name, price, stock FROM products ORDER BY id");
                ResultSet result = statement.executeQuery()) {
            while (result.next()) {
                if (json.length() > 1) {
                    json.append(',');
                }
                json.append("{\"id\":").append(result.getInt("id"))
                        .append(",\"name\":\"").append(jsonEscape(result.getString("name")))
                        .append("\",\"price\":").append(result.getInt("price"))
                        .append(",\"stock\":").append(result.getInt("stock"))
                        .append('}');
            }
            json.append(']');
            sendJson(exchange, 200, json.toString());
        } catch (Exception exception) {
            sendJson(exchange, 500, "{\"error\":\"讀取商品失敗\"}");
        }
    }

    private static void handleBuy(HttpExchange exchange) throws IOException {
        if (!exchange.getRequestMethod().equals("POST")) {
            sendJson(exchange, 405, "{\"error\":\"只允許 POST\"}");
            return;
        }

        try {
            String body = new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
            Map<String, String> form = parseForm(body);
            int productId = Integer.parseInt(form.getOrDefault("productId", "0"));
            int quantity = Integer.parseInt(form.getOrDefault("quantity", "0"));
            if (productId <= 0 || quantity <= 0) {
                sendJson(exchange, 400, "{\"error\":\"商品與數量必須是正整數\"}");
                return;
            }

            String updateSql = "UPDATE products SET stock = stock - ? "
                    + "WHERE id = ? AND stock >= ?";
            try (Connection connection = DriverManager.getConnection(DATABASE_URL);
                    PreparedStatement statement = connection.prepareStatement(updateSql)) {
                statement.setInt(1, quantity);
                statement.setInt(2, productId);
                statement.setInt(3, quantity);

                if (statement.executeUpdate() != 1) {
                    sendJson(exchange, 409, "{\"error\":\"庫存不足或找不到商品\"}");
                    return;
                }
            }
            sendJson(exchange, 200, "{\"message\":\"購買成功\"}");
        } catch (NumberFormatException exception) {
            sendJson(exchange, 400, "{\"error\":\"商品與數量格式錯誤\"}");
        } catch (Exception exception) {
            sendJson(exchange, 500, "{\"error\":\"購買失敗\"}");
        }
    }

    private static Map<String, String> parseForm(String body) {
        Map<String, String> form = new HashMap<>();
        for (String pair : body.split("&")) {
            String[] parts = pair.split("=", 2);
            if (parts.length == 2) {
                form.put(URLDecoder.decode(parts[0], StandardCharsets.UTF_8),
                        URLDecoder.decode(parts[1], StandardCharsets.UTF_8));
            }
        }
        return form;
    }

    private static String jsonEscape(String value) {
        return value.replace("\\", "\\\\").replace("\"", "\\\"");
    }

    private static void sendJson(HttpExchange exchange, int status, String body) throws IOException {
        byte[] content = body.getBytes(StandardCharsets.UTF_8);
        exchange.getResponseHeaders().set("Content-Type", "application/json; charset=UTF-8");
        exchange.sendResponseHeaders(status, content.length);
        try (OutputStream output = exchange.getResponseBody()) {
            output.write(content);
        }
    }
}
