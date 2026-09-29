/**
 * Haversine formula — računa udaljenost "vazdušnom linijom" između dvije
 * GPS tačke, u kilometrima.
 */
export function udaljenostKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = stepeniURadijane(lat2 - lat1);
  const dLng = stepeniURadijane(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(stepeniURadijane(lat1)) *
      Math.cos(stepeniURadijane(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function stepeniURadijane(stepeni) {
  return (stepeni * Math.PI) / 180;
}
