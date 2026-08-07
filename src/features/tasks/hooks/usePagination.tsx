import { useState } from "react";

export const usePagination = (totalTasksCount: number) => {
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 5;

	const totalPages = Math.max(1, Math.ceil(totalTasksCount / itemsPerPage));

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

		setCurrentPage(1);
	};

	const changeToLastPage = () => {
		if (currentPage === totalPages) return;
		setCurrentPage(totalPages);
	};

	return {
		// Values
		currentPage,
		itemsPerPage,
		totalPages,

		// Actions
		changeToNextPage,
		changeToPreviousPage,
		changeToFirstPage,
		changeToLastPage,
		setCurrentPage,
	};
};
