const steps = ["Upload", "Analysis", "JD Match", "Interview"];

export default function AssistantStepper({ step }: { step: number }) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {steps.map((label, i) => {
        const isCurrent = i === step;
        const isCompleted = i < step;
        
        return (
          <div key={i} className="flex flex-col items-center gap-3">
            <div className={`h-12 w-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 border-2 ${
              isCurrent 
                ? "bg-slate-950 text-white border-slate-950 scale-110 shadow-lg dark:bg-white dark:text-slate-950 dark:border-white ring-4 ring-primary/10" 
                : isCompleted
                  ? "bg-primary/20 text-primary border-primary/20"
                  : "bg-muted text-muted-foreground border-transparent"
            }`}>
              {isCompleted ? "✓" : i + 1}
            </div>
            <span className={`text-xs font-semibold tracking-wide uppercase ${
              isCurrent ? "text-foreground" : "text-muted-foreground/60"
            }`}>
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
