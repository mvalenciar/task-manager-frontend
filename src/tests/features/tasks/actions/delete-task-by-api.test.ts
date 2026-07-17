import { taskApi } from "@/services/api";
import { describe, test, vi } from "vitest";

taskApi;

vi.mock("@/services/ap", () => ({
	taskApi: {
		delete: vi.fn(),
	},
}));
