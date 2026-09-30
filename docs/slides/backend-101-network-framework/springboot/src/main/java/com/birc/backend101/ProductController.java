package com.birc.backend101;

import java.util.ArrayList;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 和 NativeApiServer 走「完全相同的 API」：
 *   GET  /api/products
 *   POST /api/buy     body: {"productId":1,"quantity":2}
 *
 * 差別在於：這個類別沒有 import 任何 HttpServer、HttpExchange、OutputStream，
 * 沒有 main，沒有手刻 JSON，也沒有手動 sendResponseHeaders。
 * 那些是框架的內建機制，這裡只留下「你的商業邏輯」。
 */
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ProductController {

    private final List<Product> products = new ArrayList<>(List.of(
            new Product(1, "珍珠奶茶", 65, 12),
            new Product(2, "鹽酥雞", 90, 8),
            new Product(3, "滷肉飯", 75, 20),
            new Product(4, "冰美式", 55, 0),
            new Product(5, "小籠包", 60, 15)));

    @GetMapping("/products")
    public List<Product> products() {
        return products;
    }

    @PostMapping("/buy")
    public synchronized ResponseEntity<?> buy(@RequestBody BuyRequest request) {
        int id = request.productId();
        int quantity = request.quantity();

        if (id < 1 || id > products.size() || quantity < 1) {
            return ResponseEntity.badRequest().body(new ErrorResponse("商品與數量必須是正整數"));
        }

        Product product = products.get(id - 1);
        if (product.stock() < quantity) {
            return ResponseEntity.status(409).body(new ErrorResponse("庫存不足，剩餘 " + product.stock() + " 件"));
        }

        products.set(id - 1, new Product(product.id(), product.name(), product.price(),
                product.stock() - quantity));
        return ResponseEntity.ok(new MessageResponse("購買成功"));
    }

    public record BuyRequest(int productId, int quantity) {
    }

    public record MessageResponse(String message) {
    }

    public record ErrorResponse(String error) {
    }
}
