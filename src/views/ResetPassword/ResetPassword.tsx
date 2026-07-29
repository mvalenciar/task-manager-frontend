import { useNavigate, useSearchParams } from "react-router-dom";
import { ResetPasswordForm } from "@/features/auth/components/ResetPasswordForm";
import { useUser } from "@/features/auth/hooks/useUser";

const ResetPassword = () => {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();

	const { setPassword, executeResetPassword, isLoading } = useUser();

	const token = searchParams.get("token");

	const onHandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		if (!token) {
			alert("❌ El token de recuperación es obligatorio o está malformado.");
			return;
		}

		const success = await executeResetPassword(token, e);

		if (success) {
			navigate("/login");
		}
	};

	return (
		<div className="flex min-h-screen items-center justify-center p-4">
			<ResetPasswordForm
				setPassword={setPassword}
				handleSubmit={onHandleSubmit}
				isLoading={isLoading}
			/>
		</div>
	);
};

export default ResetPassword;
