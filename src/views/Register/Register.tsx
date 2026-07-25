import { useNavigate } from "react-router-dom";

import RegisterForm from "@/features/auth/components/RegisterForm";
import { useUser } from "@/features/auth/hooks/useUser";

const Register = () => {
	const navigate = useNavigate();

	const { setAlias, setEmail, setPassword, executeRegister } = useUser();

	const onHandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		const success = await executeRegister(e);

		// Si el hook procesó el registro con éxito en el backend, redirigimos
		if (success) {
			navigate("/login");
		}
	};

	return (
		<RegisterForm
			setAlias={setAlias}
			setEmail={setEmail}
			setPassword={setPassword}
			handleSubmit={onHandleSubmit}
		/>
	);
};

export default Register;
