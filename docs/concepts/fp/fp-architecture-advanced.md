---
outline: [2,3]
title: FP 專案架構進階：前後端差異與框架實戰 | LucasHsu.dev
description: 前端 React/Next.js 與後端 Node.js/Spring Boot 的 FP 架構差異，Next.js 15 App Router 實戰，Java Spring Boot + Vavr 案例
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: FP 架構, 前端 FP, 後端 FP, Next.js 15, App Router, Server Actions, Spring Boot, Vavr, Java FP
  - - meta
    - property: og:title
      content: FP 專案架構進階：前後端差異與框架實戰
  - - meta
    - property: og:description
      content: 前端 React/Next.js 與後端 Node.js/Spring Boot 的 FP 架構差異，Next.js 15 App Router 實戰，Java Spring Boot + Vavr 案例
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:image
      content: https://lucashsu95.github.io/LucasHsu.dev/images/javascript-cover.webp
  - - meta
    - name: description
      content: 前端 React/Next.js 與後端 Node.js/Spring Boot 的 FP 架構差異，Next.js 15 App Router 實戰，Java Spring Boot + Vavr 案例
  - - meta
    - name: robots
      content: index, follow
  - - meta
    - property: og:url
      content: https://lucashsu95.github.io/LucasHsu.dev/concepts/fp/fp-architecture-advanced
  - - meta
    - property: og:site_name
      content: Lucas Hsu Blog
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: FP 專案架構進階：前後端差異與框架實戰
  - - meta
    - name: twitter:description
      content: 前端 React/Next.js 與後端 Node.js/Spring Boot 的 FP 架構差異，Next.js 15 App Router 實戰，Java Spring Boot + Vavr 案例
---

# FP 專案架構進階：前後端差異與框架實戰

> 📝 TL;DR：前端用 `useReducer` + Either，後端用 Repository + Result。Next.js 15 的 Server Actions 天生就是 FP 副作用邊界。Java 用 Vavr 的 Either 取代 try-catch。

> 尚未讀基礎？先回到 [基礎篇：新專案與遷移策略](./fp-project-architecture) 了解目錄結構設計與遷移策略再繼續。

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
