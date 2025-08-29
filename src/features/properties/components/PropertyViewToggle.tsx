import { Grid3x3, List, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ViewMode } from "@/types/property";

interface PropertyViewToggleProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export function PropertyViewToggle({ viewMode, onViewModeChange }: PropertyViewToggleProps) {
  const viewOptions = [
    { mode: 'card' as ViewMode, icon: Grid3x3, label: 'Tarjetas' },
    { mode: 'list' as ViewMode, icon: List, label: 'Lista' },
    { mode: 'map' as ViewMode, icon: Map, label: 'Mapa' },
  ];

  return (
    <div className="flex items-center border rounded-lg p-1 bg-muted">
      {viewOptions.map(({ mode, icon: Icon, label }) => (
        <Button
          key={mode}
          variant={viewMode === mode ? "default" : "ghost"}
          size="sm"
          onClick={() => onViewModeChange(mode)}
          className="flex items-center gap-2 px-3"
        >
          <Icon className="h-4 w-4" />
          <span className="hidden sm:inline">{label}</span>
        </Button>
      ))}
    </div>
  );
}