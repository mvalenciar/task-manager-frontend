import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, test } from "vitest";
import ProtectedRoute from "../ProtectedRoute";

beforeEach(() => {
	localStorage.clear();
});

describe("ProtectedRoute", () => {
	test("should block access to unidentified users", () => {
		render(
			<MemoryRouter initialEntries={["/dashboard"]}>
				<Routes>
					<Route element={<ProtectedRoute />}>
						<Route path="/dashboard" element={<div>Dashboard Privado</div>} />
					</Route>
					<Route path="/login" element={<div>Pantalla de Login</div>} />
				</Routes>
			</MemoryRouter>,
		);

		expect(screen.getByText("Pantalla de Login")).toBeInTheDocument();
	});

	test("should allow access to the identified user", () => {
		localStorage.setItem("task_token", "token-falso-jwt");

		render(
			<MemoryRouter initialEntries={["/dashboard"]}>
				<Routes>
					<Route element={<ProtectedRoute />}>
						<Route path="/dashboard" element={<div>Dashboard Privado</div>} />
					</Route>
					<Route path="/login" element={<div>Pantalla de Login</div>} />
				</Routes>
			</MemoryRouter>,
		);

		expect(screen.getByText("Dashboard Privado")).toBeInTheDocument();
	});
});
