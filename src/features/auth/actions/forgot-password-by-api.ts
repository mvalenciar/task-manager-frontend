import axios from "axios";
import { taskApi } from "@/services/api";
import type { ForgotPasswordResponse } from "../interfaces/forgotPasswordResponse.interface";

export const forgotPasswordByApi = async (
	email: string,
): Promise<ForgotPasswordResponse> => {
	try {
		const response = await taskApi.post("users/forgot-password", { email });
		return {
			success: true,
			message:
				response.data.message ||
				"Se ha enviado un correo electrónico con un enlace para restablecer la contraseña.",
		};
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return {
				success: false,
				message:
					error.response?.data?.error || "Error al solicitar la recuperación.",
			};
		} else {
			return {
				success: false,
				message: "Error de conexión con el servidor.",
			};
		}
	}
};
