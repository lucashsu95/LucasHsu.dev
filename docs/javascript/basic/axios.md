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

URL:`https://hp-api.onrender.com/api/spells`

```tsx
// /src/pages/spells.tsx
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";

interface ApiResponse {
  id: number;
  name: string;
  description: string;
}

export default function Sec1() {
  const [data, setData] = useState<ApiResponse[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          "https://hp-api.onrender.com/api/spells"
        );
        setData(response.data);
      } catch (err: unknown) {
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
    <>
      <table className="border border-slate-600 m-5">
        <tbody>
          <tr>
            <td className="border-[5px] p-[5px] ">ID</td>
            <td className="border-[5px] p-[5px] ">name</td>
            <td className="border-[5px] p-[5px] ">description</td>
          </tr>
          {data.map((d) => (
            <tr key={d.id}>
              <td className="border-[5px] p-[5px] ">{d.id}</td>
              <td className="border-[5px] p-[5px] ">{d.name}</td>
              <td className="border-[5px] p-[5px] ">{d.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
```

依上面的方式

換成打這支`https://datausa.io/api/data?drilldowns=Nation&measures=Population`來做做看
::: details 看答案
```tsx
import axiosInstance from "@/lib/axios";
import { useEffect, useState } from "react";

interface ApiData {
  ["ID Nation"]: string;
  Nation: string;
  ["ID Year"]: number;
  Year: string;
  Population: number;
  ["Slug Nation"]: string;
}

export default function Sec2() {
  const [data, setData] = useState<ApiData[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          "https://datausa.io/api/data?drilldowns=Nation&measures=Population"
        );
        console.log(response.data);
        setData(response.data.data);
      } catch (err: unknown) {
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
    <>
      <table className="border border-slate-600 m-5">
        <tbody>
          <tr>
            <td className="border-[5px] p-[5px] ">ID Nation</td>
            <td className="border-[5px] p-[5px] ">Nation</td>
            <td className="border-[5px] p-[5px] ">ID Year</td>
            <td className="border-[5px] p-[5px] ">Year</td>
            <td className="border-[5px] p-[5px] ">Population</td>
            <td className="border-[5px] p-[5px] ">Slug Nation</td>
          </tr>
          {data.map((v) => (
            <tr key={v.Population}>
              <td className="border-[5px] p-[5px] ">{v["ID Nation"]}</td>
              <td className="border-[5px] p-[5px] ">{v.Nation}</td>
              <td className="border-[5px] p-[5px] ">{v["ID Year"]}</td>
              <td className="border-[5px] p-[5px] ">{v.Year}</td>
              <td className="border-[5px] p-[5px] ">{v.Population}</td>
              <td className="border-[5px] p-[5px] ">{v["Slug Nation"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
```
:::

## 使用者 增修改查 User CURD

### 後端

可以下載後端程式碼(python-Flask)

[lucashsu95/user-mvc-with-flask](https://github.com/lucashsu95/user-mvc-with-flask?tab=readme-ov-file)

### 前端

`axios.ts`的`baseURL`改成[`http://127.0.0.1:5000/api/`](http://127.0.0.1:5000/api/)

```tsx
// users/index.import axiosInstance from "@/lib/axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "@/components/ui/button";

interface User{
  id: number;
  name: string;
  email: string;
}

interface ApiResponse {
  success: boolean;
  data: User[];
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
  }, [state]);

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
      <section className="wrap space-y-5">
        <h1 className="text-2xl font-bold">User List</h1>

        <Button className="bg-sky-500 w-max">
          <Link href={"/users/create"}>新增使用者</Link>
        </Button>

        <table className="w-[800px] rounded-md overflow-hidden shadow divide-y divide-gray-200">
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
      </section>
    </div>
  );
}
```

```tsx
// users/create.tsx
import axiosInstance from "@/lib/axios";
import Link from "next/link";
import Button from "@/components/ui/button";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";

interface UserForm {
  name: string;
  email: string;
}

const UserPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<UserForm | null>({
    name: "",
    email: "",
  });

  if (!formData) return <div>Loading...</div>;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axiosInstance.post(`users`, formData);
    router.push("/users");
  };

  return (
    <div className="wraps">
      <form
        onSubmit={handleSubmit}
        className="w-[400px] wrap mx-auto space-y-3 mt-5"
      >
        <Link href="/users" className="link">
          Back to Users
        </Link>
        <h1 className="text-xl font-bold">新增使用者</h1>
        <section className="space-y-5">
          <p>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              className="input"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) =>
                  prev ? { ...prev, name: e.target.value } : prev
                )
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
                setFormData((prev) =>
                  prev ? { ...prev, email: e.target.value } : prev
                )
              }
            />
          </p>
        </section>
        <Button className="mt-2">新增</Button>
      </form>
    </div>
  );
};

export default UserPage;
```


```tsx
// users/[id].tsximport axiosInstance from "@/lib/axios";
import Link from "next/link";
import Button from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface FormData {
  id: number;
  name: string;
  email: string;
}

const UserPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [formData, setFormData] = useState<FormData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`users/${id}`);
        setFormData({
          id: res.data.id,
          name: res.data.name,
          email: res.data.email,
        });
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  if (!formData) return <div>User not found</div>;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`users/${formData.id}`, formData);
      router.push("/users");
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  return (
    <div className="wraps">
      <form
        onSubmit={handleSubmit}
        className="w-[400px] wrap mx-auto space-y-3 mt-5"
      >
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
                setFormData((prev) => ({ ...prev!, name: e.target.value }))
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
                setFormData((prev) => ({ ...prev!, email: e.target.value }))
              }
            />
          </p>
        </section>
        <Button className="mt-2">儲存</Button>
      </form>
    </div>
  );
};

export default UserPage;
```