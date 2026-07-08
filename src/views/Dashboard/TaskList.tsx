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
import { MoreHorizontalIcon, PencilIcon, TrashIcon } from "lucide-react";

const TaskList = () => {
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
						{/* 🚀 ARREGLADO: Envoltura obligatoria de fila */}
						<TableRow>
							<TableCell className="font-medium">Tarea 1</TableCell>
							<TableCell>Descripción de la tarea 1</TableCell>
							<TableCell>{new Date().toLocaleDateString()}</TableCell>
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
										{/* Ajuste de color destructivo para Shadcn estable */}
										<DropdownMenuItem className="text-destructive focus:text-destructive">
											<TrashIcon className="mr-2 h-4 w-4" />
											Delete
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
};
export default TaskList;
