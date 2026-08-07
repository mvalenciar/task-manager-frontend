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
	test("should delete task whe delete task is success", async () => {
		const taskId = 1;

		vi.mocked(taskApi.delete).mockResolvedValue({
			data: {
				message: "✅ Tarea eliminada con éxito!",
			},
		});

		const result = await deleteTaskByApi(taskId);

		expect(result).toBe(true);
		expect(taskApi.delete).toHaveBeenCalledTimes(1);
	});

	test("should return false when delete task is fail", async () => {
		const taskId: number = 1;
		const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

		vi.mocked(taskApi.delete).mockRejectedValue(
			new Error("Error deleting task"),
		);
		const result = await deleteTaskByApi(taskId);

		expect(result).toBe(false);
	});
});
