import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, test, vi } from "vitest";

import { createMockTask } from "@/tests/tasks.factory";
import Dashboard from "@/views/Dashboard/Dashboard";

const mockGetTaskList = vi.fn();
const mockCreateTask = vi.fn();
const mockDeleteTask = vi.fn();
const mockUpdateTask = vi.fn();
const mockToggleTask = vi.fn();

const fakeTasks = [
	createMockTask({
		id: 1,
		title: "Tarea de Orquestación Milton",
		description: "Certificar cables del padre",
	}),
];

vi.mock("@/features/tasks/hooks/useTask", () => ({
	useTask: () => ({
		tasks: fakeTasks,
		getTaskList: mockGetTaskList,
		createTask: mockCreateTask,
		deleteTask: mockDeleteTask,
		updateTask: mockUpdateTask,
		toggleTask: mockToggleTask,
	}),
}));

describe("Dashboard (Integration)", () => {
	test("should trigger getTaskList automatically on mount", () => {
		render(
			<BrowserRouter>
				<Dashboard />
			</BrowserRouter>,
		);

		expect(mockGetTaskList).toHaveBeenCalledTimes(1);
	});

	test("should correctly render the entire family tree with injected hook data", () => {
		render(
			<BrowserRouter>
				<Dashboard />
			</BrowserRouter>,
		);

		expect(screen.getByText("¡Bienvenidos de nuevo!")).toBeInTheDocument();

		expect(screen.getByText("Registro de tareas")).toBeInTheDocument();

		expect(
			screen.getByText("Tarea de Orquestación Milton"),
		).toBeInTheDocument();
	});
});
