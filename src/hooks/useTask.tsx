import { useCallback, useState } from "react";

import { createTaskByApi } from "@/actions/create-task-by-api";
import { deleteTaskByApi } from "@/actions/delete-task-by-api";
import { getTasksByApi } from "@/actions/get-tasks-by-api";
import { toggleTaskByApi } from "@/actions/toggle-task-by-api";
import { updateTaskByApi } from "@/actions/update-task-by-api";

import type { Task } from "@/interface/task.interface";

export const useTask = () => {
	const [tasks, setTasks] = useState<Task[]>([]);

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

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

	const createTask = async () => {
		try {
			const token = localStorage.getItem("task_token");

			if (!token) {
				return;
			}

			const isTaskCreated = await createTaskByApi(token, title, description);

			if (isTaskCreated) {
				alert("✅ Tarea creada con éxito!");
				setTitle("");
				setDescription("");
				await getTaskList();
			}
		} catch (error) {
			console.error("❌ Error al crear la tarea", error);
		}
	};

	const deleteTask = async (taskId: number) => {
		try {
			const token = localStorage.getItem("task_token");
			if (!token) {
				return;
			}

			const isTaskDeleted = await deleteTaskByApi(taskId, token);

			if (isTaskDeleted) {
				alert("✅ Tarea eliminada con éxito!");
				await getTaskList();
			}
		} catch (error) {
			console.error("❌ Error al eliminar la tarea", error);
		}
	};

	const updateTask = async (
		taskId: number,
		title: string,
		description: string,
	) => {
		try {
			const token = localStorage.getItem("task_token");
			if (!token) {
				return;
			}

			const isTaskUpdated = await updateTaskByApi(
				taskId,
				title,
				description,
				token,
			);

			if (isTaskUpdated) {
				alert("✅ Tarea actualizada con éxito!");
				await getTaskList();
			}
		} catch (error) {
			console.error("❌ Error al actualizar la tarea", error);
		}
	};

	const toggleTask = async (taskId: number, completed: boolean) => {
		const token = localStorage.getItem("task_token");
		if (!token) {
			return;
		}

		const isToggled = await toggleTaskByApi(taskId, completed, token);

		if (isToggled) {
			alert("✅ Tarea actualizada con éxito!");
			await getTaskList();
		}
	};

	return {
		// values
		tasks,
		title,
		description,
		// actions
		setTitle,
		setDescription,
		getTaskList,
		createTask,
		deleteTask,
		updateTask,
		toggleTask,
	};
};
