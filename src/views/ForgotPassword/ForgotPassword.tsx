import { ForgotPasswordForm } from "@/features/auth/components/ForgotPasswordForm";
import { useUser } from "@/features/auth/hooks/useUser";

const ForgotPassword = () => {
	const { setEmail, executeForgotPassword, isLoading } = useUser();

	const onHandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		await executeForgotPassword(e);
	};
	return (
		<div className="flex min-h-screen items-center justify-center p-4">
			<ForgotPasswordForm
				setEmail={setEmail}
				handleSubmit={onHandleSubmit}
				isLoading={isLoading}
			/>
		</div>
	);
};

export default ForgotPassword;
