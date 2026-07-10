import { useCallback, useState } from "react";

import { createTaskByApi } from "@/actions/create-task-by-api";
import { deleteTaskByApi } from "@/actions/delete-task-by-api";
import { getTasksByApi } from "@/actions/get-tasks-by-api";

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
	};
};
