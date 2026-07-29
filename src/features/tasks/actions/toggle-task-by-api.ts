import { taskApi } from "@/services/api";

export const toggleTaskByApi = async (
	taskId: number,
	completed: boolean,
): Promise<boolean> => {
	try {
		await taskApi.put(`/tasks/${taskId}`, {
			completed: !completed,
		});
		return true;
	} catch (error) {
		console.error("❌ Error al actualizar la tarea", error);
		return false;
	}
};
