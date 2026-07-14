import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import TaskList from "@/features/tasks/components/TaskList";
import { createMockTask } from "@/tests/tasks.factory";
import userEvent from "@testing-library/user-event";
import { useState } from "react";

vi.mock("@/features/tasks/components/DialogEditTask", () => ({
	default: () => <div data-testid="mock-dialog">Edit Task</div>,
}));

describe("TaskList", () => {
	const mockTasks = Array.from({ length: 10 }, (_, index) =>
		createMockTask({
			id: index + 1,
			title: `Task_${index + 1}`,
			description: `Description_${index + 1}`,
		}),
	);

	const mockOnDeleteTask = vi.fn();
	const mockOnUpdateTask = vi.fn();
	const mockOnToggleTask = vi.fn();

	const setupRenderTaskList = () => {
		render(
			<TaskList
				tasks={mockTasks}
				onDeleteTask={mockOnDeleteTask}
				onUpdateTask={mockOnUpdateTask}
				onToggleTask={mockOnToggleTask}
			/>,
		);

		return {
			user: userEvent.setup(),
			menuTriggers: screen.getAllByRole("button", { name: /open menu/i }),
		};
	};

	test("should render the component correctly", () => {
		setupRenderTaskList();

		expect(screen.getByText("Lista de tareas")).toBeInTheDocument();
		expect(
			screen.getByText("Tareas registradas en la base de datos."),
		).toBeInTheDocument();
		expect(screen.getByText("Task_1")).toBeInTheDocument();
		expect(screen.getByText("Task_10")).toBeInTheDocument();
	});

	test("should call onDeleteTask when delete menu item is clicked", async () => {
		const { user, menuTriggers } = setupRenderTaskList();

		await user.click(menuTriggers[0]);

		const deleteButton = screen.getByText("Eliminar");

		await user.click(deleteButton);

		expect(mockOnDeleteTask).toHaveBeenCalledTimes(1);
		expect(mockOnDeleteTask).toHaveBeenCalledWith(1);
	});

	test("should call onToggleTask when completed menu item is clicked", async () => {
		const { user, menuTriggers } = setupRenderTaskList();

		await user.click(menuTriggers[0]);

		const completedButton = screen.getByText("Completada");

		await user.click(completedButton);

		expect(mockOnToggleTask).toHaveBeenCalledTimes(1);
		expect(mockOnToggleTask).toHaveBeenCalledWith(1, false);
	});
});
