import { useState } from "react";
import { motion } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  MapPin,
  Users,
  MoreVertical,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  time: string;
  duration: string;
  type: "task" | "meeting" | "deadline" | "review";
  assignees: { name: string; avatar: string }[];
  location?: string;
  priority: "low" | "medium" | "high";
}

const mockEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Sprint Planning Meeting",
    date: new Date(2026, 3, 2),
    time: "10:00 AM",
    duration: "2h",
    type: "meeting",
    assignees: [
      {
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      },
      {
        name: "Michael Brown",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      },
    ],
    location: "Conference Room A",
    priority: "high",
  },
  {
    id: "2",
    title: "Design Review",
    date: new Date(2026, 3, 3),
    time: "2:00 PM",
    duration: "1h",
    type: "review",
    assignees: [
      {
        name: "Emily Rodriguez",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      },
    ],
    priority: "medium",
  },
  {
    id: "3",
    title: "API Integration Deadline",
    date: new Date(2026, 3, 5),
    time: "11:59 PM",
    duration: "All Day",
    type: "deadline",
    assignees: [
      {
        name: "David Kim",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      },
    ],
    priority: "high",
  },
  {
    id: "4",
    title: "Code Review Session",
    date: new Date(2026, 3, 4),
    time: "3:00 PM",
    duration: "1.5h",
    type: "task",
    assignees: [
      {
        name: "Michael Brown",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      },
    ],
    priority: "medium",
  },
];

const eventTypeColors = {
  task: "bg-blue-500",
  meeting: "bg-purple-500",
  deadline: "bg-red-500",
  review: "bg-green-500",
};

const eventTypeBadgeColors = {
  task: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  meeting: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  deadline: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  review: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
};

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 1));
  const [events, setEvents] = useState<CalendarEvent[]>(mockEvents);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isNewEventOpen, setIsNewEventOpen] = useState(false);
  const [eventForm, setEventForm] = useState({
    title: "",
    date: "",
    time: "",
    duration: "",
    type: "meeting" as CalendarEvent["type"],
    description: "",
    location: "",
  });

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const handleCreateEvent = () => {
    if (!eventForm.title.trim() || !eventForm.date) {
      toast.error("Please enter event title and date");
      return;
    }

    const newEvent: CalendarEvent = {
      id: Date.now().toString(),
      title: eventForm.title,
      date: new Date(eventForm.date),
      time: eventForm.time || "12:00 PM",
      duration: eventForm.duration || "1h",
      type: eventForm.type,
      assignees: [
        {
          name: "John Doe",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
        },
      ],
      location: eventForm.location,
      priority: "medium",
    };

    setEvents([...events, newEvent]);
    toast.success("Event created successfully!");
    setIsNewEventOpen(false);
    setEventForm({
      title: "",
      date: "",
      time: "",
      duration: "",
      type: "meeting",
      description: "",
      location: "",
    });
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter((e) => e.id !== eventId));
    toast.success("Event deleted");
  };

  const getEventsForDate = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return events.filter(
      (event) =>
        event.date.getDate() === day &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear()
    );
  };

  const isToday = (day: number) => {
    const today = new Date();
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const monthName = currentDate.toLocaleString("default", { month: "long", year: "numeric" });

  const days = [];
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(<div key={`empty-${i}`} className="min-h-[120px] border-r border-b border-border bg-muted/20" />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayEvents = getEventsForDate(day);
    const today = isToday(day);

    days.push(
      <motion.div
        key={day}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`min-h-[120px] border-r border-b border-border p-2 hover:bg-muted/50 transition-colors ${
          today ? "bg-indigo-50 dark:bg-indigo-950/30" : "bg-card"
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <span
            className={`text-sm font-semibold ${
              today
                ? "flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-white"
                : "text-foreground"
            }`}
          >
            {day}
          </span>
          {dayEvents.length > 0 && (
            <Badge variant="secondary" className="text-xs">
              {dayEvents.length}
            </Badge>
          )}
        </div>

        <div className="space-y-1">
          {dayEvents.slice(0, 2).map((event) => (
            <div
              key={event.id}
              className={`text-xs p-1.5 rounded cursor-pointer hover:opacity-80 transition-opacity ${
                eventTypeBadgeColors[event.type]
              }`}
            >
              <div className="font-medium truncate">{event.title}</div>
              <div className="text-xs opacity-75">{event.time}</div>
            </div>
          ))}
          {dayEvents.length > 2 && (
            <div className="text-xs text-muted-foreground px-1.5">
              +{dayEvents.length - 2} more
            </div>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Calendar</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            View and manage your schedule
          </p>
        </div>
        <Dialog open={isNewEventOpen} onOpenChange={setIsNewEventOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Event</DialogTitle>
              <DialogDescription>
                Schedule a meeting, task, or deadline
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="eventTitle">Event Title *</Label>
                <Input
                  id="eventTitle"
                  placeholder="Enter event title"
                  value={eventForm.title}
                  onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="eventDate">Date *</Label>
                <Input
                  id="eventDate"
                  type="date"
                  value={eventForm.date}
                  onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="eventTime">Time</Label>
                  <Input
                    id="eventTime"
                    type="time"
                    value={eventForm.time}
                    onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="eventDuration">Duration</Label>
                  <Input
                    id="eventDuration"
                    placeholder="1h"
                    value={eventForm.duration}
                    onChange={(e) => setEventForm({ ...eventForm, duration: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="eventType">Type</Label>
                <Select
                  value={eventForm.type}
                  onValueChange={(value) =>
                    setEventForm({ ...eventForm, type: value as CalendarEvent["type"] })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="task">Task</SelectItem>
                    <SelectItem value="deadline">Deadline</SelectItem>
                    <SelectItem value="review">Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="eventLocation">Location</Label>
                <Input
                  id="eventLocation"
                  placeholder="Conference Room A"
                  value={eventForm.location}
                  onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                />
              </div>
              <Button className="w-full" onClick={handleCreateEvent}>
                Create Event
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Calendar Controls */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-semibold text-foreground">{monthName}</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={previousMonth}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={nextMonth}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={goToToday}>
                Today
              </Button>
              <Button variant="outline" size="sm" onClick={() => toast.info("Week view coming soon!")}>
                Week
              </Button>
              <Button variant="default" size="sm">
                Month
              </Button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="border border-border rounded-lg overflow-hidden">
            {/* Weekday Headers */}
            <div className="grid grid-cols-7 bg-muted">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div
                  key={day}
                  className="p-3 text-center text-sm font-semibold text-foreground border-r border-border last:border-r-0"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7">{days}</div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {events.slice(0, 5).map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
              >
                <div className={`w-1 h-16 rounded-full ${eventTypeColors[event.type]}`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-foreground">{event.title}</h3>
                    <Badge className={`text-xs ${eventTypeBadgeColors[event.type]}`}>
                      {event.type}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {event.date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}{" "}
                      • {event.time}
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {event.location}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {event.assignees.slice(0, 3).map((assignee, idx) => (
                      <Avatar key={idx} className="h-8 w-8 border-2 border-background">
                        <AvatarImage src={assignee.avatar} />
                        <AvatarFallback>
                          {assignee.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleDeleteEvent(event.id)}
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}