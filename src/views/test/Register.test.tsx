import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Register from "../Register";

describe("Register", () => {
	test("should component render", () => {
		render(<Register />);

		expect(screen.getByText("Crea tu cuenta")).toBeInTheDocument();
		expect(
			screen.getByPlaceholderText("email@example.com"),
		).toBeInTheDocument();
		expect(screen.getByLabelText("Contraseña")).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: "Crear cuenta" }),
		).toBeInTheDocument();
	});

	test("should allow typing in the email and password fields", () => {
		render(<Register />);
		const emailInput = screen.getByPlaceholderText("email@example.com");
		const passWordInput = screen.getByLabelText("Contraseña");

		expect(emailInput).toBeInTheDocument();
		expect(passWordInput).toBeInTheDocument();

		fireEvent.change(emailInput, {
			target: {
				value: "test@test.com",
			},
		});
		fireEvent.change(passWordInput, {
			target: {
				value: "test",
			},
		});

		expect((emailInput as HTMLInputElement).value).toBe("test@test.com");
		expect((passWordInput as HTMLInputElement).value).toBe("test");
	});
});
