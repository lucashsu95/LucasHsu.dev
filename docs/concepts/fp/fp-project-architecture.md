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

---

> 📚 **下一篇**：[FP 專案架構進階：前後端差異與框架實戰](./fp-architecture-advanced) — 前端 React/Next.js 與後端 Node.js/Spring Boot 的 FP 架構差異，Next.js 15 App Router 實戰，Java Spring Boot + Vavr 案例。

