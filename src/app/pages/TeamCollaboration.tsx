import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Send,
  Search,
  MoreVertical,
  Phone,
  Video,
  Smile,
  Paperclip,
  Hash,
  Lock,
  Users as UsersIcon,
} from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { ScrollArea } from "../components/ui/scroll-area";
import { Separator } from "../components/ui/separator";

interface Message {
  id: string;
  sender: {
    name: string;
    avatar: string;
    isCurrentUser: boolean;
  };
  content: string;
  timestamp: string;
  reactions?: { emoji: string; count: number }[];
}

interface Channel {
  id: string;
  name: string;
  type: "channel" | "dm";
  isPrivate: boolean;
  unread: number;
  members?: number;
}

const channels: Channel[] = [
  { id: "1", name: "general", type: "channel", isPrivate: false, unread: 0, members: 24 },
  { id: "2", name: "development", type: "channel", isPrivate: false, unread: 3, members: 12 },
  { id: "3", name: "design", type: "channel", isPrivate: false, unread: 1, members: 8 },
  { id: "4", name: "marketing", type: "channel", isPrivate: false, unread: 0, members: 6 },
  { id: "5", name: "project-alpha", type: "channel", isPrivate: true, unread: 5, members: 5 },
];

const directMessages: Channel[] = [
  {
    id: "dm1",
    name: "Sarah Chen",
    type: "dm",
    isPrivate: false,
    unread: 2,
  },
  {
    id: "dm2",
    name: "Michael Brown",
    type: "dm",
    isPrivate: false,
    unread: 0,
  },
  {
    id: "dm3",
    name: "Emily Rodriguez",
    type: "dm",
    isPrivate: false,
    unread: 1,
  },
];

const mockMessages: Message[] = [
  {
    id: "1",
    sender: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      isCurrentUser: false,
    },
    content: "Hey team! Just finished the new design mockups. Would love your feedback! 🎨",
    timestamp: "9:42 AM",
    reactions: [
      { emoji: "👍", count: 3 },
      { emoji: "🎉", count: 2 },
    ],
  },
  {
    id: "2",
    sender: {
      name: "Michael Brown",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      isCurrentUser: false,
    },
    content: "Looking great! The color scheme really pops. Can we schedule a review meeting?",
    timestamp: "9:45 AM",
  },
  {
    id: "3",
    sender: {
      name: "You",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      isCurrentUser: true,
    },
    content: "Absolutely! How about tomorrow at 2 PM?",
    timestamp: "9:47 AM",
  },
  {
    id: "4",
    sender: {
      name: "Emily Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      isCurrentUser: false,
    },
    content: "Works for me! I'll send out calendar invites.",
    timestamp: "9:48 AM",
    reactions: [{ emoji: "✅", count: 4 }],
  },
  {
    id: "5",
    sender: {
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      isCurrentUser: false,
    },
    content: "Quick update: The API integration is now live in staging. Please test and report any issues.",
    timestamp: "10:12 AM",
  },
  {
    id: "6",
    sender: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      isCurrentUser: false,
    },
    content: "Perfect timing! I'll run through the test cases this afternoon.",
    timestamp: "10:15 AM",
  },
];

const teamMembers = [
  {
    name: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    status: "online",
    role: "Designer",
  },
  {
    name: "Michael Brown",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    status: "online",
    role: "Developer",
  },
  {
    name: "Emily Rodriguez",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    status: "online",
    role: "Project Manager",
  },
  {
    name: "David Kim",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    status: "away",
    role: "Backend Developer",
  },
  {
    name: "Jessica Taylor",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop",
    status: "offline",
    role: "QA Engineer",
  },
];

export function TeamCollaboration() {
  const [selectedChannel, setSelectedChannel] = useState(channels[1]);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: {
        name: "You",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
        isCurrentUser: true,
      },
      content: newMessage,
      timestamp: new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, message]);
    setNewMessage("");

    // Simulate typing indicator
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="h-[calc(100vh-12rem)]">
      <Card className="h-full overflow-hidden">
        <div className="grid h-full grid-cols-1 md:grid-cols-[280px_1fr_240px]">
          {/* Sidebar - Channels */}
          <div className="hidden border-r border-border bg-muted/30 md:flex md:flex-col">
            <div className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search channels..." className="pl-9 bg-background" />
              </div>
            </div>

            <ScrollArea className="flex-1 px-3">
              <div className="space-y-4 pb-4">
                {/* Channels */}
                <div>
                  <h3 className="mb-2 px-2 text-xs font-semibold uppercase text-muted-foreground">
                    Channels
                  </h3>
                  <div className="space-y-1">
                    {channels.map((channel) => (
                      <button
                        key={channel.id}
                        onClick={() => setSelectedChannel(channel)}
                        className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors ${
                          selectedChannel.id === channel.id
                            ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
                            : "text-foreground hover:bg-muted"
                        }`}
                      >
                        {channel.isPrivate ? (
                          <Lock className="h-4 w-4" />
                        ) : (
                          <Hash className="h-4 w-4" />
                        )}
                        <span className="flex-1 truncate text-left">{channel.name}</span>
                        {channel.unread > 0 && (
                          <Badge className="h-5 rounded-full px-1.5 text-xs">
                            {channel.unread}
                          </Badge>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Direct Messages */}
                <div>
                  <h3 className="mb-2 px-2 text-xs font-semibold uppercase text-muted-foreground">
                    Direct Messages
                  </h3>
                  <div className="space-y-1">
                    {directMessages.map((dm) => (
                      <button
                        key={dm.id}
                        onClick={() => setSelectedChannel(dm)}
                        className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors ${
                          selectedChannel.id === dm.id
                            ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
                            : "text-foreground hover:bg-muted"
                        }`}
                      >
                        <div className="relative">
                          <div className="h-2 w-2 rounded-full bg-green-500" />
                        </div>
                        <span className="flex-1 truncate text-left">{dm.name}</span>
                        {dm.unread > 0 && (
                          <Badge className="h-5 rounded-full px-1.5 text-xs">
                            {dm.unread}
                          </Badge>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>

          {/* Main Chat Area */}
          <div className="flex flex-col">
            {/* Chat Header */}
            <div className="flex h-16 items-center justify-between border-b border-border px-6 bg-card">
              <div className="flex items-center gap-3">
                {selectedChannel.isPrivate ? (
                  <Lock className="h-5 w-5 text-muted-foreground" />
                ) : selectedChannel.type === "channel" ? (
                  <Hash className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                )}
                <div>
                  <h2 className="font-semibold text-foreground">
                    {selectedChannel.name}
                  </h2>
                  {selectedChannel.type === "channel" && (
                    <p className="text-xs text-muted-foreground">
                      {selectedChannel.members} members
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Phone className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 px-6 py-4 bg-background">
              <div className="space-y-4">
                <AnimatePresence>
                  {messages.map((message, index) => {
                    const showAvatar =
                      index === 0 ||
                      messages[index - 1].sender.name !== message.sender.name;

                    return (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className={`flex gap-3 ${showAvatar ? "mt-4" : "mt-1"}`}
                      >
                        <div className="w-10">
                          {showAvatar && (
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={message.sender.avatar} />
                              <AvatarFallback>
                                {message.sender.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                        <div className="flex-1 space-y-1">
                          {showAvatar && (
                            <div className="flex items-baseline gap-2">
                              <span className="font-semibold text-sm text-foreground">
                                {message.sender.name}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {message.timestamp}
                              </span>
                            </div>
                          )}
                          <div
                            className={`group rounded-lg px-3 py-2 transition-all duration-200 ${
                              message.sender.isCurrentUser
                                ? "bg-indigo-600 text-white dark:bg-indigo-700"
                                : "bg-muted text-foreground"
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                          </div>
                          {message.reactions && (
                            <div className="flex gap-2">
                              {message.reactions.map((reaction, idx) => (
                                <button
                                  key={idx}
                                  className="flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs hover:bg-muted/80 transition-colors"
                                >
                                  <span>{reaction.emoji}</span>
                                  <span className="text-muted-foreground">
                                    {reaction.count}
                                  </span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-3"
                  >
                    <div className="w-10"></div>
                    <div className="text-sm italic text-muted-foreground">
                      Someone is typing...
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="border-t border-border p-4 bg-card">
              <div className="flex items-end gap-2">
                <div className="flex-1 space-y-2">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                      <Smile className="h-4 w-4" />
                    </Button>
                  </div>
                  <Input
                    placeholder={`Message #${selectedChannel.name}`}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    className="bg-background"
                  />
                </div>
                <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Team Members */}
          <div className="hidden border-l border-border bg-muted/30 lg:flex lg:flex-col">
            <div className="p-4">
              <h3 className="flex items-center gap-2 font-semibold text-foreground">
                <UsersIcon className="h-5 w-5" />
                Team Members
              </h3>
            </div>

            <ScrollArea className="flex-1 px-4">
              <div className="space-y-3 pb-4">
                {teamMembers.map((member) => (
                  <div
                    key={member.name}
                    className="flex items-center gap-3 rounded-lg p-2 hover:bg-muted transition-colors"
                  >
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card ${
                          member.status === "online"
                            ? "bg-green-500"
                            : member.status === "away"
                            ? "bg-yellow-500"
                            : "bg-gray-400"
                        }`}
                      />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="truncate text-sm font-medium text-foreground">
                        {member.name}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </Card>
    </div>
  );
}