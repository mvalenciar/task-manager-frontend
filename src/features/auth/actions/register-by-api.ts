import { taskApi } from "@/services/api";

export const registerByApi = async (
	alias: string,
	email: string,
	password: string,
) => {
	return await taskApi.post("/users/register", {
		alias,
		email,
		password,
	});
};
