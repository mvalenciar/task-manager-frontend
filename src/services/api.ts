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
		if (axios.isAxiosError(error)) {
			const isLoginRequest = error.config?.url?.includes("/users/login");
			const unAuthorized: boolean =
				error.response?.status === 401 && !isLoginRequest;
			if (unAuthorized) {
				localStorage.removeItem("task_token");
				alert(
					"⚠️ Tu sesión ha expirado por seguridad. Por favor, inicia sesión nuevamente.",
				);

				window.location.href = "/login";
			}
		}

		return Promise.reject(error);
	},
);
