//Hooks
import { useEffect } from "react";
//Components
import CustomHeader from "@/components/custom/CustomHeader";
import DropdownMenuAvatar from "@/features/tasks/components/DropdownMenuAvatar";
import TaskForm from "@/features/tasks/components/TaskForm";
import TaskList from "@/features/tasks/components/TaskList";
//Custom Hooks
import { useTask } from "@/features/tasks/hooks/useTask";

const Dashboard = () => {
	const { tasks, getTaskList, createTask, deleteTask, updateTask, toggleTask } =
		useTask();

	useEffect(() => {
		getTaskList();
	}, [getTaskList]);
	return (
		<div className="min-h-screen">
			<div className="flex justify-between items-center">
				<CustomHeader
					title="¡Bienvenidos de nuevo!"
					description="Aquí tienes todo lo que necesitas para empezar a gestionar tus tareas."
				/>
				<DropdownMenuAvatar />
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto p-4 md:p-6">
				<div className="md:col-span-1">
					<TaskForm onCreateTask={createTask} />
				</div>
				<div className="md:col-span-2">
					<TaskList
						tasks={tasks}
						onDeleteTask={deleteTask}
						onUpdateTask={updateTask}
						onToggleTask={toggleTask}
					/>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
