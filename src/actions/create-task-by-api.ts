import { taskApi } from "@/services/api";

// 📐 Esta función recibe el token del usuario y los datos del formulario para guardarlos en SQLite
export const createTaskByApi = async (
	token: string,
	title: string,
	description: string,
): Promise<boolean> => {
	try {
		await taskApi.post(
			"/tasks",
			{
				title,
				description,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);

		return true;
	} catch (error) {
		console.error("Error al registrar la tarea en el servidor:", error);
		// Si el token falló o el título está vacío, devolvemos false
		return false;
	}
};
