import type { Task } from "@/interfaces/task.interface";

export const createMockTask = (overrides: Partial<Task> = {}): Task => ({
	id: 0,
	title: "",
	description: "",
	createdAt: `${new Date().toLocaleString()}`,
	completed: false,
	...overrides,
});
