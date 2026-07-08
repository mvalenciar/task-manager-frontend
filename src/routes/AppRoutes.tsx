import { Route, Routes } from "react-router-dom";

import Dashboard from "@/views/Dashboard/Dashboard";
import Login from "@/views/Login/Login";
import Register from "@/views/Register/Register";
import ProtectedRoute from "./ProtectedRoute";
import DotPattern from "@/layout/dot-pattern";

export const AppRoutes = () => {
	return (
		<Routes>
			<Route element={<DotPattern />}>
				{/* 🔓 RUTAS PÚBLICAS */}
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />

				{/* 🔒 RUTAS PROTEGIDAS */}
				<Route element={<ProtectedRoute />}>
					<Route path="/dashboard" element={<Dashboard />} />
				</Route>
			</Route>
		</Routes>
	);
};
