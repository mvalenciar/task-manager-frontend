import { describe, expect, test, vi } from "vitest";
import { getTasksByApi } from "@/features/tasks/actions/get-tasks-by-api";
import { taskApi } from "@/services/api";
import { createMockTask } from "@/tests/tasks.factory";

const mockTasks = Array.from({ length: 5 }, (_, index) =>
	createMockTask({
		id: index + 1,
		title: `Task_${index + 1}`,
		description: `Description_${index + 1}`,
	}),
);

vi.mock("@/services/api", () => ({
	taskApi: {
		get: vi.fn(),
	},
}));

describe("get-tasks-by-api", () => {
	test("should return task list and call api with correct headers when request is successful", async () => {
		vi.mocked(taskApi.get).mockResolvedValue({
			data: {
				tasks: mockTasks,
			},
		});
		const result = await getTasksByApi("test_token");

		expect(result).toEqual(mockTasks);
		expect(taskApi.get).toHaveBeenCalledTimes(1);
	});
});
