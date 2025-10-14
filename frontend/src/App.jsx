import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/login";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="admin-dashboard" />} />
                <Route path="/login" element={<Login/>} />
                <Route path="/admin-dashboard" element={<AdminDashboard/>} />
            </Routes> 
        </BrowserRouter>
    );
}

export default App;
