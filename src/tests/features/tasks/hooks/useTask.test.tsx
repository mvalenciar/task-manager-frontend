import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";

import { createTaskByApi } from "@/features/tasks/actions/create-task-by-api";
import { deleteTaskByApi } from "@/features/tasks/actions/delete-task-by-api";
import { getTasksByApi } from "@/features/tasks/actions/get-tasks-by-api";
import { toggleTaskByApi } from "@/features/tasks/actions/toggle-task-by-api";
import { updateTaskByApi } from "@/features/tasks/actions/update-task-by-api";
import { useTask } from "@/features/tasks/hooks/useTask";

import { createMockTask } from "@/tests/tasks.factory";

const mockTasks = Array.from({ length: 5 }, (_, index) =>
	createMockTask({
		id: index + 1,
		title: `Task_${index + 1}`,
		description: `Description_${index + 1}`,
	}),
);

const renderUseTask = () => renderHook(() => useTask());

vi.mock("@/features/tasks/actions/get-tasks-by-api", () => ({
	getTasksByApi: vi.fn(),
}));

vi.mock("@/features/tasks/actions/create-task-by-api", () => ({
	createTaskByApi: vi.fn(),
}));

vi.mock("@/features/tasks/actions/delete-task-by-api", () => ({
	deleteTaskByApi: vi.fn(),
}));

vi.mock("@/features/tasks/actions/update-task-by-api", () => ({
	updateTaskByApi: vi.fn(),
}));

vi.mock("@/features/tasks/actions/toggle-task-by-api", () => ({
	toggleTaskByApi: vi.fn(),
}));

beforeEach(() => {
	vi.clearAllMocks();
});

describe("useTask", () => {
	test("should return initial state", () => {
		const { result } = renderUseTask();

		expect(result.current.tasks).toEqual([]);
	});

	test("should fetch and set tasks correctly when getTaskList is called", async () => {
		localStorage.setItem("task_token", "test_token");

		vi.mocked(getTasksByApi).mockResolvedValue(mockTasks);

		const { result } = renderUseTask();

		result.current.getTaskList();

		await waitFor(() => {
			expect(result.current.tasks).toEqual(mockTasks);
		});
	});

	test("should call createTaskByApi and refresh the list when createTask is successful", async () => {
		localStorage.setItem("task_token", "test_token");

		vi.mocked(createTaskByApi).mockResolvedValue(true);

		const { result } = renderUseTask();

		result.current.createTask("new_task", "new_description");

		await waitFor(() => {
			expect(createTaskByApi).toHaveBeenCalledTimes(1);
			expect(createTaskByApi).toHaveBeenCalledWith(
				"test_token",
				"new_task",
				"new_description",
			);
			expect(getTasksByApi).toHaveBeenCalled();
		});
	});

	test("should call deleteTaskByApi and refresh the list when deleteTask is successful", async () => {
		localStorage.setItem("task_token", "test_token");

		vi.mocked(deleteTaskByApi).mockResolvedValue(true);

		const { result } = renderUseTask();

		result.current.deleteTask(1);

		await waitFor(() => {
			expect(deleteTaskByApi).toHaveBeenCalledTimes(1);
			expect(deleteTaskByApi).toHaveBeenCalledWith(1, "test_token");
			expect(getTasksByApi).toHaveBeenCalled();
		});
	});

	test("should call updateTaskByApi and refresh the list when updateTask is successful", async () => {
		localStorage.setItem("task_token", "test_token");

		vi.mocked(updateTaskByApi).mockResolvedValue(true);

		const { result } = renderUseTask();

		result.current.updateTask(1, "new_tittle", "new_description");

		await waitFor(() => {
			expect(updateTaskByApi).toHaveBeenCalledTimes(1);
			expect(updateTaskByApi).toHaveBeenCalledWith(
				1,
				"new_tittle",
				"new_description",
				"test_token",
			);
			expect(getTasksByApi).toHaveBeenCalled();
		});
	});

	test("should call toggleTaskByApi and refresh the list when toggleTask is successful", async () => {
		localStorage.setItem("task_token", "test_token");

		vi.mocked(toggleTaskByApi).mockResolvedValue(true);

		const { result } = renderUseTask();

		result.current.toggleTask(1, true);

		await waitFor(() => {
			expect(toggleTaskByApi).toHaveBeenCalledTimes(1);
			expect(toggleTaskByApi).toHaveBeenLastCalledWith(1, true, "test_token");
			expect(getTasksByApi).toHaveBeenCalled();
		});
	});
});
