//Hooks
import { useEffect } from "react";
//Components
import CustomHeader from "@/components/custom/CustomHeader";
import DropdownMenuAvatar from "@/features/tasks/components/DropdownMenuAvatar";
import TaskForm from "@/features/tasks/components/TaskForm";
import TaskList from "@/features/tasks/components/TaskList";
import { TasksPaginationController } from "@/features/tasks/components/TasksPaginationController";

//Custom Hooks

import { usePagination } from "@/features/tasks/hooks/usePagination";
import { useTask } from "@/features/tasks/hooks/useTask";

const Dashboard = () => {
	const {
		tasks,
		totalTasks,
		getTaskList,
		createTask,
		deleteTask,
		updateTask,
		toggleTask,
	} = useTask();

	const {
		totalPages,
		currentPage,
		itemsPerPage,
		changeToNextPage,
		changeToPreviousPage,
		changeToLastPage,
		changeToFirstPage,
	} = usePagination(totalTasks);

	useEffect(() => {
		getTaskList(currentPage, itemsPerPage);
	}, [getTaskList, currentPage, itemsPerPage]);
	return (
		<div className="min-h-screen">
			<div className="flex justify-between items-center">
				<CustomHeader
					title="¡Bienvenidos de nuevo!"
					description="Aquí tienes todo lo que necesitas para empezar a gestionar tus tareas."
				/>
				<DropdownMenuAvatar />
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto p-4 md:p-6 w-full">
				<div className="md:col-span-1 w-full">
					<TaskForm
						onCreateTask={(title, description) =>
							createTask(title, description, currentPage, itemsPerPage)
						}
					/>
				</div>
				<div className="md:col-span-2 w-full min-w-0 flex flex-col gap-4">
					<TaskList
						tasks={tasks}
						onDeleteTask={(taskId: number) =>
							deleteTask(taskId, currentPage, itemsPerPage)
						}
						onUpdateTask={(taskId, title, desc) =>
							updateTask(taskId, title, desc, currentPage, itemsPerPage)
						}
						onToggleTask={(taskId, completed) =>
							toggleTask(taskId, completed, currentPage, itemsPerPage)
						}
					/>
					<TasksPaginationController
						totalPages={totalPages}
						currentPage={currentPage}
						changeToFirstPage={changeToFirstPage}
						changeToLastPage={changeToLastPage}
						changeToNextPage={changeToNextPage}
						changeToPreviousPage={changeToPreviousPage}
					/>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
