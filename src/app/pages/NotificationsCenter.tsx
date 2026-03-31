import { motion } from "motion/react";
import { Bell, Check, X, Clock, MessageSquare, Users, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { useState } from "react";
import { toast } from "sonner";

interface Notification {
  id: string;
  type: "task" | "comment" | "mention" | "deadline" | "file";
  title: string;
  description: string;
  time: string;
  read: boolean;
  user?: { name: string; avatar: string };
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "task",
    title: "New task assigned",
    description: "You've been assigned to 'Design new landing page'",
    time: "5 minutes ago",
    read: false,
    user: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
  },
  {
    id: "2",
    type: "comment",
    title: "New comment on your task",
    description: "Michael commented on 'API Integration'",
    time: "1 hour ago",
    read: false,
    user: {
      name: "Michael Brown",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    },
  },
  {
    id: "3",
    type: "deadline",
    title: "Upcoming deadline",
    description: "Task 'Payment Gateway' is due tomorrow",
    time: "2 hours ago",
    read: true,
  },
  {
    id: "4",
    type: "mention",
    title: "You were mentioned",
    description: "Emily mentioned you in a comment",
    time: "3 hours ago",
    read: true,
    user: {
      name: "Emily Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
  },
  {
    id: "5",
    type: "file",
    title: "New file uploaded",
    description: "Design-mockups.fig was added to Website Redesign",
    time: "Yesterday",
    read: true,
    user: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
  },
];

const notificationIcons = {
  task: Check,
  comment: MessageSquare,
  mention: Users,
  deadline: Clock,
  file: FileText,
};

const notificationColors = {
  task: "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400",
  comment: "bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400",
  mention: "bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400",
  deadline: "bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400",
  file: "bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400",
};

export function NotificationsCenter() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [activeTab, setActiveTab] = useState("all");
  
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  const handleDismiss = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
    toast.success("Notification dismissed");
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === "unread") return !n.read;
    if (activeTab === "mentions") return n.type === "mention";
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Notifications</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {unreadCount} unread notifications
          </p>
        </div>
        <Button variant="outline" onClick={handleMarkAllRead} disabled={unreadCount === 0}>
          Mark all as read
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">
            All
            {unreadCount > 0 && (
              <Badge className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="unread">
            Unread
            {unreadCount > 0 && (
              <Badge className="ml-2 h-5 w-5 rounded-full p-0 text-xs bg-red-500">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="mentions">Mentions</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <Card>
            <CardContent className="p-0">
              {filteredNotifications.length === 0 ? (
                <div className="p-12 text-center text-muted-foreground">
                  <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">No notifications</p>
                  <p className="text-sm">You're all caught up!</p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {filteredNotifications.map((notification, index) => {
                    const Icon = notificationIcons[notification.type];
                    return (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`flex items-start gap-4 p-4 hover:bg-muted/50 transition-colors cursor-pointer ${
                          !notification.read ? "bg-muted/30" : ""
                        }`}
                        onClick={() => handleMarkAsRead(notification.id)}
                      >
                        <div className={`p-2 rounded-lg ${notificationColors[notification.type]}`}>
                          <Icon className="h-5 w-5" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3 className="font-medium text-foreground">
                              {notification.title}
                            </h3>
                            {!notification.read && (
                              <div className="h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-400 flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {notification.description}
                          </p>
                          <div className="flex items-center gap-3 mt-2">
                            {notification.user && (
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={notification.user.avatar} />
                                  <AvatarFallback>
                                    {notification.user.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-xs text-muted-foreground">
                                  {notification.user.name}
                                </span>
                              </div>
                            )}
                            <span className="text-xs text-muted-foreground">
                              {notification.time}
                            </span>
                          </div>
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDismiss(notification.id);
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}