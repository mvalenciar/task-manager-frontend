import axios from "axios";
import { useCallback, useState } from "react";

import type { Task } from "@/interfaces/task.interface";

import { createTaskByApi } from "../actions/create-task-by-api";
import { deleteTaskByApi } from "../actions/delete-task-by-api";
import { getTasksByApi } from "../actions/get-tasks-by-api";
import { toggleTaskByApi } from "../actions/toggle-task-by-api";
import { updateTaskByApi } from "../actions/update-task-by-api";
import { MOCK_TASKS } from "../factory/tasks.factory";

export const useTask = () => {
	const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);

	const getTaskList = useCallback(async () => {
		try {
			const taskList = await getTasksByApi();
			setTasks(taskList);
		} catch (error) {
			console.log("Error al obtener la lista de tareas", error);
		}
	}, []);

	const createTask = async (title: string, description: string) => {
		try {
			const isTaskCreated = await createTaskByApi(title, description);

			if (isTaskCreated) {
				alert("✅ Tarea creada con éxito!");

				await getTaskList();
			}
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const errorMessage =
					error.response?.data?.error || "Error al conectar con el servidor.";
				alert(`❌ ${errorMessage}`);
			} else {
				console.error("❌ Error al crear la tarea", error);
			}
		}
	};

	const deleteTask = async (taskId: number) => {
		try {
			const isTaskDeleted = await deleteTaskByApi(taskId);

			if (isTaskDeleted) {
				alert("✅ Tarea eliminada con éxito!");
				await getTaskList();
			}
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const errorMessage =
					error.response?.data?.error || "Error al conectar con el servidor.";
				alert(`❌ ${errorMessage}`);
			} else {
				console.error("❌ Error al eliminar la tarea", error);
			}
		}
	};

	const updateTask = async (
		taskId: number,
		title: string,
		description: string,
	) => {
		try {
			const isTaskUpdated = await updateTaskByApi(taskId, title, description);

			if (isTaskUpdated) {
				alert("✅ Tarea actualizada con éxito!");
				await getTaskList();
			}
		} catch (error) {
			console.error("❌ Error al actualizar la tarea", error);
		}
	};

	const toggleTask = async (taskId: number, completed: boolean) => {
		const isToggled = await toggleTaskByApi(taskId, completed);

		if (isToggled) {
			alert("✅ Tarea actualizada con éxito!");
			await getTaskList();
		}
	};

	return {
		// values
		tasks,

		// actions
		getTaskList,
		createTask,
		deleteTask,
		updateTask,
		toggleTask,
	};
};
