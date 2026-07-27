import { taskApi } from "@/services/api";

export const loginByApi = async (email: string, password: string) => {
	return await taskApi.post("/users/login", {
		email,
		password,
	});
};
