import { describe, expect, test, vi } from "vitest";
import { toggleTaskByApi } from "@/features/tasks/actions/toggle-task-by-api";
import { taskApi } from "@/services/api";

vi.mock("@/services/api", () => ({
	taskApi: {
		put: vi.fn(),
	},
}));

describe("toggle-task-by-api", () => {
	test("should update task as complete successfully", async () => {
		vi.mocked(taskApi.put).mockResolvedValue({
			data: {
				message: "✅ Tarea actualizada con éxito!",
			},
		});

		localStorage.setItem("task_token", "test_token");
		const taskId = 1;
		const token = localStorage.getItem("task_token") as string;
		const completed = false;

		const result = await toggleTaskByApi(taskId, completed, token);

		expect(result).toBe(true);
		expect(taskApi.put).toHaveBeenCalledTimes(1);
		expect(taskApi.put).toHaveBeenCalledWith(
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
	});

	test("should fail toggle-task when api is fail", async () => {
		localStorage.setItem("task_token", "test_token");
		const taskId = 1;
		const token = localStorage.getItem("task_token") as string;
		const completed = false;
		const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

		vi.mocked(taskApi.put).mockRejectedValue(new Error("Fail updating task"));

		const result = await toggleTaskByApi(taskId, completed, token);

		expect(result).toBe(false);
	});
});
