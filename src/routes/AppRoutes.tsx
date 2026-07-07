import { Route, Routes } from "react-router-dom";
import Login from "@/views/Login";
import Register from "@/views/Register";

export const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
		</Routes>
	);
};
