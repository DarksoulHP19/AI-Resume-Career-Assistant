import { ThemeToggle } from "./theme-toggle";
import { Briefcase, Github, Mail } from "lucide-react";

export default function LayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 print:bg-white print:text-black print:p-0 flex flex-col">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50 print:hidden">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-default">
            <div className="bg-primary p-1.5 rounded-lg text-primary-foreground group-hover:rotate-6 transition-transform">
              <Briefcase className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight">
              Career
              <span className="text-primary underline decoration-2 underline-offset-4">
                AI
              </span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 mx-auto w-full max-w-4xl px-6 py-12 print:max-w-none print:p-0">
        <div className="space-y-12">
          <section className="space-y-4 text-center print:hidden">
            <h1 className="text-5xl font-black tracking-tighter sm:text-6xl animate-in fade-in slide-in-from-top-4 duration-1000">
              Your AI Career{" "}
              <span className="text-primary italic">Sidekick</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
              Unlock your career potential with AI-driven resume insights, job
              matching, and interview prep.
            </p>
          </section>
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12 print:hidden mt-auto">
        <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-primary" />
              <span className="font-bold text-lg">CareerAI</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Empowering job seekers with cutting-edge artificial intelligence
              to land their dream jobs faster and smarter.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-wider">
              Features
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-primary transition-colors cursor-default">
                Resume Deep Analysis
              </li>
              <li className="hover:text-primary transition-colors cursor-default">
                ATS Compatibility Scoring
              </li>
              <li className="hover:text-primary transition-colors cursor-default">
                Custom Interview Coaching
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex gap-4">
              <a
                href="https://github.com/DarksoulHP19"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit GitHub Profile"
                title="GitHub Profile"
                className="p-2 bg-background border rounded-full hover:border-primary hover:text-primary transition-all shadow-sm"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=harshjpatel1974@gmail.com"
                aria-label="Send Email"
                title="Send Email"
                className="p-2 bg-background border rounded-full hover:border-primary hover:text-primary transition-all shadow-sm"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-6 mt-12 pt-6 border-t text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} CareerAI Assistant. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
