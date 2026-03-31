import { useState } from "react";
import { motion } from "motion/react";
import { Zap, Plus, TrendingUp, Users, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const sprintData = {
  name: "Sprint 12",
  startDate: "Apr 1, 2026",
  endDate: "Apr 14, 2026",
  status: "active",
  progress: 65,
  totalPoints: 34,
  completedPoints: 22,
  remainingPoints: 12,
  velocity: 28,
};

const burndownData = [
  { day: "Day 1", ideal: 34, actual: 34 },
  { day: "Day 2", ideal: 31, actual: 32 },
  { day: "Day 3", ideal: 28, actual: 29 },
  { day: "Day 4", ideal: 25, actual: 27 },
  { day: "Day 5", ideal: 22, actual: 22 },
  { day: "Day 6", ideal: 19, actual: 18 },
  { day: "Day 7", ideal: 16, actual: 16 },
  { day: "Day 8", ideal: 13, actual: 12 },
];

export function SprintPlanning() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Sprint Planning</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage sprints and track velocity
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Sprint
        </Button>
      </div>

      {/* Sprint Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/30">
                <Zap className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <CardTitle>{sprintData.name}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {sprintData.startDate} - {sprintData.endDate}
                </p>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
              Active
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Sprint Progress</span>
                <span className="text-sm font-semibold text-foreground">
                  {sprintData.progress}%
                </span>
              </div>
              <Progress value={sprintData.progress} className="h-3" />
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center">
                <div className="text-2xl font-semibold text-foreground">
                  {sprintData.completedPoints}
                </div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold text-foreground">
                  {sprintData.remainingPoints}
                </div>
                <div className="text-sm text-muted-foreground">Remaining</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold text-foreground">
                  {sprintData.totalPoints}
                </div>
                <div className="text-sm text-muted-foreground">Total Points</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <Tabs defaultValue="burndown" className="space-y-4">
        <TabsList>
          <TabsTrigger value="burndown">Burndown Chart</TabsTrigger>
          <TabsTrigger value="velocity">Velocity</TabsTrigger>
          <TabsTrigger value="capacity">Team Capacity</TabsTrigger>
        </TabsList>

        <TabsContent value="burndown">
          <Card>
            <CardHeader>
              <CardTitle>Sprint Burndown Chart</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={burndownData}>
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
                  <Line
                    type="monotone"
                    dataKey="ideal"
                    stroke="#94a3b8"
                    strokeDasharray="5 5"
                    strokeWidth={2}
                    name="Ideal"
                  />
                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="#4f46e5"
                    strokeWidth={3}
                    name="Actual"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="velocity">
          <Card>
            <CardHeader>
              <CardTitle>Team Velocity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div>
                    <div className="text-sm text-muted-foreground">Average Velocity</div>
                    <div className="text-3xl font-semibold text-foreground">28 points</div>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <div className="text-sm text-muted-foreground">
                  Your team completes an average of 28 story points per sprint
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="capacity">
          <Card>
            <CardHeader>
              <CardTitle>Team Capacity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div>
                    <div className="text-sm text-muted-foreground">Available Hours</div>
                    <div className="text-3xl font-semibold text-foreground">160h</div>
                  </div>
                  <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-sm text-muted-foreground">
                  Total team capacity for this sprint
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Sprint Goals */}
      <Card>
        <CardHeader>
          <CardTitle>Sprint Goals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              "Complete user authentication flow",
              "Implement payment gateway integration",
              "Design and develop landing page",
            ].map((goal, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg border border-border"
              >
                <Target className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                <span className="text-foreground">{goal}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
