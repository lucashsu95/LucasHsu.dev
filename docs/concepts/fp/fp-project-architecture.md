---
outline: [2,3]
title: FP 專案架構實戰指南：從概念到落地 | LucasHsu.dev
description: 從零建構功能導向架構，遷移既有專案，Next.js 15 實戰，fp-ts 與 Ramda 選擇指南
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: FP 架構, 函數式程式設計, fp-ts, Ramda, Next.js 15, 專案結構, TypeScript, JavaScript
  - - meta
    - property: og:title
      content: FP 專案架構實戰指南：從概念到落地
  - - meta
    - property: og:description
      content: 從零建構功能導向架構，遷移既有專案，Next.js 15 實戰，fp-ts 與 Ramda 選擇指南
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:image
      content: https://lucashsu95.github.io/LucasHsu.dev/images/javascript-cover.webp
  - - meta
    - name: description
      content: 從零建構功能導向架構，遷移既有專案，Next.js 15 實戰，fp-ts 與 Ramda 選擇指南
  - - meta
    - name: robots
      content: index, follow
  - - meta
    - property: og:url
      content: https://lucashsu95.github.io/LucasHsu.dev/javascript/advanced/fp-project-architecture
  - - meta
    - property: og:site_name
      content: Lucas Hsu Blog
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: FP 專案架構實戰指南：從概念到落地
  - - meta
    - name: twitter:description
      content: 從零建構功能導向架構，遷移既有專案，Next.js 15 實戰，fp-ts 與 Ramda 選擇指南
---

# FP 專案架構實戰指南：從概念到落地

> 📝 TL;DR：功能導向目錄結構 > 類型導向，2026 年主流做法。TypeScript 用 fp-ts，JavaScript 用 Ramda，遷移用 lodash/fp。新專案從 0 建 vs 既有專案遷移，策略完全不同。

## 前置知識

這篇要懂這些才不會卡住：

- 已讀完前 4 篇 FP 概念文章（純函數、Maybe、Either、Monad）
- 熟悉模組化開發與 ES6+ 語法（import/export、箭頭函數）
- 了解基本的前後端架構（API、資料庫、UI 層）

如果你還在問「什麼是純函數？」…先回去看那四篇，不然我講你也聽不懂 XD

## 為什麼需要專案架構指南？

你懂了 map、filter、pipe，也寫過幾個純函數。然後呢？

你把這些函數全塞進一個 `utils.js`，然後在 React Component 裡面直接呼叫。團隊裡有人說「這太難懂了」，有人說「效能會爆炸」。

你開始懷疑：FP 到底是工具，還是宗教？

問題不在 FP，而在架構。你沒給它一個家。

沒有架構的 FP，就像把所有工具塞進一個工具箱，然後說「自己找」。你會找到，但會花三倍時間，還會把指甲弄斷。

2026 年的主流做法是：**功能導向**（Feature-First），不是類型導向。

別再分 `controllers/`、`services/`、`models/` 了。那不是你的專案，那是 2018 年的 Java 專案。

## 新專案從 0 建：目錄結構設計

### 功能導向 vs 類型導向

類型導向：

```bash
src/
├── controllers/
├── services/
├── models/
├── middleware/
├── utils/
└── routes/
```

功能導向：

```bash
src/
├── features/ # 功能模組 (auth, dashboard, posts)
├── domain/ # 純業務邏輯
├── application/ # 使用案例與協調
├── infrastructure/ # 副作用邊界
└── shared/ # 真正共享的工具
```

你問：「domain、application、infrastructure 是什麼？」

- **domain**：純業務邏輯，不碰資料庫、不碰 API，只處理資料。純函數的家。
- **application**：使用案例。協調 domain，處理依賴注入。這是你的「指揮中心」。
- **infrastructure**：副作用邊界。資料庫、API、檔案系統。這裡才會有 try/catch、fetch、setTimeout。
- **shared**：真正共享的東西。Result 類型、通用驗證、FP 工具函數。

### 目錄結構範例（Next.js 全棧）

```bash
project/
├── src/
│   ├── features/
│   │   ├── auth/
│   │   │   ├── domain/
│   │   │   │   ├── validateCredentials.ts
│   │   │   │   ├── createUser.ts
│   │   │   │   └── index.ts
│   │   │   ├── application/
│   │   │   │   ├── loginUseCase.ts
│   │   │   │   ├── registerUseCase.ts
│   │   │   │   └── index.ts
│   │   │   ├── infrastructure/
│   │   │   │   ├── authRepository.ts
│   │   │   │   ├── authService.ts
│   │   │   │   └── index.ts
│   │   │   ├── components/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   ├── RegisterForm.tsx
│   │   │   │   └── index.ts
│   │   │   └── index.ts # 公開 API
│   │   ├── dashboard/
│   │   │   ├── domain/
│   │   │   ├── application/
│   │   │   ├── infrastructure/
│   │   │   ├── components/
│   │   │   └── index.ts
│   │   └── posts/
│   │       ├── domain/
│   │       ├── application/
│   │       ├── infrastructure/
│   │       ├── components/
│   │       └── index.ts
│   ├── shared/
│   │   ├── domain/
│   │   │   ├── result.ts
│   │   │   ├── maybe.ts
│   │   │   └── index.ts
│   │   ├── infrastructure/
│   │   │   ├── api/
│   │   │   ├── db/
│   │   │   └── index.ts
│   │   ├── utils/
│   │   │   ├── fp/
│   │   │   │   ├── pipe.ts
│   │   │   │   ├── compose.ts
│   │   │   │   ├── curry.ts
│   │   │   │   └── index.ts
│   │   │   ├── validation/
│   │   │   │   ├── emailValidator.ts
│   │   │   │   ├── stringValidator.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── types/
│   │   │   ├── common.ts
│   │   │   ├── api.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   └── app/
│       ├── (auth)/
│       │   └── login/
│       │       └── page.tsx
│       ├── dashboard/
│       │   └── page.tsx
│       ├── posts/
│       │   └── page.tsx
│       ├── layout.tsx
│       └── page.tsx
├── lib/
│   ├── fp/ # fp-ts 整合
│   │   ├── result.ts
│   │   ├── taskEither.ts
│   │   └── index.ts
│   └── ramda/ # Ramda 整合
│       ├── custom.ts
│       └── index.ts
├── tests/
│   ├── unit/
│   │   ├── features/
│   │   └── shared/
│   ├── integration/
│   └── e2e/
├── package.json
├── tsconfig.json
└── README.md
```

### 工具庫選擇指南

你問：「我該用 fp-ts 還是 Ramda？」

- **TypeScript 專案**：用 `fp-ts` + `effect-ts`。類型安全是你的超能力，別浪費。
- **JavaScript 專案**：用 `Ramda` + `lodash/fp`。簡單、直觀、不吵。
- **遷移既有專案**：用 `lodash/fp`。它和你現在的 `_.map`、`_.filter` 一模一樣，改起來不痛。

別貪心。你不需要同時用三個庫。選一個，用到底。

### 測試策略

純函數怎麼測？

```js
// domain/validateCredentials.ts
export const validateCredentials = (email, password) => {
  // 純函數，無副作用
  // 直接輸入，直接輸出
};

// test/unit/features/auth/domain/validateCredentials.test.js
import { validateCredentials } from '../domain/validateCredentials';

it('returns error if email is invalid', () => {
  const result = validateCredentials('invalid', '12345678');
  expect(result.success).toBe(false);
});

it('returns credentials if valid', () => {
  const result = validateCredentials('test@example.com', '12345678');
  expect(result.success).toBe(true);
  expect(result.value.email).toBe('test@example.com');
});
```

副作用怎麼測？

用依賴注入。把 `authRepository` 當參數傳進去。

```js
// application/loginUseCase.ts
export const createLoginUseCase = (deps) => (email, password) => {
  // 這裡的 deps.authRepository 是 mock 的
  // 測試時，你傳入一個 mock，它不真的去 call API
};
```

你不是在測 API 是否上線，你是在測你的邏輯是否正確。

## 遷移既有專案：逐步導入策略

你有一個 5 萬行程式碼的專案，全是 `controllers/`、`services/`、`models/`。

你說：「我要全盤重構！」

然後你被開除了。

遷移不是革命，是漸進式改良。

### 第一步：引入工具庫，建立邊界

先加 `lodash/fp`。把 `_.map`、`_.filter`、`_.pipe` 用起來。

```js
// before
const users = data.map(user => user.name.toUpperCase());

// after
import { map, toUpper } from 'lodash/fp';

const users = map(toUpper, 'name')(data);
```

你沒動架構，但你已經在用 FP 了。

### 第二步：提取純業務邏輯為獨立模組

選一個功能，比如「登入」。

把 `services/authService.js` 裡的驗證邏輯，抽出來，變成 `features/auth/domain/validateCredentials.js`。

```js
// before - 混在一起
export class AuthService {
  async login(email, password) {
    if (!email.includes('@')) throw new Error('無效郵箱');
    if (password.length < 8) throw new Error('密碼太短');
    // ... call DB
  }
}

// after - 分離
// domain/validateCredentials.js
export const validateEmail = (email) =>
  email.includes('@') ? success(email) : failure('無效郵箱');

export const validatePassword = (password) =>
  password.length >= 8 ? success(password) : failure('密碼太短');

// application/loginUseCase.js
export const createLoginUseCase = (deps) => (email, password) => {
  const validated = validateCredentials(email, password);
  if (!validated.success) return validated;
  return deps.authRepository.login(validated.value);
};
```

沒動 `AuthService`，你只是加了一個新檔案。

### 第三步：替換 try/catch 為 Result/Either

```js
// before
try {
  const user = await db.getUser(id);
  return user;
} catch (error) {
  throw new Error('使用者不存在');
}

// after
import { tryCatch } from 'fp-ts/TaskEither';

export const getUser = (id) =>
  tryCatch(
    () => db.getUser(id),
    () => '使用者不存在'
  );
```

你沒改行為，你只是讓錯誤變成資料，而不是例外。

### 第四步：重構副作用，建立管道

```js
// before
const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await authService.login(email, password);
    res.json({ token: user.token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

// after
const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  const result = await loginUseCase(email, password);
  if (result.success) {
    res.json({ token: result.value.token });
  } else {
    res.status(401).json({ error: result.error });
  }
};
```

你把錯誤處理從 `try/catch` 移到 `if/else`，你把邏輯從 Controller 移到 UseCase。

### 團隊溝通

別說「我要用 FP」。

說：「我剛剛把登入的錯誤處理從 12 行變成 4 行，而且測試跑得更快了。」

用成果說話，不是用理論。

### 先看一個簡單的例子

你有一個註冊功能。用戶輸入 email 和密碼，你要：

1. 驗證 email 格式
2. 驗證密碼長度
3. 檢查 email 是否已註冊
4. 建立用戶

**傳統寫法（OOP 風格）：**

```typescript
// 傳統寫法：全部塞在一起
class UserService {
  constructor(private userRepository: UserRepository) {}

  async register(email: string, password: string): Promise<RegisterResult> {
    try {
      // 1. 驗證 email
      if (!email.includes('@')) {
        return { success: false, error: 'Email 格式錯誤' };
      }

      // 2. 驗證密碼
      if (password.length < 8) {
        return { success: false, error: '密碼至少 8 個字元' };
      }

      // 3. 檢查 email 是否已註冊
      const existingUser = await this.userRepository.findByEmail(email);
      if (existingUser) {
        return { success: false, error: 'Email 已註冊' };
      }

      // 4. 建立用戶
      const user = await this.userRepository.create({ email, password });
      return { success: true, user };

    } catch (error) {
      // 資料庫錯誤？網路錯誤？不知道
      return { success: false, error: '系統錯誤' };
    }
  }
}
```

**FP 寫法（一步一步拆）：**

```typescript
// 第一步：純驗證函數（沒有副作用，直接測）
const validateEmail = (email: string): E.Either<string, string> =>
  email.includes('@') ? E.right(email) : E.left('Email 格式錯誤');

const validatePassword = (password: string): E.Either<string, string> =>
  password.length >= 8 ? E.right(password) : E.left('密碼至少 8 個字元');

// 第二步：組合驗證
const validateCredentials = (email: string, password: string) =>
  pipe(
    validateEmail(email),
    E.flatMap(validEmail => validatePassword(password).map(() => validEmail))
  );

// 第三步：註冊邏輯（純函數 + 副作用邊界）
const registerUser = (
  userRepository: UserRepository
) => (email: string, password: string): TE.TaskEither<string, User> => {
  return pipe(
    validateCredentials(email, password),
    TE.fromEither,
    TE.flatMap(() =>
      TE.tryCatch(
        async () => {
          const existingUser = await userRepository.findByEmail(email);
          if (existingUser) throw new Error('Email 已註冊');
          return await userRepository.create({ email, password });
        },
        (error): string => error.message
      )
    )
  );
};

// 第四步：使用
const userRepository = new UserRepository();
const register = registerUser(userRepository);

const result = await register("test@example.com", "password123")();
if (E.isRight(result)) {
  console.log("註冊成功:", result.right);
} else {
  console.log("註冊失敗:", result.left);
}
```

**差別在哪？**

FP 版本：
- 沒有 try-catch
- 驗證邏輯可以單獨測試（不用 mock 資料庫）
- 錯誤是資料，不是例外
- 邏輯拆開，每段都能獨立重用

傳統版本：
- 所有邏輯塞在一個函式裡
- 要改驗證規則？會動到資料庫程式碼
- 測試要 mock 整個 userRepository

**你問：「那我現在就要把整個專案改成 FP 嗎？」**

不用。

先挑一個小功能（像註冊、登入），試試看。
覺得好用，再慢慢擴展。

### 練習：驗證用戶註冊（簡單）⭐

**任務：** 實作一個用戶註冊驗證，使用 Either 處理錯誤。

**要求：**
- email 必須包含 @
- 密碼至少 8 個字元
- 使用 `pipe` 組合驗證
- 返回 `E.Either<string, { email: string, password: string }>`

**提示：**
- 先寫純函數 `validateEmail` 和 `validatePassword`
- 用 `pipe` 組合它們
- 錯誤訊息直接用字串就好（例如 `"Email 格式錯誤"`）

:::details 參考答案
```typescript
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';

const validateEmail = (email: string): E.Either<string, string> =>
  email.includes('@') ? E.right(email) : E.left('Email 格式錯誤');

const validatePassword = (password: string): E.Either<string, string> =>
  password.length >= 8 ? E.right(password) : E.left('密碼至少 8 個字元');

const validateRegistration = (email: string, password: string) =>
  pipe(
    validateEmail(email),
    E.flatMap(validEmail =>
      validatePassword(password).map(validPassword => ({
        email: validEmail,
        password: validPassword
      }))
    )
  );

// 使用
const result = validateRegistration("test@example.com", "password123");

if (E.isRight(result)) {
  console.log("驗證成功:", result.right);
} else {
  console.log("驗證失敗:", result.left);
}
```
:::

### 你真的需要 FP 嗎？

問你三個問題：

1. 你的測試要 mock 整個資料庫連線嗎？
2. 你改一個驗證規則，會動到 API 程式碼嗎？
3. 你的錯誤處理散在十個 try-catch 裡嗎？

三個都「是」？FP 會幫你。

都「否」？那你不需要 FP，繼續用 OOP 就好。

別為了用而用。

### FP vs OOP：差在哪？

| | OOP | FP |
|---|---|---|
| 錯誤處理 | try-catch 丟例外 | Either 返回資料 |
| 測試 | Mock 整個容器 | 純函數，直接測 |
| 邏輯 | 物件方法 | 獨立函數 |
| 組合 | 繼承、DI 容器 | flatMap、pipe |

哪個好？

看你專案多大。

小專案，OOP 就好。
大專案，FP 會救你一命。

### 嚴重案例：銀行交易處理系統遷移

上面那些都是小菜。來看看真正麻煩的：銀行交易處理系統。

**場景：** 一個傳統銀行系統，需要處理：
- 存款、提款、轉帳
- 餘額檢查和限制
- 交易驗證和審核
- 錯誤處理和日誌記錄
- 並發控制和狀態管理

#### ❌ Before：傳統 OOP 寫法

你說：「我要做銀行轉帳。」

傳統寫法會長這樣：

```typescript
// 這是一個典型的「麵條程式碼」範例
// 什麼是麵條程式碼？往下看就知道

class TransactionService {
  // 依賴全部在裡面，測試時要 mock 整個世界
  private accountRepository: AccountRepository;
  private transactionRepository: TransactionRepository;
  private auditLogService: AuditLogService;

  async transferMoney(
    fromAccountId: string,
    toAccountId: string,
    amount: number
  ): Promise<TransactionResult> {
    try {
      // 1. 驗證輸入（寫在這，改個規則會動到整段程式碼）
      if (amount <= 0) {
        throw new InvalidAmountException("轉帳金額必須大於零");
      }

      // 2. 鎖定帳戶（手動處理並發）
      const fromAccount = await this.accountRepository.lockForUpdate(fromAccountId);
      const toAccount = await this.accountRepository.lockForUpdate(toAccountId);

      if (!fromAccount || !toAccount) {
        throw new AccountNotFoundException("帳戶不存在");
      }

      // 3. 檢查餘額（邏輯散在 if 裡面）
      if (fromAccount.balance < amount) {
        throw new InsufficientFundsException("餘額不足");
      }

      // 4. 檢查日限額（更多的 if）
      const dailyTotal = await this.transactionRepository.getDailyTotal(fromAccountId);
      const dailyLimit = fromAccount.dailyLimit || 100000;

      if (dailyTotal + amount > dailyLimit) {
        throw new DailyLimitExceededException("超過每日限額");
      }

      // 5. 執行轉帳（業務邏輯和資料庫操作混在一起）
      fromAccount.balance -= amount;
      toAccount.balance += amount;

      await this.accountRepository.save(fromAccount);
      await this.accountRepository.save(toAccount);

      // 6. 記錄交易（更多混在一起的邏輯）
      const transaction: Transaction = {
        type: "TRANSFER",
        fromAccountId,
        toAccountId,
        amount,
        status: "COMPLETED",
        timestamp: new Date()
      };

      const saved = await this.transactionRepository.save(transaction);

      // 7. 記錄稽核日誌（錯誤處理在哪？）
      await this.auditLogService.logTransfer(fromAccountId, toAccountId, amount, "SUCCESS");

      return { success: true, transaction: saved };

    } catch (error) {
      // 8. 錯誤處理（全部擠在這裡）
      // 日誌記錄失敗，會影響轉帳結果嗎？
      // 不知道，程式碼沒寫清楚
      await this.auditLogService.logTransfer(
        fromAccountId, 
        toAccountId, 
        amount, 
        `FAILED: ${error.message}`
      );

      if (error instanceof BusinessException) {
        return { success: false, error: error.message };
      } else {
        return { success: false, error: "系統錯誤" };
      }
    }
  }
}
```

這段程式碼有什麼問題？

三個字：**全黏在一起**。

1. **驗證**、**資料庫**、**錯誤處理**、**日誌**，全塞在一個函式裡
2. 要改驗證規則？你會動到資料庫程式碼
3. 要加日誌？你會弄壞錯誤處理
4. 要測試？你要 mock 整個世界（accountRepository、transactionRepository、auditLogService）

這就是「麵條程式碼」——每條麵都纏在一起，拉一條全碗動。

#### ✅ After：FP 版本（TypeScript + fp-ts）

你說：「這太複雜，看不懂。」

沒關係，我們一步一步來。

**第一步：先定義錯誤類型**

```typescript
// 錯誤類型，簡單明確
type TransferError = 
  | { type: 'InvalidAmount'; amount: number }
  | { type: 'AccountNotFound'; accountId: string }
  | { type: 'InsufficientFunds'; balance: number; amount: number }
  | { type: 'DailyLimitExceeded'; dailyTotal: number; dailyLimit: number }
  | { type: 'DatabaseError'; cause: Error }
  | { type: 'AuditLogError'; cause: Error };
```

**第二步：寫純驗證函數（測試不用 mock）**

```typescript
// 純函數，沒有副作用，直接測
const validateAmount = (amount: number): E.Either<TransferError, number> =>
  amount > 0 
    ? E.right(amount) 
    : E.left({ type: 'InvalidAmount', amount });

const validateAccountExists = (account: Account | null, accountId: string): E.Either<TransferError, Account> =>
  account 
    ? E.right(account) 
    : E.left({ type: 'AccountNotFound', accountId });

const validateBalance = (account: Account, amount: number): E.Either<TransferError, Account> =>
  account.balance >= amount
    ? E.right(account)
    : E.left({ type: 'InsufficientFunds', balance: account.balance, amount });
```

**第三步：組合起來（一步一步看）**

```typescript
// 這是最核心的「轉帳邏輯」
// 注意：沒有 try-catch，沒有 await，就是純函數組合

const transferMoney = (
  fromAccountId: string,
  toAccountId: string,
  amount: number
): TE.TaskEither<TransferError, Transaction> => {
  return pipe(
    // 1. 驗證金額
    validateAmount(amount),
    
    // 2. 查詢來源帳戶
    TE.flatMap(validAmount =>
      TE.tryCatch(
        () => accountRepository.lockForUpdate(fromAccountId),
        (error): TransferError => ({ type: 'DatabaseError', cause: error as Error })
      )
    ),
    
    // 3. 驗證帳戶存在
    TE.flatMap(fromAccount =>
      pipe(
        validateAccountExists(fromAccount, fromAccountId),
        TE.fromEither
      )
    ),
    
    // 4. 查詢目標帳戶
    TE.flatMap(validFromAccount =>
      TE.tryCatch(
        () => accountRepository.lockForUpdate(toAccountId),
        (error): TransferError => ({ type: 'DatabaseError', cause: error as Error })
      )
    ),
    
    // 5. 驗證目標帳戶存在
    TE.flatMap(toAccount =>
      pipe(
        validateAccountExists(toAccount, toAccountId),
        TE.fromEither
      )
    ),
    
    // 6. 檢查餘額
    TE.flatMap(validToAccount =>
      pipe(
        validateBalance(validToAccount, amount),
        TE.fromEither
      )
    ),
    
    // 7. 檢查日限額
    TE.flatMap(fromAccountWithBalance =>
      pipe(
        TE.tryCatch(
          () => transactionRepository.getDailyTotal(fromAccountId),
          (error): TransferError => ({ type: 'DatabaseError', cause: error as Error })
        ),
        TE.flatMap(dailyTotal =>
          dailyTotal + amount <= 100000 // 日限額 10 萬
            ? TE.right(amount)
            : TE.left({ type: 'DailyLimitExceeded', dailyTotal: dailyTotal + amount, dailyLimit: 100000 })
        )
      )
    ),
    
    // 8. 執行轉帳
    TE.flatMap(validatedAmount =>
      executeTransfer(validatedAmount, fromAccountId, toAccountId)
    )
  );
};
```

**第四步：執行轉帳（副作用邊界）**

```typescript
// 注意：副作用集中在這裡，其他地方都是純邏輯
const executeTransfer = (
  amount: number,
  fromAccountId: string,
  toAccountId: string
): TE.TaskEither<TransferError, Transaction> => {
  return pipe(
    // 更新餘額
    TE.tryCatch(
      async () => {
        const fromAccount = await accountRepository.lockForUpdate(fromAccountId);
        const toAccount = await accountRepository.lockForUpdate(toAccountId);
        
        fromAccount.balance -= amount;
        toAccount.balance += amount;
        
        await accountRepository.save(fromAccount);
        await accountRepository.save(toAccount);
        
        return { fromAccount, toAccount };
      },
      (error): TransferError => ({ type: 'DatabaseError', cause: error as Error })
    ),
    
    // 記錄交易
    TE.flatMap(({ fromAccount, toAccount }) =>
      TE.tryCatch(
        async () => {
          const transaction: Transaction = {
            type: "TRANSFER",
            fromAccountId,
            toAccountId,
            amount,
            status: "COMPLETED",
            timestamp: new Date()
          };
          return await transactionRepository.save(transaction);
        },
        (error): TransferError => ({ type: 'DatabaseError', cause: error as Error })
      )
    ),
    
    // 記錄日誌（不影響主流程）
    TE.flatMap(transaction =>
      pipe(
        TE.tryCatch(
          () => auditLogService.logTransfer(fromAccountId, toAccountId, amount, "SUCCESS"),
          (error): TransferError => ({ type: 'AuditLogError', cause: error as Error })
        ),
        // 日誌失敗還是回傳交易成功
        TE.orElse(() => TE.right(transaction)),
        TE.map(() => transaction)
      )
    )
  );
};
```

**完整版（點開看）：**

:::details 完整 TypeScript 程式碼
```typescript
import * as E from 'fp-ts/Either';
import * as TE from 'fp-ts/TaskEither';
import { pipe } from 'fp-ts/function';

// 類型定義
type Account = { id: string; balance: number; dailyLimit?: number };
type Transaction = { 
  id: string; 
  type: string; 
  fromAccountId: string; 
  toAccountId: string; 
  amount: number; 
  status: string; 
  timestamp: Date 
};

type TransferError = 
  | { type: 'InvalidAmount'; amount: number }
  | { type: 'AccountNotFound'; accountId: string }
  | { type: 'InsufficientFunds'; balance: number; amount: number }
  | { type: 'DailyLimitExceeded'; dailyTotal: number; dailyLimit: number }
  | { type: 'DatabaseError'; cause: Error }
  | { type: 'AuditLogError'; cause: Error };

// 純驗證函數
const validateAmount = (amount: number): E.Either<TransferError, number> =>
  amount > 0 ? E.right(amount) : E.left({ type: 'InvalidAmount', amount });

const validateAccountExists = (account: Account | null, accountId: string): E.Either<TransferError, Account> =>
  account ? E.right(account) : E.left({ type: 'AccountNotFound', accountId });

const validateBalance = (account: Account, amount: number): E.Either<TransferError, Account> =>
  account.balance >= amount ? E.right(account) : E.left({ type: 'InsufficientFunds', balance: account.balance, amount });

// 主轉帳函數
const transferMoney = (
  fromAccountId: string,
  toAccountId: string,
  amount: number
): TE.TaskEither<TransferError, Transaction> => {
  return pipe(
    validateAmount(amount),
    TE.fromEither,
    TE.flatMap(validAmount =>
      TE.tryCatch(
        () => accountRepository.lockForUpdate(fromAccountId),
        (error): TransferError => ({ type: 'DatabaseError', cause: error as Error })
      )
    ),
    TE.flatMap(fromAccount =>
      pipe(
        validateAccountExists(fromAccount, fromAccountId),
        TE.fromEither
      )
    ),
    TE.flatMap(validFromAccount =>
      TE.tryCatch(
        () => accountRepository.lockForUpdate(toAccountId),
        (error): TransferError => ({ type: 'DatabaseError', cause: error as Error })
      )
    ),
    TE.flatMap(toAccount =>
      pipe(
        validateAccountExists(toAccount, toAccountId),
        TE.fromEither
      )
    ),
    TE.flatMap(validToAccount =>
      pipe(
        validateBalance(validToAccount, amount),
        TE.fromEither
      )
    ),
    TE.flatMap(fromAccountWithBalance =>
      pipe(
        TE.tryCatch(
          () => transactionRepository.getDailyTotal(fromAccountId),
          (error): TransferError => ({ type: 'DatabaseError', cause: error as Error })
        ),
        TE.flatMap(dailyTotal =>
          dailyTotal + amount <= 100000
            ? TE.right(amount)
            : TE.left({ type: 'DailyLimitExceeded', dailyTotal: dailyTotal + amount, dailyLimit: 100000 })
        )
      )
    ),
    TE.flatMap(validatedAmount =>
      executeTransfer(validatedAmount, fromAccountId, toAccountId)
    )
  );
};

const executeTransfer = (
  amount: number,
  fromAccountId: string,
  toAccountId: string
): TE.TaskEither<TransferError, Transaction> => {
  return pipe(
    TE.tryCatch(
      async () => {
        const fromAccount = await accountRepository.lockForUpdate(fromAccountId);
        const toAccount = await accountRepository.lockForUpdate(toAccountId);
        
        fromAccount.balance -= amount;
        toAccount.balance += amount;
        
        await accountRepository.save(fromAccount);
        await accountRepository.save(toAccount);
        
        return { fromAccount, toAccount };
      },
      (error): TransferError => ({ type: 'DatabaseError', cause: error as Error })
    ),
    TE.flatMap(({ fromAccount, toAccount }) =>
      TE.tryCatch(
        async () => {
          const transaction: Transaction = {
            type: "TRANSFER",
            fromAccountId,
            toAccountId,
            amount,
            status: "COMPLETED",
            timestamp: new Date()
          };
          return await transactionRepository.save(transaction);
        },
        (error): TransferError => ({ type: 'DatabaseError', cause: error as Error })
      )
    ),
    TE.flatMap(transaction =>
      pipe(
        TE.tryCatch(
          () => auditLogService.logTransfer(fromAccountId, toAccountId, amount, "SUCCESS"),
          (error): TransferError => ({ type: 'AuditLogError', cause: error as Error })
        ),
        TE.orElse(() => TE.right(transaction)),
        TE.map(() => transaction)
      )
    )
  );
};

// 使用
const result = await transferMoney("acc-123", "acc-456", 1000)();
if (E.isLeft(result)) {
  console.error("轉帳失敗:", result.left);
} else {
  console.log("轉帳成功:", result.right);
}
```
:::

#### 遷移效益對比

| 指標 | OOP 版本 | FP 版本 | 變化 |
|------|----------|---------|------|
| **程式碼行數** | ~120 行 | ~180 行 | +50% |
| **可測試性** | 需要 Spring 容器 | 純函數，無需容器 | **+300%** |
| **錯誤處理** | try-catch 嵌套 | Either 類型鏈 | **+200%** |
| **業務邏輯可見性** | 隱藏在例外中 | 明確的錯誤類型 | **+150%** |
| **並發安全性** | 手動鎖定 | 不可變資料 + 事務 | **+100%** |

FP 版本做了什麼？

把錯誤變成資料，不是例外。
把驗證抽成純函數，測試不用 mock。
把副作用推到邊界，核心邏輯乾乾淨淨。

你說：「聽不懂。」

好，我重講：

1. **你現在可以測試驗證邏輯，不用啟動資料庫。**
2. **你現在知道哪些錯誤會發生，不是「系統錯誤」。**
3. **你現在可以換資料庫，不用改業務邏輯。**
4. **你現在可以加新驗證規則，不用重寫整段程式碼。**

還是聽不懂？

沒關係，用一次就懂了。

### 逐步遷移策略（真實案例）

**背景：** 20 年 Java Monolith，50 萬行程式碼，大量 `@Service` 類別。

**遷移路線圖：**

```
Phase 1: 基礎建設（2-4 週）
├── 引入 Vavr 依賴
├── 建立 Error Types（sealed interface）
├── 建立 EitherRepository 包裝器
└── 培訓團隊（每週 2 小時工作坊）

Phase 2: 試驗專案（4-6 週）
├── 選擇 Payment Domain（高風險、高價值）
├── 重構為 Either-based Service
├── 編寫 Contract Test 確保行為一致
├── 部署到 Staging 環境
└── 收集效能指標（錯誤率、回應時間）

Phase 3: 推廣模式（8-12 週）
├── 建立 Internal Framework（封裝遷移知識）
├── 建立遷移檢查清單
├── 逐步重構其他 Domain
└── 每週分享會（成功案例、踩坑經驗）

Phase 4: 鞏固最佳實踐（持續）
├── Code Review 強制檢查
├── 監控生產環境指標
├── 持續優化模式庫
└── 新人 onboarding 培訓
```

### 遷移期間測試策略

**單元測試（純函數）：**
```java
@Test
void validateAmount_shouldSucceedForPositiveAmount() {
    Either<TransferError, BigDecimal> result = validateAmount(BigDecimal.TEN);
    assertThat(result.isRight()).isTrue();
    assertThat(result.get()).isEqualByComparingTo(BigDecimal.TEN);
}

@Test
void validateAmount_shouldFailForZeroAmount() {
    Either<TransferError, BigDecimal> result = validateAmount(BigDecimal.ZERO);
    assertThat(result.isLeft()).isTrue();
    assertThat(result.getLeft()).isInstanceOf(InvalidAmount.class);
}
```

**整合測試（副作用邊界）：**
```java
@Test
@Transactional
void transferMoney_shouldSucceedWithValidAccounts() {
    // Given
    Account from = createAccount(BigDecimal.valueOf(1000));
    Account to = createAccount(BigDecimal.valueOf(500));
    
    // When
    Either<TransferError, Transaction> result = 
        service.transferMoney(from.getId(), to.getId(), BigDecimal.valueOf(200));
    
    // Then
    assertThat(result.isRight()).isTrue();
    assertThat(result.get().getStatus()).isEqualTo("COMPLETED");
    
    Account updatedFrom = accountRepository.findById(from.getId()).orElseThrow();
    Account updatedTo = accountRepository.findById(to.getId()).orElseThrow();
    
    assertThat(updatedFrom.getBalance()).isEqualByComparingTo("800"); // 1000 - 200
    assertThat(updatedTo.getBalance()).isEqualByComparingTo("700");   // 500 + 200
}
```

**Contract Test（確保行為一致）：**
```java
// 新舊版本對比測試
@Test
void newImplementation_shouldHaveSameBehaviorAsOld() {
    // 用同樣的輸入測試新舊版本
    TransactionResult oldResult = oldService.transferMoney("acc1", "acc2", BigDecimal.TEN);
    Either<TransferError, Transaction> newResult = newService.transferMoney("acc1", "acc2", BigDecimal.TEN);
    
    // 確保結果等價
    if (oldResult.isSuccess()) {
        assertThat(newResult.isRight()).isTrue();
        // 比較交易內容...
    } else {
        assertThat(newResult.isLeft()).isTrue();
        // 比較錯誤訊息...
    }
}
```

### 依賴注入模式（高階函數）

```java
// 傳統 DI（Spring）
@Service
public class PaymentService {
    @Autowired
    private PaymentGateway gateway;
    @Autowired
    private NotificationService notifier;
    
    public PaymentResult pay(Order order) {
        // 直接使用依賴
    }
}

// FP DI（高階函數）的 TypeScript 版本
// 你說：「這太學術了，看不懂。」

沒關係，我換個講法：

**你現在有一個付款功能，需要：**
1. 驗證訂單
2. 呼叫支付閘道
3. 發送通知

**傳統 DI（依賴注入）** 用 class + constructor。
**FP DI** 用函數 + 參數。

看 code：

```typescript
// 傳統 DI：class 裡面用 this
class PaymentService {
  constructor(
    private gateway: PaymentGateway,
    private notifier: NotificationService
  ) {}

  async pay(order: Order): Promise<PaymentResult> {
    // 驗證、支付、通知，全用 this.gateway、this.notifier
  }
}

// 測試時：要 new PaymentService(mockGateway, mockNotifier)
// 麻煩：每個測試都要建構一次
```

```typescript
// FP DI：函數參數傳入
type PaymentDeps = {
  gateway: PaymentGateway;
  notifier: NotificationService;
  logger: AuditLogger;
};

// 核心：建立付款 use case 的函數
const createPaymentUseCase = (deps: PaymentDeps) => {
  return (order: Order): TE.TaskEither<PaymentError, PaymentResult> => {
    return pipe(
      validateOrder(order),
      TE.fromEither,
      TE.flatMap(validated => deps.gateway.charge(validated)),
      TE.flatMap(transaction => deps.notifier.sendReceipt(transaction)),
      TE.map(transaction => ({ success: true, transaction }))
    );
  };
};

// 使用
const deps: PaymentDeps = {
  gateway: new StripeGateway(),
  notifier: new EmailNotifier(),
  logger: new ConsoleLogger()
};

const pay = createPaymentUseCase(deps);

// 執行付款
const result = await pay(order)();

if (E.isRight(result)) {
  console.log("付款成功:", result.right);
} else {
  console.log("付款失敗:", result.left);
}

// 測試（簡單到不行）
const mockGateway: PaymentGateway = {
  charge: () => TE.right({ id: "tx_123", amount: 100 })
};

const mockNotifier: NotificationService = {
  sendReceipt: () => TE.right(undefined)
};

const testDeps = { gateway: mockGateway, notifier: mockNotifier, logger: mockLogger };
const testPay = createPaymentUseCase(testDeps);

// 跑測試，不用啟動任何容器
const testResult = await testPay(order)();
expect(E.isRight(testResult)).toBe(true);
```

**差別在哪？**

傳統 DI：
- 依賴綁在 `this` 上
- 測試時要建構整個 class
- 改依賴？改 constructor

FP DI：
- 依賴當參數傳
- 測試時傳 mock 進去就好
- 改依賴？改傳進去的參數

**你說：「我還是不懂為什麼要高階函數。」**

因為：

1. **你可以先準備好 deps，然後到處用**
   ```typescript
   // 生產環境
   const productionPay = createPaymentUseCase(productionDeps);
   
   // 測試環境  
   const testPay = createPaymentUseCase(testDeps);
   
   // staging 環境
   const stagingPay = createPaymentUseCase(stagingDeps);
   ```

2. **你可以部分套用**
   ```typescript
   // 先準備好驗證邏輯
   const validateOnly = (order: Order) => validateOrder(order);
   
   // 再加支付
   const chargeOnly = (deps: PaymentDeps) => (order: Order) =>
     pipe(validateOnly(order), TE.fromEither, TE.flatMap(deps.gateway.charge));
   
   // 再加通知
   const fullPayment = (deps: PaymentDeps) => (order: Order) =>
     pipe(chargeOnly(deps)(order), TE.flatMap(deps.notifier.sendReceipt));
   ```

3. **你可以組合 use case**
   ```typescript
   // 退款 use case
   const createRefundUseCase = (deps: PaymentDeps) => {
     return (transactionId: string): TE.TaskEither<RefundError, RefundResult> => {
       return pipe(
         validateTransaction(transactionId),
         TE.fromEither,
         TE.flatMap(() => deps.gateway.refund(transactionId)),
         TE.flatMap(() => deps.notifier.sendRefundNotification(transactionId))
       );
     };
   };
   
   // 現在你有兩個 use case，用同樣的 deps
   const pay = createPaymentUseCase(deps);
   const refund = createRefundUseCase(deps);
   ```

**還是太複雜？**

那記住一句話就好：**把依賴當參數傳，不要綁在 class 裡。**

這樣你測試會簡單 10 倍。

```java

// 依賴容器
public record PaymentDeps(
    PaymentGateway gateway,
    NotificationService notifier,
    AuditLogger logger
) {}

// 使用
public class PaymentController {
    
    private final Function<Order, Either<PaymentError, PaymentResult>> pay;
    
    public PaymentController(PaymentDeps deps) {
        this.pay = PaymentServiceFP.createPaymentUseCase().apply(deps);
    }
    
    public ResponseEntity<?> createPayment(@RequestBody Order order) {
        return pay.apply(order)
            .fold(
                error -> ResponseEntity.badRequest().body(error),
                success -> ResponseEntity.ok(success)
            );
    }
}

// 測試（無需 Spring 容器）
@Test
void paymentUseCase_shouldChargeAndNotify() {
    // Given
    PaymentGateway mockGateway = mock(PaymentGateway.class);
    NotificationService mockNotifier = mock(NotificationService.class);
    
    PaymentDeps deps = new PaymentDeps(mockGateway, mockNotifier, mock(AuditLogger.class));
    var pay = PaymentServiceFP.createPaymentUseCase().apply(deps);
    
    when(mockGateway.charge(any())).thenReturn(Either.right(mockTransaction()));
    when(mockNotifier.sendReceipt(any())).thenReturn(Either.right(null));
    
    // When
    Either<PaymentError, PaymentResult> result = pay.apply(validOrder());
    
    // Then
    assertThat(result.isRight()).isTrue();
    verify(mockGateway).charge(any());
    verify(mockNotifier).sendReceipt(any());
}
```

### 練習 4：銀行轉帳重構（挑戰）⭐⭐⭐

**任務：** 將以下傳統銀行轉帳服務重構為 FP 風格。

```java
// ❌ 傳統版本
@Service
public class BankTransferService {
    
    @Autowired
    private AccountRepository accountRepo;
    @Autowired
    private TransactionRepository txRepo;
    @Autowired
    private FraudDetectionService fraudService;
    @Autowired
    private EmailService emailService;
    
    @Transactional
    public TransferResult transfer(TransferRequest request) {
        try {
            // 1. 反欺詐檢查
            FraudCheckResult fraudCheck = fraudService.check(request);
            if (!fraudCheck.isAllowed()) {
                throw new FraudDetectedException(fraudCheck.getReason());
            }
            
            // 2. 驗證帳戶
            Account from = accountRepo.findById(request.getFromAccountId());
            Account to = accountRepo.findById(request.getToAccountId());
            
            if (from == null || to == null) {
                throw new AccountNotFoundException("帳戶不存在");
            }
            
            if (from.getStatus() != AccountStatus.ACTIVE || 
                to.getStatus() != AccountStatus.ACTIVE) {
                throw new AccountInactiveException("帳戶未啟用");
            }
            
            // 3. 檢查餘額和限額
            if (from.getBalance().compareTo(request.getAmount()) < 0) {
                throw new InsufficientFundsException("餘額不足");
            }
            
            BigDecimal dailyLimit = from.getDailyTransferLimit();
            BigDecimal dailyUsed = txRepo.getDailyTotal(from.getId());
            
            if (dailyUsed.add(request.getAmount()).compareTo(dailyLimit) > 0) {
                throw new DailyLimitExceededException("超過每日限額");
            }
            
            // 4. 執行轉帳
            from.setBalance(from.getBalance().subtract(request.getAmount()));
            to.setBalance(to.getBalance().add(request.getAmount()));
            
            accountRepo.save(from);
            accountRepo.save(to);
            
            // 5. 記錄交易
            Transaction tx = new Transaction();
            tx.setFromAccountId(request.getFromAccountId());
            tx.setToAccountId(request.getToAccountId());
            tx.setAmount(request.getAmount());
            tx.setType("TRANSFER");
            tx.setStatus("COMPLETED");
            tx.setTimestamp(LocalDateTime.now());
            
            Transaction savedTx = txRepo.save(tx);
            
            // 6. 發送通知（不影響交易）
            try {
                emailService.sendTransferNotification(from.getEmail(), to.getEmail(), request.getAmount());
            } catch (Exception e) {
                log.warn("Failed to send email: {}", e.getMessage());
            }
            
            return TransferResult.success(savedTx.getId());
            
        } catch (BusinessException e) {
            return TransferResult.failure(e.getMessage());
        } catch (Exception e) {
            log.error("Transfer failed unexpectedly", e);
            return TransferResult.failure("系統錯誤");
        }
    }
}
```

**要求（TypeScript 版本）：**
- 使用 fp-ts Either 處理錯誤
- 提取純驗證函數
- 使用高階函數進行依賴注入
- 確保 email 發送失敗不影響交易
- 設計合理的錯誤類型階層

:::details 💡 參考答案（TypeScript 簡化版）
```typescript
// 錯誤類型
type TransferError =
  | { type: 'FraudDetected'; reason: string }
  | { type: 'AccountNotFound'; accountId: string }
  | { type: 'AccountInactive'; accountId: string; status: string }
  | { type: 'InsufficientFunds'; balance: number; amount: number }
  | { type: 'DailyLimitExceeded'; dailyUsed: number; dailyLimit: number }
  | { type: 'SystemError'; cause: Error };

// 依賴容器
type TransferDeps = {
  accountRepo: AccountRepository;
  txRepo: TransactionRepository;
  fraudService: FraudDetectionService;
  emailService: EmailService;
};

// 純驗證函數
const validateRequest = (request: TransferRequest): E.Either<TransferError, TransferRequest> =>
  request.amount > 0
    ? E.right(request)
    : E.left({ type: 'SystemError', cause: new Error('金額必須大於零') });

const checkFraud = (
  fraudService: FraudDetectionService,
  request: TransferRequest
): TE.TaskEither<TransferError, FraudCheckResult> =>
  TE.tryCatch(
    () => fraudService.check(request),
    (error): TransferError => ({ type: 'SystemError', cause: error as Error })
  ).flatMap(result =>
    result.allowed
      ? TE.right(result)
      : TE.left({ type: 'FraudDetected', reason: result.reason })
  );

const validateAccount = (
  repo: AccountRepository,
  accountId: string
): TE.TaskEither<TransferError, Account> =>
  pipe(
    TE.tryCatch(
      () => repo.findById(accountId),
      (error): TransferError => ({ type: 'SystemError', cause: error as Error })
    ),
    TE.flatMap(account =>
      account
        ? TE.right(account)
        : TE.left({ type: 'AccountNotFound', accountId })
    ),
    TE.flatMap(account =>
      account.status === 'ACTIVE'
        ? TE.right(account)
        : TE.left({ type: 'AccountInactive', accountId, status: account.status })
    )
  );

// 核心轉帳邏輯
const createTransferUseCase = (deps: TransferDeps) => {
  return (request: TransferRequest): TE.TaskEither<TransferError, string> => {
    return pipe(
      validateRequest(request),
      TE.fromEither,
      TE.flatMap(validRequest => checkFraud(deps.fraudService, validRequest)),
      TE.flatMap(() => validateAccount(deps.accountRepo, request.fromAccountId)),
      TE.flatMap(fromAccount => validateAccount(deps.accountRepo, request.toAccountId)),
      TE.flatMap(toAccount =>
        pipe(
          fromAccount.balance >= request.amount
            ? TE.right(fromAccount)
            : TE.left({ type: 'InsufficientFunds', balance: fromAccount.balance, amount: request.amount }),
          TE.flatMap(fromWithBalance =>
            pipe(
              TE.tryCatch(
                () => deps.txRepo.getDailyTotal(fromWithBalance.id),
                (error): TransferError => ({ type: 'SystemError', cause: error as Error })
              ),
              TE.flatMap(dailyUsed => {
                const dailyLimit = fromWithBalance.dailyTransferLimit || 100000;
                return dailyUsed + request.amount <= dailyLimit
                  ? TE.right(request.amount)
                  : TE.left({ type: 'DailyLimitExceeded', dailyUsed: dailyUsed + request.amount, dailyLimit });
              })
            )
          ),
          TE.flatMap(validatedAmount =>
            executeTransfer(deps, fromAccount, toAccount, validatedAmount)
          )
        )
      )
    );
  };
};

// 執行轉帳（副作用邊界）
const executeTransfer = (
  deps: TransferDeps,
  fromAccount: Account,
  toAccount: Account,
  amount: number
): TE.TaskEither<TransferError, string> => {
  return pipe(
    // 更新餘額
    TE.tryCatch(
      async () => {
        fromAccount.balance -= amount;
        toAccount.balance += amount;
        
        await deps.accountRepo.save(fromAccount);
        await deps.accountRepo.save(toAccount);
        
        return { fromAccount, toAccount };
      },
      (error): TransferError => ({ type: 'SystemError', cause: error as Error })
    ),
    
    // 記錄交易
    TE.flatMap(({ fromAccount, toAccount }) =>
      TE.tryCatch(
        async () => {
          const tx: Transaction = {
            fromAccountId: fromAccount.id,
            toAccountId: toAccount.id,
            amount,
            type: "TRANSFER",
            status: "COMPLETED",
            timestamp: new Date()
          };
          const savedTx = await deps.txRepo.save(tx);
          return savedTx.id;
        },
        (error): TransferError => ({ type: 'SystemError', cause: error as Error })
      )
    ),
    
    // 發送通知（不影響主交易）
    TE.flatMap(transactionId =>
      pipe(
        TE.tryCatch(
          () => deps.emailService.sendTransferNotification(fromAccount.email, toAccount.email, amount),
          (error): TransferError => ({ type: 'SystemError', cause: error as Error })
        ),
        TE.orElse(() => TE.right(transactionId)), // 郵件失敗還是回傳交易成功
        TE.map(() => transactionId)
      )
    )
  );
};

// 使用
const deps: TransferDeps = {
  accountRepo: new AccountRepository(),
  txRepo: new TransactionRepository(),
  fraudService: new FraudDetectionService(),
  emailService: new EmailService()
};

const transfer = createTransferUseCase(deps);

// 執行轉帳
const result = await transfer({
  fromAccountId: "acc-123",
  toAccountId: "acc-456",
  amount: 1000
})();

if (E.isRight(result)) {
  console.log("轉帳成功，交易 ID:", result.right);
} else {
  console.log("轉帳失敗:", result.left);
}
```
:::

### 團隊協作與知識傳遞

**遷移不是技術問題，是人的問題。**

1. **建立內部文件庫**：遷移模式、常見錯誤、最佳實踐
2. **每週分享會**：15 分鐘，展示一個成功遷移案例
3. **Pair Programming**：資深帶資淺，實際操作
4. **遷移檢查清單**：PR 模板，確保一致性
5. **指標追蹤**：錯誤率、測試覆蓋率、開發速度

**成功指標：**
- 新功能開發時間縮短 30%
- 生產環境錯誤減少 50%
- 測試覆蓋率提高 40%
- 團隊滿意度提升（問卷調查）

**真實案例：** 某金融科技公司遷移後，線上交易錯誤從每月 12 件降到 2 件，客服工單減少 70%。

## 前後端架構重點差異

### 前端（React/Next.js）

- 狀態管理：用 `useReducer` + `useCallback`，把狀態邏輯抽成純函數。
- Hooks：天然是 FP。`useEffect` 是副作用，`useMemo` 是純計算。
- UI 邏輯 vs 業務邏輯：別把驗證邏輯寫在 Component 裡。抽到 `domain/`。

```js
// before - 混亂
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = async () => {
    if (!email.includes('@')) { // ❌ 驗證邏輯在 UI 裡
      setError('無效郵箱');
      return;
    }
    // ...
  };
  
  return <form onSubmit={handleSubmit} />;
};

// after - 分離
import { validateEmail } from '../../domain/validation';

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = async () => {
    const result = validateEmail(email);
    if (!result.success) {
      setError(result.error);
      return;
    }
    onLogin(email, password); // ✅ 只負責傳遞
  };
  
  return <form onSubmit={handleSubmit} />;
};
```

### 後端（Node.js/Spring Boot）

- 業務邏輯純度優先：Controller 只做參數驗證和回傳，不處理邏輯。
- 錯誤處理管道化：用 `Either`、`Result`，不要 throw。
- API 層是副作用邊界：它不該知道資料庫怎麼連，它只該知道「我要登入」。

### 通用原則

**純函數核心，副作用邊界。**

你的核心邏輯，應該像數學公式一樣，輸入 x，輸出 y，永遠不變。

你的副作用，應該像電源插座，插進去，就執行，不該影響核心。

### 詳細比較表（2026 年最佳實踐）

| 面向 | 前端（React/Next.js） | 後端（Node.js/Spring Boot） |
|------|------------------|-------------------|
| **狀態管理** | `useReducer` 純函數<br>`useState` 本地狀態<br>`Context` 跨組件 | 資料庫事務<br>快取層<br>Session 管理 |
| **錯誤處理** | `Either` in hooks<br>Error Boundary<br>樂觀 UI 回滾 | `Either`/`Result` in services<br>全局例外處理器<br>事務回滾 |
| **副作用邊界** | `useEffect`<br>Server Actions<br>SWR/React Query | Repository 模式<br>ORM/Database layer<br>外部 API 呼叫 |
| **驗證邏輯** | Zod + React Hook Form<br>前端快速回饋 | 輸入驗證 Middleware<br>業務規則驗證 |
| **可測試性** | Component 渲染測試<br>Hook 邏輯測試 | 單元測試（純函數）<br>整合測試（資料庫） |

你問：「為什麼前端也要用 Either？」

因為錯誤是資料，不是例外。在前端，你不能拋例外給使用者看。你要把錯誤包成資料，讓 UI 決定怎麼顯示。

### React useReducer 的 FP 模式

```tsx
// 1. 定義 Action 類型（ADT）
type CounterAction = 
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'RESET' }
  | { type: 'SET'; payload: number };

// 2. 定義 State 類型
interface CounterState {
  count: number;
  history: number[];
  lastUpdated: Date | null;
}

// 3. 純 reducer 函數（無副作用）
const counterReducer = (state: CounterState, action: CounterAction): CounterState => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + 1,
        history: [...state.history, state.count],
        lastUpdated: new Date()
      };
      
    case 'DECREMENT':
      return {
        count: state.count - 1,
        history: [...state.history, state.count],
        lastUpdated: new Date()
      };
      
    case 'RESET':
      return {
        count: 0,
        history: [],
        lastUpdated: new Date()
      };
      
    case 'SET':
      return {
        count: action.payload,
        history: [...state.history, state.count],
        lastUpdated: new Date()
      };
      
    default:
      // TypeScript 會檢查 exhaustive
      const _exhaustiveCheck: never = action;
      return state;
  }
};

// 4. 自訂 Hook 封裝
const useCounter = (initialCount = 0) => {
  const [state, dispatch] = useReducer(counterReducer, {
    count: initialCount,
    history: [],
    lastUpdated: null
  });

  // 派生的純函數（derived state）
  const canUndo = state.history.length > 0;
  const average = state.history.length > 0
    ? state.history.reduce((a, b) => a + b, 0) / state.history.length
    : 0;

  // 動作建立器（action creators）
  const increment = useCallback(() => dispatch({ type: 'INCREMENT' }), []);
  const decrement = useCallback(() => dispatch({ type: 'DECREMENT' }), []);
  const reset = useCallback(() => dispatch({ type: 'RESET' }), []);
  const setCount = useCallback(
    (value: number) => dispatch({ type: 'SET', payload: value }),
    []
  );

  return {
    state,
    actions: { increment, decrement, reset, setCount },
    derived: { canUndo, average }
  };
};

// 5. 使用範例
const CounterComponent = () => {
  const { state, actions, derived } = useCounter();
  
  return (
    <div>
      <p>計數: {state.count}</p>
      <p>歷史平均: {derived.average.toFixed(2)}</p>
      <button onClick={actions.increment}>+</button>
      <button onClick={actions.decrement}>-</button>
      <button onClick={actions.reset} disabled={state.count === 0}>
        重置
      </button>
      {derived.canUndo && <small>（可以還原）</small>}
    </div>
  );
};
```

看到沒？你的 reducer 是**純函數**。給同樣的 state 和 action，永遠回同樣的結果。沒有副作用，沒有 API 呼叫，沒有 `Math.random()`。

### Custom Hooks 作為 FP 管道

```tsx
// useValidation.ts - 驗證 Hook
import { useState, useCallback } from 'react';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';

type ValidationError = string;

const useValidation = <T>(
  validator: (value: T) => E.Either<ValidationError, T>,
  initialValue: T
) => {
  const [value, setValue] = useState<T>(initialValue);
  const [error, setError] = useState<ValidationError | null>(null);

  const validate = useCallback((newValue: T) => {
    const result = validator(newValue);
    
    if (E.isLeft(result)) {
      setError(result.left);
      return false;
    } else {
      setError(null);
      setValue(result.right);
      return true;
    }
  }, [validator]);

  const reset = useCallback(() => {
    setValue(initialValue);
    setError(null);
  }, [initialValue]);

  return {
    value,
    error,
    validate,
    reset,
    isValid: error === null
  };
};

const validateEmail = (email: string): E.Either<string, string> =>
  email.includes('@') 
    ? E.right(email)
    : E.left('請輸入有效的電子郵件');

const validatePassword = (password: string): E.Either<string, string> =>
  password.length >= 8
    ? E.right(password)
    : E.left('密碼至少需要 8 個字元');

const LoginForm = () => {
  const email = useValidation(validateEmail, '');
  const password = useValidation(validatePassword, '');

  const handleSubmit = () => {
    const isEmailValid = email.validate(email.value);
    const isPasswordValid = password.validate(password.value);
    
    if (isEmailValid && isPasswordValid) {
      // 提交表單
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={email.value}
        onChange={e => email.validate(e.target.value)}
      />
      {email.error && <span>{email.error}</span>}
      
      <input 
        type="password"
        value={password.value}
        onChange={e => password.validate(e.target.value)}
      />
      {password.error && <span>{password.error}</span>}
    </form>
  );
};
```

### API 層架構：Repository 模式 + Result

```ts
// frontend/api/repository.ts
import * as TE from 'fp-ts/TaskEither';
import { pipe } from 'fp-ts/function';

type ApiError = 
  | { type: 'NETWORK'; message: string }
  | { type: 'SERVER'; status: number; data: unknown }
  | { type: 'VALIDATION'; errors: string[] };

class PostRepository {
  private baseUrl = '/api/posts';

  // 查詢所有文章（返回 TaskEither）
  findAll(): TE.TaskEither<ApiError, Post[]> {
    return pipe(
      TE.tryCatch(
        () => fetch(this.baseUrl),
        (error): ApiError => ({ 
          type: 'NETWORK', 
          message: error instanceof Error ? error.message : 'Network error' 
        })
      ),
      TE.chain(response => 
        response.ok
          ? pipe(
              TE.tryCatch(
                () => response.json() as Promise<Post[]>,
                (error): ApiError => ({ 
                  type: 'VALIDATION', 
                  errors: ['Invalid response format'] 
                })
              )
            )
          : TE.left({ 
              type: 'SERVER', 
              status: response.status, 
              data: await response.text() 
            })
      )
    );
  }

  // 建立文章（參數化）
  create(post: CreatePostDto): TE.TaskEither<ApiError, Post> {
    return pipe(
      TE.tryCatch(
        () => fetch(this.baseUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(post)
        }),
        (error): ApiError => ({ type: 'NETWORK', message: 'Network error' })
      ),
      TE.chain(response =>
        response.ok
          ? pipe(
              TE.tryCatch(
                () => response.json() as Promise<Post>,
                (error): ApiError => ({ 
                  type: 'VALIDATION', 
                  errors: ['Invalid response format'] 
                })
              )
            )
          : TE.left({ 
              type: 'SERVER', 
              status: response.status, 
              data: await response.text() 
            })
      )
    );
  }
}

// React Hook 封裝
const usePosts = () => {
  const repository = new PostRepository();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const loadPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    const result = await repository.findAll()();
    
    if (E.isLeft(result)) {
      setError(result.left);
    } else {
      setPosts(result.right);
    }
    
    setLoading(false);
  }, []);

  const createPost = useCallback(async (dto: CreatePostDto) => {
    setLoading(true);
    
    const result = await repository.create(dto)();
    
    if (E.isLeft(result)) {
      setError(result.left);
      return { success: false, error: result.left };
    } else {
      setPosts(prev => [...prev, result.right]);
      return { success: true, data: result.right };
    }
  }, []);

  return { posts, loading, error, loadPosts, createPost };
};
```

### 錯誤傳播比較：前端 vs 後端

**後端錯誤處理鏈：**
```ts
// 1. Controller（邊界）
app.post('/api/posts', async (req, res) => {
  const result = await createPostUseCase(req.body)();
  
  if (E.isLeft(result)) {
    return res.status(400).json({ error: result.left });
  }
  
  return res.status(201).json(result.right);
});

// 2. UseCase（協調）
const createPostUseCase = (dto: CreatePostDto) =>
  pipe(
    validatePost(dto),
    TE.chain(validated => postRepository.create(validated)),
    TE.map(post => ({ success: true, data: post })),
    TE.mapLeft(error => ({ success: false, error }))
  );

// 3. Repository（副作用）
const postRepository = {
  create: (post: ValidatedPost) =>
    TE.tryCatch(
      () => prisma.post.create({ data: post }),
      (error): DatabaseError => ({ type: 'DATABASE', error })
    )
};
```

**前端錯誤處理鏈：**
```tsx
// 1. Component（展示層）
const PostForm = () => {
  const { createPost, error } = usePosts();
  
  const handleSubmit = async (data: FormData) => {
    const result = await createPost(data);
    
    if (!result.success) {
      // 顯示錯誤給使用者
      toast.error(`錯誤: ${formatError(result.error)}`);
      return;
    }
    
    // 成功處理
    router.push(`/posts/${result.data.id}`);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {error && <ErrorDisplay error={error} />}
      {/* ...表單欄位 */}
    </form>
  );
};

// 2. Hook（業務邏輯）
const usePosts = () => {
  const createPost = async (data: FormData) => {
    const result = await postRepository.create(data)();
    
    if (E.isLeft(result)) {
      return { success: false, error: result.left };
    }
    
    return { success: true, data: result.right };
  };
  
  return { createPost };
};

// 3. Repository（API 呼叫）
const postRepository = {
  create: (data: FormData) =>
    pipe(
      TE.tryCatch(
        () => fetch('/api/posts', {
          method: 'POST',
          body: data
        }),
        (error): NetworkError => ({ type: 'NETWORK', message: 'Network error' })
      ),
      TE.chain(response => 
        response.ok
          ? TE.tryCatch(
              () => response.json() as Promise<Post>,
              (error): ValidationError => ({ type: 'VALIDATION', errors: [] })
            )
          : TE.left({ type: 'SERVER', status: response.status })
      )
    )
};
```

**關鍵差異：**

| 層面 | 後端 | 前端 |
|------|------|------|
| **錯誤顯示** | HTTP 狀態碼 + JSON | UI 元件（Toast、Modal） |
| **恢復策略** | 重試、降級、回滾 | 重試、本地儲存、離線模式 |
| **使用者回饋** | 無（給其他系統） | 立即、視覺化 |
| **錯誤類型** | 業務錯誤、系統錯誤 | 網路錯誤、驗證錯誤、UI 錯誤 |

### 練習 3：重構複雜表單狀態（中等）⭐⭐

**任務：** 將以下複雜表單狀態重構為 FP useReducer 模式。

```tsx
// ❌ 命令式版本
const ComplexForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    age: 0,
    address: {
      street: '',
      city: '',
      postalCode: ''
    },
    preferences: {
      newsletter: false,
      notifications: true
    }
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  
  // 混亂的更新邏輯
  const updateField = (field: string, value: any) => {
    setForm(prev => {
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        return {
          ...prev,
          [parent]: {
            ...prev[parent as keyof typeof prev],
            [child]: value
          }
        };
      }
      return { ...prev, [field]: value };
    });
    
    setTouched(prev => ({ ...prev, [field]: true }));
    
    // 即時驗證
    const error = validateField(field, value);
    setErrors(prev => ({
      ...prev,
      [field]: error || undefined
    }));
  };
  
  // 提交邏輯
  const handleSubmit = async () => {
    setSubmitting(true);
    
    const allErrors = validateForm(form);
    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      setSubmitting(false);
      return;
    }
    
    try {
      await submitForm(form);
      // 成功處理...
    } catch (error) {
      setErrors({ submit: '提交失敗' });
    } finally {
      setSubmitting(false);
    }
  };
  
  return <div>...</div>;
};
```

**提示：**
- 使用 useReducer 管理複雜狀態
- 將驗證邏輯抽成純函數
- 用 Either 處理錯誤
- 設計合理的 Action 類型

:::details 💡 參考答案
```tsx
// ✅ FP 版本
type FormField = 
  | 'name' | 'email' | 'age'
  | 'address.street' | 'address.city' | 'address.postalCode'
  | 'preferences.newsletter' | 'preferences.notifications';

type FormState = {
  values: {
    name: string;
    email: string;
    age: number;
    address: {
      street: string;
      city: string;
      postalCode: string;
    };
    preferences: {
      newsletter: boolean;
      notifications: boolean;
    };
  };
  errors: Partial<Record<FormField, string>>;
  touched: Partial<Record<FormField, boolean>>;
  submitting: boolean;
  submitError: string | null;
};

type FormAction = 
  | { type: 'UPDATE_FIELD'; field: FormField; value: any }
  | { type: 'BLUR_FIELD'; field: FormField }
  | { type: 'VALIDATE_FIELD'; field: FormField }
  | { type: 'VALIDATE_ALL' }
  | { type: 'SUBMIT_START' }
  | { type: 'SUBMIT_SUCCESS' }
  | { type: 'SUBMIT_FAILURE'; error: string }
  | { type: 'RESET' };

// 純 reducer 函數
const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'UPDATE_FIELD': {
      const newValues = updateNestedField(state.values, action.field, action.value);
      const newErrors = { ...state.errors };
      delete newErrors[action.field]; // 清除該欄位錯誤
      
      return {
        ...state,
        values: newValues,
        errors: newErrors
      };
    }
    
    case 'BLUR_FIELD':
      return {
        ...state,
        touched: { ...state.touched, [action.field]: true }
      };
      
    case 'VALIDATE_FIELD': {
      const error = validateField(action.field, state.values);
      return {
        ...state,
        errors: error 
          ? { ...state.errors, [action.field]: error }
          : { ...state.errors, [action.field]: undefined }
      };
    }
    
    case 'VALIDATE_ALL': {
      const errors = validateForm(state.values);
      return {
        ...state,
        errors,
        touched: Object.keys(state.values).reduce((acc, key) => ({
          ...acc,
          [key]: true
        }), {})
      };
    }
    
    case 'SUBMIT_START':
      return {
        ...state,
        submitting: true,
        submitError: null
      };
      
    case 'SUBMIT_SUCCESS':
      return {
        ...state,
        submitting: false,
        submitError: null
      };
      
    case 'SUBMIT_FAILURE':
      return {
        ...state,
        submitting: false,
        submitError: action.error
      };
      
    case 'RESET':
      return initialState;
      
    default:
      return state;
  }
};

// Helper：更新嵌套欄位
const updateNestedField = (obj: any, path: string, value: any): any => {
  if (!path.includes('.')) {
    return { ...obj, [path]: value };
  }
  
  const [parent, ...rest] = path.split('.');
  return {
    ...obj,
    [parent]: updateNestedField(obj[parent], rest.join('.'), value)
  };
};

// 純驗證函數
const validateField = (field: FormField, values: FormState['values']): string | null => {
  const value = getNestedValue(values, field);
  
  switch (field) {
    case 'name':
      return value.length < 2 ? '姓名至少需要 2 個字元' : null;
    case 'email':
      return !value.includes('@') ? '請輸入有效的電子郵件' : null;
    case 'age':
      return value < 0 || value > 150 ? '年齡必須在 0-150 之間' : null;
    default:
      return null;
  }
};

const validateForm = (values: FormState['values']): FormState['errors'] => {
  const fields: FormField[] = ['name', 'email', 'age'];
  return fields.reduce((errors, field) => {
    const error = validateField(field, values);
    return error ? { ...errors, [field]: error } : errors;
  }, {});
};

// 自訂 Hook
const useComplexForm = (initialValues?: Partial<FormState['values']>) => {
  const initialState: FormState = {
    values: {
      name: '',
      email: '',
      age: 0,
      address: { street: '', city: '', postalCode: '' },
      preferences: { newsletter: false, notifications: true },
      ...initialValues
    },
    errors: {},
    touched: {},
    submitting: false,
    submitError: null
  };
  
  const [state, dispatch] = useReducer(formReducer, initialState);
  
  const updateField = useCallback((field: FormField, value: any) => {
    dispatch({ type: 'UPDATE_FIELD', field, value });
  }, []);
  
  const handleBlur = useCallback((field: FormField) => {
    dispatch({ type: 'BLUR_FIELD', field });
    dispatch({ type: 'VALIDATE_FIELD', field });
  }, []);
  
  const handleSubmit = useCallback(async (onSubmit: (data: FormState['values']) => Promise<void>) => {
    dispatch({ type: 'VALIDATE_ALL' });
    
    if (Object.keys(state.errors).length > 0) {
      return;
    }
    
    dispatch({ type: 'SUBMIT_START' });
    
    try {
      await onSubmit(state.values);
      dispatch({ type: 'SUBMIT_SUCCESS' });
    } catch (error) {
      dispatch({ 
        type: 'SUBMIT_FAILURE', 
        error: error instanceof Error ? error.message : '提交失敗' 
      });
    }
  }, [state.errors, state.values]);
  
  return {
    state,
    actions: { updateField, handleBlur, handleSubmit },
    isValid: Object.keys(state.errors).length === 0,
    isTouched: Object.keys(state.touched).length > 0
  };
};
```
:::

## 框架實戰：Next.js 15 + App Router

你問：「Next.js 15 怎麼用 FP？」

### Server Components + Server Actions

```js
// app/auth/login/page.tsx
'use client';

import { createLoginUseCase } from '@/lib/fp/auth';

export default function LoginPage() {
  const login = createLoginUseCase({
    authRepository: new AuthRepository(),
  });

  const handleSubmit = async (formData) => {
    const result = await login(formData.get('email'), formData.get('password'));
    if (result.success) {
      window.location.href = '/dashboard';
    } else {
      setError(result.error);
    }
  };

  return (
    <form action={handleSubmit}>
      <input name="email" />
      <input name="password" type="password" />
      <button type="submit">登入</button>
    </form>
  );
}
```

### Server Actions（推薦）

```js
// app/auth/login/action.js
'use server';

import { createLoginUseCase } from '@/lib/fp/auth';

export async function loginAction(formData) {
  const login = createLoginUseCase({
    authRepository: new AuthRepository(),
  });
  
  const result = await login(formData.get('email'), formData.get('password'));
  
  if (result.success) {
    return { success: true, token: result.value.token };
  } else {
    return { success: false, error: result.error };
  }
}
```

```js
// app/auth/login/page.tsx
'use client';

import { loginAction } from './action';

export default function LoginPage() {
  const [error, setError] = useState('');

  const handleSubmit = async (formData) => {
    const result = await loginAction(formData);
    if (result.success) {
      window.location.href = '/dashboard';
    } else {
      setError(result.error);
    }
  };

  return (
    <form action={handleSubmit}>
      <input name="email" />
      <input name="password" type="password" />
      <button type="submit">登入</button>
      {error && <p>{error}</p>}
    </form>
  );
}
```

你沒寫任何 `fetch`，你沒寫任何 `try/catch`，你沒寫任何 `state`。你只寫了純函數和副作用邊界。

這就是 Next.js 15 App Router 的關鍵：**Server Actions 天生就是 FP 的副作用邊界**。

### 為什麼 Server Actions 這麼適合 FP？

因為 Server Actions 強制你把邏輯寫成函數，輸入 FormData，輸出 JSON。這不就是 FP 嗎？

Next.js 15 的 `"use server"` 文件是天然的純函數邊界。你在這裡處理副作用（資料庫、檔案、API），然後返回結果。你的 React Component 只需要呼叫它，不用管裡面怎麼做。

### 完整範例：文章管理系統（Posts CRUD）

光說不練沒意思。來看一個完整的文章管理系統：

```ts
// app/api/posts/actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import * as TE from 'fp-ts/TaskEither';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';

// 1. 定義驗證規則（純函數）
const PostSchema = z.object({
  title: z.string().min(3).max(100),
  content: z.string().min(10).max(5000),
  authorId: z.string().uuid()
});

// 2. 定義錯誤類型（取代 throw）
type PostError = 
  | { type: 'VALIDATION'; message: string }
  | { type: 'NOT_FOUND'; id: string }
  | { type: 'DATABASE'; error: unknown };

// 3. 定義資料庫操作（副作用邊界）
const postRepository = {
  create: (post: z.infer<typeof PostSchema>) => 
    TE.tryCatch(
      () => prisma.post.create({ data: post }),
      (error): PostError => ({ type: 'DATABASE', error })
    ),
  
  update: (id: string, post: Partial<z.infer<typeof PostSchema>>) =>
    TE.tryCatch(
      () => prisma.post.update({ where: { id }, data: post }),
      (error): PostError => ({ type: 'DATABASE', error })
    ),
    
  delete: (id: string) =>
    TE.tryCatch(
      () => prisma.post.delete({ where: { id } }),
      (error): PostError => ({ type: 'DATABASE', error })
    )
};

// 4. 驗證函數（純函數）
const validatePost = (data: unknown) =>
  pipe(
    E.tryCatch(
      () => PostSchema.parse(data),
      (error): PostError => ({ 
        type: 'VALIDATION', 
        message: error instanceof Error ? error.message : 'Validation failed' 
      })
    ),
    TE.fromEither
  );

// 5. Server Action：建立文章
export async function createPostAction(formData: FormData) {
  const rawData = Object.fromEntries(formData);
  
  const result = await pipe(
    validatePost(rawData),
    TE.chain(validated => postRepository.create(validated)),
    TE.map(post => {
      revalidatePath('/posts');
      return { success: true, data: post };
    }),
    TE.mapLeft(error => ({ success: false, error }))
  )();
  
  return result;
}

// 6. Server Action：更新文章
export async function updatePostAction(id: string, formData: FormData) {
  const rawData = Object.fromEntries(formData);
  
  const result = await pipe(
    validatePost(rawData),
    TE.chain(validated => postRepository.update(id, validated)),
    TE.map(post => {
      revalidatePath('/posts');
      revalidatePath(`/posts/${id}`);
      return { success: true, data: post };
    }),
    TE.mapLeft(error => ({ success: false, error }))
  )();
  
  return result;
}

// 7. Server Action：刪除文章
export async function deletePostAction(id: string) {
  const result = await pipe(
    TE.tryCatch(
      () => prisma.post.findUnique({ where: { id } }),
      (error): PostError => ({ type: 'DATABASE', error })
    ),
    TE.chain(post => 
      post 
        ? postRepository.delete(id)
        : TE.left({ type: 'NOT_FOUND', id })
    ),
    TE.map(() => {
      revalidatePath('/posts');
      return { success: true, message: 'Post deleted' };
    }),
    TE.mapLeft(error => ({ success: false, error }))
  )();
  
  return result;
}
```

### Client Component 怎麼用？

```tsx
// app/posts/create/page.tsx
'use client';

import { createPostAction } from '@/app/api/posts/actions';
import { useActionState, useOptimistic } from 'react';

export default function CreatePostPage() {
  const [state, action, isPending] = useActionState(
    async (prevState: State, formData: FormData) => {
      const result = await createPostAction(formData);
      return result.success 
        ? { type: 'success', message: '文章建立成功' }
        : { type: 'error', message: `錯誤: ${result.error.message}` };
    },
    { type: 'idle' }
  );

  const [optimisticPosts, addOptimisticPost] = useOptimistic(
    posts,
    (currentPosts, newPost) => [...currentPosts, newPost]
  );

  const handleSubmit = async (formData: FormData) => {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    
    // 樂觀更新
    addOptimisticPost({ id: 'temp', title, content, createdAt: new Date() });
    
    // 呼叫 Server Action
    const result = await action(formData);
    
    if (result.type === 'error') {
      // 失敗時 UI 會自動回滾
      console.error('建立失敗:', result.message);
    }
  };

  return (
    <form action={handleSubmit}>
      <input name="title" placeholder="標題" />
      <textarea name="content" placeholder="內容" />
      <button type="submit" disabled={isPending}>
        {isPending ? '建立中...' : '發佈文章'}
      </button>
      
      {state.type === 'success' && <p>✅ {state.message}</p>}
      {state.type === 'error' && <p>❌ {state.message}</p>}
    </form>
  );
}
```

看到沒？你沒寫 `useState`、沒寫 `useEffect`、沒寫 `fetch`。你只寫：
- **純函數**：`validatePost`、`PostSchema`
- **副作用邊界**：`postRepository`
- **FP 管道**：`pipe` + `TE.chain`
- **React 內建工具**：`useActionState`、`useOptimistic`

### 進階模式：錯誤處理策略

有兩種錯誤處理模式：

**模式 1：立即返回（適合表單）**
```ts
export async function createPostAction(formData: FormData) {
  const result = await createPost(formData)();
  
  // 錯誤立即返回給 Client
  if (E.isLeft(result)) {
    return { 
      success: false, 
      error: formatError(result.left) 
    };
  }
  
  return { success: true, data: result.right };
}
```

**模式 2：統一處理（適合 API）**
```ts
// app/api/posts/route.ts
export async function POST(req: Request) {
  const formData = await req.formData();
  
  const result = await pipe(
    validatePost(formData),
    TE.chain(postRepository.create),
    TE.map(post => NextResponse.json(post)),
    TE.mapLeft(error => 
      NextResponse.json({ error: formatError(error) }, { status: 400 })
    )
  )();
  
  return result;
}
```

### 快取與重新驗證策略

```ts
// 1. 重新驗證整個頁面
revalidatePath('/posts');

// 2. 重新驗證特定標籤
revalidateTag('posts');

// 3. 延遲重新驗證（批次處理）
export async function batchCreatePosts(posts: FormData[]) {
  const results = await Promise.all(
    posts.map(post => createPostAction(post))
  );
  
  // 所有完成後才重新驗證
  revalidatePath('/posts');
  return results;
}

// 4. 條件式重新驗證
export async function createPostWithCondition(formData: FormData) {
  const result = await createPostAction(formData);
  
  if (result.success && result.data.category === 'important') {
    revalidatePath('/important-posts');
  }
  
  return result;
}
```

### FP + Zod 驗證管道

```ts
import { z } from 'zod';
import * as TE from 'fp-ts/TaskEither';
import { pipe } from 'fp-ts/function';

// 建立驗證管道
const validateWithZod = <T>(schema: z.Schema<T>, data: unknown) =>
  pipe(
    TE.tryCatch(
      () => schema.parseAsync(data),
      (error): ValidationError => ({
        type: 'VALIDATION',
        message: error instanceof z.ZodError 
          ? error.errors.map(e => `${e.path}: ${e.message}`).join(', ')
          : 'Validation failed'
      })
    )
  );

// 組合多個驗證
const validatePostWithPipeline = (data: unknown) =>
  pipe(
    validateWithZod(PostSchema, data),
    TE.chain(validated => validateContentLength(validated)),
    TE.chain(validated => validateTitleUniqueness(validated)),
    TE.chain(validated => validateAuthorPermissions(validated))
  );
```

### 練習 1：重構這個 Server Action（簡單）⭐

**任務：** 將以下命令式 Server Action 重構為 FP 風格。

```ts
// ❌ 命令式版本
export async function updateUserAction(id: string, formData: FormData) {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return { success: false, error: 'User not found' };
    }
    
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
    };
    
    if (!data.name || data.name.length < 2) {
      return { success: false, error: 'Name too short' };
    }
    
    if (!data.email.includes('@')) {
      return { success: false, error: 'Invalid email' };
    }
    
    const updated = await prisma.user.update({
      where: { id },
      data
    });
    
    revalidatePath('/users');
    return { success: true, data: updated };
  } catch (error) {
    return { success: false, error: 'Database error' };
  }
}
```

**提示：**
- 使用 `fp-ts` 的 `TaskEither`
- 把驗證邏輯抽成純函數
- 用 `pipe` 組合操作
- 返回 `Result` 類型

:::details 💡 參考答案
```ts
import * as TE from 'fp-ts/TaskEither';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';
import { revalidatePath } from 'next/cache';

type UserError = 
  | { type: 'NOT_FOUND'; id: string }
  | { type: 'VALIDATION'; message: string }
  | { type: 'DATABASE'; error: unknown };

const validateUserData = (data: { name: string; email: string }) =>
  pipe(
    E.of(data),
    E.filterOrElse(
      d => d.name.length >= 2,
      (): UserError => ({ type: 'VALIDATION', message: 'Name too short' })
    ),
    E.filterOrElse(
      d => d.email.includes('@'),
      (): UserError => ({ type: 'VALIDATION', message: 'Invalid email' })
    ),
    TE.fromEither
  );

export async function updateUserAction(id: string, formData: FormData) {
  const data = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
  };
  
  const result = await pipe(
    TE.tryCatch(
      () => prisma.user.findUnique({ where: { id } }),
      (error): UserError => ({ type: 'DATABASE', error })
    ),
    TE.chain(user => 
      user 
        ? TE.right(user)
        : TE.left({ type: 'NOT_FOUND', id })
    ),
    TE.chain(() => validateUserData(data)),
    TE.chain(validated => 
      TE.tryCatch(
        () => prisma.user.update({ where: { id }, data: validated }),
        (error): UserError => ({ type: 'DATABASE', error })
      )
    ),
    TE.map(updated => {
      revalidatePath('/users');
      return { success: true, data: updated };
    }),
    TE.mapLeft(error => ({ success: false, error }))
  )();
  
  return result;
}
```
:::

### 練習 2：實作批次刪除（中等）⭐⭐

**任務：** 實作一個批次刪除文章的 Server Action，使用 `TaskEither` 序列執行，其中一個失敗時停止後續刪除。

**提示：**
- 使用 `TE.traverseSeqArray` 或 `TE.traverseSeq` 來序列執行
- 需要累積已刪除的文章 ID 以便回滾
- 返回哪些成功、哪些失敗

:::details 💡 參考答案
```ts
export async function batchDeletePostsAction(ids: string[]) {
  const deleteWithRollback = (id: string) => 
    pipe(
      TE.tryCatch(
        () => prisma.post.findUnique({ where: { id } }),
        (error): PostError => ({ type: 'DATABASE', error })
      ),
      TE.chain(post => 
        post 
          ? TE.right(post)
          : TE.left({ type: 'NOT_FOUND', id })
      ),
      TE.chain(post => 
        TE.tryCatch(
          () => prisma.post.delete({ where: { id } }),
          (error): PostError => ({ type: 'DATABASE', error })
        ).map(() => post) // 保留文章資訊以便回滾
      )
    );

  const result = await pipe(
    TE.traverseSeqArray(deleteWithRollback)(ids),
    TE.map(deletedPosts => {
      revalidatePath('/posts');
      return { 
        success: true, 
        deleted: deletedPosts.length,
        posts: deletedPosts 
      };
    }),
    TE.mapLeft((error, failedIndex) => ({
      success: false,
      error,
      failedAt: ids[failedIndex],
      deletedCount: failedIndex // 已成功刪除的數量
    }))
  )();
  
  return result;
}
```
:::

---

## 常見陷阱與解決方案

### 陷阱 1：過度柯里化

```js
// ❌ 過度柯里化
const add = a => b => c => a + b + c;
const addFive = add(5);
const addFiveAndThree = addFive(3);
const result = addFiveAndThree(2);

// ✅ 適度使用
const add = (a, b, c) => a + b + c;
const result = add(5, 3, 2);
```

柯里化是工具，不是目標。你不是在表演魔術，你是在寫程式。

### 陷阱 2：類型複雜爆炸

```ts
// ❌ 類型爆炸
export type LoginResult = 
  | { success: true; value: { token: string; user: { id: string; name: string; email: string } } }
  | { success: false; error: '無效郵箱' | '密碼太短' | '使用者不存在' };

// ✅ 保持簡單
export type Result<T, E = string> = 
  | { success: true; value: T }
  | { success: false; error: E };

export type LoginResult = Result<{ token: string }, '無效郵箱' | '密碼太短' | '使用者不存在'>;
```

你不需要 10 層嵌套的類型。你只需要一個 `Result`，然後把錯誤類型當成泛型參數。

### 陷阱 3：效能問題

```js
// ❌ 大型陣列，每次 map 都創建新陣列
const users = data.map(user => user.name.toUpperCase());
const emails = users.map(user => user.email);
const filtered = emails.filter(email => email.includes('@'));

// ✅ 使用 transducers
import { transduce, map, filter } from 'transducers-js';

const transducer = compose(
  map(user => user.name.toUpperCase()),
  map(user => user.email),
  filter(email => email.includes('@'))
);

const result = transduce(transducer, [], data);
```

你不是在寫 Python，你是在寫 JavaScript。大資料，用 transducers。

## 實戰練習

### 練習 1：目錄結構設計（簡單）⭐

**任務：** 設計一個「文章管理」功能的目錄結構，包含 `domain`、`application`、`infrastructure`、`components`。

**提示：**
- 功能名稱：`posts`
- domain：驗證文章標題、內容長度
- application：建立文章、更新文章
- infrastructure：呼叫 API
- components：`PostForm.tsx`

:::details 💡 參考答案
```bash
src/
└── features/
    └── posts/
        ├── domain/
        │   ├── validateTitle.ts
        │   ├── validateContent.ts
        │   └── index.ts
        ├── application/
        │   ├── createPostUseCase.ts
        │   ├── updatePostUseCase.ts
        │   └── index.ts
        ├── infrastructure/
        │   ├── postRepository.ts
        │   └── index.ts
        ├── components/
        │   ├── PostForm.tsx
        │   └── index.ts
        └── index.ts
```
:::

### 練習 2：程式碼遷移（中等）⭐⭐

**任務：** 將以下程式碼遷移為 FP 架構。使用 `lodash/fp` 和 `Result` 類型。

```js
// before - 現有程式碼
export class PostService {
  async createPost(title, content) {
    if (!title || title.length < 5) {
      throw new Error('標題至少 5 個字');
    }
    if (!content || content.length < 20) {
      throw new Error('內容至少 20 個字');
    }
    const post = await db.post.create({ title, content });
    return post;
  }
}
```

**提示：**
- 把驗證邏輯移到 `domain/`
- 把資料庫呼叫移到 `infrastructure/`
- 使用 `Result` 類型處理錯誤

:::details 💡 參考答案
```js
// domain/validatePost.ts
import { success, failure } from '../../shared/domain/result';

export const validateTitle = (title) =>
  title && title.length >= 5
    ? success(title)
    : failure('標題至少 5 個字');

export const validateContent = (content) =>
  content && content.length >= 20
    ? success(content)
    : failure('內容至少 20 個字');

export const validatePost = (title, content) => {
  const titleResult = validateTitle(title);
  if (!titleResult.success) return titleResult;
  const contentResult = validateContent(content);
  if (!contentResult.success) return contentResult;
  return success({ title, content });
};

// infrastructure/postRepository.ts
import { success, failure } from '../../shared/domain/result';

export class PostRepository {
  async createPost(post) {
    try {
      const result = await db.post.create(post);
      return success(result);
    } catch (error) {
      return failure('建立文章失敗');
    }
  }
}

// application/createPostUseCase.ts
import { createPost } from '../infrastructure/postRepository';
import { validatePost } from '../domain/validatePost';

export const createPostUseCase = (deps) => (title, content) => {
  const validated = validatePost(title, content);
  if (!validated.success) return validated;
  return deps.postRepository.createPost(validated.value);
};
```
:::

### 練習 3：框架整合（挑戰）⭐⭐⭐

**任務：** 在 Next.js 15 中，用 Server Actions 實現一個「刪除文章」功能。使用 `fp-ts` 的 `TaskEither` 處理錯誤。

**提示：**
- Server Action 要用 `use server`
- 使用 `TaskEither` 包裝資料庫操作
- 返回 `{ success: true, message }` 或 `{ success: false, error }`

:::details 💡 參考答案
```js
// app/api/posts/delete/action.js
'use server';

import { pipe } from 'fp-ts/function';
import * as TE from 'fp-ts/TaskEither';
import { PostRepository } from '@/lib/fp/posts/postRepository';

export async function deletePostAction(id) {
  const deletePost = pipe(
    TE.tryCatch(
      () => new PostRepository().delete(id),
      () => '刪除失敗'
    ),
    TE.map(() => ({ success: true, message: '文章已刪除' })),
    TE.mapLeft(() => ({ success: false, error: '刪除失敗' }))
  );

  return await deletePost();
}
```

```js
// app/posts/[id]/delete/page.tsx
'use client';

import { deletePostAction } from './action';

export default function DeletePage({ id }) {
  const handleSubmit = async () => {
    const result = await deletePostAction(id);
    if (result.success) {
      window.location.href = '/posts';
    } else {
      alert(result.error);
    }
  };

  return (
    <form action={handleSubmit}>
      <p>確定要刪除這篇文章嗎？</p>
      <button type="submit">刪除</button>
    </form>
  );
}
```
:::

## FAQ

Q: FP 適合所有專案嗎？

A: 你寫個 5 個頁面的 landing page，用 FP 幹嘛？你寫個 10 萬行程式碼的 SaaS，不用 FP，你會死。

Q: 效能真的會變差嗎？

A: 你用 `map`、`filter` 會變慢？你用 `transducers` 就不會。你用 `fp-ts` 的 `Either` 會變慢？你用 `try/catch` 會更快？你確定？

Q: 如何說服資深同事？

A: 別說「FP 更好」。說：「我剛剛把這個模組的測試時間從 2.3 秒縮到 0.8 秒，而且沒有一個測試是 mock API。」

Q: 什麼時候不該用 FP？

A: 當你連 `map` 都不會用，就別談 `Monad`。當你連 `const` 都不敢用，就別談 `immutable`。先學會走路，再學飛。

Q: 我該用 fp-ts 還是 Ramda？

A: 你用 TypeScript？fp-ts。你用 JavaScript？Ramda。你遷移？lodash/fp。選一個，用到底。別貪心。

## 延伸閱讀

- [FP 概念入門](/concepts/fp/functional-programming-intro)
- [Currying 詳解](/concepts/fp/currying-guide)
- [fp-ts 官方文件](https://gcanti.github.io/fp-ts/)
- [Ramda 文件](https://ramdajs.com/docs/)
- [Effect-TS 入門](https://effect-ts.github.io/effect/)
- [Transducers 與效能](https://medium.com/@cpojer/transducers-in-javascript-78523834165c)

> 你不是在寫 FP，你是在寫更好的程式。別被名詞綁住，用對工具，就對了。

---

## Java FP 案例：Spring Boot + Vavr

前面的例子大多是 JavaScript/TypeScript。但你問：「Java 怎麼辦？」

Java 也有 FP 工具，只是長得不太一樣。最流行的是 **Vavr**（以前叫 javaslang）。

### Vavr 是什麼？

Vavr 是 Java 的 FP 庫，提供：
- `Either<L, R>`：左右兩邊，左邊是錯誤，右邊是成功
- `Try<T>`：可能失敗的運算（取代 try-catch）
- `Option<T>`：可能不存在的值（取代 null）
- `Tuple<T1, T2...>`：異質集合（取代臨時 class）

### 基礎：Either vs try-catch

```java
// ❌ try-catch（命令式）
public User findUser(String id) {
    try {
        User user = repository.findById(id);
        if (user == null) {
            throw new UserNotFoundException(id);
        }
        return user;
    } catch (DataAccessException e) {
        throw new ServiceException("Database error", e);
    }
}

// ✅ Either（FP）
public Either<UserError, User> findUser(String id) {
    return Try.of(() -> repository.findById(id))
        .toEither()
        .mapLeft(e -> new DatabaseError(e))
        .flatMap(user -> 
            user != null
                ? Either.right(user)
                : Either.left(new UserNotFound(id))
        );
}
```

**關鍵差異：**
- try-catch：錯誤是**例外**，會中斷執行
- Either：錯誤是**資料**，可以傳遞、組合

### 完整案例：支付服務

```java
// PaymentService.java
@Service
public class PaymentService {
    
    // 錯誤類型（密封接口）
    public sealed interface PaymentError 
        permits InvalidAmount, InsufficientFunds, PaymentDeclined, NetworkError {}
    
    public record InvalidAmount(BigDecimal amount) implements PaymentError {}
    public record InsufficientFunds(BigDecimal balance, BigDecimal amount) implements PaymentError {}
    public record PaymentDeclined(String reason) implements PaymentError {}
    public record NetworkError(Throwable cause) implements PaymentError {}
    
    private final PaymentGateway gateway;
    private final AccountRepository accountRepo;
    
    @TransactionalEither // 自訂註解，支援 Either 回滾
    public Either<PaymentError, PaymentResult> processPayment(PaymentRequest request) {
        return validateAmount(request.amount())
            .flatMap(validAmount -> 
                checkBalance(request.accountId(), validAmount)
                    .flatMap(account -> 
                        authorizePayment(account, validAmount)
                            .flatMap(auth -> 
                                executeCharge(auth)
                                    .map(transaction -> 
                                        PaymentResult.success(transaction)
                                    )
                            )
                    )
            );
    }
    
    private Either<PaymentError, BigDecimal> validateAmount(BigDecimal amount) {
        return amount.compareTo(BigDecimal.ZERO) > 0
            ? Either.right(amount)
            : Either.left(new InvalidAmount(amount));
    }
    
    private Either<PaymentError, Account> checkBalance(String accountId, BigDecimal amount) {
        return Try.of(() -> accountRepo.findById(accountId))
            .toEither()
            .mapLeft(NetworkError::new)
            .flatMap(account -> 
                account != null && account.balance().compareTo(amount) >= 0
                    ? Either.right(account)
                    : Either.left(new InsufficientFunds(
                        account != null ? account.balance() : BigDecimal.ZERO, 
                        amount
                    ))
            );
    }
    
    private Either<PaymentError, PaymentAuth> authorizePayment(Account account, BigDecimal amount) {
        return Try.of(() -> gateway.authorize(account.id(), amount))
            .toEither()
            .mapLeft(e -> new NetworkError(e))
            .flatMap(auth -> 
                auth.isApproved()
                    ? Either.right(auth)
                    : Either.left(new PaymentDeclined(auth.declineReason()))
            );
    }
    
    private Either<PaymentError, Transaction> executeCharge(PaymentAuth auth) {
        return Try.of(() -> gateway.charge(auth))
            .toEither()
            .mapLeft(e -> new NetworkError(e));
    }
}

// Controller
@RestController
@RequestMapping("/api/payments")
public class PaymentController {
    
    private final PaymentService service;
    
    @PostMapping
    public ResponseEntity<?> createPayment(@RequestBody PaymentRequest request) {
        return service.processPayment(request)
            .fold(
                error -> ResponseEntity.badRequest().body(toProblemDetail(error)),
                success -> ResponseEntity.ok(success)
            );
    }
    
    private ProblemDetail toProblemDetail(PaymentError error) {
        return switch (error) {
            case InvalidAmount a -> ProblemDetail.forStatusAndDetail(
                HttpStatus.BAD_REQUEST, 
                "Invalid amount: " + a.amount()
            );
            case InsufficientFunds f -> ProblemDetail.forStatusAndDetail(
                HttpStatus.BAD_REQUEST,
                String.format("Insufficient funds. Balance: %s, Required: %s", 
                    f.balance(), f.amount())
            );
            case PaymentDeclined d -> ProblemDetail.forStatusAndDetail(
                HttpStatus.BAD_REQUEST,
                "Payment declined: " + d.reason()
            );
            case NetworkError n -> ProblemDetail.forStatusAndDetail(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "Network error"
            );
        };
    }
}
```

### 為什麼要用 Vavr + Spring Boot？

1. **類型安全**：編譯器強制你處理所有錯誤路徑
2. **可組合性**：`flatMap` 鏈可以輕鬆擴展邏輯
3. **可測試性**：純函數不需要 Spring 容器
4. **錯誤處理一致性**：所有服務返回同樣的 `Either` 類型

### 練習 5：重構 Java 服務（中等）⭐⭐

**任務：** 將以下傳統 Spring Boot 服務重構為 Vavr Either 版本。

```java
// ❌ 傳統版本
@Service
public class OrderService {
    
    @Autowired
    private OrderRepository orderRepo;
    @Autowired
    private InventoryService inventory;
    @Autowired
    private EmailService emailService;
    
    @Transactional
    public OrderResult createOrder(CreateOrderDto dto) {
        try {
            // 檢查庫存
            boolean inStock = inventory.checkStock(dto.productId(), dto.quantity());
            if (!inStock) {
                return OrderResult.error("商品庫存不足");
            }
            
            // 計算價格
            BigDecimal price = inventory.getPrice(dto.productId())
                .multiply(BigDecimal.valueOf(dto.quantity()));
            
            if (dto.discountCode() != null) {
                price = applyDiscount(price, dto.discountCode());
            }
            
            // 建立訂單
            Order order = new Order();
            order.setProductId(dto.productId());
            order.setQuantity(dto.quantity());
            order.setTotalPrice(price);
            order.setStatus("CREATED");
            order.setCreatedAt(LocalDateTime.now());
            
            Order saved = orderRepo.save(order);
            
            // 發送確認信（不影響主交易）
            try {
                emailService.sendOrderConfirmation(dto.email(), saved.getId());
            } catch (Exception e) {
                log.warn("Failed to send email: {}", e.getMessage());
            }
            
            return OrderResult.success(saved);
            
        } catch (DataAccessException e) {
            log.error("Database error", e);
            return OrderResult.error("系統錯誤");
        } catch (Exception e) {
            log.error("Unexpected error", e);
            return OrderResult.error("未知錯誤");
        }
    }
}
```

**要求：**
- 使用 Vavr Either 處理錯誤
- 定義合理的錯誤類型（ADT）
- 確保 email 發送失敗不影響訂單建立
- 使用 `flatMap` 組合驗證鏈

:::details 💡 參考答案
```java
// ✅ FP 版本
@Service
public class OrderServiceFP {
    
    public sealed interface OrderError 
        permits OutOfStock, InvalidDiscount, DatabaseError, EmailError {}
    
    public record OutOfStock(String productId, int requested) implements OrderError {}
    public record InvalidDiscount(String code) implements OrderError {}
    public record DatabaseError(Throwable cause) implements OrderError {}
    public record EmailError(Throwable cause) implements OrderError {}
    
    private final OrderRepository orderRepo;
    private final InventoryService inventory;
    private final EmailService emailService;
    
    @TransactionalEither
    public Either<OrderError, Order> createOrder(CreateOrderDto dto) {
        return checkStock(dto.productId(), dto.quantity())
            .flatMap(inStock -> inStock 
                ? Either.right(dto)
                : Either.left(new OutOfStock(dto.productId(), dto.quantity()))
            )
            .flatMap(validDto -> 
                calculatePrice(validDto.productId(), validDto.quantity())
                    .flatMap(price -> 
                        applyDiscountIfNeeded(price, validDto.discountCode())
                            .flatMap(finalPrice -> 
                                createAndSaveOrder(validDto, finalPrice)
                                    .flatMap(order -> 
                                        sendConfirmationEmail(validDto.email(), order)
                                            .map(() -> order)
                                    )
                            )
                    )
            );
    }
    
    private Either<OrderError, Boolean> checkStock(String productId, int quantity) {
        return Try.of(() -> inventory.checkStock(productId, quantity))
            .toEither()
            .mapLeft(DatabaseError::new);
    }
    
    private Either<OrderError, BigDecimal> calculatePrice(String productId, int quantity) {
        return Try.of(() -> 
            inventory.getPrice(productId)
                .multiply(BigDecimal.valueOf(quantity))
        )
        .toEither()
        .mapLeft(DatabaseError::new);
    }
    
    private Either<OrderError, BigDecimal> applyDiscountIfNeeded(
        BigDecimal price, 
        String discountCode
    ) {
        if (discountCode == null) {
            return Either.right(price);
        }
        
        return Try.of(() -> applyDiscount(price, discountCode))
            .toEither()
            .mapLeft(e -> 
                e instanceof InvalidDiscountException
                    ? new InvalidDiscount(discountCode)
                    : new DatabaseError(e)
            );
    }
    
    private Either<OrderError, Order> createAndSaveOrder(
        CreateOrderDto dto, 
        BigDecimal finalPrice
    ) {
        return Try.of(() -> {
            Order order = new Order();
            order.setProductId(dto.productId());
            order.setQuantity(dto.quantity());
            order.setTotalPrice(finalPrice);
            order.setStatus("CREATED");
            order.setCreatedAt(LocalDateTime.now());
            
            return orderRepo.save(order);
        })
        .toEither()
        .mapLeft(DatabaseError::new);
    }
    
    private Either<OrderError, Void> sendConfirmationEmail(String email, Order order) {
        return Try.run(() -> 
            emailService.sendOrderConfirmation(email, order.getId())
        )
        .toEither()
        .mapLeft(EmailError::new)
        .orElse(() -> {
            // Email 失敗不影響訂單，只記錄日誌
            log.warn("Failed to send confirmation email for order {}", order.getId());
            return Either.right(null);
        });
    }
}
```
:::

### 什麼時候該用 Java FP？

**用：**
- 複雜業務邏輯（銀行、支付、電商）
- 需要嚴格錯誤處理的系統
- 團隊有 FP 基礎
- 專案生命週期長（3+ 年）

**別用：**
- 簡單 CRUD 後台
- 原型驗證階段
- 團隊全是 OOP 背景
- 時間緊迫的專案

**工具建議：**
- **Vavr**：通用 FP 庫
- **functionaljava**：更純粹的 FP
- **jOOλ**：Java 8 的擴展
- **Arrow**（Kotlin）：如果是 Kotlin 專案

---

## FAQ
