interface Earthquake {
  id: string;
  properties: {
    mag: number;
    place: string;
    time: number;
    title: string;
    url: string;
    type: string;
    alert: string | null;
    tsunami: number;
  };
  geometry: {
    coordinates: [number, number, number];
  };
}

interface EarthquakeDetailsProps {
  earthquake: Earthquake | null;
}

export default function EarthquakeDetails({ earthquake }: EarthquakeDetailsProps) {
  if (!earthquake) return (
    <div className="p-3 text-center text-gray-500 text-sm font-medium">
      Select an earthquake from the map to see details.
    </div>
  );

  return (
    <div className="h-full overflow-hidden">
      <h2 className="text-base font-bold mb-1 leading-tight text-blue-800 dark:text-blue-300 truncate" title={earthquake.properties.title}>
        {earthquake.properties.title}
      </h2>
      <div className="grid grid-cols-1 gap-1 text-sm">
        <div>
          <span className="font-semibold text-blue-600">Magnitude:</span>
          <span className="ml-2 font-bold text-base">{earthquake.properties.mag}</span>
        </div>
        <div>
          <span className="font-semibold text-blue-600">Time:</span>
          <span className="ml-2 text-xs">{new Date(earthquake.properties.time).toLocaleString()}</span>
        </div>
        <div className="mt-1">
          <a
            href={earthquake.properties.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs font-medium transition-colors shadow"
          >
            View USGS Details →
          </a>
        </div>
      </div>
      <div className="mt-1">
        <span className="font-semibold text-blue-600">Location:</span>
        <span className="ml-2 text-xs">{earthquake.properties.place}</span>
      </div>
      {earthquake.properties.tsunami > 0 && (
        <div className="mt-1 p-2 bg-red-100 border-l-4 border-red-500 text-red-700 text-sm rounded flex items-center gap-2">
          <span role="img" aria-label="Tsunami">🌊</span>
          <span className="font-semibold">Tsunami Warning!</span>
        </div>
      )}
      {earthquake.properties.alert && (
        <div className="mt-1 p-2 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 text-sm rounded flex items-center gap-2">
          <span role="img" aria-label="Alert">⚠️</span>
          <span className="font-semibold">Alert Level:</span> {earthquake.properties.alert.toUpperCase()}
        </div>
      )}
    </div>
  );
}
