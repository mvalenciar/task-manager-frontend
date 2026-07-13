import { CheckIcon, MoreHorizontalIcon, TrashIcon } from "lucide-react";

import DialogEditTask from "@/views/Dashboard/DialogEditTask";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import type { Task } from "@/interfaces/task.interface";

interface TaskListProps {
	tasks: Task[];
	onDeleteTask: (id: number) => Promise<void>;
	onUpdateTask: (
		id: number,
		title: string,
		description: string,
	) => Promise<void>;
	onToggleTask: (id: number, completed: boolean) => Promise<void>;
}

const TaskList = ({
	tasks,
	onDeleteTask,
	onUpdateTask,
	onToggleTask,
}: TaskListProps) => {
	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>Lista de tareas</CardTitle>
				<CardDescription>
					Tareas registradas en la base de datos.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Tarea</TableHead>
							<TableHead>Descripción</TableHead>
							<TableHead>Estado</TableHead>
							<TableHead>Fecha de creación</TableHead>
							<TableHead className="text-right">Acciones</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{tasks.map((task) => (
							<TableRow key={task.id}>
								<TableCell className="font-medium">{task.title}</TableCell>
								<TableCell>{task.description}</TableCell>
								<TableCell>
									{task.completed ? "Completada" : "Pendiente"}
								</TableCell>
								<TableCell>{task.createdAt}</TableCell>
								<TableCell className="text-right">
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant="ghost" size="icon" className="h-8 w-8">
												<MoreHorizontalIcon className="h-4 w-4" />
												<span className="sr-only">Open menu</span>
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											<DropdownMenuGroup>
												<DropdownMenuItem onSelect={(e) => e.preventDefault()}>
													<DialogEditTask
														taskId={task.id}
														title={task.title}
														description={task.description}
														onUpdateTask={onUpdateTask}
													/>
												</DropdownMenuItem>
												<DropdownMenuItem
													className="cursor-pointer"
													onClick={() => onToggleTask(task.id, task.completed)}
												>
													<CheckIcon className="mr-2 h-4 w-4" />
													Completada
												</DropdownMenuItem>
											</DropdownMenuGroup>
											<DropdownMenuSeparator />
											<DropdownMenuItem
												className="text-destructive focus:text-destructive cursor-pointer"
												onClick={() => {
													onDeleteTask(task.id);
												}}
											>
												<TrashIcon className="mr-2 h-4 w-4" />
												Eliminar
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
};
export default TaskList;
