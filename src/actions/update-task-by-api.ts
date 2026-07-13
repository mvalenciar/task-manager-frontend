import { taskApi } from "@/services/api";

export const updateTaskByApi = async (
	taskId: number,
	title: string,
	description: string,
	token: string,
): Promise<boolean> => {
	try {
		await taskApi.put(
			`/tasks/${taskId}`,
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
		console.error("Error al actualizar la tarea en el servidor:", error);
		return false;
	}
};
