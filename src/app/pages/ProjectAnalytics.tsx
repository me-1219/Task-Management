import { motion } from "motion/react";
import {
  TrendingUp,
  TrendingDown,
  Users,
  CheckCircle,
  Clock,
  AlertCircle,
  Calendar,
  Target,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Progress } from "../components/ui/progress";

const performanceData = [
  { month: "Jan", completed: 45, pending: 12, overdue: 3 },
  { month: "Feb", completed: 52, pending: 15, overdue: 2 },
  { month: "Mar", completed: 48, pending: 18, overdue: 4 },
  { month: "Apr", completed: 61, pending: 14, overdue: 2 },
  { month: "May", completed: 55, pending: 20, overdue: 3 },
  { month: "Jun", completed: 67, pending: 16, overdue: 1 },
];

const productivityData = [
  { month: "Jan", hours: 168 },
  { month: "Feb", hours: 182 },
  { month: "Mar", hours: 175 },
  { month: "Apr", hours: 195 },
  { month: "May", hours: 188 },
  { month: "Jun", hours: 203 },
];

const teamPerformance = [
  { name: "Planning", value: 85 },
  { name: "Development", value: 92 },
  { name: "Testing", value: 78 },
  { name: "Deployment", value: 88 },
  { name: "Documentation", value: 75 },
  { name: "Communication", value: 90 },
];

const taskCompletionTrend = [
  { week: "Week 1", rate: 78 },
  { week: "Week 2", rate: 82 },
  { week: "Week 3", rate: 75 },
  { week: "Week 4", rate: 88 },
  { week: "Week 5", rate: 85 },
  { week: "Week 6", rate: 91 },
  { week: "Week 7", rate: 89 },
  { week: "Week 8", rate: 94 },
];

const projectDistribution = [
  { name: "Website Redesign", value: 35, color: "#4f46e5" },
  { name: "Mobile App", value: 28, color: "#06b6d4" },
  { name: "Marketing", value: 18, color: "#8b5cf6" },
  { name: "API Development", value: 19, color: "#10b981" },
];

const topPerformers = [
  {
    name: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    tasksCompleted: 34,
    efficiency: 96,
    role: "Designer",
  },
  {
    name: "Michael Brown",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    tasksCompleted: 31,
    efficiency: 94,
    role: "Developer",
  },
  {
    name: "Emily Rodriguez",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    tasksCompleted: 28,
    efficiency: 92,
    role: "PM",
  },
  {
    name: "David Kim",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    tasksCompleted: 27,
    efficiency: 91,
    role: "Backend Dev",
  },
];

const metrics = [
  {
    title: "Completion Rate",
    value: "87.5%",
    change: "+5.2%",
    trend: "up",
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "Avg. Task Duration",
    value: "3.2 days",
    change: "-0.8 days",
    trend: "down",
    icon: Clock,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Team Velocity",
    value: "42 pts/wk",
    change: "+8 pts",
    trend: "up",
    icon: TrendingUp,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
  },
  {
    title: "Active Projects",
    value: "12",
    change: "+2",
    trend: "up",
    icon: Target,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
];

export function ProjectAnalytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-foreground">Project Analytics</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Track team performance and project metrics
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                      <p className="mt-2 text-3xl font-semibold text-foreground">
                        {metric.value}
                      </p>
                      <div className="mt-2 flex items-center gap-1 text-sm">
                        {metric.trend === "up" ? (
                          <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-green-600 dark:text-green-400" />
                        )}
                        <span className="text-green-600 dark:text-green-400">{metric.change}</span>
                        <span className="text-muted-foreground">vs last period</span>
                      </div>
                    </div>
                    <div className={`rounded-xl ${metric.bgColor} dark:bg-opacity-20 p-3`}>
                      <Icon className={`h-6 w-6 ${metric.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="team">Team Analytics</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Task Completion Trend */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle>Task Completion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={taskCompletionTrend}>
                      <defs>
                        <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="opacity-20" />
                      <XAxis dataKey="week" stroke="currentColor" className="text-muted-foreground" />
                      <YAxis stroke="currentColor" className="text-muted-foreground" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                          color: "hsl(var(--foreground))",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="rate"
                        stroke="#4f46e5"
                        fillOpacity={1}
                        fill="url(#colorRate)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            {/* Project Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle>Project Time Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center">
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={projectDistribution}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, value }) => `${name}: ${value}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {projectDistribution.map((entry, index) => (
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
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Monthly Performance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle>Monthly Task Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="opacity-20" />
                      <XAxis dataKey="month" stroke="currentColor" className="text-muted-foreground" />
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
                      <Bar dataKey="completed" fill="#10b981" radius={[8, 8, 0, 0]} />
                      <Bar dataKey="pending" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                      <Bar dataKey="overdue" fill="#ef4444" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            {/* Productivity Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle>Team Productivity Hours</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={productivityData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="opacity-20" />
                      <XAxis dataKey="month" stroke="currentColor" className="text-muted-foreground" />
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
                      <Line
                        type="monotone"
                        dataKey="hours"
                        stroke="#8b5cf6"
                        strokeWidth={3}
                        dot={{ fill: "#8b5cf6", r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>

        {/* Team Analytics Tab */}
        <TabsContent value="team" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Team Performance Radar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle>Team Performance Areas</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={teamPerformance}>
                      <PolarGrid stroke="currentColor" className="opacity-20" />
                      <PolarAngleAxis dataKey="name" stroke="currentColor" className="text-muted-foreground" />
                      <PolarRadiusAxis stroke="currentColor" className="text-muted-foreground" />
                      <Radar
                        name="Performance"
                        dataKey="value"
                        stroke="#4f46e5"
                        fill="#4f46e5"
                        fillOpacity={0.6}
                      />
                      <Tooltip contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                        color: "hsl(var(--foreground))",
                      }} />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            {/* Top Performers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle>Top Performers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topPerformers.map((performer, index) => (
                      <div
                        key={performer.name}
                        className="flex items-center gap-4 rounded-lg p-3 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <div className="relative">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={performer.avatar} />
                              <AvatarFallback>
                                {performer.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <Badge className="absolute -top-1 -right-1 h-6 w-6 rounded-full p-0 text-xs">
                              {index + 1}
                            </Badge>
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-foreground">
                              {performer.name}
                            </p>
                            <p className="text-sm text-muted-foreground">{performer.role}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-foreground">
                            {performer.tasksCompleted} tasks
                          </p>
                          <div className="mt-1 flex items-center gap-2">
                            <Progress
                              value={performer.efficiency}
                              className="h-2 w-16"
                            />
                            <span className="text-xs font-medium text-muted-foreground">
                              {performer.efficiency}%
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}