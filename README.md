# 🧘 MeditActive — Frontend

MeditActive è un'applicazione web dedicata alla gestione del benessere personale attraverso obiettivi, percorsi e monitoraggio dei progressi.

Questo repository contiene il **frontend** dell'applicazione, sviluppato con **React e Vite** e collegato a un backend REST realizzato con Node.js ed Express.

## 🌐 Demo Live

👉 https://simonegiannecchini.github.io/meditactive-frontend/

## ✨ Funzionalità

- 👤 Creazione e gestione degli utenti
- 🎯 Creazione e gestione degli obiettivi
- 🗓️ Creazione di percorsi con data di inizio e fine
- 🔗 Associazione degli obiettivi ai percorsi
- ✅ Completamento degli obiettivi
- 🪙 Sistema di ricompense tramite coins
- 📊 Dashboard con statistiche e riepilogo attività
- 🔎 Filtri per la ricerca dei percorsi
- 📱 Interfaccia responsive per desktop e mobile

## 🛠️ Tecnologie utilizzate

- React
- JavaScript
- Vite
- CSS3
- REST API
- Lucide React
- Git / GitHub
- GitHub Pages

## 🏗️ Architettura

MeditActive è suddiviso in tre componenti principali:

```text
Frontend React
      │
      ▼
Backend Node.js / Express
      │
      ▼
Database MySQL
```

Il frontend è pubblicato tramite **GitHub Pages**.

Il backend è ospitato su **Render** e comunica con il database MySQL ospitato su **Aiven**.

## 🚀 Installazione locale

Clona il repository:

```bash
git clone https://github.com/SimoneGiannecchini/meditactive-frontend.git
```

Entra nella cartella:

```bash
cd meditactive-frontend
```

Installa le dipendenze:

```bash
npm install
```

Avvia il progetto:

```bash
npm run dev
```

Vite mostrerà nel terminale l'indirizzo locale dell'applicazione.

## 📦 Build

Per creare la versione di produzione:

```bash
npm run build
```

## 🌍 Deploy

Il frontend viene pubblicato su GitHub Pages.

```bash
npm run deploy
```

## 🔗 Backend

Il backend di MeditActive è mantenuto in un repository separato:

https://github.com/SimoneGiannecchini/meditactive-backend

## 📱 Responsive Design

L'interfaccia è progettata per adattarsi a:

- Desktop
- Tablet
- Smartphone

La dashboard modifica automaticamente disposizione, dimensioni delle card e navigazione in base alla larghezza dello schermo.

## 👨‍💻 Autore

**Simone Giannecchini**

Full Stack Developer

GitHub: https://github.com/SimoneGiannecchini

## 📄 Licenza

Progetto realizzato a scopo didattico e di portfolio.
