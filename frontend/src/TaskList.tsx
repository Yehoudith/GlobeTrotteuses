import { useState, useEffect, FormEvent } from "react";

const API_URL = "http://localhost:3000";

type TaskStatus = "to do" | "in progress" | "done";
type TaskCategory = "accommodation" | "transport" | "activity";

interface Task {
  task_id: number;
  title: string;
  status: TaskStatus;
  category: TaskCategory;
}

interface TaskListProps {
  travelId: number;
}

function TaskList({ travelId }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<TaskCategory>("activity");

  useEffect(() => {
    async function fetchTasks() {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(
          `${API_URL}/tasks?travel_id=${travelId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Erreur serveur");
        }

        setTasks(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur serveur");
      } finally {
        setIsLoading(false);
      }
    }

    fetchTasks();
  }, [travelId]);

  async function handleCreateTask(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    setIsCreating(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          travel_id: travelId,
          title,
          category,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur serveur");
      }

      setTasks((prev) => [...prev, data]);
      setTitle("");
      setCategory("activity");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur serveur");
    } finally {
      setIsCreating(false);
    }
  }

  if (isLoading) return <p>Chargement des tâches...</p>;

  return (
    <div>
      <h3>Tâches</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {tasks.length === 0 ? (
        <p>Aucune tâche pour ce voyage.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.task_id}>
              {task.title} — {task.category} — {task.status}
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleCreateTask}>
        <div>
          <label htmlFor="task-title">Titre de la tâche</label>
          <input
            type="text"
            id="task-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="task-category">Catégorie</label>
          <select
            id="task-category"
            value={category}
            onChange={(e) => setCategory(e.target.value as TaskCategory)}
          >
            <option value="accommodation">Hébergement</option>
            <option value="transport">Transport</option>
            <option value="activity">Activité</option>
          </select>
        </div>

        <button type="submit" disabled={isCreating}>
          {isCreating ? "Création..." : "Ajouter la tâche"}
        </button>
      </form>
    </div>
  );
}

export default TaskList;