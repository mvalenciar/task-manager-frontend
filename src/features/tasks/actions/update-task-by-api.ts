import { taskApi } from "@/services/api";

export const updateTaskByApi = async (
	taskId: number,
	title: string,
	description: string,
): Promise<boolean> => {
	try {
		await taskApi.put(`/tasks/${taskId}`, {
			title,
			description,
		});
		return true;
	} catch (error) {
		console.error("Error al actualizar la tarea en el servidor:", error);
		return false;
	}
};
