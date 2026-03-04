# 🎟️ CS-Ticket System

A professional customer support ticket management system built with **React** and **Tailwind CSS**. This project allows users to manage service tickets, track progress, and organize tasks with a premium UI/UX experience.

---

## 🚀 Features & Progress

- **Dynamic Hero Section:** Real-time counters for "In-Progress" and "Resolved" tickets with premium card designs and background vectors.
- **Ticket Queue:** Fetches ticket data from a local JSON file using `async/await`.
- **Interactivity:** Clicking a ticket moves it to the 'Task Status' section.
- **Task Management:** Allows marking tickets as "Resolved," moving them to the final completed section.
- **Modern Notifications:** Integrated `react-hot-toast` for real-time feedback.
- **Responsive Navbar:** Clean navigation with a "New Ticket" action button.

---

## 📚 React Fundamentals (Q&A)

### 1. What is JSX, and why is it used?

**JSX (JavaScript XML)** is a syntax extension for JavaScript used with React. It looks like HTML but works within JavaScript.

- **Why it's used:** It makes writing React components easier and more readable by allowing us to write the structure of the UI (HTML-like) directly inside logic (JS). It also gets optimized for performance during build time.

### 2. What is the difference between State and Props?

| Feature        | Props                                | State                                    |
| :------------- | :----------------------------------- | :--------------------------------------- |
| **Definition** | Data passed from parent to child.    | Data managed within the component.       |
| **Mutability** | Immutable (Read-only for the child). | Mutable (Can be changed via `setState`). |
| **Control**    | Controlled by the parent component.  | Managed by the component itself.         |

### 3. What is the `useState` hook, and how does it work?

`useState` is a hook that allows React functional components to have a "memory" (state).

- **How it works:** It returns an array with two values: the **current state** and a **function** to update that state.
- _Example:_ `const [count, setCount] = useState(0);` - here `count` is the data, and `setCount` updates it, triggering a re-render.

### 4. How can you share state between components in React?

In React, state is shared by **Lifting State Up**. This involves moving the state to the closest common parent of the components that need the data. The parent then passes the state down via **Props**.
_(In this project, we lifted the counts to `App.jsx` to share them between `Hero` and `CTicket`)._

### 5. How is event handling done in React?

Event handling in React is similar to DOM elements but with some syntax differences:

- Events are named using **camelCase** (e.g., `onClick` instead of `onclick`).
- You pass a **function** as the event handler instead of a string.
- _Example:_ `<button onClick={handleComplete}>Complete</button>`

---

## 🛠️ Technologies Used

- **Frontend:** React.js, Tailwind CSS
- **Icons:** Lucide-React
- **Alerts:** React Hot Toast
- **Data:** Local JSON Fetching

---

## 🏁 How to Run

1. Clone the repository.
2. Run `npm install`.
3. Run `npm run dev`.
