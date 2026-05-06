export interface ServiceOption {
  label: string;
  category: string;
}

export const AV_SERVICES: ServiceOption[] = [
  { label: "AV Tech", category: "Audio/Visual" },
  { label: "Sound Tech", category: "Audio" },
  { label: "Lighting Tech", category: "Lighting" },
  { label: "Camera Operator", category: "Video" },
  { label: "Video Tech", category: "Video" },
  { label: "Stage Hand", category: "Production" },
  { label: "FOH Engineer", category: "Audio" },
  { label: "Monitor Engineer", category: "Audio" },
  { label: "Live Stream Tech", category: "Video" },
  { label: "DJ", category: "Audio" },
  { label: "Grip", category: "Production" },
  { label: "Gaffer", category: "Lighting" },
  { label: "Best Boy", category: "Production" },
  { label: "Production Assistant", category: "Production" },
  { label: "Event Tech", category: "Audio/Visual" },
  { label: "Projectionist", category: "Audio/Visual" },
  { label: "LED Tech", category: "Lighting" },
  { label: "Rigger", category: "Production" },
  { label: "Audio Engineer", category: "Audio" },
  { label: "Broadcast Tech", category: "Video" },
];

export const COMMON_RATES = [25, 30, 35, 40, 50, 75];

export function filterServices(query: string): ServiceOption[] {
  if (!query.trim()) return AV_SERVICES;
  const lower = query.toLowerCase();
  return AV_SERVICES.filter(
    (s) =>
      s.label.toLowerCase().includes(lower) ||
      s.category.toLowerCase().includes(lower),
  );
}
