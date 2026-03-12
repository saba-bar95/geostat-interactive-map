## ⚡ Project: Business Statistics Map

**Interactive Business Statistics Dashboard for Georgia** - Built as a free, accessible tool for researchers, journalists, students, local governments, and anyone interested in Georgia’s economic geography.

Explore turnover, employment, value added, and 10+ other indicators – from regional level down to every single municipality.

---

### ✨ Features

- 🗺️ Interactive Georgia **map** with zoom to all **municipalities** and **regions**
- 📊 Dynamic **pie charts + histograms** for business indicators
- 🎛️ Instantly switch **indicators** (turnover, employment, value added, etc.)
- 📅 Select **years** with easy dropdown
- 💾 Export charts & data: **PDF • Excel • JPG • PNG**
- 🌐 Fully bilingual – **Georgian** ↔ **English** (auto + toggle)
- 📱 100% responsive – perfect on **phones**, **tablets** & **desktop**
- 🔍 **Advanced Companies Search** – filter by region, legal form, and economic activity, then search companies by name with live autocomplete and pinpoint them on the map
- 🗂️ **Marker clustering** – company pins on the map automatically group into color-coded clusters (green → yellow → orange) based on density, keeping the map readable at any zoom level
- 💹 **Consumer Price Index page** – explore CPI and producer price data by region and municipality, with month/year selection, expandable regional breakdowns, color-coded map, and histogram visualizations
- 👥 **Gender breakdown** – Diagram and Histogram tabs include a gender split view showing male/female employment distribution across all regions

---

### 🛠️ Technologies Used

- ⚛️ **Frontend:** [React](https://reactjs.org/)
- 🔄 **State Management:** [Context API](https://react.dev/learn/passing-data-deeply-with-context)
- 📈 **Charts & Visualization:** [amCharts](https://www.amcharts.com/)
- 🗺 **Maps:** GeoJSON and [React Leaflet](https://react-leaflet.js.org/)
- 🎨 **Styling:** [SCSS](https://sass-lang.com/)
- 🚀 **Deployment:** [Vercel](https://vercel.com/)

---

### 🔧 Getting Started

To run this project locally:

```bash
git clone https://github.com/saba-bar95/business-statistics-map
cd business-statistics-map
npm install
npm run dev
```

---

### 🌍 Live Demo

🔗 [Visit Business Statistics Map](https://geostat-interactive-map.vercel.app/ge/)

---

### 🖼️ Screenshot

![Overview of the Business Statistics Map](overview.png)

---

### 📂 Pages & Modules

#### 🏢 Business Statistics
The main dashboard. Select an economic indicator and year to see municipality-level data visualized on the map. Switch between the **Indicator** panel (ranked list of regions/municipalities), **Diagram** (pie chart), and **Histogram** (bar chart) tabs. Both chart tabs also offer a **gender breakdown view** showing male/female employment split per region. All charts support export.

#### 🔍 Find Business Entity
An advanced search panel within the Business Statistics module. Filter the company database by:
- **Region** – narrow down to a specific Georgian region or search country-wide
- **Legal Form** – filter by company type (LLC, JSC, individual enterprise, etc.)
- **Economic Activity** – pick an activity sector/NACE code
- **Name search** – type any part of a company name to get a live autocomplete list; selecting a result drops a marker on the map at the company's registered location

When many companies are shown at once, markers automatically merge into **color-coded clusters** (green < 10, yellow 10–99, orange 100+) for a clean and readable map view.

#### 💹 Consumer Price Index
A dedicated module for price statistics. Features:
- Switch between **Consumer Price Index (CPI)** and **Input Price Index** indicators
- Select any available **year and month**
- The sidebar lists all regions with their index values (%) and expands to show municipality-level grocery price data
- The map is color-coded by price index intensity per region
- A **Histogram** tab shows a bar chart of regional values with full export support (PDF, Excel, JPG)

---

### 👨‍💻 Author

[Saba Barbakadze – GitHub Profile](https://github.com/saba-bar95)
