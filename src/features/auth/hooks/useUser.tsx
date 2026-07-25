import axios from "axios";
import { useState } from "react";
import { registerByApi } from "../actions/register-by-api";

export const useUser = () => {
	const [alias, setAlias] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const executeRegister = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const response = await registerByApi(alias, email, password);
			alert(response.data.message || "¡Registro exitoso!");
			return true; // Retornamos verdadero para avisarle a la vista que puede navegar
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const errorMessage =
					error.response?.data?.error || "Error al conectar con el servidor.";
				alert(`❌ ${errorMessage}`);
			} else {
				console.error(error);
			}
			return false;
		}
	};

	return {
		// Values
		alias,
		email,
		password,

		// Actions
		setAlias,
		setEmail,
		setPassword,
		executeRegister,
	};
};
