import { taskApi } from "@/services/api";

// 📐 Esta función recibe el token del usuario y el taskId de la tarea para eliminarla de SQLite
export const deleteTaskByApi = async (taskId: number): Promise<boolean> => {
	try {
		await taskApi.delete(`/tasks/${taskId}`);

		return true;
	} catch (error) {
		console.error("Error al eliminar la tarea en el servidor:", error);
		return false;
	}
};
