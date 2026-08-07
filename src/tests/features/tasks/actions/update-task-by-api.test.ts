import { describe, expect, test, vi } from "vitest";
import { updateTaskByApi } from "@/features/tasks/actions/update-task-by-api";
import { taskApi } from "@/services/api";

vi.mock("@/services/api", () => ({
	taskApi: {
		put: vi.fn(),
	},
}));

describe("update-task-by-api.test", () => {
	test("should update task successfully", async () => {
		const taskId: number = 1;
		const title: string = "updated_tittle";
		const description: string = "updated_description";

		vi.mocked(taskApi.put).mockResolvedValue({
			data: {
				message: "✅ Tarea actualizada con éxito!",
			},
		});

		const result = await updateTaskByApi(taskId, title, description);

		expect(result).toBe(true);
		expect(taskApi.put).toHaveBeenCalledTimes(1);
		expect(taskApi.put).toHaveBeenLastCalledWith(`/tasks/${taskId}`, {
			title,
			description,
		});
	});

	test("should return false when updating task is fail", async () => {
		const taskId: number = 1;
		const title: string = "updated_tittle";
		const description: string = "updated_description";

		const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

		vi.mocked(taskApi.put).mockRejectedValue(new Error("Fail updating task"));

		const result = await updateTaskByApi(taskId, title, description);

		expect(result).toBe(false);
	});
});
