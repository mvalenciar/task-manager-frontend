import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import App from "../App";

describe("App", () => {
	test("should render component correctly", () => {
		render(<App />);

		expect(screen.getByText("Get started")).toBeDefined();
	});
});
