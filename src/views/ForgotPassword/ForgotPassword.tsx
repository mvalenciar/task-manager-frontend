import { ForgotPasswordForm } from "@/features/auth/components/ForgotPasswordForm";
import { useUser } from "@/features/auth/hooks/useUser";

const ForgotPassword = () => {
	const { setEmail, executeForgotPassword, isLoading } = useUser();

	const onHandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		await executeForgotPassword(e);
	};
	return (
		<ForgotPasswordForm
			setEmail={setEmail}
			handleSubmit={onHandleSubmit}
			isLoading={isLoading}
		/>
	);
};

export default ForgotPassword;
