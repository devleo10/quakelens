import React from 'react';

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
  if (!earthquake) return <div className="p-4 text-center text-gray-500">Select an earthquake from the map to see details.</div>;
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">{earthquake.properties.title}</h2>
      <p className="mb-1">Magnitude: {earthquake.properties.mag}</p>
      <p className="mb-1">Location: {earthquake.properties.place}</p>
      <p className="mb-1">Time: {new Date(earthquake.properties.time).toLocaleString()}</p>
      {earthquake.properties.tsunami > 0 && (
        <p className="text-red-600 font-semibold mb-1">Tsunami Warning!</p>
      )}
      {earthquake.properties.alert && (
        <p className="text-yellow-500 mb-1">Alert Level: {earthquake.properties.alert.toUpperCase()}</p>
      )}
      <a href={earthquake.properties.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
        View USGS Details
      </a>
    </div>
  );
}
