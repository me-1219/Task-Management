import { useState } from "react";
import { motion } from "motion/react";
import { ChevronRight, ChevronDown, Plus, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Progress } from "../components/ui/progress";

interface TimelineTask {
  id: string;
  name: string;
  start: Date;
  end: Date;
  progress: number;
  assignee: { name: string; avatar: string };
  dependencies?: string[];
  subtasks?: TimelineTask[];
  status: "not-started" | "in-progress" | "completed";
}

const mockTasks: TimelineTask[] = [
  {
    id: "1",
    name: "Project Planning Phase",
    start: new Date(2026, 3, 1),
    end: new Date(2026, 3, 7),
    progress: 100,
    status: "completed",
    assignee: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    subtasks: [
      {
        id: "1-1",
        name: "Requirements Gathering",
        start: new Date(2026, 3, 1),
        end: new Date(2026, 3, 3),
        progress: 100,
        status: "completed",
        assignee: {
          name: "Sarah Chen",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
        },
      },
      {
        id: "1-2",
        name: "Technical Specification",
        start: new Date(2026, 3, 4),
        end: new Date(2026, 3, 7),
        progress: 100,
        status: "completed",
        assignee: {
          name: "Michael Brown",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
        },
      },
    ],
  },
  {
    id: "2",
    name: "Design Phase",
    start: new Date(2026, 3, 8),
    end: new Date(2026, 3, 18),
    progress: 75,
    status: "in-progress",
    assignee: {
      name: "Emily Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
    dependencies: ["1"],
    subtasks: [
      {
        id: "2-1",
        name: "UI/UX Design",
        start: new Date(2026, 3, 8),
        end: new Date(2026, 3, 14),
        progress: 90,
        status: "in-progress",
        assignee: {
          name: "Emily Rodriguez",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
        },
      },
      {
        id: "2-2",
        name: "Design Review",
        start: new Date(2026, 3, 15),
        end: new Date(2026, 3, 18),
        progress: 60,
        status: "in-progress",
        assignee: {
          name: "Sarah Chen",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
        },
      },
    ],
  },
  {
    id: "3",
    name: "Development Phase",
    start: new Date(2026, 3, 19),
    end: new Date(2026, 4, 10),
    progress: 30,
    status: "in-progress",
    assignee: {
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
    dependencies: ["2"],
    subtasks: [
      {
        id: "3-1",
        name: "Frontend Development",
        start: new Date(2026, 3, 19),
        end: new Date(2026, 4, 5),
        progress: 40,
        status: "in-progress",
        assignee: {
          name: "David Kim",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
        },
      },
      {
        id: "3-2",
        name: "Backend Development",
        start: new Date(2026, 3, 19),
        end: new Date(2026, 4, 10),
        progress: 20,
        status: "in-progress",
        assignee: {
          name: "Michael Brown",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
        },
      },
    ],
  },
  {
    id: "4",
    name: "Testing Phase",
    start: new Date(2026, 4, 11),
    end: new Date(2026, 4, 20),
    progress: 0,
    status: "not-started",
    assignee: {
      name: "Jessica Taylor",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop",
    },
    dependencies: ["3"],
  },
  {
    id: "5",
    name: "Deployment",
    start: new Date(2026, 4, 21),
    end: new Date(2026, 4, 25),
    progress: 0,
    status: "not-started",
    assignee: {
      name: "Michael Brown",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    },
    dependencies: ["4"],
  },
];

const statusColors = {
  "not-started": "bg-gray-300 dark:bg-gray-700",
  "in-progress": "bg-blue-500",
  completed: "bg-green-500",
};

export function TimelineView() {
  const [tasks] = useState<TimelineTask[]>(mockTasks);
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set(["1", "2", "3"]));

  // Calculate timeline range
  const allDates = tasks.flatMap((task) => [
    task.start,
    task.end,
    ...(task.subtasks?.flatMap((st) => [st.start, st.end]) || []),
  ]);
  const minDate = new Date(Math.min(...allDates.map((d) => d.getTime())));
  const maxDate = new Date(Math.max(...allDates.map((d) => d.getTime())));
  const totalDays = Math.ceil(
    (maxDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  const getTaskPosition = (start: Date, end: Date) => {
    const startOffset = Math.ceil(
      (start.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    const duration = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const leftPercent = (startOffset / totalDays) * 100;
    const widthPercent = (duration / totalDays) * 100;
    return { left: `${leftPercent}%`, width: `${widthPercent}%` };
  };

  const toggleExpand = (taskId: string) => {
    const newExpanded = new Set(expandedTasks);
    if (newExpanded.has(taskId)) {
      newExpanded.delete(taskId);
    } else {
      newExpanded.add(taskId);
    }
    setExpandedTasks(newExpanded);
  };

  const renderTask = (task: TimelineTask, level: number = 0) => {
    const isExpanded = expandedTasks.has(task.id);
    const hasSubtasks = task.subtasks && task.subtasks.length > 0;
    const position = getTaskPosition(task.start, task.end);

    return (
      <div key={task.id}>
        <div className="flex border-b border-border hover:bg-muted/50 transition-colors">
          {/* Task Name Column */}
          <div className="w-80 p-3 border-r border-border flex items-center gap-2">
            <div style={{ marginLeft: `${level * 24}px` }}>
              {hasSubtasks && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => toggleExpand(task.id)}
                >
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm text-foreground truncate">
                {task.name}
              </div>
              <div className="text-xs text-muted-foreground">
                {task.start.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
                {" - "}
                {task.end.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>

          {/* Assignee Column */}
          <div className="w-32 p-3 border-r border-border flex items-center justify-center">
            <Avatar className="h-8 w-8">
              <AvatarImage src={task.assignee.avatar} />
              <AvatarFallback>
                {task.assignee.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Progress Column */}
          <div className="w-24 p-3 border-r border-border flex items-center justify-center">
            <span className="text-sm font-medium text-foreground">{task.progress}%</span>
          </div>

          {/* Timeline Column */}
          <div className="flex-1 p-3 relative">
            <div
              className={`absolute top-1/2 -translate-y-1/2 h-8 rounded ${
                statusColors[task.status]
              } transition-all duration-300 hover:opacity-80 cursor-pointer group`}
              style={position}
            >
              <div className="h-full flex items-center px-2 overflow-hidden">
                <span className="text-xs font-medium text-white truncate">
                  {task.name}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
                <div
                  className="h-full bg-white/30"
                  style={{ width: `${task.progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Render Subtasks */}
        {isExpanded &&
          hasSubtasks &&
          task.subtasks!.map((subtask) => renderTask(subtask, level + 1))}
      </div>
    );
  };

  // Generate month markers
  const months = [];
  let currentMonth = new Date(minDate);
  while (currentMonth <= maxDate) {
    months.push(new Date(currentMonth));
    currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Timeline</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Gantt chart view of project timeline
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Button>
        </div>
      </div>

      {/* Legend */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-green-500" />
              <span className="text-sm text-foreground">Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-blue-500" />
              <span className="text-sm text-foreground">In Progress</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gray-300 dark:bg-gray-700" />
              <span className="text-sm text-foreground">Not Started</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline Chart */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <div className="min-w-[1200px]">
              {/* Header Row */}
              <div className="flex border-b-2 border-border bg-muted">
                <div className="w-80 p-3 border-r border-border">
                  <span className="font-semibold text-foreground">Task Name</span>
                </div>
                <div className="w-32 p-3 border-r border-border text-center">
                  <span className="font-semibold text-foreground">Assignee</span>
                </div>
                <div className="w-24 p-3 border-r border-border text-center">
                  <span className="font-semibold text-foreground">Progress</span>
                </div>
                <div className="flex-1 p-3">
                  <div className="flex">
                    {months.map((month, idx) => {
                      const monthStart = new Date(
                        month.getFullYear(),
                        month.getMonth(),
                        1
                      );
                      const monthEnd = new Date(
                        month.getFullYear(),
                        month.getMonth() + 1,
                        0
                      );
                      const position = getTaskPosition(monthStart, monthEnd);

                      return (
                        <div
                          key={idx}
                          className="text-center font-semibold text-foreground text-sm"
                          style={{ width: position.width }}
                        >
                          {month.toLocaleDateString("en-US", {
                            month: "short",
                            year: "numeric",
                          })}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Task Rows */}
              <div>{tasks.map((task) => renderTask(task))}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Project Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium text-muted-foreground mb-2">
              Overall Progress
            </div>
            <div className="text-3xl font-semibold text-foreground mb-2">
              {Math.round(tasks.reduce((acc, t) => acc + t.progress, 0) / tasks.length)}%
            </div>
            <Progress
              value={tasks.reduce((acc, t) => acc + t.progress, 0) / tasks.length}
              className="h-2"
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium text-muted-foreground mb-2">
              Active Tasks
            </div>
            <div className="text-3xl font-semibold text-foreground">
              {tasks.filter((t) => t.status === "in-progress").length}
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              of {tasks.length} total tasks
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium text-muted-foreground mb-2">
              Project Duration
            </div>
            <div className="text-3xl font-semibold text-foreground">{totalDays}</div>
            <div className="text-sm text-muted-foreground mt-2">days</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
