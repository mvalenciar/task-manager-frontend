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

interface ForgotPasswordFormProps {
	setEmail: (email: string) => void;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	isLoading: boolean;
}

export const ForgotPasswordForm = ({
	setEmail,
	handleSubmit,
	isLoading,
}: ForgotPasswordFormProps) => {
	return (
		<Card className="w-full max-w-sm mx-auto my-5">
			<CardHeader>
				<CardTitle>Recuperación de contraseña</CardTitle>
				<CardDescription>
					Ingresa tu email al cual te enviaremos un enlace para restablecer tu
					contraseña.
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
									"Enviar enlace"
								)}
							</Button>
						</div>
					</div>
				</form>
			</CardContent>
		</Card>
	);
};
