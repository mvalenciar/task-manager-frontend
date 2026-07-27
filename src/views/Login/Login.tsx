import { useNavigate } from "react-router-dom";

import { LoginForm } from "@/features/auth/components/LoginForm";

import { useUser } from "@/features/auth/hooks/useUser";

const Login = () => {
	const { setEmail, setPassword, executeLogin } = useUser();

	const navigate = useNavigate();

	const onHandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const success = await executeLogin(e);

		if (success) {
			navigate("/dashboard");
		}
	};

	return (
		<LoginForm
			setEmail={setEmail}
			setPassword={setPassword}
			handleSubmit={onHandleSubmit}
		/>
	);
};

export default Login;
