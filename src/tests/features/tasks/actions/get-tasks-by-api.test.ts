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

const mockApiResponse = {
	tasks: mockTasks,
	meta: {
		totalTasks: mockTasks.length,
		totalPages: 1,
		currentPage: 1,
	},
};

const page = 1;
const limit = 5;

vi.mock("@/services/api", () => ({
	taskApi: {
		get: vi.fn(),
	},
}));

describe("get-tasks-by-api", () => {
	test("should return task list and call api with correct headers when request is successful", async () => {
		vi.mocked(taskApi.get).mockResolvedValue({
			data: mockApiResponse,
		});
		const result = await getTasksByApi(page, limit);

		expect(result).toEqual(mockApiResponse);
		expect(taskApi.get).toHaveBeenCalledTimes(1);
	});

	test("should return an empty array when the api request fails", async () => {
		vi.mocked(taskApi.get).mockRejectedValue(new Error("Error fetching tasks"));

		const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

		const result = await getTasksByApi(page, limit);

		expect(result).toEqual({
			tasks: [],
			meta: {
				totalTasks: 0,
				totalPages: 1,
				currentPage: 1,
			},
		});
	});
});
