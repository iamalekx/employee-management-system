import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBaseRoutes from "./utils/RoleBaseRoutes";
import AdminSummary from "./components/dashboard/AdminSummary";
import DepartmentsList from "./components/departments/DepartmentsList";
import AddDepartments from "./components/departments/AddDepartments";
import EditDepartment from "./components/departments/EditDepartment";
import EmployeeList from "./components/employee/EmployeeList";
import AddEmployee from "./components/employee/AddEmployee";
import Edit from "./components/employee/Edit";
import View from "./components/employee/View";
import AddSalary from "./components/salary/AddSalary";
import ViewSalary from "./components/salary/ViewSalary";
import EmpSummary from "./components/employeeDashboard/EmpSummary";
import LeaveList from "./components/leave/LeaveList";
import AddLeave from "./components/leave/AddLeave";
import Settings from "./components/employeeDashboard/Settings";
import LeaveTable from "./components/leave/LeaveTable";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="admin-dashboard" />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/admin-dashboard"
                    element={
                        <PrivateRoutes>
                            <RoleBaseRoutes requiredRole={["admin"]}>
                                <AdminDashboard />
                            </RoleBaseRoutes>
                        </PrivateRoutes>
                    }
                >
                    <Route index element={<AdminSummary />}></Route>
                    <Route
                        path="/admin-dashboard/departments"
                        element={<DepartmentsList />}
                    ></Route>
                    <Route
                        path="/admin-dashboard/add-department"
                        element={<AddDepartments />}
                    ></Route>
                    <Route
                        path="/admin-dashboard/department/:id"
                        element={<EditDepartment />}
                    ></Route>
                    <Route
                        path="/admin-dashboard/employees"
                        element={<EmployeeList />}
                    ></Route>
                    <Route
                        path="/admin-dashboard/add-employee"
                        element={<AddEmployee />}
                    ></Route>
                    <Route
                        path="/admin-dashboard/employees/:id"
                        element={<View />}
                    ></Route>
                    <Route
                        path="/admin-dashboard/employee/edit/:id"
                        element={<Edit />}
                    ></Route>
                    <Route
                        path="/admin-dashboard/employees/salary/:id"
                        element={<ViewSalary />}
                    ></Route>
                    <Route
                        path="/admin-dashboard/salary/add"
                        element={<AddSalary />}
                    ></Route>
                    <Route
                        path="/admin-dashboard/leaves"
                        element={<LeaveTable />}
                    ></Route>
                </Route>
                <Route
                    path="/employee-dashboard"
                    element={
                        <PrivateRoutes>
                            <RoleBaseRoutes
                                requiredRole={["admin", "employee"]}
                            >
                                <EmployeeDashboard />
                            </RoleBaseRoutes>
                        </PrivateRoutes>
                    }
                >
                    <Route index element={<EmpSummary />}></Route>
                    <Route
                        path="/employee-dashboard/profile/:id"
                        element={<View />}
                    ></Route>
                    <Route
                        path="/employee-dashboard/leaves"
                        element={<LeaveList />}
                    ></Route>
                    <Route
                        path="/employee-dashboard/add-leave"
                        element={<AddLeave />}
                    ></Route>
                    <Route
                        path="/employee-dashboard/salary/:id"
                        element={<ViewSalary />}
                    ></Route>
                    <Route
                        path="/employee-dashboard/settings"
                        element={<Settings />}
                    ></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
