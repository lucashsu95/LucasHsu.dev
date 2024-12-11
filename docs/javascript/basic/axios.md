---
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: axios,javascript
  - - meta
    - name: og:title
      content: javascript - axios
  - - meta
    - name: og:description
      content: 使用axios實作
  - - meta
    - name: og:type
      content: article
  - - meta
    - name: og:image
      content: https://lucashsu95.github.io/LucasHsu.dev/javascript/export-import.html
---

# Axios - javascript

## 下載

::: code-group

```bash [npm]
npm i axios
```
```bash [pnpm]
pnpm add axios
```
```bash [yarn]
yarn add axios
```
:::

## 初始化

創建`src/lib/axios.ts`

```tsx
import axios,{AxiosInstance} from "axios";

const axiosInstance:AxiosInstance = axios.create({
    baseURL: "",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    }
});

export default axiosInstance;
```

## Get！發送請求

使用api

```jsx
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";

interface ApiResponse {
  success: boolean;
  data: {
    id: number;
    name: string;
    email: string;
  }[];
  message: string;
}

export default function Home() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosInstance.get(
          "https://hp-api.onrender.com/api/spells"
        );
        setData(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      }
    };
    fetchData();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Data from API</h1> <pre>{JSON.stringify(data, null, 2)}</pre>{" "}
    </div>
  );
}
```

## 使用者 增修改查 User CURD

### 後端

可以下載後端程式碼(python-Flask)

[lucashsu95/user-mvc-with-flask](https://github.com/lucashsu95/user-mvc-with-flask?tab=readme-ov-file)

### 前端

`axios.ts`的`baseURL`改成[`http://127.0.0.1:5000/api/`](http://127.0.0.1:5000/api/)

```tsx
// users/index.tsx
import axiosInstance from "@/lib/axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "@/components/ui/button";

interface ApiResponse {
  success: boolean;
  data: {
    id: number;
    name: string;
    email: string;
  }[];
  message: string;
}

export default function Home() {
  const [state, setState] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get<ApiResponse>("users");
        setState(res.data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axiosInstance.delete(`users/${id}`);
      const res = await axiosInstance.get<ApiResponse>("users");
      setState(res.data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  if (error) return <div>Error:{error}</div>;
  if (!state) return <div>Loading...</div>;

  return (
    <div className="wraps flex-col">
      <h1 className="text-xl font-bold mb-5">User List</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {state.data.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
              <td>
                <Button className="bg-amber-400">
                  <Link href={`/users/${user.id}`}>編輯</Link>
                </Button>
                <Button
                  className="bg-rose-400 sm:ms-1"
                  onClick={() => handleDelete(user.id)}
                >
                  刪除
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

```


```tsx
// users/[id].tsx
import { GetServerSideProps } from "next";
import axiosInstance from "@/lib/axios";
import Link from "next/link";
import Button from "@/components/ui/button";
import { useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

interface ApiResponse {
  success: boolean;
  data: User;
  message: string;
}

interface UserPageProps {
  req: ApiResponse;
}

const UserPage = ({ req }: UserPageProps) => {
  const user = req.data;

  const [formData, setFormData] = useState<User | null>({
    id: user.id,
    name: user.name,
    email: user.email,
  });

  if(!formData) return <div>Loading...</div>;

  const onSubmit = () => {};
  return (
    <div className="wraps">
      <form action="" className="w-[400px] wrap mx-auto space-y-3 mt-5">
        <Link href="/users" className="link">
          Back to Users
        </Link>
        <h1 className="text-xl font-bold">修改使用者</h1>
        <section className="space-y-5">
          <p>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              className="input"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => prev ? { ...prev, name: e.target.value } : prev)
              }
            />
          </p>
          <p>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              className="input"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => prev ? { ...prev, email: e.target.value } : prev)
              }
            />
          </p>
        </section>
        <Button onClick={onSubmit} className="mt-2">
          儲存
        </Button>
      </form>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const res = await axiosInstance.get<User>(`users/${id}`);
  const req = res.data;

  return {
    props: {
      req,
    },
  };
};

export default UserPage;
```