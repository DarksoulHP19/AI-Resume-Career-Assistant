import ReactMarkdown from "react-markdown";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose dark:prose-invert max-w-none prose-sm sm:prose-base prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-strong:text-foreground">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
