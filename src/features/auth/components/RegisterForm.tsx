import { LoaderCircle } from "lucide-react";
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

interface RegisterFormProps {
	setAlias: (alias: string) => void;
	setEmail: (email: string) => void;
	setPassword: (password: string) => void;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	isLoading: boolean;
}

const RegisterForm = ({
	setAlias,
	setEmail,
	setPassword,
	handleSubmit,
	isLoading,
}: RegisterFormProps) => {
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
							<Label htmlFor="alias">Alias</Label>
							<Input
								id="alias"
								type="text"
								placeholder="@example"
								required
								onChange={(e) => setAlias(e.target.value)}
							/>
						</div>
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
							<Button type="submit" disabled={isLoading}>
								{isLoading ? (
									<div className="flex items-center justify-center gap-2">
										<LoaderCircle className="animate-spin" />
										<span className="animate-pulse">
											Procesando petición...
										</span>
									</div>
								) : (
									"Crear cuenta"
								)}
							</Button>
						</div>
					</div>
				</form>
			</CardContent>
		</Card>
	);
};

export default RegisterForm;
