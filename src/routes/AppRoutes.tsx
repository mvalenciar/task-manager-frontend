import { Route, Routes } from "react-router-dom";

import DotPattern from "@/layout/dot-pattern";
import Dashboard from "@/views/Dashboard/Dashboard";
import ForgotPassword from "@/views/ForgotPassword/ForgotPassword";
import Home from "@/views/Home/Home";
import Login from "@/views/Login/Login";
import Register from "@/views/Register/Register";
import VerifyEmail from "@/views/VerifyEmail/VerifyEmail";

import ProtectedRoute from "./ProtectedRoute";

export const AppRoutes = () => {
	return (
		<Routes>
			<Route element={<DotPattern />}>
				{/* 🔓 RUTAS PÚBLICAS */}
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/verify-email" element={<VerifyEmail />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />

				{/* 🔒 RUTAS PROTEGIDAS */}
				<Route element={<ProtectedRoute />}>
					<Route path="/dashboard" element={<Dashboard />} />
				</Route>
			</Route>
		</Routes>
	);
};
