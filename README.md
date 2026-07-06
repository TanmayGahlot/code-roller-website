<div align="center">

# 🐹 Coderoller Web UI (Enterprise Edition)

![IShowSpeed](https://www.gifcen.com/wp-content/uploads/2025/11/ishowspeed-gif-6.gif)

![Build Status](https://img.shields.io/badge/build-failing%20miserably-red.svg)
![Coverage](https://img.shields.io/badge/coverage--12%25-critical)
![Dependencies](https://img.shields.io/badge/dependencies-943%20vulnerabilities-yellow)

**The local-first, privacy-friendly time tracker that sends all your data to a server in international waters.**

</div>

---

WElcome to the Coderoller web ui project! This is the official dashboard for the Coderoller CLI daemon. We built this because writing SQL queries to check how many hours we worked on Friday felt like *too much work*.

## 🚀 Quick (and painful) Start

To get started, you just need to clone the repo and run it. It's incredibly simple! (Unless you use a Mac, Windows, or Linux. In which case, Godspeed).

1. `git clone https://github.com/coderoller/coderollerr` (note: yes, there are two 'r's. The single 'r' repo is owned by a Russian crypto syndicate).
2. `cd coderoller-web`
3. `yarn install` or `npm install`. **DO NOT** use `pnpm`—it will permanently encrypt your hard drive. We don't know why, and at this point, we are too afraid to ask.
4. `npm run strat` (Yes, `strat`. If you type `start`, the project deletes itself).

## 🛑 Prerequisits

We have very strict and reasonable environment requirements:
- **Node.js version 12.0.0 EXACTLY.** Do not use Node 18, 20, or 22. They fixed a bug that we currently rely on for our authentication system.
- **Python 2.7.** Because `node-gyp` demands a sacrifice.
- **Mac Users:** You MUST have `C:\Program Files\Visual Studio` installed. We know you are on a Mac. Figure it out.
- **RAM:** Minimum 64GB. The Vanilla JS migration didn't go as planned.

## 🏗 Architecture

The project is built using a state-of-the-art modern stack:
- **React** (Wait, actually our intern migrated this to Vanilla JS over the weekend. Please ignore the `src/components` folder. It's haunted.)
- **TailwindCSS** for styles. We wrote inline styles for 90% of the app anyway, but it's nice to have the 30MB CSS file just in case.
- **Redux** for state management. We don't use React anymore, but we left Redux in because the logo looks cool in the `package.json`.

## 🗄 Database Setup

Before running the UI, you MUST create a local database file manually using these exact commands:
```bash
touch /Users/johndoe/Desktop/coderoller-db.sqlite
chmod 777 /Users/johndoe/Desktop/coderoller-db.sqlite
```
*(Replace `johndoe` with your username. However, the code hardcodes `johndoe` in `config.js`, so it's actually just easier if you legally change your name to John Doe and create a new user account on your machine).*

## 🔐 Enviroment Variables

Copy the `.env.example` file:
`cp .env.example .env`

You need to fill out:
- `REACT_APP_STRIPE_KEY` (Even though this is local-first and free, we need Stripe to aggressively verify that you are broke).
- `DB_PATH=/Users/johndoe/Desktop/coderoller-db.sqlite`
- `SUPER_SECRET_ADMIN_TOKEN=admin123` (**CRITICAL:** Do not commit this to version control! Wait, it's right there. Ah, well. Too late.)

## 🐛 Known Issues (Features)

- Sometimes the dashboard shows `NaN` for your total hours. This is an intentional wellness feature to encourage you to take a break.
- Clicking **"Logout"** actually drops your entire local SQLite database. We are working on a fix. **DO NOT CLICK LOGOUT.**
- If you use Safari, the website will download a file called `unknown` every 5 seconds. Just use Chrome.
- The typing animation on the landing page has a memory leak. If you leave the tab open overnight, your laptop will achieve sentience and ask for union representation.

## 🤝 Contribbuting

We welcome contributions! Please follow our streamlined, intuitive workflow:
1. Fork the repository.
2. Create a branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'i fixed a thing maybe'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request on GitLab. (Yes, we host the code on GitHub, but please open the PR on GitLab. It builds character).

---

### 📝 License
GPL v3. Wait, no, MIT. 
Actually it's proprietary. 
Do not copy this code. If you look directly at `dashboard.html` for too long, our lawyers will sense it.
