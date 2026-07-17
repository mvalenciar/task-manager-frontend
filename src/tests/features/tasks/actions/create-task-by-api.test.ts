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
		localStorage.setItem("task_token", "test_token");

		vi.mocked(taskApi.post).mockResolvedValue({
			data: {
				message: "✅ Tarea creada con éxito!",
			},
		});
		const result = await createTaskByApi(
			"test_token",
			"Task_1",
			"Description_1",
		);

		expect(result).toBe(true);
		expect(taskApi.post).toHaveBeenCalledTimes(1);
		expect(taskApi.post).toHaveBeenCalledWith(
			"/tasks",
			{
				title: "Task_1",
				description: "Description_1",
			},
			{
				headers: {
					Authorization: `Bearer test_token`,
				},
			},
		);
	});

	test("should return false when the api is fail", async () => {
		localStorage.setItem("task_token", "test_token");
		const title = "Task_1";
		const description = "Description_1";
		const token = localStorage.getItem("task_token") as string;
		const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

		vi.mocked(taskApi.post).mockRejectedValue(new Error("Error creating task"));

		const result = await createTaskByApi(token, title, description);
		expect(result).toBe(false);
		consoleSpy.mockRestore();
	});
});
