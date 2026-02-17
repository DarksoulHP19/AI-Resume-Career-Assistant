export default function LayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-6 py-14">
        <div className="space-y-10">
          <header className="space-y-3 text-center">
            <h1 className="text-4xl font-bold tracking-tight">AI Resume Assistant</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Upload your resume, evaluate job fit, and generate interview questions — guided step by step.
            </p>
          </header>
          {children}
        </div>
      </div>
    </div>
  );
}