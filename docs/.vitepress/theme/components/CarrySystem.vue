<style>
input {
  width: 100%;
  padding: 0.5rem;
  margin: 0.5rem 0;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}
</style>

<template>
  <div>
    <h2>二進位/十進位轉換器</h2>
    <div>
      <label>
        二進位:
        <input
          v-model="binary"
          @input="binaryToDecimal"
          placeholder="輸入二進位數"
        />
      </label>
    </div>
    <div>
      <label>
        十進位:
        <input
          v-model="decimal"
          @input="decimalToBinary"
          placeholder="輸入十進位數"
        />
      </label>
    </div>
    <p v-if="error" style="color: red">{{ error }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      binary: "",
      decimal: "",
      error: "",
    };
  },
  methods: {
    binaryToDecimal() {
      this.error = "";
      if (!/^[01]+(\.[01]+)?$/.test(this.binary)) {
        this.error = "請輸入有效的二進位數";
        this.decimal = "";
        return;
      }
      const [intPart, fracPart = ""] = this.binary.split(".");
      let result = parseInt(intPart, 2);
      if (fracPart) {
        let fraction = 0;
        for (let i = 0; i < fracPart.length; i++) {
          fraction += parseInt(fracPart[i]) * Math.pow(2, -(i + 1));
        }
        result += fraction;
      }
      this.decimal = result.toString();
    },
    decimalToBinary() {
      this.error = "";
      if (!/^-?\d+(\.\d+)?$/.test(this.decimal)) {
        this.error = "請輸入有效的十進位數";
        this.binary = "";
        return;
      }
      const num = parseFloat(this.decimal);
      const intPart = Math.floor(Math.abs(num));
      const fracPart = Math.abs(num) - intPart;
      let binaryInt = intPart.toString(2);
      let binaryFrac = "";
      if (fracPart > 0) {
        let fraction = fracPart;
        for (let i = 0; i < 8; i++) {
          // 限制小數點後8位
          fraction *= 2;
          if (fraction >= 1) {
            binaryFrac += "1";
            fraction -= 1;
          } else {
            binaryFrac += "0";
          }
          if (fraction === 0) break;
        }
      }
      this.binary = binaryInt + (binaryFrac ? "." + binaryFrac : "");
      if (num < 0) this.binary = "-" + this.binary;
    },
  },
};
</script>
