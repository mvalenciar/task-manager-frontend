import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
} from "lucide-react";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

interface TasksPaginationControllerProps {
	totalPages: number;
	currentPage: number;
	changeToFirstPage: () => void;
	changeToLastPage: () => void;
	changeToNextPage: () => void;
	changeToPreviousPage: () => void;
}

export const TasksPaginationController = ({
	totalPages,
	currentPage,
	changeToFirstPage,
	changeToLastPage,
	changeToNextPage,
	changeToPreviousPage,
}: TasksPaginationControllerProps) => {
	const isFirstPage = currentPage === 1;
	const isLastPage = currentPage === totalPages;

	const disabledStyles = "pointer-events-none opacity-40 cursor-not-allowed";

	return (
		<div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 mt-4 bg-muted/40 rounded-lg border">
			<span className="text-sm text-muted-foreground font-medium order-2 sm:order-1">
				Página <strong className="text-foreground">{currentPage}</strong> de{" "}
				<strong className="text-foreground">{totalPages}</strong> páginas
			</span>

			<Pagination className="mx-0 w-auto order-1 sm:order-2">
				<PaginationContent className="gap-1">
					{/* Ir a la primera página */}
					<PaginationItem>
						<PaginationLink
							onClick={changeToFirstPage}
							className={cn(
								"cursor-pointer select-none",
								isFirstPage && disabledStyles,
							)}
							aria-disabled={isFirstPage}
						>
							<ChevronsLeft className="h-4 w-4" />
						</PaginationLink>
					</PaginationItem>

					{/* Página anterior */}
					<PaginationItem>
						<PaginationLink
							onClick={changeToPreviousPage}
							className={cn(
								"cursor-pointer select-none",
								isFirstPage && disabledStyles,
							)}
							aria-disabled={isFirstPage}
						>
							<ChevronLeft className="h-4 w-4" />
						</PaginationLink>
					</PaginationItem>

					{/* Página siguiente */}
					<PaginationItem>
						<PaginationLink
							onClick={changeToNextPage}
							className={cn(
								"cursor-pointer select-none",
								isLastPage && disabledStyles,
							)}
							aria-disabled={isLastPage}
						>
							<ChevronRight className="h-4 w-4" />
						</PaginationLink>
					</PaginationItem>

					{/* Ir a la última página */}
					<PaginationItem>
						<PaginationLink
							onClick={changeToLastPage}
							className={cn(
								"cursor-pointer select-none",
								isLastPage && disabledStyles,
							)}
							aria-disabled={isLastPage}
						>
							<ChevronsRight className="h-4 w-4" />
						</PaginationLink>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	);
};
