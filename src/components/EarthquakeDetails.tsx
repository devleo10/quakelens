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
    <div className="p-3 sm:p-4 text-center text-gray-500 text-sm sm:text-base">
      Select an earthquake from the map to see details.
    </div>
  );
  
  return (
    <div className="p-3 sm:p-4 max-h-full overflow-y-auto">
      <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 leading-tight">{earthquake.properties.title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-sm sm:text-base">
        <div>
          <span className="font-semibold text-blue-600">Magnitude:</span>
          <span className="ml-2">{earthquake.properties.mag}</span>
        </div>
        <div>
          <span className="font-semibold text-blue-600">Time:</span>
          <span className="ml-2 text-xs sm:text-sm">{new Date(earthquake.properties.time).toLocaleString()}</span>
        </div>
      </div>
      <div className="mt-2 sm:mt-3">
        <span className="font-semibold text-blue-600">Location:</span>
        <span className="ml-2 text-sm sm:text-base">{earthquake.properties.place}</span>
      </div>
      {earthquake.properties.tsunami > 0 && (
        <div className="mt-2 sm:mt-3 p-2 bg-red-100 border-l-4 border-red-500 text-red-700 text-sm">
          🌊 <span className="font-semibold">Tsunami Warning!</span>
        </div>
      )}
      {earthquake.properties.alert && (
        <div className="mt-2 sm:mt-3 p-2 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 text-sm">
          ⚠️ <span className="font-semibold">Alert Level:</span> {earthquake.properties.alert.toUpperCase()}
        </div>
      )}
      <div className="mt-3 sm:mt-4">
        <a 
          href={earthquake.properties.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm font-medium transition-colors"
        >
          View USGS Details →
        </a>
      </div>
    </div>
  );
}
