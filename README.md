# Projects & Expenses Tracker — Frontend

This is the frontend for the take-home assignment.

It’s a simple React app that connects to the backend APIs to manage projects and track expenses against each project’s budget.

The focus here was functionality and clear data flow rather than heavy UI polish, since the assignment specifically mentioned that perfect styling wasn’t expected.

---

## Tech Stack

* React (Vite)
* Tailwind CSS
* Axios

---

## How to Run Locally

### 1. Clone the repo

```bash
git clone <repo-link>
cd kea-tracker-client
```

---

### 2. Install dependencies

```bash
npm install
```

If running fresh setup, make sure these are installed:

```bash
npm install axios react-icons
```

---

### 3. Start development server

```bash
npm run dev
```

App will run on:

```
http://localhost:5173
```

---

## Backend Connection

The frontend expects the backend to run on:

```
http://localhost:5000
```

If your backend runs on a different port, update the base URL in:

```
src/api/projectApi.js
```

Example:

```js
const API = "http://localhost:5000/api";
```

---

## Folder Structure

```
src/
│
├── api/
│   └── projectApi.js
│
├── components/
│   ├── ProjectCard.jsx
│   ├── ExpenseTable.jsx
│   ├── AddProjectModal.jsx
│   └── AddExpenseForm.jsx
│
├── pages/
│   └── ProjectsPage.jsx
│
├── App.jsx
└── main.jsx
```

I kept the structure simple and component-based so each feature is isolated and reusable.

---

## Features Implemented

### Projects

* View all projects
* Budget summary per project
* Remaining budget calculation
* Add new project via modal

---

### Expenses

Inside each project (accordion view):

* View expenses list
* Add expense
* Delete expense
* Budget updates automatically after changes

---

## UI Behavior

* Projects displayed as expandable cards
* Clicking a project expands expense details
* Forms are inline for quick data entry
* Tailwind used for fast, utility-based styling

---

## Assumptions

* No authentication required
* All users can manage all projects
* Currency formatting kept simple
* Focus was on functionality over design polish

---

## What I’d Improve With More Time

If this were extended further, I’d add:

* Edit expense modal
* Project edit/delete UI
* Budget progress bars
* Toast notifications
* Form validation feedback
* Better responsive layout

---

Overall, the frontend was built to cleanly consume the backend APIs and demonstrate project/expense data flow in a simple, readable UI.
