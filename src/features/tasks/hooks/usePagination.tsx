import { useState } from "react";
import type { Task } from "@/interfaces/task.interface";

export const usePagination = (tasks: Task[]) => {
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;
	const totalPages = Math.max(1, Math.ceil(tasks.length / itemsPerPage));
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = itemsPerPage * currentPage;

	const changeToNextPage = () => {
		if (currentPage === totalPages) return;

		setCurrentPage(currentPage + 1);
	};

	const changeToPreviousPage = () => {
		if (currentPage === 1) return;

		setCurrentPage(currentPage - 1);
	};

	const changeToFirstPage = () => {
		if (currentPage === 1) return;
		console.log("changeToFirstPage");
		setCurrentPage(1);
	};

	const changeToLastPage = () => {
		if (currentPage === totalPages) return;
		setCurrentPage(totalPages);
	};

	return {
		// Values
		currentPage,
		totalPages,
		startIndex,
		endIndex,

		// Actions
		changeToNextPage,
		changeToPreviousPage,
		changeToFirstPage,
		changeToLastPage,
		setCurrentPage,
	};
};
