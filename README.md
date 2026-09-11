# 🍽 RestroCloud Frontend

A full-featured React frontend for the RestroCloud Spring Boot API.

## 🚀 Setup & Run

### 1. Install dependencies
```bash
npm install
```

### 2. Start the dev server
```bash
npm run dev
```


> ✅ All API calls are proxied to `http://localhost:8081` via Vite's proxy config.

---

## ⚠️ Spring Boot CORS Setup

Add this to your Spring Boot app so the browser can call the API:

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
            .allowedOrigins("http://localhost:3000")
            .allowedMethods("GET","POST","PUT","DELETE","PATCH","OPTIONS")
            .allowedHeaders("*")
            .allowCredentials(true);
    }
}
```

Or if you use Spring Security, add `.cors(Customizer.withDefaults())` to your SecurityFilterChain.

---

## 📁 Project Structure

```
src/
├── api/
│   └── index.js          ← All API calls (axios, JWT attached automatically)
├── components/
│   ├── Layout.jsx         ← Sidebar + topbar shell
│   ├── Layout.module.css
│   ├── UI.jsx             ← All reusable components (Button, Modal, Card, etc.)
│   └── UI.module.css
├── context/
│   └── AuthContext.jsx    ← JWT auth state
├── pages/
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   ├── DashboardPage.jsx
│   ├── MenuPage.jsx
│   ├── TablesPage.jsx
│   ├── OrdersPage.jsx
│   ├── PaymentsPage.jsx
│   └── SettingsPage.jsx
├── constants.js           ← Enums, colors, emojis
├── App.jsx                ← Routes
├── main.jsx               ← Entry point
└── index.css              ← Global CSS variables
```

## 🔐 Auth Flow

1. User registers via `/auth/signUp`
2. User logs in via `/auth/login` → gets JWT token
3. JWT stored in `localStorage`
4. Every API request automatically sends `Authorization: Bearer <token>`
5. Logout clears localStorage

## 📦 Tech Stack
- React 18 + Vite
- React Router v6
- Axios
- React Hot Toast
