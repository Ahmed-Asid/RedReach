# RedReach 🩸

RedReach is a blood donation platform that connects people who need blood with donors who are willing to help. The goal is to make it easier to find donors, manage blood donation requests, and support people in need.

## Live Website

- **Live URL:** [Add your deployed website URL]
- **Frontend Repository:** https://github.com/Ahmed-Asid/RedReach
- **Backend Repository:** https://github.com/Ahmed-Asid/RedReach-Server

## Key Features

- **User Authentication** — Register and log in securely.
- **Donor Profiles** — Save personal information, blood group, and location.
- **Search Donors** — Find donors based on blood group and location.
- **Donation Requests** — Create and manage blood donation requests.
- **Request Details** — View complete information about a donation request.
- **Donate Blood** — Allow eligible users to respond to donation requests.
- **Dashboard** — Separate dashboard experiences for donors and administrators.
- **My Donation Requests** — View, filter, and manage your own requests.
- **Funding** — Support the platform through financial contributions.
- **Stripe Checkout** — Process payments through Stripe Checkout.
- **Responsive Design** — Works across desktop, tablet, and mobile screens.

## Technologies Used

### Frontend
- Next.js
- React
- Tailwind CSS
- HeroUI v3
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB

### Authentication & Payments
- Better Auth
- Stripe

## NPM Packages

The main packages used in the project include:

| Package | Purpose |
|---|---|
| `next` | React framework for the frontend |
| `react` | Building user interfaces |
| `react-dom` | Rendering React components |
| `tailwindcss` | Styling and responsive layouts |
| `@heroui/react` | UI components |
| `react-icons` | Icons throughout the application |
| `better-auth` | User authentication |
| `mongodb` | MongoDB database integration |
| `stripe` | Payment processing |

Additional packages may be used for development, styling, and other project utilities.

## Getting Started

### 1. Clone the frontend repository

```bash
git clone https://github.com/Ahmed-Asid/RedReach.git
cd RedReach
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root and add the environment variables required by your setup, such as the database connection, authentication configuration, backend API URL, and Stripe keys.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Purpose

RedReach was built to make blood donation more accessible by connecting donors and recipients through a simple platform. It also provides tools for managing donation requests and supporting the platform through funding.

---

**Built with ❤️ to help connect blood donors with people in need.**
