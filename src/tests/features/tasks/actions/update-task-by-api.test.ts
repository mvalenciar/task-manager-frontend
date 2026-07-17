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
		localStorage.setItem("task_token", "test_token");
		const taskId: number = 1;
		const title: string = "updated_tittle";
		const description: string = "updated_description";
		const token: string = localStorage.getItem("task_token") as string;
		vi.mocked(taskApi.put).mockResolvedValue({
			data: {
				message: "✅ Tarea actualizada con éxito!",
			},
		});

		const result = await updateTaskByApi(taskId, title, description, token);

		expect(result).toBe(true);
		expect(taskApi.put).toHaveBeenCalledTimes(1);
		expect(taskApi.put).toHaveBeenLastCalledWith(
			`/tasks/${taskId}`,
			{
				title,
				description,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
	});
});
