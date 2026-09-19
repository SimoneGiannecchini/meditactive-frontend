import {
  House,
  Gear,
  ChartBar,
  User,
  Target,
  CalendarBlank,
  Link,
  Funnel,
  Coins,
  CheckCircle
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import "./style.css";

const API_URL = "http://localhost:3000/api";

function App() {
  const [users, setUsers] = useState([]);
  const [goals, setGoals] = useState([]);
  const [intervals, setIntervals] = useState([]);

  const [userForm, setUserForm] = useState({
    email: "",
    first_name: "",
    last_name: ""
  });

  const [goalForm, setGoalForm] = useState({
    title: "",
    description: "",
    coins_reward: 0
  });

  const [intervalForm, setIntervalForm] = useState({
    user_id: "",
    start_date: "",
    end_date: ""
  });

  const [associationForm, setAssociationForm] = useState({
    interval_id: "",
    goal_id: ""
  });

  const [filters, setFilters] = useState({
    goalId: "",
    startDate: "",
    endDate: ""
  });

  async function loadUsers() {
    try {
      const response = await fetch(`${API_URL}/users`);
      const data = await response.json();

      setUsers(Array.isArray(data) ? data : []);
    } catch {
      setUsers([]);
    }
  }

  async function loadGoals() {
    try {
      const response = await fetch(`${API_URL}/goals`);
      const data = await response.json();

      setGoals(Array.isArray(data) ? data : []);
    } catch {
      setGoals([]);
    }
  }

  async function loadIntervals() {
    try {
      const query = new URLSearchParams();

      if (filters.goalId) {
        query.append("goalId", filters.goalId);
      }

      if (filters.startDate) {
        query.append("startDate", filters.startDate);
      }

      if (filters.endDate) {
        query.append("endDate", filters.endDate);
      }

      const response = await fetch(
        `${API_URL}/intervals?${query.toString()}`
      );

      const data = await response.json();

      setIntervals(Array.isArray(data) ? data : []);
    } catch {
      setIntervals([]);
    }
  }

  async function createUser(event) {
    event.preventDefault();

    try {
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userForm)
      });

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.error ||
            data.sqlMessage ||
            data.message ||
            "Errore nella creazione utente"
        );

        return;
      }

      setUserForm({
        email: "",
        first_name: "",
        last_name: ""
      });

      await loadUsers();
    } catch {
      alert("Backend non raggiungibile");
    }
  }

  async function createGoal(event) {
    event.preventDefault();

    try {
      const response = await fetch(`${API_URL}/goals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(goalForm)
      });

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.error ||
            data.sqlMessage ||
            data.message ||
            "Errore nella creazione obiettivo"
        );

        return;
      }

      setGoalForm({
        title: "",
        description: "",
        coins_reward: 0
      });

      await loadGoals();
    } catch {
      alert("Backend non raggiungibile");
    }
  }

  async function createInterval(event) {
    event.preventDefault();

    try {
      const response = await fetch(`${API_URL}/intervals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(intervalForm)
      });

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.error ||
            data.sqlMessage ||
            data.message ||
            "Errore nella creazione percorso"
        );

        return;
      }

      setIntervalForm({
        user_id: "",
        start_date: "",
        end_date: ""
      });

      await loadIntervals();
    } catch {
      alert("Backend non raggiungibile");
    }
  }

  async function associateGoal(event) {
    event.preventDefault();

    if (!associationForm.interval_id || !associationForm.goal_id) {
      alert("Seleziona percorso e obiettivo");
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/intervals/${associationForm.interval_id}/goals`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            goal_id: associationForm.goal_id
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.error ||
            data.sqlMessage ||
            data.message ||
            "Errore associazione"
        );

        return;
      }

      setAssociationForm({
        interval_id: "",
        goal_id: ""
      });

      await Promise.all([
        loadGoals(),
        loadIntervals()
      ]);

      alert("Obiettivo associato correttamente");
    } catch {
      alert("Backend non raggiungibile");
    }
  }

  async function completeGoal(intervalId, goalId) {
    try {
      const response = await fetch(
        `${API_URL}/intervals/${intervalId}/goals/${goalId}/complete`,
        {
          method: "PUT"
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.error ||
            data.message ||
            "Errore nel completamento dell'obiettivo"
        );

        return;
      }

      await Promise.all([
        loadUsers(),
        loadGoals(),
        loadIntervals()
      ]);

      alert(
        `Obiettivo completato! Hai guadagnato ${data.reward} monete.`
      );
    } catch {
      alert("Backend non raggiungibile");
    }
  }

  async function deleteUser(id) {
    try {
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: "DELETE"
      });

      if (!response.ok && response.status !== 204) {
        const data = await response.json();
        alert(data.error || "Errore eliminazione utente");
        return;
      }

      await Promise.all([
        loadUsers(),
        loadGoals(),
        loadIntervals()
      ]);
    } catch {
      alert("Backend non raggiungibile");
    }
  }

  async function deleteGoal(id) {
    try {
      const response = await fetch(`${API_URL}/goals/${id}`, {
        method: "DELETE"
      });

      if (!response.ok && response.status !== 204) {
        const data = await response.json();
        alert(data.error || "Errore eliminazione obiettivo");
        return;
      }

      await Promise.all([
        loadGoals(),
        loadIntervals()
      ]);
    } catch {
      alert("Backend non raggiungibile");
    }
  }

  async function deleteInterval(id) {
    try {
      const response = await fetch(`${API_URL}/intervals/${id}`, {
        method: "DELETE"
      });

      if (!response.ok && response.status !== 204) {
        const data = await response.json();
        alert(data.error || "Errore eliminazione percorso");
        return;
      }

      await Promise.all([
        loadGoals(),
        loadIntervals()
      ]);
    } catch {
      alert("Backend non raggiungibile");
    }
  }

  useEffect(() => {
    async function loadInitialData() {
      await Promise.all([
        loadUsers(),
        loadGoals(),
        loadIntervals()
      ]);
    }

    loadInitialData();
  }, []);

  const totalCoins = users.reduce(
    (total, user) => total + Number(user.coins || 0),
    0
  );

  function formatDate(date) {
    if (!date) {
      return "";
    }

    return new Date(date).toLocaleDateString("it-IT");
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">
  <img
    src="/loto.png"
    alt="MeditActive"
    className="logoIconImage"
  />
  <span>MEDITACTIVE</span>
</div>

        <nav>
  <a className="active" href="#dashboard">
    <House size={22} weight="duotone" />
<span>Dashboard</span>
  </a>

  <a href="#gestione">
    <Gear size={22} weight="duotone" />
<span>Gestione</span>
  </a>

  <a href="#riepilogo">
    <ChartBar size={22} weight="duotone" />
<span>Riepilogo</span>
  </a>
</nav>
<div className="sidebarMotivation">
  <p>
    “Un piccolo<br />
    passo ogni giorno<br />
    può cambiare<br />
    tutto.”
  </p>

  <span className="sidebarHeart">♥</span>
</div>

<div className="sidebarSignature">
  <span className="sidebarLeaf">🌿</span>
  <strong>MEDITACTIVE</strong>
  <small>Vivi meglio. Ogni giorno.</small>
</div>
        
      </aside>

      <main className="main" id="dashboard">
        <header className="topbar">
          <h2>Bentornato  👋</h2>

        </header>

       <section className="hero"></section>
        <section className="cards" id="gestione">
          <form className="card" onSubmit={createUser}>
            <div className="cardTitle">
              <User size={26} weight="duotone" />
              <h3>Nuovo utente</h3>
            </div>

            <input
              type="email"
              placeholder="Email"
              value={userForm.email}
              onChange={(event) =>
                setUserForm({
                  ...userForm,
                  email: event.target.value
                })
              }
            />

            <input
              type="text"
              placeholder="Nome"
              value={userForm.first_name}
              onChange={(event) =>
                setUserForm({
                  ...userForm,
                  first_name: event.target.value
                })
              }
            />

            <input
              type="text"
              placeholder="Cognome"
              value={userForm.last_name}
              onChange={(event) =>
                setUserForm({
                  ...userForm,
                  last_name: event.target.value
                })
              }
            />

            <button type="submit">
              Crea utente
            </button>
          </form>

          <form className="card" onSubmit={createGoal}>
            <div className="cardTitle">
              <Target size={26} weight="duotone" />
              <h3>Nuovo obiettivo</h3>
            </div>

            <input
              type="text"
              placeholder="Titolo"
              value={goalForm.title}
              onChange={(event) =>
                setGoalForm({
                  ...goalForm,
                  title: event.target.value
                })
              }
            />

            <input
              type="text"
              placeholder="Descrizione"
              value={goalForm.description}
              onChange={(event) =>
                setGoalForm({
                  ...goalForm,
                  description: event.target.value
                })
              }
            />

            <input
              type="number"
              min="0"
              placeholder="Ricompensa"
              value={goalForm.coins_reward}
              onChange={(event) =>
                setGoalForm({
                  ...goalForm,
                  coins_reward: event.target.value
                })
              }
            />

            <button type="submit">
              Crea obiettivo
            </button>
          </form>

          <form className="card" onSubmit={createInterval}>
            <div className="cardTitle">
              <CalendarBlank size={26} weight="duotone" />
              <h3>Nuovo percorso</h3>
            </div>

            <select
              value={intervalForm.user_id}
              onChange={(event) =>
                setIntervalForm({
                  ...intervalForm,
                  user_id: event.target.value
                })
              }
            >
              <option value="">
                Seleziona utente
              </option>

              {users.map((user) => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.first_name} {user.last_name}
                </option>
              ))}
            </select>

            <input
              type="date"
              value={intervalForm.start_date}
              onChange={(event) =>
                setIntervalForm({
                  ...intervalForm,
                  start_date: event.target.value
                })
              }
            />

            <input
              type="date"
              value={intervalForm.end_date}
              onChange={(event) =>
                setIntervalForm({
                  ...intervalForm,
                  end_date: event.target.value
                })
              }
            />

            <button type="submit">
              Crea percorso
            </button>
          </form>

          <form
            className="card"
            onSubmit={associateGoal}
          >
            <div className="cardTitle">
              <Link size={26} weight="duotone" />
              <h3>Associa obiettivo</h3>
            </div>

            <select
              value={associationForm.interval_id}
              onChange={(event) =>
                setAssociationForm({
                  ...associationForm,
                  interval_id: event.target.value
                })
              }
            >
              <option value="">
                Seleziona percorso
              </option>

              {intervals.map((interval) => (
                <option
                  key={interval.id}
                  value={interval.id}
                >
                  {interval.first_name} {interval.last_name} -{" "}
                  {formatDate(interval.start_date)}
                </option>
              ))}
            </select>

            <select
              value={associationForm.goal_id}
              onChange={(event) =>
                setAssociationForm({
                  ...associationForm,
                  goal_id: event.target.value
                })
              }
            >
              <option value="">
                Seleziona obiettivo
              </option>

              {goals.map((goal) => (
                <option
                  key={goal.id}
                  value={goal.id}
                >
                  {goal.title}
                </option>
              ))}
            </select>

            <button type="submit">
              Associa
            </button>
          </form>
        </section>

        <section className="filterBox">
          <h3>
  <Funnel size={24} weight="duotone" />
  Filtra percorsi
</h3>

          <div>
            <select
              value={filters.goalId}
              onChange={(event) =>
                setFilters({
                  ...filters,
                  goalId: event.target.value
                })
              }
            >
              <option value="">
                Tutti gli obiettivi
              </option>

              {goals.map((goal) => (
                <option
                  key={goal.id}
                  value={goal.id}
                >
                  {goal.title}
                </option>
              ))}
            </select>

            <input
              type="date"
              value={filters.startDate}
              onChange={(event) =>
                setFilters({
                  ...filters,
                  startDate: event.target.value
                })
              }
            />

            <input
              type="date"
              value={filters.endDate}
              onChange={(event) =>
                setFilters({
                  ...filters,
                  endDate: event.target.value
                })
              }
            />

            <button
              type="button"
              onClick={loadIntervals}
            >
              Filtra
            </button>
          </div>
        </section>

        <section className="dashboardGrid" id="riepilogo">
  <button
    type="button"
    className="dashboardSectionHeader usersHeader"
    onClick={() =>
      document
        .getElementById("utenti-panel")
        ?.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  >
    <div className="sectionHeaderIcon">
      <User size={28} weight="fill" />
    </div>

    <div className="sectionHeaderText">
      <h3>Utenti</h3>
      <p>{users.length} utenti registrati</p>
    </div>

    <span className="sectionArrow">›</span>
  </button>

  <button
    type="button"
    className="dashboardSectionHeader goalsHeader"
    onClick={() =>
      document
        .getElementById("obiettivi-panel")
        ?.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  >
    <div className="sectionHeaderIcon">
      <Target size={28} weight="duotone" />
    </div>

    <div className="sectionHeaderText">
      <h3>Obiettivi</h3>
      <p>{goals.length} obiettivi totali</p>
    </div>

    <span className="sectionArrow">›</span>
  </button>

  <button
    type="button"
    className="dashboardSectionHeader intervalsHeader"
    onClick={() =>
      document
        .getElementById("percorsi-panel")
        ?.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  >
    <div className="sectionHeaderIcon">
      <CalendarBlank size={28} weight="duotone" />
    </div>

    <div className="sectionHeaderText">
      <h3>Percorsi attivi</h3>
      <p>{intervals.length} percorsi attivi</p>
    </div>

    <span className="sectionArrow">›</span>
  </button>

  <button
    type="button"
    className="dashboardSectionHeader statsHeader"
    onClick={() =>
      document
        .getElementById("statistiche-panel")
        ?.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  >
    <div className="sectionHeaderIcon">
      <ChartBar size={28} weight="duotone" />
    </div>

    <div className="sectionHeaderText">
      <h3>Statistiche</h3>
      <p>Riepilogo attività</p>
    </div>

    <span className="sectionArrow">›</span>
  </button>

  <div className="panel" id="utenti-panel">
    {users.length === 0 && (
      <p className="empty">Nessun utente creato</p>
    )}

    <div className="userList">
      {users.map((user) => (
        <article className="userCard" key={user.id}>
          <div className="userCardMain">
            <div className="userAvatar">
              {user.first_name
                ? user.first_name.charAt(0).toUpperCase()
                : "U"}
            </div>

            <div className="userInfo">
              <strong>
                {user.first_name} {user.last_name}
              </strong>

              <span className="userEmail">{user.email}</span>
            </div>
          </div>

          <div className="userCardFooter">
            <span className="coinsBadge">
              <Coins size={17} weight="duotone" />
              {user.coins || 0} monete
            </span>

            <button
              className="deleteButton compact"
              type="button"
              onClick={() => deleteUser(user.id)}
            >
              Elimina
            </button>
          </div>
        </article>
      ))}
    </div>
  </div>

  <div className="panel" id="obiettivi-panel">
    {goals.length === 0 && (
      <p className="empty">Nessun obiettivo creato</p>
    )}

    <div className="goalList">
      {goals.map((goal) => (
        <article
          className="goalCard"
          key={`${goal.id}-${goal.interval_id || "free"}`}
        >
          <div className="goalHeader">
            <div className="goalIcon">
              <Target size={24} weight="duotone" />
            </div>

            <div className="goalHeading">
              <strong>{goal.title}</strong>
              <p>{goal.description}</p>
            </div>
          </div>

          <div className="goalMeta">
            {goal.user_id ? (
              <>
                <div className="goalMetaRow">
                  <User size={17} weight="duotone" />

                  <span>
                    {goal.first_name} {goal.last_name}
                  </span>
                </div>

                <div className="goalMetaRow">
                  <CalendarBlank size={17} weight="duotone" />

                  <span>
                    {formatDate(goal.start_date)} →{" "}
                    {formatDate(goal.end_date)}
                  </span>
                </div>
              </>
            ) : (
              <div className="goalMetaRow available">
                <Target size={17} weight="duotone" />
                <span>Non ancora associato</span>
              </div>
            )}
          </div>

          <div className="goalFooter">
            <span className="coinsBadge">
              <Coins size={17} weight="duotone" />
              {goal.coins_reward}{" "}
              {Number(goal.coins_reward) === 1 ? "moneta" : "monete"}
            </span>

            <span
              className={
                goal.user_id
                  ? "statusBadge"
                  : "statusBadge pending"
              }
            >
              {goal.user_id ? "Assegnato" : "Disponibile"}
            </span>

            <button
              className="deleteButton compact"
              type="button"
              onClick={() => deleteGoal(goal.id)}
            >
              Elimina
            </button>
          </div>
        </article>
      ))}
    </div>
  </div>

  <div className="panel" id="percorsi-panel">
    {intervals.length === 0 && (
      <p className="empty">Nessun percorso creato</p>
    )}

    <div className="intervalList">
      {intervals.map((interval) => (
        <article className="intervalCard" key={interval.id}>
          <div className="intervalHeader">
            <div className="intervalIcon">
              <CalendarBlank size={24} weight="duotone" />
            </div>

            <div className="intervalHeading">
              <span>Percorso personale</span>

              <strong>
                {interval.first_name} {interval.last_name}
              </strong>

              <small>{interval.email}</small>
            </div>
          </div>

          <div className="intervalDates">
            <div>
              <small>Inizio</small>
              <strong>{formatDate(interval.start_date)}</strong>
            </div>

            <span className="dateArrow">→</span>

            <div>
              <small>Fine</small>
              <strong>{formatDate(interval.end_date)}</strong>
            </div>
          </div>

          <div className="intervalGoals">
            <div className="intervalGoalsTitle">
              <span>Obiettivi</span>

              <strong>
                {interval.goals?.length || 0}
              </strong>
            </div>

            {(!interval.goals ||
              interval.goals.length === 0) && (
              <p className="empty compactEmpty">
                Nessun obiettivo associato
              </p>
            )}

            {interval.goals?.map((goal) => (
              <div className="intervalGoal" key={goal.id}>
                <div className="intervalGoalInfo">
                  <strong>
                    <Target size={17} weight="duotone" />
                    {goal.title}
                  </strong>

                  {goal.description && (
                    <p>{goal.description}</p>
                  )}

                  <span>
                    <Coins size={15} weight="duotone" />
                    {goal.coins_reward}{" "}
                    {Number(goal.coins_reward) === 1
                      ? "moneta"
                      : "monete"}
                  </span>
                </div>

                {goal.completed ? (
                  <div className="completedGoal">
                    <CheckCircle size={18} weight="fill" />
                    Completato
                  </div>
                ) : (
                  <button
                    className="completeButton compact"
                    type="button"
                    onClick={() =>
                      completeGoal(interval.id, goal.id)
                    }
                  >
                    Completa
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            className="deleteButton intervalDelete"
            type="button"
            onClick={() => deleteInterval(interval.id)}
          >
            Elimina percorso
          </button>
        </article>
      ))}
    </div>
  </div>

  <div className="panel stats" id="statistiche-panel">
  <div className="statsOverview">
    <div className="statsMiniGrid">
      <div className="statsMiniItem">
        <Target size={22} weight="duotone" />
        <strong>{goals.length}</strong>
        <span>Obiettivi</span>
      </div>

      <div className="statsMiniItem">
        <CalendarBlank size={22} weight="duotone" />
        <strong>{intervals.length}</strong>
        <span>Percorsi</span>
      </div>

      <div className="statsMiniItem">
        <User size={22} weight="duotone" />
        <strong>{users.length}</strong>
        <span>Utenti</span>
      </div>
    </div>

    <div className="statsDivider"></div>

    <div className="coinsSummary">
      <div className="coinsSummaryIcon">
        <Coins size={28} weight="duotone" />
      </div>

      <div className="coinsSummaryContent">
        <strong>{totalCoins}</strong>
        <span>Monete guadagnate</span>
      </div>
    </div>

    <div className="statsDivider"></div>

    <div className="statsActivity">
      <div className="statsActivityHeader">
        <div>
          <span className="statsLabel">Attività</span>
          <strong>Riepilogo generale</strong>
        </div>

        <span className="activityBadge">
          {goals.length} obiettivi
        </span>
      </div>

      <div className="activityRows">
        <div className="activityRow">
          <span>Obiettivi creati</span>
          <strong>{goals.length}</strong>
        </div>

        <div className="activityRow">
          <span>Percorsi attivi</span>
          <strong>{intervals.length}</strong>
        </div>

        <div className="activityRow">
          <span>Utenti registrati</span>
          <strong>{users.length}</strong>
        </div>

        <div className="activityRow">
          <span>Monete totali</span>
          <strong>{totalCoins}</strong>
        </div>
      </div>
    </div>
  </div>
</div>
</section>
      </main>
    </div>
  );
}

export default App;
