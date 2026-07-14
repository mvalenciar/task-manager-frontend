import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, test, vi } from "vitest";

import { taskApi } from "@/services/api";
import Login from "@/views/Login/Login";

vi.mock("@/services/api", () => ({
	taskApi: {
		post: vi.fn(),
	},
}));

const setupRenderLogin = () => {
	render(
		<BrowserRouter>
			<Login />,
		</BrowserRouter>,
	);
	return {
		emailField: screen.getByPlaceholderText("email@example.com"),
		passwordField: screen.getByLabelText("Contraseña"),
		button: screen.getByRole("button", { name: "Ingresar" }),
		user: userEvent.setup(),
	};
};

describe("Login", () => {
	test("should render component correctly", () => {
		const { emailField, passwordField, button } = setupRenderLogin();

		expect(screen.getByText("Inicia Sesión")).toBeInTheDocument();
		expect(emailField).toBeInTheDocument();
		expect(passwordField).toBeInTheDocument();
		expect(button).toBeInTheDocument();
	});

	test("should allow typing in email and password fields", async () => {
		const { emailField, passwordField, user } = setupRenderLogin();

		await user.type(emailField, "test@test.com");
		await user.type(passwordField, "test");

		expect((emailField as HTMLInputElement).value).toBe("test@test.com");
		expect((passwordField as HTMLInputElement).value).toBe("test");
	});

	test("should call taskApi.post when form is submitted", async () => {
		vi.mocked(taskApi.post).mockResolvedValue({
			data: { token: "token-falso-jwt" },
		});

		const { emailField, passwordField, user, button } = setupRenderLogin();

		await user.type(emailField, "test@test.com");
		await user.type(passwordField, "test");
		await user.click(button);

		expect(taskApi.post).toHaveBeenCalledTimes(1);
		expect(taskApi.post).toHaveBeenCalledWith("/users/login", {
			email: "test@test.com",
			password: "test",
		});
	});
});
