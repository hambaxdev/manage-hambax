# 🎟️ Hambax — Event Ticketing Platform

**Hambax** is a modern and flexible event ticketing platform designed to streamline event organization, ticket sales, and user management. Built with a microservices architecture, it leverages the latest technologies for a robust, scalable, and user-friendly experience.

---

## 🚀 Features

- **User Management**
  - Login, Registration, and Password Recovery with Email Verification
  - Secure Authentication and Authorization

- **Event Management**
  - Create and Manage Events with Customizable Details
  - Add Images, Age Restrictions, and Event Types
  - Define Pricing Strategies: Fixed Prices or Ticket Pools

- **Localization**
  - Multi-language support (English, Russian, German)
  - Fully localized UI for seamless global reach

- **Admin Dashboard**
  - View and Manage User Profiles
  - Event Overview and Analytics
  - Manage Pricing Options

- **Scalability**
  - Microservices Architecture with Kong API Gateway
  - Deployed on Hetzner for reliable and scalable hosting

---

## 🛠️ Tech Stack

- **Frontend:**
  - React.js with Material-UI for modern, responsive UI
  - `i18next` for localization

- **Backend:**
  - Node.js for high-performance microservices
  - MongoDB and PostgreSQL for data storage

- **Deployment:**
  - Dockerized services for consistent and isolated environments
  - Kong as the API Gateway

---

## 📦 Installation

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) v14+
- [Docker](https://www.docker.com/) and Docker Compose
- [MongoDB](https://www.mongodb.com/) and [PostgreSQL](https://www.postgresql.org/)

### Steps

1. Clone the repository:
   ```bash
   git clone git@github.com:hambaxdev/manage-hambax.git
   cd hambax

Install dependencies:

npm install

Configure environment variables:

    Create a .env file in the root directory.
    Add the following variables:

    REACT_APP_API_URL=http://localhost:8000
    NODE_ENV=development

Start the development server:

npm start

Run Docker for backend services:

    docker-compose up

🧑‍💻 Contribution Guidelines

We welcome contributions! To contribute:

    Fork the repository.
    Create a new branch for your feature:

git checkout -b feature/my-feature

Commit your changes:

    git commit -m "feat: add my new feature"

    Push to your forked repository and create a pull request.

📂 Project Structure

hambax/
├── public/               # Public assets
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/            # Application screens (Login, Register, etc.)
│   ├── hooks/            # Custom React hooks
│   ├── context/          # Context providers for global state
│   ├── utils/            # Helper functions and validation
│   ├── locales/          # i18n localization files
│   ├── App.js            # Main app component
│   └── index.js          # Entry point
├── .env                  # Environment variables
├── docker-compose.yml    # Docker configuration
├── package.json          # NPM dependencies
└── README.md             # Project documentation


🛡️ License

This project is licensed under the MIT License.
📧 Contact

If you have any questions or feedback, feel free to reach out:

    Email: hambax.dev@gmail.com
    GitHub: hambaxdev