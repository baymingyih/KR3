import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface PrayerGuide {
  day: number;
  title: string;
  verse: string;
  prayer: string;
}

export default function EventPrayerGuide({ prayerGuide }: { prayerGuide: PrayerGuide[] }) {
  return (
    <ScrollArea className="h-[500px] pr-4">
      {prayerGuide.map((guide, index) => (
        <Card key={index} className="mb-4">
          <CardHeader>
            <CardTitle className="text-lg">Day {guide.day}: {guide.title}</CardTitle>
            <p className="text-sm text-muted-foreground">{guide.verse}</p>
          </CardHeader>
          <CardContent>
            <p>{guide.prayer}</p>
          </CardContent>
        </Card>
      ))}
    </ScrollArea>
  );
}