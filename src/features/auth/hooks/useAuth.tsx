import { useCallback, useState } from "react";
import { verifyEmailByApi } from "../actions/verify-email-by-api";
import type { AuthStatus } from "../interfaces/auth.interface";

export const useAuth = () => {
	// Estado verificación de email
	const [status, setStatus] = useState<AuthStatus>("loading");

	// Declaración de estado para el mensaje de verificación
	const [message, setMessage] = useState(
		"Procesando verificación perimetral...",
	);

	const executeEmailVerification = useCallback(async (token: string) => {
		const result = await verifyEmailByApi(token);

		if (result.success) {
			setStatus("success");
			setMessage(`✅ ${result.message}`);
		} else {
			setStatus("error");
			setMessage(`❌ ${result.message}`); // ➔ ¡Captura el error semántico real del backend!
		}
	}, []);

	return {
		// Values
		status,
		message,

		// Actions
		executeEmailVerification,
	};
};
