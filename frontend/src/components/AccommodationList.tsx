import { useState, useEffect, FormEvent } from "react";

const API_URL = "http://localhost:3000";

interface Accommodation {
  accommodation_id: number;
  name: string;
  address: string;
  check_in_date: string;
  check_out_date: string;
}

interface AccommodationListProps {
  travelId: number;
}

function AccommodationList({ travelId }: AccommodationListProps) {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");

  useEffect(() => {
    async function fetchAccommodations() {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(
          `${API_URL}/accommodations?travel_id=${travelId}`,
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

        setAccommodations(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur serveur");
      } finally {
        setIsLoading(false);
      }
    }

    fetchAccommodations();
  }, [travelId]);

  async function handleCreate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    setIsCreating(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/accommodations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          travel_id: travelId,
          name,
          address,
          check_in_date: checkInDate,
          check_out_date: checkOutDate,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur serveur");
      }

      setAccommodations((prev) => [...prev, data]);
      setName("");
      setAddress("");
      setCheckInDate("");
      setCheckOutDate("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur serveur");
    } finally {
      setIsCreating(false);
    }
  }

  if (isLoading) return <p>Chargement...</p>;

  return (
    <div>
      <h3>Hébergement</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {accommodations.length === 0 ? (
        <p>Aucun hébergement pour ce voyage.</p>
      ) : (
        <ul>
          {accommodations.map((a) => (
            <li key={a.accommodation_id}>
              {a.name} — {a.address} ({a.check_in_date.slice(0, 10)} →{" "}
              {a.check_out_date.slice(0, 10)})
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleCreate}>
        <div>
          <label htmlFor="acc-name">Nom</label>
          <input
            type="text"
            id="acc-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="acc-address">Adresse</label>
          <input
            type="text"
            id="acc-address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="acc-checkin">Arrivée</label>
          <input
            type="date"
            id="acc-checkin"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="acc-checkout">Départ</label>
          <input
            type="date"
            id="acc-checkout"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={isCreating}>
          {isCreating ? "Ajout..." : "Ajouter l'hébergement"}
        </button>
      </form>
    </div>
  );
}

export default AccommodationList;