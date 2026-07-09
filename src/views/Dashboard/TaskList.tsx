import { MoreHorizontalIcon, PencilIcon, TrashIcon } from "lucide-react";

import { useCallback, useEffect, useState } from "react";

import { getTasksByApi } from "@/actions/get-tasks-by-api";
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

import type { Task } from "@/interface/task.interface";

const TaskList = () => {
	const [tasks, setTasks] = useState<Task[]>([]);
	const getTaskList = useCallback(async () => {
		try {
			const token = localStorage.getItem("task_token");
			if (token) {
				const taskList = await getTasksByApi(token);
				setTasks(taskList);
			}
		} catch (error) {
			console.log("Error al obtener la lista de tareas", error);
		}
	}, []);

	useEffect(() => {
		getTaskList();
	}, [getTaskList]);

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
							<TableHead>Fecha de creación</TableHead>
							<TableHead className="text-right">Acciones</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{tasks.map((task) => (
							<TableRow key={task.id}>
								<TableCell className="font-medium">{task.title}</TableCell>
								<TableCell>{task.description}</TableCell>
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
												<DropdownMenuItem>
													<PencilIcon className="mr-2 h-4 w-4" />
													Edit
												</DropdownMenuItem>
											</DropdownMenuGroup>
											<DropdownMenuSeparator />
											<DropdownMenuItem className="text-destructive focus:text-destructive">
												<TrashIcon className="mr-2 h-4 w-4" />
												Delete
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
