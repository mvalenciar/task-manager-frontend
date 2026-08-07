import { describe, expect, test, vi } from "vitest";
import { createTaskByApi } from "@/features/tasks/actions/create-task-by-api";
import { taskApi } from "@/services/api";

vi.mock("@/services/api", () => ({
	taskApi: {
		post: vi.fn(),
	},
}));

describe("create-task-by-api", () => {
	test("should create a task successfully when create-task is called", async () => {
		vi.mocked(taskApi.post).mockResolvedValue({
			data: {
				message: "✅ Tarea creada con éxito!",
			},
		});
		const result = await createTaskByApi("Task_1", "Description_1");

		expect(result).toBe(true);
		expect(taskApi.post).toHaveBeenCalledTimes(1);
		expect(taskApi.post).toHaveBeenCalledWith("/tasks", {
			title: "Task_1",
			description: "Description_1",
		});
	});

	test("should return false when the api is fail", async () => {
		const title = "Task_1";
		const description = "Description_1";

		const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

		vi.mocked(taskApi.post).mockRejectedValue(new Error("Error creating task"));

		const result = await createTaskByApi(title, description);
		expect(result).toBe(false);
		consoleSpy.mockRestore();
	});
});
