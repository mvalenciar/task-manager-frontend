import axios from "axios";

export const taskApi = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

//Interceptor de peticiones
taskApi.interceptors.request.use(
	(config) => {
		//1. Obtenemos el token del local storage
		const token = localStorage.getItem("task_token");

		// 2. Si el token existe, se lo inyectamos de forma estricta al header Authorization
		if (token && config.headers) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

//Interceptor de respuesta actual (Encargado de limpiar el local storage en caso de error 401)
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
