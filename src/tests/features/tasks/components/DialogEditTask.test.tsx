import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import DialogEditTask from "@/features/tasks/components/DialogEditTask";
import { createMockTask } from "@/tests/tasks.factory";

describe("DialogEditTask", () => {
	const mockTasks = Array.from({ length: 1 }, (_, index) =>
		createMockTask({
			id: index + 1,
			title: `Task_${index + 1}`,
			description: `Description_${index + 1}`,
		}),
	);

	const mockOnUpdateTask = vi.fn();

	const setupRenderDialogEditTask = () => {
		render(
			<DialogEditTask
				taskId={mockTasks[0].id}
				key={mockTasks[0].id}
				title={mockTasks[0].title}
				description={mockTasks[0].description}
				onUpdateTask={mockOnUpdateTask}
			/>,
		);

		return {
			user: userEvent.setup(),
		};
	};

	test("should render component correctly", async () => {
		const { user } = setupRenderDialogEditTask();

		const dialogButton = screen.getByRole("button", { name: "Editar" });

		await user.click(dialogButton);

		expect(dialogButton).toBeInTheDocument();
		expect(screen.getByText("Editar tarea")).toBeInTheDocument();
		expect(screen.getByLabelText("Tarea"));
		expect(screen.getByLabelText("Descripción")).toBeInTheDocument();
	});

	test("should call onUpdateTask when form is submitted", async () => {
		const { user } = setupRenderDialogEditTask();

		const dialogButton = screen.getByRole("button", { name: "Editar" });
		await user.click(dialogButton);

		const titleField = screen.getByLabelText("Tarea") as HTMLInputElement;
		const descriptionField = screen.getByLabelText(
			"Descripción",
		) as HTMLInputElement;

		await user.clear(titleField);
		await user.clear(descriptionField);

		await user.type(titleField, "updated_title");
		await user.type(descriptionField, "updated_description");

		const updateButton = screen.getByRole("button", { name: "Actualizar" });
		await user.click(updateButton);

		expect(mockOnUpdateTask).toHaveBeenCalledTimes(1);
		expect(mockOnUpdateTask).toHaveBeenCalledWith(
			mockTasks[0].id,
			"updated_title",
			"updated_description",
		);
	});
});
