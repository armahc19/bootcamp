interface ProgressBarProps {
  progress: number;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

export const ProgressBar = ({ progress, showLabel = true, size = "md" }: ProgressBarProps) => {
  const height = size === "sm" ? "h-2" : size === "md" ? "h-3" : "h-4";
  
  return (
    <div className="w-full">
      <div className={`${height} bg-muted rounded-full overflow-hidden`}>
        <div
          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 ease-out"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      {showLabel && (
        <p className="text-sm text-muted-foreground mt-1">{progress}% complete</p>
      )}
    </div>
  );
};
