//Hooks
import { useState } from "react";
//Components
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TaskFormProps {
	onCreateTask: (title: string, description: string) => Promise<void>;
}

const TaskForm = ({ onCreateTask }: TaskFormProps) => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();

		await onCreateTask(title, description);
	};

	return (
		<Card className="w-full mx-auto">
			<CardHeader>
				<CardTitle>Registro de tareas</CardTitle>
				<CardDescription>
					Ingresa una tarea nueva para registrar en la base de datos.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit}>
					<div className="flex flex-col gap-4">
						<div className="grid gap-2">
							<Label htmlFor="task">Tarea</Label>
							<Input
								id="task"
								type="text"
								placeholder="tarea_1"
								required
								value={title}
								onChange={(e) => setTitle(String(e.target.value))}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="description">Descripción</Label>
							<Input
								id="description"
								type="text"
								placeholder="Descripción de la tarea"
								required
								value={description}
								onChange={(e) => setDescription(String(e.target.value))}
							/>
						</div>
						<div className="grid gap-2">
							<Button type="submit" className="w-full">
								Agregar tarea
							</Button>
						</div>
					</div>
				</form>
			</CardContent>
		</Card>
	);
};

export default TaskForm;
