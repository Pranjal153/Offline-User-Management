# Offline User Management

An **offline-first React Native application** for managing users.
The app fetches users from a GraphQL API, stores them locally using SQLite, and performs **all CRUD operations offline** using Redux.

---

## ✨ Features

- 📥 Fetch users from GraphQL (`listZellerCustomers`)
- 💾 Offline-first storage using **SQLite**
- 🧠 Predictable state management with **Redux Toolkit**
- ➕ Add new users (local only)
- ✏️ Edit existing users (local only)
- 🗑 Delete users (local only)
- 🔍 Search users by name
- 🧭 Filter users by role (All / Admin / Manager)
- 🔄 Background sync (GraphQL → SQLite)
- 📱 Works on **iOS & Android**

---

## 🧱 Architecture

```
GraphQL (Apollo Client)
        ↓   (sync only)
SQLite (Local Database)
        ↓   (single source of truth)
Redux (State Management)
        ↓
UI (React Native)
```

### Key Principles
- Redux never talks directly to the network
- UI always reads from SQLite via Redux
- GraphQL is used only for background sync
- All user CRUD operations work without internet

---

## 📂 Folder Structure

```
src/
 ├── api/            # Apollo client & GraphQL queries
 ├── db/             # SQLite setup & tables
 ├── repositories/   # SQLite data access layer
 ├── store/          # Redux store, slices & thunks
 ├── screens/        # UI screens (UserList, AddUser)
 ├── navigation/     # App navigation
 └── utils/          # Helper functions
```

---

## 🚀 How to Run the App

### 1️⃣ Install Dependencies
```bash
yarn install
```

### 2️⃣ iOS Setup
```bash
cd ios
pod install
cd ..
```

### 3️⃣ Run the App

#### iOS
```bash
yarn ios
```

#### Android
```bash
yarn android
```

---

## 🔐 Environment Setup

Configure your GraphQL credentials in `aws-exports.js` or `.env`:

```
aws_appsync_graphqlEndpoint=YOUR_ENDPOINT
aws_appsync_apiKey=YOUR_API_KEY
```

⚠️ Do not commit real credentials.

---

## 🔄 App Startup Flow

1. SQLite table is created (if not exists)
2. Cached users are loaded from SQLite
3. GraphQL sync runs in background
4. Fresh data is saved to SQLite
5. Redux reloads data from SQLite
6. UI updates automatically

---

## 🧪 Offline Support

- Turn off internet
- App continues to:
  - Show users
  - Add users
  - Update users
  - Delete users

---

## 🧠 Design Decision

This project follows an **offline-first architecture** where:
- SQLite is the single source of truth
- Redux manages UI state
- Apollo GraphQL is used only for synchronization

---

## 👤 Author

Pranjal Pansuriya  
React Native Developer

---

## 📄 License

This project is for evaluation and learning purposes.
