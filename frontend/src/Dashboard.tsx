import { useState, useEffect, FormEvent } from "react";

const API_URL = "http://localhost:3000";

interface Travel {
  travel_id: number;
  title: string;
  starting_date: string;
  ending_date: string;
  is_archived: boolean;
}

function Dashboard() {
  const [travels, setTravels] = useState<Travel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [title, setTitle] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  useEffect(() => {
    async function fetchTravels() {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(`${API_URL}/travel`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Erreur serveur");
        }

        setTravels(Array.isArray(data) ? data : data.travels || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur serveur");
      } finally {
        setIsLoading(false);
      }
    }

    fetchTravels();
  }, []);

  async function handleCreateTravel(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    setIsCreating(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/travel/create-travel`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          starting_date: departureDate,
          ending_date: returnDate,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erreur serveur");
      }

      setTravels((prev) => [...prev, data]);
      setTitle("");
      setDepartureDate("");
      setReturnDate("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur serveur");
    } finally {
      setIsCreating(false);
    }
  }

  if (isLoading) return <p>Chargement...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  if (travels.length === 0) {
    return (
      <form onSubmit={handleCreateTravel}>
        <p>Vous n'avez pas encore de voyage.</p>

        <div>
          <label htmlFor="title">Titre du voyage</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="departureDate">Date de départ</label>
          <input
            type="date"
            id="departureDate"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="returnDate">Date de retour</label>
          <input
            type="date"
            id="returnDate"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={isCreating}>
          {isCreating ? "Création..." : "Créer un voyage"}
        </button>
      </form>
    );
  }

  return (
    <div>
      <h2>Vos voyages</h2>
      <ul>
        {travels.map((travel) => (
          <li key={travel.travel_id}>{travel.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;