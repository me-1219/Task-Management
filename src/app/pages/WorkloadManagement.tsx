import { motion } from "motion/react";
import { Users, TrendingUp, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";

const teamMembers = [
  {
    name: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    role: "Designer",
    capacity: 40,
    allocated: 38,
    tasks: 5,
    status: "optimal",
  },
  {
    name: "Michael Brown",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    role: "Developer",
    capacity: 40,
    allocated: 45,
    tasks: 7,
    status: "overloaded",
  },
  {
    name: "Emily Rodriguez",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    role: "PM",
    capacity: 40,
    allocated: 35,
    tasks: 6,
    status: "optimal",
  },
  {
    name: "David Kim",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    role: "Backend Dev",
    capacity: 40,
    allocated: 25,
    tasks: 3,
    status: "underutilized",
  },
];

export function WorkloadManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-foreground">Workload Management</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Monitor team capacity and resource allocation
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Team Size</div>
                <div className="text-2xl font-semibold text-foreground">
                  {teamMembers.length}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950/30">
                <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Avg Utilization</div>
                <div className="text-2xl font-semibold text-foreground">89%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/30">
                <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Overloaded</div>
                <div className="text-2xl font-semibold text-foreground">1</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Workload */}
      <Card>
        <CardHeader>
          <CardTitle>Team Workload</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-foreground">{member.name}</div>
                      <div className="text-sm text-muted-foreground">{member.role}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-sm font-medium text-foreground">
                        {member.allocated}h / {member.capacity}h
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {member.tasks} active tasks
                      </div>
                    </div>
                    <Badge
                      className={
                        member.status === "optimal"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : member.status === "overloaded"
                          ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                          : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                      }
                    >
                      {member.status}
                    </Badge>
                  </div>
                </div>
                <Progress
                  value={(member.allocated / member.capacity) * 100}
                  className="h-2"
                />
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
