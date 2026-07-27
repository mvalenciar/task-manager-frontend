import { ForgotPasswordForm } from "@/features/auth/components/ForgotPasswordForm";
import { useUser } from "@/features/auth/hooks/useUser";

const ForgotPassword = () => {
	const { setEmail, executeForgotPassword } = useUser();

	const onHandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		const success = await executeForgotPassword(e);
	};
	return (
		<ForgotPasswordForm setEmail={setEmail} handleSubmit={onHandleSubmit} />
	);
};

export default ForgotPassword;
