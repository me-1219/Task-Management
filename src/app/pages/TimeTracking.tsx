import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Play, Pause, Square, Clock, Calendar, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { toast } from "sonner";

interface TimeEntry {
  id: string;
  task: string;
  project: string;
  duration: number;
  date: Date;
  description: string;
  user: { name: string; avatar: string };
  status: "running" | "paused" | "completed";
}

const mockEntries: TimeEntry[] = [
  {
    id: "1",
    task: "Design new landing page",
    project: "Website Redesign",
    duration: 7200,
    date: new Date(2026, 3, 1),
    description: "Working on hero section mockups",
    user: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    status: "completed",
  },
  {
    id: "2",
    task: "API Integration",
    project: "Backend Development",
    duration: 10800,
    date: new Date(2026, 3, 1),
    description: "Implementing authentication endpoints",
    user: {
      name: "Michael Brown",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    },
    status: "completed",
  },
  {
    id: "3",
    task: "Bug Fixing",
    project: "Mobile App",
    duration: 5400,
    date: new Date(2026, 3, 2),
    description: "Resolving payment gateway issues",
    user: {
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
    status: "completed",
  },
];

export function TimeTracking() {
  const [entries, setEntries] = useState<TimeEntry[]>(mockEntries);
  const [isTracking, setIsTracking] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentTask, setCurrentTask] = useState("");
  const [currentProject, setCurrentProject] = useState("");

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTracking) {
      interval = setInterval(() => {
        setCurrentTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTracking]);

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStartTimer = () => {
    if (!currentTask.trim()) {
      toast.error("Please enter what you're working on");
      return;
    }
    setIsTracking(true);
    toast.success("Timer started!");
  };

  const handlePauseTimer = () => {
    setIsTracking(false);
    toast.info("Timer paused");
  };

  const handleStopAndSave = () => {
    if (currentTime === 0) {
      toast.error("No time to save");
      return;
    }

    const newEntry: TimeEntry = {
      id: Date.now().toString(),
      task: currentTask,
      project: currentProject || "General",
      duration: currentTime,
      date: new Date(),
      description: currentTask,
      user: {
        name: "John Doe",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      },
      status: "completed",
    };

    setEntries([newEntry, ...entries]);
    setIsTracking(false);
    setCurrentTime(0);
    setCurrentTask("");
    setCurrentProject("");
    toast.success(`Time entry saved: ${formatDuration(currentTime).substring(0, 5)}h`);
  };

  const totalHoursToday = entries
    .filter((e) => {
      const today = new Date();
      return (
        e.date.getDate() === today.getDate() &&
        e.date.getMonth() === today.getMonth() &&
        e.date.getFullYear() === today.getFullYear()
      );
    })
    .reduce((acc, e) => acc + e.duration, 0);

  const totalHoursWeek = entries.reduce((acc, e) => acc + e.duration, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-foreground">Time Tracking</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Track your work hours and productivity
        </p>
      </div>

      {/* Timer Card */}
      <Card>
        <CardContent className="p-8">
          <div className="flex flex-col items-center gap-6">
            <div className="text-6xl font-bold text-foreground tabular-nums">
              {formatDuration(currentTime)}
            </div>

            <div className="w-full max-w-md space-y-4">
              <div>
                <Label htmlFor="currentTask">What are you working on?</Label>
                <Input
                  id="currentTask"
                  placeholder="Enter task description..."
                  className="text-lg"
                  value={currentTask}
                  onChange={(e) => setCurrentTask(e.target.value)}
                  disabled={isTracking}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="project">Project</Label>
                  <Select
                    value={currentProject}
                    onValueChange={setCurrentProject}
                    disabled={isTracking}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="website">Website Redesign</SelectItem>
                      <SelectItem value="mobile">Mobile App</SelectItem>
                      <SelectItem value="backend">Backend Development</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="tags">Tags</Label>
                  <Input id="tags" placeholder="Add tags..." disabled={isTracking} />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              {!isTracking ? (
                <Button size="lg" onClick={handleStartTimer}>
                  <Play className="mr-2 h-5 w-5" />
                  Start Timer
                </Button>
              ) : (
                <>
                  <Button size="lg" variant="outline" onClick={handlePauseTimer}>
                    <Pause className="mr-2 h-5 w-5" />
                    Pause
                  </Button>
                  <Button size="lg" variant="destructive" onClick={handleStopAndSave}>
                    <Square className="mr-2 h-5 w-5" />
                    Stop & Save
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30">
                <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Today</div>
                <div className="text-2xl font-semibold text-foreground">
                  {formatDuration(totalHoursToday).substring(0, 5)}h
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950/30">
                <Calendar className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">This Week</div>
                <div className="text-2xl font-semibold text-foreground">
                  {formatDuration(totalHoursWeek).substring(0, 5)}h
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-950/30">
                <Clock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">
                  Avg per Day
                </div>
                <div className="text-2xl font-semibold text-foreground">
                  {formatDuration(totalHoursWeek / 7).substring(0, 5)}h
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Time Entries */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Time Entries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {entries.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={entry.user.avatar} />
                  <AvatarFallback>
                    {entry.user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="font-medium text-foreground">{entry.task}</div>
                  <div className="text-sm text-muted-foreground">
                    {entry.description}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      {entry.project}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {entry.date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-lg font-semibold text-foreground">
                    {formatDuration(entry.duration).substring(0, 5)}h
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {entry.user.name.split(" ")[0]}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}