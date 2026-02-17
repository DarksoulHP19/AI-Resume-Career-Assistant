const steps = ["Upload", "Analysis", "JD Match", "Interview"];

export default function AssistantStepper({ step }: { step: number }) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {steps.map((label, i) => (
        <div key={i} className="flex flex-col items-center gap-2">
          <div className={`h-10 w-10 rounded-full flex items-center justify-center font-medium transition-all ${
            i <= step ? "bg-primary text-primary-foreground shadow" : "bg-muted text-muted-foreground"
          }`}>
            {i + 1}
          </div>
          <span className={`text-sm ${i === step ? "text-foreground font-medium" : "text-muted-foreground"}`}>
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}