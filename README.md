My-Climate: Weather App
Overview
My-Climate is a modern weather application built using TypeScript, Tanstack Query for data fetching, Shadcn for UI components, Recharts for data visualization, and Tailwind CSS for styling. This app provides real-time weather updates with an intuitive interface and responsive design.
Tech Stack

Frontend: TypeScript, React
Data Fetching: Tanstack Query
UI Components: Shadcn
Charts: Recharts
Styling: Tailwind CSS
Build Tool: Vite (or specify your preferred tool, e.g., Create React App)
Package Manager: npm (or yarn/pnpm if preferred)

Prerequisites
Ensure you have the following installed:

Node.js (v16 or higher)
npm (v8 or higher) or yarn/pnpm
A weather API key (e.g., from OpenWeatherMap or similar)

Installation

Clone the repository:
git clone https://github.com/rishnudk/my-climate.git
cd my-climate


Install dependencies:
npm install


Set up environment variables:Create a .env file in the root directory and add your weather API key:
VITE_API_KEY=your_weather_api_key
VITE_API_URL=https://api.weather-provider.com


Run the development server:
npm run dev

Open http://localhost:5173 (or the port specified by your setup) in your browser.

Project Structure
my-climate/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable components (Shadcn-based)
│   ├── hooks/              # Custom Tanstack Query hooks
│   ├── pages/              # Page components
│   ├── charts/             # Recharts components for weather data visualization
│   ├── styles/             # Tailwind CSS configurations
│   ├── types/              # TypeScript type definitions
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles (Tailwind)
├── .env                    # Environment variables
├── .gitignore              # Git ignore file
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
└── README.md               # Project documentation


Usage

Fetch Weather Data: Use Tanstack Query hooks in src/hooks/ to fetch weather data from the configured API.
Visualize Data: Recharts components in src/charts/ render weather trends (e.g., temperature, humidity).
UI Components: Shadcn components in src/components/ provide reusable UI elements like buttons, modals, and forms.
Styling: Customize styles in src/styles/ using Tailwind CSS utilities.

Scripts

npm run dev: Start the development server.
npm run build: Build the app for production.
npm run lint: Run ESLint for code quality.
npm run preview: Preview the production build locally.

Contributing

Fork the repository.
Create a feature branch (git checkout -b feature/YourFeature).
Commit changes (git commit -m "Add your feature").
Push to the branch (git push origin feature/YourFeature).
Open a pull request.

License
This project is licensed under the MIT License.
