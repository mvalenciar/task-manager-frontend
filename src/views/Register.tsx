import { useState } from "react";

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

const Register = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(email, password);

		try {
			const response = await taskApi.post("/users/register", {
				email,
				password,
			});

			alert(response.data.message);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Card className="w-full max-w-sm mx-auto my-5">
			<CardHeader>
				<CardTitle>Crea tu cuenta</CardTitle>
				<CardDescription>
					Ingresa tu email y contraseña para crear una cuenta de usuario.
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
							<Button>Crear cuenta</Button>
						</div>
					</div>
				</form>
			</CardContent>
		</Card>
	);
};

export default Register;
