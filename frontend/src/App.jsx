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
import View from "./components/employee/View";
import Edit from "./components/employee/Edit";

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
                </Route>
                <Route
                    path="/employee-dashboard"
                    element={<EmployeeDashboard />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
