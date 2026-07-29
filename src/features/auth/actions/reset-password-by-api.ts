import axios from "axios";

import { taskApi } from "@/services/api";

import type { ResetPasswordResponse } from "../interfaces/resetPasswordResponse.interface";

export const resetPasswordByApi = async (
	token: string,
	password: string,
): Promise<ResetPasswordResponse> => {
	try {
		const response = await taskApi.post("/users/reset-password", {
			token,
			password,
		});
		return {
			success: true,
			message: response.data.message || "¡Tu contraseña ha sido cambiada!",
		};
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return {
				success: false,
				message:
					error.response?.data?.error ||
					"El token es inválido o ya ha expirado.",
			};
		}
		return {
			success: false,
			message: "Error de conexión con el servidor.",
		};
	}
};
