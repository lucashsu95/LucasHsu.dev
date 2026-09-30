import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;
import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 這支程式示範「框架之前」你必須自己寫的東西。
 *
 * JDK 內建 com.sun.net.httpserver.HttpServer，沒有任何外部套件。
 * 開箱即用，是理解「框架到底幫你做了什麼」最好的起點。
 *
 * 執行：
 *   javac NativeApiServer.java
 *   java NativeApiServer
 *   然後用瀏覽器開 http://localhost:8080
 */
public class NativeApiServer {

    /** 這就是「port 號」：同一台機器上，用數字區分不同服務的門牌。 */
    private static final int PORT = 8080;

    /** 記憶體裡的商品清單，程式關閉就消失（Day2 用的是資料庫，現在先專注在 HTTP）。 */
    private static final List<String[]> PRODUCTS = new ArrayList<>();

    static {
        // 欄位順序：id, name, price, stock
        PRODUCTS.add(new String[] { "1", "珍珠奶茶", "65", "12" });
        PRODUCTS.add(new String[] { "2", "鹽酥雞", "90", "8" });
        PRODUCTS.add(new String[] { "3", "滷肉飯", "75", "20" });
        PRODUCTS.add(new String[] { "4", "冰美式", "55", "0" });
        PRODUCTS.add(new String[] { "5", "小籠包", "60", "15" });
    }

    public static void main(String[] args) throws Exception {
        // 綁定 port：指定「門牌號碼」。已被占用時這裡會丟出 EADDRINUSE。
        HttpServer server = HttpServer.create(new InetSocketAddress(PORT), 0);

        // 每個 path 綁一個處理器。這些「路由」是框架之後會幫你自動產生的東西。
        server.createContext("/api/products", NativeApiServer::handleProducts);
        server.createContext("/api/buy", NativeApiServer::handleBuy);
        // 把 shop.html 也送出去：讓同一個 port 同時提供「前端頁面」與「後端 API」。
        server.createContext("/", NativeApiServer::serveFrontend);

        server.start();

        System.out.println("後端已啟動：http://localhost:" + PORT);
        System.out.println("  瀏覽器前端  http://localhost:" + PORT + "/");
        System.out.println("  GET  /api/products   讀取商品清單");
        System.out.println("  POST /api/buy        送出訂單（productId=1&quantity=2）");
    }

    /**
     * GET / → 回傳 shop.html。
     * 原生版連「送靜態檔」都要自己寫：判斷路徑、讀檔、設 Content-Type、
     * 呼叫 sendResponseHeaders、再寫進 OutputStream，而且必須記得 close()。
     * Spring Boot 裡這整段是零行程式碼。
     */
    private static void serveFrontend(HttpExchange exchange) throws IOException {
        String path = exchange.getRequestURI().getPath();
        if (!"GET".equals(exchange.getRequestMethod()) || !"/".equals(path)) {
            sendJson(exchange, 404, "{\"error\":\"找不到頁面\"}");
            return;
        }

        File page = new File("shop.html");
        if (!page.exists()) {
            sendJson(exchange, 404, "{\"error\":\"請把 shop.html 放在同資料夾\"}");
            return;
        }

        byte[] content = Files.readAllBytes(page.toPath());
        exchange.getResponseHeaders().set("Content-Type", "text/html; charset=UTF-8");
        exchange.sendResponseHeaders(200, content.length);
        try (OutputStream output = exchange.getResponseBody()) {
            output.write(content);
        }
    }

    /** GET /api/products → 回傳商品陣列 */
    private static void handleProducts(HttpExchange exchange) throws IOException {
        if (!"GET".equals(exchange.getRequestMethod())) {
            sendJson(exchange, 405, "{\"error\":\"只允許 GET\"}");
            return;
        }

        try {
            // 手刻 JSON：框架會用自動序列化取代這段
            StringBuilder json = new StringBuilder("[");
            synchronized (PRODUCTS) {
                for (int i = 0; i < PRODUCTS.size(); i++) {
                    String[] p = PRODUCTS.get(i);
                    if (i > 0) {
                        json.append(',');
                    }
                    json.append("{\"id\":").append(p[0])
                            .append(",\"name\":\"").append(jsonEscape(p[1]))
                            .append("\",\"price\":").append(p[2])
                            .append(",\"stock\":").append(p[3])
                            .append('}');
                }
            }
            json.append(']');
            sendJson(exchange, 200, json.toString());
        } catch (Exception e) {
            sendJson(exchange, 500, "{\"error\":\"讀取商品失敗\"}");
        }
    }

    /** POST /api/buy → 扣庫存，回傳 200 / 400 / 409 / 405 / 500 */
    private static void handleBuy(HttpExchange exchange) throws IOException {
        if (!"POST".equals(exchange.getRequestMethod())) {
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

            synchronized (PRODUCTS) {
                if (productId > PRODUCTS.size()) {
                    sendJson(exchange, 400, "{\"error\":\"找不到這筆商品\"}");
                    return;
                }

                String[] product = PRODUCTS.get(productId - 1);
                int stock = Integer.parseInt(product[3]);

                if (stock < quantity) {
                    // 409 Conflict：請求合法，但跟資源現況衝突。框架不會幫你判斷。
                    sendJson(exchange, 409, "{\"error\":\"庫存不足，剩餘 " + stock + " 件\"}");
                    return;
                }

                product[3] = String.valueOf(stock - quantity);
            }

            sendJson(exchange, 200, "{\"message\":\"購買成功\"}");

        } catch (NumberFormatException e) {
            sendJson(exchange, 400, "{\"error\":\"商品與數量格式錯誤\"}");
        } catch (Exception e) {
            sendJson(exchange, 500, "{\"error\":\"購買失敗\"}");
        }
    }

    /** 解析 application/x-www-form-urlencoded 格式的 body */
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

    /** 統一回應：設定 Content-Type、狀態碼、body */
    private static void sendJson(HttpExchange exchange, int status, String body) throws IOException {
        byte[] content = body.getBytes(StandardCharsets.UTF_8);
        exchange.getResponseHeaders().set("Content-Type", "application/json; charset=UTF-8");
        exchange.sendResponseHeaders(status, content.length);
        try (OutputStream output = exchange.getResponseBody()) {
            output.write(content);
        }
    }
}
