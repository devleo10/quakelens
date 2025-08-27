# Quakelens

## Features

- **Real-time earthquake data** from USGS API
- **Interactive map** powered by Leaflet.js
- **Magnitude filtering** with responsive controls
- **Live statistics** showing current earthquake activity
- **Responsive design** with Tailwind CSS
- **TypeScript support** for better development experience

## Technology Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Leaflet.js** - Interactive maps
- **Radix UI** - Accessible UI components
- **Lucide React** - Beautiful icons

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   Navigate to `http://localhost:5173`

## Migration Notes

This project was successfully migrated from a Next.js application to React.js:

### Key Changes Made:

1. **Project Structure:**
   - Removed Next.js app directory structure
   - Moved components to standard React src structure
   - Updated all import paths to use relative imports

2. **Routing:**
   - Removed Next.js routing system
   - Single-page application structure

3. **API Handling:**
   - Kept the same USGS earthquake API integration
   - Standard fetch API calls (no Next.js API routes needed)

4. **Styling:**
   - Maintained Tailwind CSS configuration
   - Preserved all UI components and styling
   - Updated CSS variables and theming

5. **Components:**
   - Migrated all UI components (Card, Button, Badge, Alert)
   - Preserved earthquake map functionality
   - Maintained all interactive features

### Features Preserved:

- ✅ Interactive earthquake map
- ✅ Real-time data fetching from USGS
- ✅ Magnitude-based filtering
- ✅ Color-coded earthquake markers
- ✅ Detailed popup information
- ✅ Live statistics dashboard
- ✅ Responsive design
- ✅ Dark/light theme support
- ✅ Magnitude scale legend

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Deployment

To build for production:

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment to any static hosting service.

## API Data Source

This application uses real-time earthquake data from the [USGS Earthquake API](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php).

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
