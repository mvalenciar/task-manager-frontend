import axios from "axios";
import { taskApi } from "@/services/api";

interface VerifyEmailResponse {
	success: boolean;
	message: string;
}

export const verifyEmailByApi = async (
	cryptoToken: string,
): Promise<VerifyEmailResponse> => {
	try {
		const response = await taskApi.get(
			`/users/verify-email?token=${cryptoToken}`,
		);
		return {
			success: true,
			message: response.data.message || "¡Cuenta activada con éxito!",
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
			message: "Hubo un error inesperado de conexión con el servidor.",
		};
	}
};
