import { useState, FormEvent } from "react";

const API_URL = "http://localhost:3000";

interface RegisterFormProps {
  onSuccess: () => void;
  onEmailExists: () => void;
}

function RegisterForm({onSuccess, onEmailExists}: RegisterFormProps) {
  const [step, setStep] = useState<"email" | "details">("email");

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Étape 1 : vérification de l'email
  async function handleEmailSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/users/check-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

       if (data.exists) {
        onEmailExists(); // redirige vers login au lieu d'afficher une erreur
        return;
      }

      setStep("details"); // on passe à l'étape suivante
    } catch (err) {
      setError("Erreur serveur");
    } finally {
      setIsLoading(false);
    }
  }

  // Étape 2 : création du compte
  async function handleDetailsSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/users/create-user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          surname,
          email,
          password,
          confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erreur serveur");
      }

      onSuccess(); // Redirige vers le login
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur serveur");
    } finally {
      setIsLoading(false);
    }
  }

  if (step === "email") {
    return (
      <form onSubmit={handleEmailSubmit}>
        <h2>Créer un compte</h2>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Vérification..." : "Continuer"}
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleDetailsSubmit}>
      <h2>Finaliser l'inscription</h2>
      <p>Email : {email}</p>

      <div>
        <label htmlFor="name">Prénom</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="surname">Nom</label>
        <input
          type="text"
          id="surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Création en cours..." : "S'inscrire"}
      </button>
    </form>
  );
}

export default RegisterForm;