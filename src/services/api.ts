import axios from "axios";

export const taskApi = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

taskApi.interceptors.response.use(
	(response) => response,
	async (error) => {
		const unAuthorized: boolean =
			error.response && error.response.status === 401;
		if (unAuthorized) {
			localStorage.removeItem("task_token");
			alert(
				"⚠️ Tu sesión ha expirado por seguridad. Por favor, inicia sesión nuevamente.",
			);

			window.location.href = "/login";
		}
		return Promise.reject(error);
	},
);
