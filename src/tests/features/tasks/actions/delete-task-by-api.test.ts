import { describe, expect, test, vi } from "vitest";
import { deleteTaskByApi } from "@/features/tasks/actions/delete-task-by-api";
import { taskApi } from "@/services/api";

taskApi;

vi.mock("@/services/api", () => ({
	taskApi: {
		delete: vi.fn(),
	},
}));

describe("taskApi", () => {
	test("should first", async () => {
		localStorage.setItem("task_token", "test_token");

		const taskId = 1;
		const token = localStorage.getItem("task_token") as string;

		vi.mocked(taskApi.delete).mockResolvedValue({
			data: {
				message: "✅ Tarea eliminada con éxito!",
			},
		});

		const result = await deleteTaskByApi(taskId, token);

		expect(result).toBe(true);
		expect(taskApi.delete).toHaveBeenCalledTimes(1);
		expect(taskApi.delete).toHaveBeenCalledWith(`/tasks/${taskId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	});
});
