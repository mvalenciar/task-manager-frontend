import { Route, Routes } from "react-router-dom";

import Dashboard from "@/views/Dashboard";
import Login from "@/views/Login";
import Register from "@/views/Register";
import ProtectedRoute from "./ProtectedRoute";

export const AppRoutes = () => {
	return (
		<Routes>
			{/* 🔓 RUTAS PÚBLICAS */}
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />

			{/* 🔒 RUTAS PROTEGIDAS */}
			<Route element={<ProtectedRoute />}>
				<Route path="/dashboard" element={<Dashboard />} />
			</Route>
		</Routes>
	);
};
