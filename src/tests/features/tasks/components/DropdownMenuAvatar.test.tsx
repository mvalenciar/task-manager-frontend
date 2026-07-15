import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, test, vi } from "vitest";

import DropdownMenuAvatar from "@/features/tasks/components/DropdownMenuAvatar";

const mockNavigate = vi.fn();

const setupRenderDropdownMenuAvatar = () => {
	render(
		<BrowserRouter>
			<DropdownMenuAvatar />
		</BrowserRouter>,
	);

	return {
		user: userEvent.setup(),
		avatarButton: screen.getByRole("button", { name: "LR" }),
	};
};

vi.mock("react-router-dom", async () => {
	const actual =
		await vi.importActual<typeof import("react-router-dom")>(
			"react-router-dom",
		);
	return {
		...actual,
		useNavigate: () => mockNavigate,
	};
});

describe("DropdownMenuAvatar", () => {
	test("should render component correctly", async () => {
		const { user, avatarButton } = setupRenderDropdownMenuAvatar();

		await user.click(avatarButton);

		expect(avatarButton).toBeInTheDocument();
		expect(screen.getByText("Account")).toBeInTheDocument();
		expect(screen.getByText("Sign Out")).toBeInTheDocument();
	});

	test("should clear localStorage and redirect to login when Sign Out is clicked", async () => {
		localStorage.setItem("task_token", "token-de-prueba-xyz");
		const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});

		const { user, avatarButton } = setupRenderDropdownMenuAvatar();

		await user.click(avatarButton);
		const signOutButton = screen.getByText("Sign Out");
		await user.click(signOutButton);

		expect(localStorage.getItem("task_token")).toBeNull();
		expect(alertSpy).toHaveBeenCalledTimes(1);

		expect(mockNavigate).toHaveBeenCalledTimes(1);
		expect(mockNavigate).toHaveBeenCalledWith("/login");

		alertSpy.mockRestore();
	});
});
