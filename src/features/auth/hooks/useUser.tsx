import axios from "axios";
import { useState } from "react";

import { forgotPasswordByApi } from "../actions/forgot-password-by-api";
import { loginByApi } from "../actions/login-by-api";
import { registerByApi } from "../actions/register-by-api";
import { resetPasswordByApi } from "../actions/reset-password-by-api";

export const useUser = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [alias, setAlias] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const executeRegister = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
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
		} finally {
			setIsLoading(false);
		}
	};

	const executeLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const response = await loginByApi(email, password);
			localStorage.setItem("task_token", response.data.token);
			alert("¡Inicio de sesión exitoso!");
			return true;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const errorMessage =
					error.response?.data?.error || "Error al conectar con el servidor.";
				alert(`❌ ${errorMessage}`);
			} else {
				console.error(error);
			}
			return false;
		} finally {
			setIsLoading(false);
		}
	};

	const executeForgotPassword = async (
		e: React.FormEvent<HTMLFormElement>,
	): Promise<boolean> => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const result = await forgotPasswordByApi(email);
			alert(result.message);
			return result.success;
		} catch (error) {
			console.error(error);
			return false;
		} finally {
			setIsLoading(false);
		}
	};

	const executeResetPassword = async (
		token: string,
		e: React.FormEvent<HTMLFormElement>,
	): Promise<boolean> => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const result = await resetPasswordByApi(token, password);

			alert(result.message);
			return result.success;
		} catch (error) {
			console.error(error);
			return false;
		} finally {
			setIsLoading(false);
		}
	};

	return {
		// Values
		alias,
		email,
		password,
		isLoading,

		// Actions
		setIsLoading,
		setAlias,
		setEmail,
		setPassword,
		executeRegister,
		executeLogin,
		executeForgotPassword,
		executeResetPassword,
	};
};
