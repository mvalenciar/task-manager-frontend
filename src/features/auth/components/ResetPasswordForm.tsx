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

interface ResetPasswordFormProps {
	setPassword: (password: string) => void;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	isLoading: boolean;
}

export const ResetPasswordForm = ({
	setPassword,
	handleSubmit,
	isLoading,
}: ResetPasswordFormProps) => {
	return (
		<Card className="w-full max-w-sm mx-auto my-5">
			<CardHeader>
				<CardTitle>Recuperación de contraseña</CardTitle>
				<CardDescription>
					Ingresa la nueva contraseña para cambiarla.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit}>
					<div className="flex flex-col gap-6">
						<div className="grid gap-2">
							<Label htmlFor="password">Contraseña</Label>
							<Input
								id="password"
								type="password"
								placeholder="new_password"
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
									"Restablecer contraseña"
								)}
							</Button>
						</div>
					</div>
				</form>
			</CardContent>
		</Card>
	);
};
