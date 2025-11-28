# Employee Management System — User Guide

This document summarizes the main functionality of the Employee Management System for two user roles: Admin and Employee. It covers UI behavior, important screens, API endpoints used by the frontend, and verification steps.

---

## Quick Project Overview

-   Frontend: React + Vite (folder: `frontend/`)
-   Backend: Node.js + Express + MongoDB (folder: `server/`)
-   Authentication: JWT stored in `localStorage` under key `token`
-   Main route groups:
    -   Admin area: `/admin-dashboard/*`
    -   Employee area: `/employee-dashboard/*`

---

## Admin Functionality

### 1. Dashboard

-   Route: `/admin-dashboard`
-   Displays summary stats and navigation for admin operations.

### 2. Departments

-   List departments: `/admin-dashboard/departments`
-   Admin can add department: `/admin-dashboard/add-department`
-   Admin can edit department: `/admin-dashboard/department/:id`

Backend endpoints:

-   GET `/api/departments` — list
-   POST `/api/departments/add` — add
-   PUT `/api/departments/:id` — edit
-   DELETE `/api/departments/:id` — delete

Frontend components:

-   `frontend/src/components/departments/DepartmentsList.jsx`
-   `frontend/src/components/departments/AddDepartments.jsx`
-   `frontend/src/components/departments/EditDepartment.jsx`

### 3. Employees

-   Manage employees: `/admin-dashboard/employees`
-   Add employee: `/admin-dashboard/add-employee`
-   View employee: `/admin-dashboard/employees/:id`
-   Edit employee: `/admin-dashboard/employee/edit/:id`

Backend endpoints:

-   GET `/api/employees` — list
-   GET `/api/employees/department/:id` — employees by department (used in salary form)
-   POST `/api/employees/add` — add
-   PUT `/api/employees/:id` — update

Frontend components:

-   `frontend/src/components/employee/EmployeeList.jsx`
-   `frontend/src/components/employee/AddEmployee.jsx`
-   `frontend/src/components/employee/View.jsx`
-   `frontend/src/components/employee/Edit.jsx`

### 4. Salary Management

-   Admin can add salary: `/admin-dashboard/salary/add`
-   View salary history for an employee: `/admin-dashboard/employees/salary/:id`

Backend endpoints:

-   POST `/api/salary/add` — add salary
-   GET `/api/salary/:id` — returns salary records for an employee (controller supports receiving either an `employee._id` or a `user._id` and resolves correctly)

Frontend components:

-   `frontend/src/components/salary/AddSalary.jsx`
-   `frontend/src/components/salary/ViewSalary.jsx`

### 5. Settings / Change Password (Admin & Employee)

-   Route: `/employee-dashboard/settings` (also accessible through admin route if needed)
-   PUT `/api/settings/change-password` — expects `{ userId, oldPassword, newPassword }` in the request body. Protected by auth middleware.
-   Frontend component: `frontend/src/components/employeeDashboard/Settings.jsx` — sends `userId` and password fields.

---

## Employee Functionality

### 1. Dashboard

-   Route: `/employee-dashboard`
-   Shows personal summary and quick links (profile, leaves, salary, settings)

### 2. Profile

-   View profile: `/employee-dashboard/profile/:id` — component `frontend/src/components/employee/View.jsx`

### 3. My Leaves

-   View personal leaves: `/employee-dashboard/leaves` — uses `LeaveList.jsx` which requests `/api/leave/:userId` and displays personal leave records.

### 4. My Salary

-   View salary: `/employee-dashboard/salary/:id` — uses the same `ViewSalary.jsx` component. The backend GET `/api/salary/:id` handler resolves whether `:id` is a User.\_id or Employee.\_id.

### 5. Settings

-   Change password via the settings page: PUT `/api/settings/change-password`.

---

## Authentication & Middleware

-   Middleware: `server/middlewares/authMiddleware.js` verifies `Authorization: Bearer <token>` and sets `req.user`.
-   Token storage: frontend stores JWT in `localStorage` under `token` (e.g. `localStorage.setItem('token', response.data.token)` on login).

---

## Data Shapes (Important fields)

-   User: `User` model (auth info) — used by frontend via `useAuth` context. `user._id` is the JWT subject.
-   Employee: stores `userId` (ref to User) and `employeeId` string used in UI.
-   Leave: references `employeeId` (Employee.\_id), stores `leaveType`, `startDate`, `endDate`, `reason`, `status`.
-   Salary: references `employeeId` (Employee.\_id), stores `basicSalary`, `allowances`, `deductions`, `netSalary`, `payDate`.

---

## Developer Notes & Known Gotchas

-   Some components expect populated references (e.g., `leave.employeeId.userId.name`) — the backend should `populate()` employee references before returning records. The controllers were updated to populate where needed.
-   When adding a leave, the frontend sends the logged-in `User._id` as `userId`. The `addLeave` controller converts that `userId` to `Employee._id` before storing the leave record.
-   Salary `GET /api/salary/:id` has a resilient controller that first tries to query by `employeeId`, and if none found, looks up Employee by `userId` and retries. This allows both admin (employee.\_id) and employee (user.\_id) to view salary history.
-   Some earlier issues in the project stemmed from typos (e.g., `useerId` vs `userId`) or returning JSX from inside an event handler — those have been fixed.

---

## How to run locally (dev)

1. Setup environment variables (in server `.env`):
    - `PORT` (e.g., 3000)
    - `MONGODB_URI`
    - `JWT_KEY`
2. Start backend:
    ```bash
    cd server
    npm install
    npm run dev # or npm start depending on scripts
    ```
3. Start frontend:
    ```bash
    cd frontend
    npm install
    npm run dev
    ```
4. Login through the UI to set `localStorage.token` and then navigate to admin or employee dashboards.

---

## Next steps and suggestions

-   Add small integration tests for key routes: `/api/leave` and `/api/salary/:id` to assert the response shapes.
-   Normalize prop names across UI components (prefer `id` lowercase for consistency).
-   Improve date calculations for leave duration to handle month/year boundaries using date diff (ms) logic.
-   Add UI messages for server errors instead of `alert()` for a better user experience.

---

If you'd like, I can:

-   Expand this doc into separate `ADMIN_GUIDE.md` and `EMPLOYEE_GUIDE.md` files.
-   Generate an API reference page listing all endpoints and sample requests/responses.
-   Create a short troubleshooting section showing how to debug common issues (token missing, 401, populate null, etc.).
