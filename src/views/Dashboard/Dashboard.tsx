import { useEffect } from "react";
import CustomHeader from "@/components/custom/CustomHeader";
import { useTask } from "@/hooks/useTask";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

const Dashboard = () => {
	const {
		tasks,
		title,
		description,
		setTitle,
		setDescription,
		getTaskList,
		createTask,
		deleteTask,
		updateTask,
	} = useTask();

	useEffect(() => {
		getTaskList();
	}, [getTaskList]);
	return (
		<div className="min-h-screen">
			<CustomHeader
				title="¡Bienvenidos de nuevo!"
				description="Aquí tienes todo lo que necesitas para empezar a gestionar tus tareas."
			/>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto p-4 md:p-6">
				<div className="md:col-span-1">
					<TaskForm
						title={title}
						description={description}
						setTitle={setTitle}
						setDescription={setDescription}
						onCreateTask={createTask}
					/>
				</div>
				<div className="md:col-span-2">
					<TaskList
						tasks={tasks}
						onDeleteTask={deleteTask}
						onUpdateTask={updateTask}
					/>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
