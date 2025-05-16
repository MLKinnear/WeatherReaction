# WeatherReaction

A lightweight React app that lets you search for any city’s weather and view current, hourly, 7-day forecasts and toggle instantly between Celsius & km/h and Fahrenheit & mph.

---

## 🛠 Technologies & External Libraries

- **React** — UI library for building components  
- **Vite** — Development server & build tool  
- **Tailwind CSS** — Utility-first styling framework  
- **date-fns** — Date formatting utilities  
- **OpenWeatherMap One Call API** — Weather data provider  
- **Environment Variables** — (`VITE_OPENWEATHER_API_KEY`) stored in `.env`  

---

## 📂 Project Structure
<pre markdown>
├── public/
│ └── WeatherReactionLogo.png # App logo & weather icon assets
│
├── src/
│ ├── components/ # UI pieces
│ │ ├── Header.jsx # Logo header
│ │ ├── Navbar.jsx # Search form + unit toggle
│ │ ├── LocationCard.jsx # Clickable city result
│ │ ├── ForecastCard.jsx # Wrapper for all forecast sections
│ │ ├── CurrentForecastCard.jsx # Current weather display
│ │ ├── HourlyCard.jsx # Hourly forecast item
│ │ ├── DailyCard.jsx # 7-day forecast item
│ │ └── Footer.jsx # Link footer
│ │
│ ├── hooks/ # Data-loading logic
│ │ ├── useGeocoding.js # City name via lat/lon lookup
│ │ └── useForecast.js # One-call weather fetch
│ │
│ ├── utils/ # Unit Converters
│ │ └── convert.js # C to F, m/s to km/h or mph
│ │
│ ├── App.jsx # Enables search, selection, unit toggle
│ └── main.jsx # Vite entry point
│
├── .env # VITE_OPENWEATHER_API_KEY=your_key_here
├── tailwind.config.js # Tailwind setup
├── vite.config.js # Vite configuration
└── package.json # Dependencies & scripts
</pre>
## 🔍 How It Works

1. **Search**  
   - User enters a city in the **Navbar**.  
   - `useGeocoding` fetches up to 5 matching locations and renders a `LocationCard` for each.

2. **Select Location**  
   - Clicking a `LocationCard` sets `selectedLoc` in **App**.  
   - `useForecast` automatically fetches the One Call API for that lat/lon (in metric).

3. **Display & Toggle Units**  
   - Forecast data is passed down to `CurrentForecastCard`, `HourlyCard`, and `DailyCard`.  
   - A single “pill” toggle in the Navbar flips `unit` between `'metric'`/`'imperial'`.  
   - Components convert temperatures and wind speeds on-the-fly using `convert.js`.

---

## ⚙️ Setup & Run

1. **Clone** the repo and `cd` into it  
2. Copy `.env.example` → `.env` and add your `VITE_OPENWEATHER_API_KEY`  
3. `npm install`  
4. `npm run dev`  

Enjoy retro styled, no-refresh unit toggling responsive weather cards!  