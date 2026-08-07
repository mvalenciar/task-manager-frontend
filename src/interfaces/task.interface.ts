export interface Task {
	id: number;
	title: string;
	description: string;
	completed: boolean;
	createdAt: string;
}

export interface GetTasksApiResponse {
	tasks: Task[];
	meta: {
		totalTasks: number;
		totalPages: number;
		currentPage: number;
	};
}
