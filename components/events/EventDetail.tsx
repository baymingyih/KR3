"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import EventLeaderboard from '@/components/events/EventLeaderboard';
import EventPrayerGuide from '@/components/events/EventPrayerGuide';
import EventPrayers from '@/components/events/EventPrayers';
import { type Event } from '@/lib/data/events';

export default function EventDetail({ event }: { event: Event }) {
  const [selectedTab, setSelectedTab] = useState("overview");

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{event.name}</CardTitle>
          <p className="text-muted-foreground">
            {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}
          </p>
        </CardHeader>
        <CardContent>
          <div className="relative w-full h-[400px] mb-6 rounded-lg overflow-hidden">
            <Image
              src={event.image}
              alt={event.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="prayer-guide">Prayer Guide</TabsTrigger>
              <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
              <TabsTrigger value="prayers">Prayers</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">About this Event</h3>
                <p>{event.description}</p>
                <div className="flex gap-4">
                  <Button>Register Now</Button>
                  <Button variant="outline">Share Event</Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="prayer-guide" className="mt-6">
              <EventPrayerGuide prayerGuide={event.prayerGuide} />
            </TabsContent>

            <TabsContent value="leaderboard" className="mt-6">
              <EventLeaderboard leaderboard={event.leaderboard} />
            </TabsContent>

            <TabsContent value="prayers" className="mt-6">
              <EventPrayers prayers={event.prayers} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}