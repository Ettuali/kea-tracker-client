# Projects & Expenses Tracker — Frontend

This is the frontend implementation for the take-home technical assessment.

It is a React application that connects to backend APIs to manage projects and track expenses against each project’s allocated budget.

The primary focus of this implementation was functionality, API integration, and clear data flow rather than heavy UI polish, as the assignment specified that perfect styling was not required.

---

## Tech Stack

- React (Vite)
- Tailwind CSS
- Axios

---

## Live Application

Frontend (Vercel):
[https://kea-tracker-client-podl.vercel.app/](https://kea-tracker-client-podl.vercel.app/)

---

## How to Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/Ettuali/kea-tracker-client.git
cd kea-tracker-client
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Configure environment variables

Create a `.env` file in the root:

```env
VITE_API_URL=http://localhost:5000/api
```

---

### 4. Start development server

```bash
npm run dev
```

App will run on:

```
http://localhost:5173
```

---

## Backend Connection

Production API:

```
https://kea-tracker-server.onrender.com/api
```

Local API:

```
http://localhost:5000/api
```

Base URL is configured in:

```
src/api/projectApi.js
```

Example:

```js
const API = import.meta.env.VITE_API_URL;
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

The structure is intentionally simple and component-based so that each feature remains isolated and reusable.

---

## Features Implemented

### Projects

- View all projects
- Budget summary per project
- Remaining budget calculation
- Add new project via modal

---

### Expenses

Inside each project (accordion view):

- View expenses list
- Add expense
- Delete expense
- Automatic budget updates after changes

---

## UI Behavior

- Projects displayed as expandable cards
- Clicking a project expands expense details
- Inline forms for quick data entry
- Tailwind used for fast, utility-based styling

---

## Assumptions

- No authentication required
- All users can manage all projects
- Currency formatting kept simple
- Focus prioritized functionality over design polish

---

## What I’d Improve With More Time

If this project were extended further, I would implement:

- Server-side pagination for projects and expenses
- Backend-powered search & filtering (instead of client-side search)
- Edit expense modal
- Project edit & delete functionality
- Budget utilization progress bars
- Toast notifications
- Form validation feedback
- Improved responsive layout

---

## Summary

The frontend was built to cleanly consume backend APIs while demonstrating project and expense data flow in a simple, readable, and maintainable UI aligned with the scope of the assignment.
