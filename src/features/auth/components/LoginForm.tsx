import { LoaderCircle } from "lucide-react";

import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LoginFormProps {
	setEmail: (email: string) => void;
	setPassword: (password: string) => void;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	isLoading: boolean;
}

export const LoginForm = ({
	setEmail,
	setPassword,
	handleSubmit,
	isLoading,
}: LoginFormProps) => {
	return (
		<Card className="w-full max-w-sm mx-auto my-5">
			<CardHeader>
				<CardTitle>Inicia Sesión</CardTitle>
				<CardDescription>
					Ingresa tu email y contraseña para ingresar a tu cuenta.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit}>
					<div className="flex flex-col gap-6">
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="email@example.com"
								required
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="grid gap-2">
							<div className="flex items-center">
								<Label htmlFor="password">Contraseña</Label>

								<Link
									to="/forgot-password"
									className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
								>
									olvidaste tu contraseña?
								</Link>
							</div>
							<Input
								aria-label="password"
								id="password"
								type="password"
								required
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<div className="grid gap-2">
							<Button
								type="submit"
								disabled={isLoading}
								className={`w-full transition-all ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
							>
								{isLoading ? (
									<div className="flex items-center justify-center gap-2">
										<LoaderCircle className="animate-spin" />
										<span className="animate-pulse">
											Procesando petición...
										</span>
									</div>
								) : (
									"Ingresar"
								)}
							</Button>
						</div>
						<div className="grid gap-2">
							<Link to="/register">¿No tienes cuenta? Regístrate aquí</Link>
						</div>
					</div>
				</form>
			</CardContent>
		</Card>
	);
};
