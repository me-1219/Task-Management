import { motion } from "motion/react";
import {
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  MessageSquare,
  FileText,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const summaryStats = [
  {
    title: "Tasks Completed",
    value: "127",
    change: "+12%",
    trend: "up",
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "Pending Tasks",
    value: "43",
    change: "-8%",
    trend: "down",
    icon: Clock,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Overdue",
    value: "7",
    change: "+2",
    trend: "up",
    icon: AlertCircle,
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
  {
    title: "Team Members",
    value: "24",
    change: "+3",
    trend: "up",
    icon: Users,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
  },
];

const recentActivities = [
  {
    id: 1,
    user: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    action: "completed task",
    target: "Design new landing page",
    time: "2 minutes ago",
    type: "complete",
  },
  {
    id: 2,
    user: "Michael Brown",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    action: "commented on",
    target: "API Integration Sprint",
    time: "15 minutes ago",
    type: "comment",
  },
  {
    id: 3,
    user: "Emily Rodriguez",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    action: "uploaded file",
    target: "Project Requirements.pdf",
    time: "1 hour ago",
    type: "file",
  },
  {
    id: 4,
    user: "David Kim",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    action: "created task",
    target: "Update user authentication",
    time: "2 hours ago",
    type: "task",
  },
  {
    id: 5,
    user: "Jessica Taylor",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop",
    action: "assigned task to",
    target: "Alex Johnson",
    time: "3 hours ago",
    type: "assign",
  },
];

const projectProgress = [
  { name: "Website Redesign", progress: 85, tasks: 34, color: "#4f46e5" },
  { name: "Mobile App", progress: 62, tasks: 28, color: "#06b6d4" },
  { name: "Marketing Campaign", progress: 43, tasks: 18, color: "#8b5cf6" },
  { name: "API Development", progress: 91, tasks: 22, color: "#10b981" },
];

const weeklyData = [
  { day: "Mon", completed: 12, created: 8 },
  { day: "Tue", completed: 15, created: 10 },
  { day: "Wed", completed: 8, created: 12 },
  { day: "Thu", completed: 18, created: 7 },
  { day: "Fri", completed: 14, created: 9 },
  { day: "Sat", completed: 6, created: 4 },
  { day: "Sun", completed: 5, created: 3 },
];

const taskDistribution = [
  { name: "To Do", value: 43, color: "#94a3b8" },
  { name: "In Progress", value: 28, color: "#3b82f6" },
  { name: "In Review", value: 15, color: "#f59e0b" },
  { name: "Done", value: 127, color: "#10b981" },
];

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="mt-1 text-sm text-muted-foreground">
          Welcome back! Here's what's happening with your projects today.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summaryStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <p className="mt-2 text-3xl font-semibold text-foreground">
                        {stat.value}
                      </p>
                      <div className="mt-2 flex items-center gap-1 text-sm">
                        {stat.trend === "up" ? (
                          <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />
                        )}
                        <span
                          className={
                            stat.trend === "up" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                          }
                        >
                          {stat.change}
                        </span>
                        <span className="text-muted-foreground">from last week</span>
                      </div>
                    </div>
                    <div className={`rounded-xl ${stat.bgColor} dark:bg-opacity-20 p-3`}>
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Weekly Activity Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle>Weekly Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="opacity-20" />
                  <XAxis dataKey="day" stroke="currentColor" className="text-muted-foreground" />
                  <YAxis stroke="currentColor" className="text-muted-foreground" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      color: "hsl(var(--foreground))",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="completed" fill="#4f46e5" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="created" fill="#06b6d4" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Task Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle>Task Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={taskDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {taskDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      color: "hsl(var(--foreground))",
                    }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Project Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle>Project Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {projectProgress.map((project) => (
                  <div key={project.name}>
                    <div className="mb-2 flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">{project.name}</p>
                        <p className="text-sm text-muted-foreground">{project.tasks} tasks</p>
                      </div>
                      <span className="text-sm font-semibold text-foreground">
                        {project.progress}%
                      </span>
                    </div>
                    <Progress
                      value={project.progress}
                      className="h-2"
                      style={
                        {
                          "--progress-background": project.color,
                        } as React.CSSProperties
                      }
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Activity Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex gap-3 hover:bg-muted/50 p-2 rounded-lg transition-colors">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={activity.avatar} />
                      <AvatarFallback>
                        {activity.user
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm">
                        <span className="font-medium text-foreground">
                          {activity.user}
                        </span>{" "}
                        <span className="text-muted-foreground">{activity.action}</span>{" "}
                        <span className="font-medium text-foreground">
                          {activity.target}
                        </span>
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                    <div>
                      {activity.type === "complete" && (
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                      )}
                      {activity.type === "comment" && (
                        <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      )}
                      {activity.type === "file" && (
                        <FileText className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      )}
                      {activity.type === "task" && (
                        <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}