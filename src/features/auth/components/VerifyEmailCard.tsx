import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

import type { AuthStatus } from "../interfaces/auth.interface";

interface VerifyEmailCardProps {
	status: AuthStatus;
	message: string;
}

const VerifyEmailCard = ({ status, message }: VerifyEmailCardProps) => {
	const navigate = useNavigate();

	return (
		<div className="flex min-h-screen items-center justify-center p-4">
			<div className="w-full max-w-md p-6 bg-white border border-zinc-200 rounded-xl shadow-lg space-y-4 text-center">
				{/* Título de la sección */}
				<h1 className="text-2xl font-bold tracking-tight text-zinc-900">
					Verificación de Cuenta
				</h1>

				{/* Mensaje dinámico según el estado de la petición */}
				<p
					className={`text-sm ${
						status === "error"
							? "text-red-500 font-medium"
							: status === "success"
								? "text-green-600 font-medium"
								: "text-zinc-500"
					}`}
				>
					{message}
				</p>

				{/* 🎯 El botón para ir al login solo aparece cuando la carga termina (éxito o fallo) */}
				{status !== "loading" && (
					<Button
						onClick={() => navigate("/login")}
						className="w-full mt-2 bg-zinc-900 text-white rounded-md py-2 text-sm font-medium hover:bg-zinc-800 active:scale-98 transition-all cursor-pointer"
					>
						Ir al Inicio de Sesión
					</Button>
				)}
			</div>
		</div>
	);
};

export default VerifyEmailCard;
