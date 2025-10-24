import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBaseRoutes from "./utils/RoleBaseRoutes";
import AdminSummary from "./components/dashboard/AdminSummary";
import DepartmentsList from "./components/departments/DepartmentsList";

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
                    <Route path="/admin-dashboard/departments" element={<DepartmentsList />}></Route>
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
