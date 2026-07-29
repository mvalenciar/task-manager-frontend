import type { Task } from "@/interfaces/task.interface";
import { taskApi } from "@/services/api";

export const getTasksByApi = async (): Promise<Task[]> => {
	try {
		const response = await taskApi.get("/tasks");

		const taskList: Task[] = response.data.tasks;
		return taskList;
	} catch (error) {
		console.error(error);
		return [];
	}
};
