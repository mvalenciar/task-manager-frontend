import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { describe, expect, test, vi } from "vitest";

import TaskForm from "@/features/tasks/components/TaskForm";

const mockOnCreateTask = vi.fn();

const setupRenderTaskForm = () => {
	render(<TaskForm onCreateTask={mockOnCreateTask} />);
	return {
		titleField: screen.getByPlaceholderText("tarea_1") as HTMLInputElement,
		descriptionField: screen.getByPlaceholderText(
			"Descripción de la tarea",
		) as HTMLInputElement,
		button: screen.getByRole("button", {
			name: "Agregar tarea",
		}),
		user: userEvent.setup(),
	};
};

describe("TaskForm", () => {
	test("should render the component correctly", () => {
		const { titleField, descriptionField, button } = setupRenderTaskForm();

		expect(titleField).toBeInTheDocument();
		expect(descriptionField).toBeInTheDocument();
		expect(button).toBeInTheDocument();
	});

	test("should call onCreateTask when the form is submitted", async () => {
		const { titleField, descriptionField, button, user } =
			setupRenderTaskForm();

		await user.type(titleField, "Test Task_1");
		await user.type(descriptionField, "Test Description_1");
		await user.click(button);

		expect(mockOnCreateTask).toHaveBeenCalledTimes(1);
		expect(mockOnCreateTask).toHaveBeenCalledWith(
			"Test Task_1",
			"Test Description_1",
		);
	});
});
