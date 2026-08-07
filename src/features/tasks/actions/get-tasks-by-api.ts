import type { GetTasksApiResponse, Task } from "@/interfaces/task.interface";
import { taskApi } from "@/services/api";

export const getTasksByApi = async (
	page: number,
	limit: number,
): Promise<GetTasksApiResponse> => {
	try {
		const response = await taskApi.get("/tasks", {
			params: {
				page,
				limit,
			},
		});

		return response.data;
	} catch (error) {
		console.error(error);
		return {
			tasks: [],
			meta: {
				totalTasks: 0,
				totalPages: 1,
				currentPage: 1,
			},
		};
	}
};
