import { useEffect, useRef } from "react"; // 🎯 1. CORREGIDO: Importamos useRef
import { useNavigate, useSearchParams } from "react-router-dom";

import VerifyEmailCard from "@/features/auth/components/VerifyEmailCard";
import { useAuth } from "@/features/auth/hooks/useAuth";

const VerifyEmail = () => {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();

	const { status, message, executeEmailVerification } = useAuth();

	const token = searchParams.get("token");

	// 🎯 2. Creamos una referencia persistente que arranca en false
	const hasDispatched = useRef(false);

	useEffect(() => {
		if (!token) return;

		// 🎯 3. CANDADO REAL: Si la referencia ya es true, bloqueamos la ejecución de inmediato
		if (hasDispatched.current) return;

		// Marcamos que la petición ya va en viaje para la próxima milésima de segundo
		hasDispatched.current = true;

		executeEmailVerification(token);
	}, [token, executeEmailVerification]);

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
