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

		const taskId = 1;
		const completed = false;
		const result = await toggleTaskByApi(taskId, completed);

		expect(result).toBe(true);
		expect(taskApi.put).toHaveBeenCalledTimes(1);
		expect(taskApi.put).toHaveBeenCalledWith(`/tasks/${taskId}`, {
			completed: !completed,
		});
	});

	test("should fail toggle-task when api is fail", async () => {
		const taskId = 1;
		const completed = false;
		const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

		vi.mocked(taskApi.put).mockRejectedValue(new Error("Fail updating task"));

		const result = await toggleTaskByApi(taskId, completed);

		expect(result).toBe(false);
	});
});
