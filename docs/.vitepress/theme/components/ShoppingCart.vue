<script setup>
import { ref, computed } from "vue";

const MIN_QTY = 1;
const MAX_QTY = 10;
const FREE_SHIPPING_THRESHOLD = 1500;
const SHIPPING_FEE = 60;
const DISCOUNT_THRESHOLD = 2000;
const DISCOUNT_RATE = 0.1; // 滿 2000 打 9 折

const products = [
  { id: "p1", name: "機械鍵盤", price: 890 },
  { id: "p2", name: "無線滑鼠", price: 450 },
  { id: "p3", name: "USB-C 擴充座", price: 1200 },
  { id: "p4", name: "27 吋螢幕", price: 3200 },
];

// 購物車：{ id, name, price, qty }
const cart = ref([]);

const cartCount = computed(() =>
  cart.value.reduce((sum, item) => sum + item.qty, 0)
);

const subtotal = computed(() =>
  cart.value.reduce((sum, item) => sum + item.price * item.qty, 0)
);

const shipping = computed(() => {
  if (cart.value.length === 0) return 0;
  return subtotal.value >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
});

const discount = computed(() => {
  if (subtotal.value < DISCOUNT_THRESHOLD) return 0;
  return Math.round(subtotal.value * DISCOUNT_RATE);
});

const total = computed(() =>
  Math.max(0, subtotal.value - discount.value + shipping.value)
);

function addToCart(product) {
  const existing = cart.value.find((item) => item.id === product.id);
  if (existing) {
    if (existing.qty < MAX_QTY) existing.qty += 1;
  } else {
    cart.value.push({ ...product, qty: 1 });
  }
}

function updateQty(id, delta) {
  const item = cart.value.find((i) => i.id === id);
  if (!item) return;
  const next = item.qty + delta;
  if (next < MIN_QTY) return;
  if (next > MAX_QTY) return;
  item.qty = next;
}

function removeItem(id) {
  cart.value = cart.value.filter((item) => item.id !== id);
}

function formatPrice(value) {
  return "$" + value.toLocaleString("zh-TW");
}
</script>

<template>
  <div class="shopping-cart">
    <!-- 商品清單 -->
    <section class="block">
      <h3 class="block-title">商品清單</h3>
      <ul class="product-list">
        <li v-for="p in products" :key="p.id" class="product-item">
          <div class="product-info">
            <span class="product-name">{{ p.name }}</span>
            <span class="product-price">{{ formatPrice(p.price) }}</span>
          </div>
          <button class="btn add-btn" @click="addToCart(p)">加入購物車</button>
        </li>
      </ul>
    </section>

    <!-- 購物車 -->
    <section class="block">
      <h3 class="block-title">
        購物車
        <span v-if="cartCount" class="cart-count">{{ cartCount }} 件</span>
      </h3>

      <p v-if="cart.length === 0" class="empty">購物車是空的，快去挑選商品吧！</p>

      <ul v-else class="cart-list">
        <li v-for="item in cart" :key="item.id" class="cart-item">
          <div class="cart-item-info">
            <span class="cart-item-name">{{ item.name }}</span>
            <span class="cart-item-price">{{ formatPrice(item.price) }}</span>
          </div>

          <div class="qty-control">
            <button
              class="qty-btn"
              :disabled="item.qty <= MIN_QTY"
              aria-label="減少數量"
              @click="updateQty(item.id, -1)"
            >
              −
            </button>
            <span class="qty-value">{{ item.qty }}</span>
            <button
              class="qty-btn"
              :disabled="item.qty >= MAX_QTY"
              aria-label="增加數量"
              @click="updateQty(item.id, 1)"
            >
              +
            </button>
          </div>

          <span class="cart-item-sub">{{ formatPrice(item.price * item.qty) }}</span>

          <button
            class="remove-btn"
            aria-label="移除商品"
            @click="removeItem(item.id)"
          >
            ✕
          </button>
        </li>
      </ul>

      <!-- 結算摘要 -->
      <div v-if="cart.length" class="summary">
        <div class="summary-row">
          <span>小計</span>
          <span>{{ formatPrice(subtotal) }}</span>
        </div>
        <div class="summary-row">
          <span>
            運費
            <span v-if="shipping === 0" class="free-tag">免運</span>
            <span v-else class="hint-text">（滿 {{ formatPrice(FREE_SHIPPING_THRESHOLD) }} 免運）</span>
          </span>
          <span>{{ shipping === 0 ? "免費" : formatPrice(shipping) }}</span>
        </div>
        <div v-if="discount > 0" class="summary-row discount">
          <span>折扣（滿 {{ formatPrice(DISCOUNT_THRESHOLD) }} 打 9 折）</span>
          <span>−{{ formatPrice(discount) }}</span>
        </div>
        <div class="summary-row total">
          <span>總計</span>
          <span class="total-value">{{ formatPrice(total) }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.shopping-cart {
  margin: 1.5rem 0;
  padding: 1.25rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  font-family: var(--vp-font-family-base);
  font-size: 0.875rem;
  color: var(--vp-c-text-1);
}

.block + .block {
  margin-top: 1.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--vp-c-border);
}

.block-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 0 0.875rem;
  font-size: 1rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.cart-count {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  border-radius: 999px;
  padding: 0.125rem 0.625rem;
}

.product-list,
.cart-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.product-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.625rem 0.75rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  background: var(--vp-c-bg);
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.product-name {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.product-price {
  font-size: 0.8125rem;
  color: var(--vp-c-text-3);
}

.btn {
  padding: 0.5rem 1rem;
  background: var(--vp-c-brand);
  color: var(--vp-c-brand-text);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.875rem;
  font-weight: 600;
  transition: filter 0.2s, transform 0.1s;
}

.btn:hover:not(:disabled) {
  filter: brightness(1.08);
}

.btn:active:not(:disabled) {
  transform: scale(0.97);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.add-btn {
  white-space: nowrap;
}

.empty {
  margin: 0;
  padding: 1rem;
  text-align: center;
  font-size: 0.875rem;
  color: var(--vp-c-text-3);
  background: var(--vp-c-bg);
  border: 1px dashed var(--vp-c-border);
  border-radius: 8px;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 0.75rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  background: var(--vp-c-bg);
}

.cart-item-info {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  min-width: 0;
  flex: 1;
}

.cart-item-name {
  font-weight: 600;
  color: var(--vp-c-text-1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cart-item-price {
  font-size: 0.8125rem;
  color: var(--vp-c-text-3);
}

.qty-control {
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.qty-btn {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 1rem;
  line-height: 1;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s, background 0.2s;
}

.qty-btn:hover:not(:disabled) {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.qty-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.qty-value {
  min-width: 1.5rem;
  text-align: center;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.cart-item-sub {
  font-weight: 600;
  color: var(--vp-c-text-1);
  min-width: 4.5rem;
  text-align: right;
}

.remove-btn {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: var(--vp-c-text-3);
  font-size: 0.875rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.remove-btn:hover {
  background: rgba(199, 70, 52, 0.12);
  color: #c74634;
}

.summary {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px dashed var(--vp-c-border);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.summary-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  color: var(--vp-c-text-2);
}

.free-tag {
  margin-left: 0.375rem;
  font-size: 0.6875rem;
  font-weight: 700;
  color: var(--vp-c-green-1, #2dd4bf);
  background: var(--vp-c-green-soft, rgba(45, 212, 191, 0.15));
  border-radius: 4px;
  padding: 0.0625rem 0.375rem;
}

.hint-text {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.summary-row.discount {
  color: #c74634;
}

.summary-row.total {
  margin-top: 0.25rem;
  padding-top: 0.625rem;
  border-top: 1px solid var(--vp-c-border);
  font-size: 1rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.total-value {
  color: var(--vp-c-brand);
  font-size: 1.25rem;
}

@media (max-width: 480px) {
  .cart-item {
    flex-wrap: wrap;
  }

  .cart-item-sub {
    order: 3;
    flex-basis: 100%;
    text-align: left;
  }

  .remove-btn {
    margin-left: auto;
  }
}
</style>
