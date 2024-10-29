import { events } from '@/lib/data/events';
import EventDetail from '@/components/events/EventDetail';

export function generateStaticParams() {
  return events.map((event) => ({
    id: event.id.toString(),
  }));
}

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const event = events.find(e => e.id === parseInt(params.id));

  if (!event) {
    return <div className="container mx-auto px-4 py-8">Event not found</div>;
  }

  return <EventDetail event={event} />;
}