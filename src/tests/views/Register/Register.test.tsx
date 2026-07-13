import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { taskApi } from "@/services/api";
import Register from "../Register/Register";

vi.mock("@/services/api", () => ({
	taskApi: {
		post: vi.fn(),
	},
}));

const setupRenderRegister = () => {
	render(<Register />);
	return {
		emailField: screen.getByPlaceholderText("email@example.com"),
		passwordField: screen.getByLabelText("Contraseña"),
		button: screen.getByRole("button", { name: "Crear cuenta" }),
		user: userEvent.setup(),
	};
};

describe("Register", () => {
	test("should component render", () => {
		const { emailField, passwordField, button } = setupRenderRegister();

		expect(screen.getByText("Crea tu cuenta")).toBeInTheDocument();
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

	test("should call taskApi.post when form is submitted", async () => {
		const { emailField, passwordField, button, user } = setupRenderRegister();

		vi.mocked(taskApi.post).mockResolvedValue({
			data: { message: "¡Usuario registrado con éxito en la base de datos!" },
		});

		await user.type(emailField, "test@test.com");
		await user.type(passwordField, "test");
		await user.click(button);

		expect(taskApi.post).toHaveBeenCalledTimes(1);
		expect(taskApi.post).toHaveBeenCalledWith("/users/register", {
			email: "test@test.com",
			password: "test",
		});
	});
});
