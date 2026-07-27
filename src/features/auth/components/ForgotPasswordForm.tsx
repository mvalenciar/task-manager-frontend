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
}

export const ForgotPasswordForm = ({
	setEmail,
	handleSubmit,
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
							<Button>Enviar</Button>
						</div>
					</div>
				</form>
			</CardContent>
		</Card>
	);
};
