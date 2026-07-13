import { taskApi } from "@/services/api";

export const toggleTaskByApi = async (
	taskId: number,
	completed: boolean,
	token: string,
): Promise<boolean> => {
	try {
		await taskApi.put(
			`/tasks/${taskId}`,
			{
				completed: !completed,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
		return true;
	} catch (error) {
		console.error("❌ Error al actualizar la tarea", error);
		return false;
	}
};
