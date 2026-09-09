import { useState } from "react";
import TaskList from "./TaskList";
import AccommodationList from "./AccommodationList";

type Section = "tasks" | "accommodation" | "transport" | "activity";

interface TripDashboardProps {
  travelId: number;
  travelTitle: string;
  onBack: () => void;
}

function TripDashboard({ travelId, travelTitle, onBack }: TripDashboardProps) {
  const [section, setSection] = useState<Section>("tasks");

  return (
    <div style={{ display: "flex" }}>
      <nav style={{ width: "200px", borderRight: "1px solid #ccc" }}>
        <button onClick={onBack}>← Retour aux voyages</button>
        <h3>{travelTitle}</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>
            <button onClick={() => setSection("tasks")}>Tâches</button>
          </li>
          <li>
            <button onClick={() => setSection("accommodation")}>
              Hébergement
            </button>
          </li>
          <li>
            <button onClick={() => setSection("transport")}>Transport</button>
          </li>
          <li>
            <button onClick={() => setSection("activity")}>Activité</button>
          </li>
        </ul>
      </nav>

      <div style={{ flex: 1, padding: "0 16px" }}>
        {section === "tasks" && <TaskList travelId={travelId} />}
        {section === "accommodation" && (
          <AccommodationList travelId={travelId} />
        )}
        {section === "transport" && <p>Transport — à venir</p>}
        {section === "activity" && <p>Activité — à venir</p>}
      </div>
    </div>
  );
}

export default TripDashboard;