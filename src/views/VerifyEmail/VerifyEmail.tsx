import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import VerifyEmailCard from "@/features/auth/components/VerifyEmailCard";

import { useAuth } from "@/features/auth/hooks/useAuth";

const VerifyEmail = () => {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();

	const { status, message, executeEmailVerification } = useAuth();

	const token = searchParams.get("token");

	// Ejecuta la verificación de email cuando se cargue la página
	useEffect(() => {
		if (!token) {
			return;
		}

		executeEmailVerification(token);
	}, [token, executeEmailVerification]);

	// Si el estado es "success", redirige al /login después de 3 segundos de forma automática
	useEffect(() => {
		if (status === "success") {
			const timer = setTimeout(() => {
				navigate("/login");
			}, 3000);

			return () => clearTimeout(timer);
		}
	}, [status, navigate]);

	return <VerifyEmailCard status={status} message={message} />;
};

export default VerifyEmail;
