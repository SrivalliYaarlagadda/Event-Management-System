

import { EventType } from "@/app/data/events";
import EventDetailsClient from "./EventDetailsClient";

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const eventId = Number(id);
  const event = EventType.find((e) => e.id === eventId);

  if (!event) {
    return <div className="p-10 text-red-500">Event not found.</div>;
  }

  return <EventDetailsClient event={event} />;
}
