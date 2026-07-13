import { ArrowRight, CheckCircle2, ShieldCheck, Zap } from "lucide-react";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Home = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("task_token");
		if (token) {
			navigate("/dashboard");
		}
	}, [navigate]);

	return (
		<div className="flex flex-col items-center justify-center min-h-[85vh] text-center px-4">
			{/* 🚀 BADGE SUPERIOR DE BIENVENIDA */}
			<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-800 text-xs font-medium mb-6 animate-fade-in animate-duration-500">
				<Zap className="h-3 w-3 text-amber-500 fill-amber-500" />
				Plataforma de Productividad v1.0
			</div>

			{/* 📢 TÍTULO PRINCIPAL IMPONENTE */}
			<h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-900 max-w-3xl leading-tight">
				Gestiona tus proyectos y tareas en{" "}
				<span className="bg-linear-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
					Tiempo Real
				</span>
			</h1>

			{/* 📝 DESCRIPCIÓN CORPORATIVA */}
			<p className="mt-4 text-base sm:text-lg text-zinc-500 max-w-2xl leading-relaxed">
				Una suite moderna diseñada con arquitectura desacoplada, persistencia
				relacional en SQLite y validación estricta de seguridad digital. Toma el
				control absoluto de tus flujos de trabajo.
			</p>

			{/* 🎛️ BOTÓN DE ACCIÓN DE ENTRADA */}
			<div className="mt-8">
				<Button
					size="lg"
					className="font-semibold shadow-lg hover:shadow-xl transition-all duration-300 gap-2 cursor-pointer bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl px-8 py-6 text-base"
					onClick={() => navigate("/login")}
				>
					Ingresar a la Plataforma
					<ArrowRight className="h-4 w-4" />
				</Button>
			</div>

			{/* 📊 TARJETA DE CARACTERÍSTICAS TÉCNICAS (FEATURES) */}
			<div className="mt-16 w-full max-w-4xl">
				<Card className="bg-white/70 border-zinc-200/80 backdrop-blur-md shadow-xl rounded-2xl overflow-hidden">
					<CardContent className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 sm:p-10">
						{/* Feature 1 */}
						<div className="flex flex-col items-center text-center p-4">
							<div className="h-10 w-10 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600 mb-4">
								<Zap className="h-5 w-5" />
							</div>
							<h3 className="font-bold text-zinc-900 text-base">
								Reactividad Sincronizada
							</h3>
							<p className="text-xs text-zinc-500 mt-2 leading-relaxed">
								Actualizaciones fluidas en la interfaz utilizando Custom Hooks
								optimizados y control de renderizado eficiente.
							</p>
						</div>

						{/* Feature 2 */}
						<div className="flex flex-col items-center text-center p-4">
							<div className="h-10 w-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-4">
								<CheckCircle2 className="h-5 w-5" />
							</div>
							<h3 className="font-bold text-zinc-900 text-base">
								Persistencia Robusta
							</h3>
							<p className="text-xs text-zinc-500 mt-2 leading-relaxed">
								Base de datos SQLite operada mediante Prisma ORM para garantizar
								consultas relacionales seguras y veloces.
							</p>
						</div>

						{/* Feature 3 */}
						<div className="flex flex-col items-center text-center p-4">
							<div className="h-10 w-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-4">
								<ShieldCheck className="h-5 w-5" />
							</div>
							<h3 className="font-bold text-zinc-900 text-base">
								Seguridad Perimetral
							</h3>
							<p className="text-xs text-zinc-500 mt-2 leading-relaxed">
								Autenticación mediante JSON Web Tokens (JWT) cifrados que
								protegen tus rutas e información privada contra intrusos.
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default Home;
