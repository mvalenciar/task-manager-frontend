import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
	const token = localStorage.getItem("task_token");

	if (!token) {
		return <Navigate to="/login" />;
	} else {
		return <Outlet />;
	}
};

export default ProtectedRoute;
