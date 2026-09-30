package com.birc.backend101;

import java.util.List;

/** 商品。原生版用 String[] 平行陣列，這裡用 record 讓欄位有名字、有型別。 */
public record Product(int id, String name, int price, int stock) {
}
