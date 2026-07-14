import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, test, vi } from "vitest";

import Dashboard from "@/views/Dashboard/Dashboard";

vi.mock("@/features/tasks/hooks/useTas", () => ({
	useTask: () => ({
		tasks: [
			{
				id: 1,
				title: "Task 1",
				description: "Description 1",
				createdAt: "2023-03-01T00:00:00.000Z",
				completed: false,
			},
		],
		title: "",
		description: "",
		setTitle: vi.fn(),
		setDescription: vi.fn(),
		getTaskList: vi.fn(),
		createTask: vi.fn(),
		deleteTask: vi.fn(),
		updateTask: vi.fn(),
		toggleTask: vi.fn(),
	}),
}));

describe("Dashboard", () => {
	test("should render component correctly", () => {
		render(
			<BrowserRouter>
				<Dashboard />
			</BrowserRouter>,
		);
	});
});
