import { PencilIcon } from "lucide-react";

import { useState } from "react";

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface DialogEditTaskProps {
	taskId: number;
	title: string;
	description: string;

	onUpdateTask: (
		taskId: number,
		title: string,
		description: string,
	) => Promise<void>;
}

const DialogEditTask = ({
	taskId,
	title,
	description,
	onUpdateTask,
}: DialogEditTaskProps) => {
	const [newTitle, setNewTitle] = useState(title);
	const [newDescription, setNewDescription] = useState(description);

	const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		await onUpdateTask(taskId, newTitle, newDescription);
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<button
					type="button"
					className="w-full flex items-center px-1.5 py-1 text-sm text-zinc-700 hover:bg-zinc-100 rounded-md cursor-pointer"
				>
					<PencilIcon className="mr-2 h-4 w-4" />
					Editar
				</button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-sm">
				<form onSubmit={handleSubmit}>
					<DialogHeader>
						<DialogTitle>Editar tarea</DialogTitle>
						<DialogDescription>
							Edita la tarea seleccionada. haz click en el botón "Actualizar"
							para guardar los cambios.
						</DialogDescription>
					</DialogHeader>
					<FieldGroup>
						<Field>
							<Label htmlFor="task">Tarea</Label>
							<Input
								id="task"
								type="text"
								placeholder="tarea_1"
								required
								value={newTitle}
								onChange={(e) => setNewTitle(String(e.target.value))}
								onKeyDown={(e) => {
									if (e.key === " ") {
										e.stopPropagation();
									}
								}}
							/>
						</Field>
						<Field>
							<Label htmlFor="description">Descripción</Label>
							<Input
								id="description"
								type="text"
								placeholder="Descripción de la tarea"
								required
								value={newDescription}
								onChange={(e) => setNewDescription(String(e.target.value))}
								onKeyDown={(e) => {
									if (e.key === " ") {
										e.stopPropagation();
									}
								}}
							/>
						</Field>
					</FieldGroup>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant={"outline"}>Cancelar</Button>
						</DialogClose>
						<Button type="submit">Actualizar</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default DialogEditTask;
