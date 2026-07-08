import CustomHeader from "@/components/custom/CustomHeader";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

const Dashboard = () => {
	return (
		<div className="min-h-screen">
			<CustomHeader
				title="¡Bienvenidos de nuevo!"
				description="Aquí tienes todo lo que necesitas para empezar a gestionar tus tareas."
			/>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto p-4 md:p-6">
				<div className="md:col-span-1">
					<TaskForm />
				</div>
				<div className="md:col-span-2">
					<TaskList />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
