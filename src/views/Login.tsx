import { useState } from "react";
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
import { taskApi } from "@/services/api";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const response = await taskApi.post("/users/login", {
				email,
				password,
			});

			localStorage.setItem("task_token", response.data.token);

			alert("¡Inicio de sesión exitoso!");
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div>
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
									<a
										href="https://example.com"
										className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
									>
										olvidaste tu contraseña?
									</a>
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
								<Button>Ingresar</Button>
							</div>
							<div className="grid gap-2">
								<Link to="/register">¿No tienes cuenta? Regístrate aquí</Link>
							</div>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
};

export default Login;
