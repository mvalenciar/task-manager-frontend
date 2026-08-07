import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

import { describe, expect, test, vi } from "vitest";

import { registerByApi } from "@/features/auth/actions/register-by-api";
import { taskApi } from "@/services/api";
import Register from "@/views/Register/Register";

vi.mock("@/features/auth/actions/register-by-api", () => ({
	registerByApi: vi.fn(),
}));

const setupRenderRegister = () => {
	render(
		<BrowserRouter>
			<Register />
		</BrowserRouter>,
	);
	return {
		aliasField: screen.getByPlaceholderText("@example"),
		emailField: screen.getByPlaceholderText("email@example.com"),
		passwordField: screen.getByLabelText("Contraseña"),
		button: screen.getByRole("button", { name: "Crear cuenta" }),
		user: userEvent.setup(),
	};
};

describe("Register", () => {
	test("should component render", () => {
		const { aliasField, emailField, passwordField, button } =
			setupRenderRegister();
		expect(screen.getByText("Crea tu cuenta")).toBeInTheDocument();
		expect(aliasField).toBeInTheDocument();
		expect(emailField).toBeInTheDocument();
		expect(passwordField).toBeInTheDocument();
		expect(button).toBeInTheDocument();
	});

	test("should allow typing in the email and password fields", async () => {
		const { emailField, passwordField, user } = setupRenderRegister();

		await user.type(emailField, "test@test.com");
		await user.type(passwordField, "test");

		expect((emailField as HTMLInputElement).value).toBe("test@test.com");
		expect((passwordField as HTMLInputElement).value).toBe("test");
	});

	test("should call registerByApi when form is submitted", async () => {
		const { aliasField, emailField, passwordField, button, user } =
			setupRenderRegister();

		await user.type(aliasField, "aliasV");
		await user.type(emailField, "test@test.com");
		await user.type(passwordField, "test");
		await user.click(button);

		expect(registerByApi).toHaveBeenCalledTimes(1);
		expect(registerByApi).toHaveBeenCalledWith(
			"aliasV",
			"test@test.com",
			"test",
		);
	});
});
