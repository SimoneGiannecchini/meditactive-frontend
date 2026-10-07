# 🧘 MeditActive — Frontend

MeditActive è un'applicazione web dedicata alla gestione del benessere personale attraverso obiettivi, percorsi e monitoraggio dei progressi.

Questo repository contiene il **frontend** dell'applicazione, sviluppato con **React e Vite** e collegato a un backend REST realizzato con **Node.js ed Express**.

---

## 🌐 Demo Live

👉 https://simonegiannecchini.github.io/meditactive-frontend/

### ⚠️ Nota sulla Demo

Il backend dell'applicazione è ospitato su **Render** utilizzando un servizio gratuito.

Al primo accesso il server potrebbe richiedere alcuni secondi per avviarsi.  
Se i dati non vengono visualizzati immediatamente, attendere qualche secondo e ricaricare la pagina.

Il database **MySQL** è ospitato su **Aiven**.

---

## ✨ Funzionalità

MeditActive permette di:

- 👤 Creare e gestire gli utenti
- 🎯 Creare e gestire gli obiettivi
- 🗓️ Creare percorsi con data di inizio e fine
- 🔗 Associare gli obiettivi ai percorsi
- ✅ Completare gli obiettivi
- 🪙 Ottenere coins attraverso il completamento degli obiettivi
- 📊 Visualizzare statistiche e riepiloghi nella dashboard
- 🔎 Filtrare e ricercare i percorsi
- 📱 Utilizzare l'applicazione da desktop, tablet e smartphone

---

## 🛠️ Tecnologie utilizzate

Il frontend è stato sviluppato utilizzando:

- React
- JavaScript
- Vite
- CSS3
- REST API
- Lucide React
- Git
- GitHub
- GitHub Pages

---

## 🏗️ Architettura

MeditActive utilizza un'architettura Full Stack composta da tre componenti principali:

```text
Frontend
React + Vite
      │
      │ REST API
      ▼
Backend
Node.js + Express
      │
      ▼
Database
MySQL
```

### Frontend

Il frontend è sviluppato con **React** e pubblicato tramite **GitHub Pages**.

### Backend

Il backend è sviluppato con **Node.js ed Express** e fornisce le API REST utilizzate dal frontend.

Il servizio backend è ospitato su **Render**.

### Database

I dati dell'applicazione vengono memorizzati in un database **MySQL** ospitato su **Aiven**.

---

## 🚀 Installazione locale

Per eseguire il frontend in locale è necessario avere installato **Node.js**.

Clona il repository:

```bash
git clone https://github.com/SimoneGiannecchini/meditactive-frontend.git
```

Entra nella cartella del progetto:

```bash
cd meditactive-frontend
```

Installa le dipendenze:

```bash
npm install
```

Avvia il server di sviluppo:

```bash
npm run dev
```

Vite mostrerà nel terminale l'indirizzo locale dell'applicazione, generalmente:

```text
http://localhost:5173
```

---

## 📦 Build

Per creare la versione di produzione:

```bash
npm run build
```

La build ottimizzata verrà generata nella cartella:

```text
dist/
```

---

## 🌍 Deploy

Il frontend viene pubblicato tramite **GitHub Pages**.

Per eseguire il deploy:

```bash
npm run deploy
```

Demo pubblica:

👉 https://simonegiannecchini.github.io/meditactive-frontend/

---

## 🔗 Backend

Il backend di MeditActive è mantenuto in un repository separato.

Repository:

👉 https://github.com/SimoneGiannecchini/meditactive-backend

Il backend gestisce le API REST relative a:

- utenti
- obiettivi
- percorsi
- associazione degli obiettivi ai percorsi
- completamento degli obiettivi
- sistema di coins

---

## 📱 Responsive Design

L'interfaccia è progettata per adattarsi automaticamente a diversi dispositivi:

- Desktop
- Tablet
- Smartphone

La dashboard modifica disposizione, dimensioni delle card, moduli e navigazione in base alla larghezza dello schermo.

---

## 🎯 Obiettivo del progetto

MeditActive è stato sviluppato come progetto Full Stack con l'obiettivo di mettere in pratica l'integrazione tra:

**Frontend React → REST API → Backend Node.js/Express → Database MySQL**

Il progetto permette di gestire dati persistenti attraverso operazioni CRUD e di visualizzarli tramite un'interfaccia responsive.

---

## 👨‍💻 Autore

**Simone Giannecchini**

Progetto realizzato nell'ambito del percorso di formazione in **Full Stack Development**.

GitHub:  
https://github.com/SimoneGiannecchini.github.io

---

## 📄 Licenza

Progetto realizzato a scopo didattico e di portfolio.
