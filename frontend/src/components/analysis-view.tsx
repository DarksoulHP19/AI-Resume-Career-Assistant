import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Section({ title, content }: { title: string; content: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="whitespace-pre-wrap text-sm leading-relaxed">
        {content}
      </CardContent>
    </Card>
  );
}

export function splitSections(text: string) {
  const parts = text.split(/\n(?=\d+\.)/g);
  return parts.map((p) => p.replace(/^\d+\.\s*/, ""));
}