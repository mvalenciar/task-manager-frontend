import { CheckIcon, MoreHorizontalIcon, TrashIcon } from "lucide-react";

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
import DialogEditTask from "@/features/tasks/components/DialogEditTask";

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
			<CardContent className="p-0 sm:p-6">
				<div className="w-full max-h-[400px] overflow-y-auto overflow-x-auto border rounded-md custom-scrollbar">
					<Table className="w-full min-w-[700px] border-collapse">
						<TableHeader className="sticky top-0 bg-background z-10 shadow-sm border-b">
							<TableRow className="hover:bg-transparent">
								<TableHead className="w-[25%] bg-background">Tarea</TableHead>
								<TableHead className="w-[40%] bg-background">
									Descripción
								</TableHead>
								<TableHead className="w-[15%] bg-background">Estado</TableHead>
								<TableHead className="w-[15%] bg-background">
									Fecha de creación
								</TableHead>
								<TableHead className="w-[5%] text-right bg-background">
									Acciones
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{tasks.map((task) => (
								<TableRow
									key={task.id}
									className="transition-colors hover:bg-muted/50"
								>
									<TableCell className="font-medium break-words pr-4 align-top py-4">
										{task.title}
									</TableCell>

									<TableCell className="break-words whitespace-pre-wrap pr-6 text-muted-foreground align-top py-4 text-sm leading-relaxed">
										{task.description}
									</TableCell>

									<TableCell className="align-top py-4 whitespace-nowrap">
										<span
											className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
												task.completed
													? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
													: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
											}`}
										>
											{task.completed ? "Completada" : "Pendiente"}
										</span>
									</TableCell>

									<TableCell className="align-top py-4 text-xs text-muted-foreground whitespace-nowrap">
										{new Date(task.createdAt).toLocaleDateString("es-CO", {
											year: "numeric",
											month: "short",
											day: "numeric",
										})}
									</TableCell>

									<TableCell className="text-right align-top py-3">
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button variant="ghost" size="icon" className="h-8 w-8">
													<MoreHorizontalIcon className="h-4 w-4" />
													<span className="sr-only">Open menu</span>
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuGroup>
													<DropdownMenuItem
														onSelect={(e) => e.preventDefault()}
													>
														<DialogEditTask
															taskId={task.id}
															title={task.title}
															description={task.description}
															onUpdateTask={onUpdateTask}
														/>
													</DropdownMenuItem>
													<DropdownMenuItem
														className="cursor-pointer"
														onClick={() =>
															onToggleTask(task.id, task.completed)
														}
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
				</div>
			</CardContent>
		</Card>
	);
};

export default TaskList;
