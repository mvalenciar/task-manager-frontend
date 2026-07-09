import type { Task } from "@/interface/task.interface";
import { taskApi } from "@/services/api";

export const getTasksByApi = async (token: string): Promise<Task[]> => {
	try {
		const response = await taskApi.get("/tasks", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const taskList: Task[] = response.data.tasks;
		return taskList;
	} catch (error) {
		console.error(error);
		return [];
	}
};
