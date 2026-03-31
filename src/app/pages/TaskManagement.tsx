import { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { motion, AnimatePresence } from "motion/react";
import {
  Calendar,
  MoreVertical,
  Plus,
  Flag,
  MessageSquare,
  Paperclip,
  Edit,
  Trash2,
  X,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { toast } from "sonner";

type Priority = "low" | "medium" | "high";
type Status = "todo" | "inprogress" | "done";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  assignee: {
    name: string;
    avatar: string;
  };
  dueDate: string;
  tags: string[];
  comments: number;
  attachments: number;
}

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Design new landing page",
    description: "Create mockups for the new product landing page",
    priority: "high",
    status: "inprogress",
    assignee: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    dueDate: "2026-04-05",
    tags: ["Design", "UI/UX"],
    comments: 5,
    attachments: 3,
  },
  {
    id: "2",
    title: "Implement user authentication",
    description: "Add OAuth and JWT authentication to the API",
    priority: "high",
    status: "todo",
    assignee: {
      name: "Michael Brown",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    },
    dueDate: "2026-04-03",
    tags: ["Backend", "Security"],
    comments: 2,
    attachments: 1,
  },
  {
    id: "3",
    title: "Update documentation",
    description: "Revise API documentation with new endpoints",
    priority: "medium",
    status: "todo",
    assignee: {
      name: "Emily Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
    dueDate: "2026-04-08",
    tags: ["Documentation"],
    comments: 1,
    attachments: 0,
  },
  {
    id: "4",
    title: "Bug fix: Payment processing",
    description: "Fix timeout issues in payment gateway",
    priority: "high",
    status: "inprogress",
    assignee: {
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
    dueDate: "2026-04-01",
    tags: ["Bug", "Critical"],
    comments: 8,
    attachments: 2,
  },
  {
    id: "5",
    title: "Mobile app testing",
    description: "Complete QA testing for iOS and Android versions",
    priority: "medium",
    status: "inprogress",
    assignee: {
      name: "Jessica Taylor",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop",
    },
    dueDate: "2026-04-06",
    tags: ["Testing", "Mobile"],
    comments: 4,
    attachments: 5,
  },
  {
    id: "6",
    title: "Database optimization",
    description: "Improve query performance and add indexes",
    priority: "low",
    status: "done",
    assignee: {
      name: "Alex Johnson",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
    },
    dueDate: "2026-03-28",
    tags: ["Backend", "Performance"],
    comments: 3,
    attachments: 1,
  },
  {
    id: "7",
    title: "Marketing email campaign",
    description: "Design and send product launch email to subscribers",
    priority: "medium",
    status: "done",
    assignee: {
      name: "Lisa Wang",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    },
    dueDate: "2026-03-29",
    tags: ["Marketing"],
    comments: 6,
    attachments: 4,
  },
];

const columns = [
  { id: "todo", title: "To Do", color: "bg-gray-100 dark:bg-gray-800" },
  { id: "inprogress", title: "In Progress", color: "bg-blue-50 dark:bg-blue-950/30" },
  { id: "done", title: "Done", color: "bg-green-50 dark:bg-green-950/30" },
];

const priorityColors = {
  low: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  high: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

interface TaskCardProps {
  task: Task;
  onMove: (taskId: string, newStatus: Status) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

function TaskCard({ task, onMove, onEdit, onDelete }: TaskCardProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <motion.div
      ref={drag}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`cursor-move ${isDragging ? "opacity-50" : ""}`}
    >
      <Card className="group hover:shadow-lg transition-all duration-300 bg-card border-border">
        <CardContent className="p-4">
          <div className="space-y-3">
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-medium text-foreground line-clamp-2">{task.title}</h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onEdit(task)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-600 dark:text-red-400"
                    onClick={() => onDelete(task.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1">
              {task.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Priority */}
            <div className="flex items-center gap-2">
              <Badge className={`text-xs ${priorityColors[task.priority]}`}>
                <Flag className="mr-1 h-3 w-3" />
                {task.priority}
              </Badge>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-3.5 w-3.5" />
                  {task.comments}
                </div>
                <div className="flex items-center gap-1">
                  <Paperclip className="h-3.5 w-3.5" />
                  {task.attachments}
                </div>
              </div>

              <Avatar className="h-7 w-7">
                <AvatarImage src={task.assignee.avatar} />
                <AvatarFallback>
                  {task.assignee.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Due Date */}
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              {new Date(task.dueDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface ColumnProps {
  column: { id: string; title: string; color: string };
  tasks: Task[];
  onMove: (taskId: string, newStatus: Status) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

function Column({ column, tasks, onMove, onEdit, onDelete }: ColumnProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TASK",
    drop: (item: { id: string }) => onMove(item.id, column.id as Status),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-foreground">{column.title}</h2>
          <Badge variant="secondary">{tasks.length}</Badge>
        </div>
      </div>

      <div
        ref={drop}
        className={`flex-1 space-y-3 rounded-xl p-3 transition-all duration-300 ${column.color} ${
          isOver ? "ring-2 ring-indigo-400 dark:ring-indigo-600" : ""
        }`}
      >
        <AnimatePresence>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onMove={onMove}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function TaskManagement() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium" as Priority,
    dueDate: "",
  });

  const handleMove = (taskId: string, newStatus: Status) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
    toast.success("Task moved successfully!", {
      duration: 2000,
    });
  };

  const handleCreateTask = () => {
    if (!formData.title.trim()) {
      toast.error("Please enter a task title");
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      status: "todo",
      assignee: {
        name: "John Doe",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      },
      dueDate: formData.dueDate || new Date().toISOString().split("T")[0],
      tags: [],
      comments: 0,
      attachments: 0,
    };

    setTasks([...tasks, newTask]);
    toast.success("Task created successfully!", {
      duration: 2000,
    });
    setIsNewTaskOpen(false);
    setFormData({ title: "", description: "", priority: "medium", dueDate: "" });
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate,
    });
    setIsEditTaskOpen(true);
  };

  const handleUpdateTask = () => {
    if (!editingTask || !formData.title.trim()) {
      toast.error("Please enter a task title");
      return;
    }

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === editingTask.id
          ? {
              ...task,
              title: formData.title,
              description: formData.description,
              priority: formData.priority,
              dueDate: formData.dueDate,
            }
          : task
      )
    );
    toast.success("Task updated successfully!", {
      duration: 2000,
    });
    setIsEditTaskOpen(false);
    setEditingTask(null);
    setFormData({ title: "", description: "", priority: "medium", dueDate: "" });
  };

  const handleDelete = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    toast.success("Task deleted successfully!", {
      duration: 2000,
    });
  };

  const getTasksByStatus = (status: Status) =>
    tasks.filter((task) => task.status === status);

  const TaskForm = ({ onSubmit, submitLabel }: { onSubmit: () => void; submitLabel: string }) => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="title">Task Title *</Label>
        <Input
          id="title"
          placeholder="Enter task title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Enter task description"
          rows={3}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="priority">Priority</Label>
        <Select
          value={formData.priority}
          onValueChange={(value) => setFormData({ ...formData, priority: value as Priority })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="dueDate">Due Date</Label>
        <Input
          id="dueDate"
          type="date"
          value={formData.dueDate}
          onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
        />
      </div>
      <Button className="w-full" onClick={onSubmit}>
        {submitLabel}
      </Button>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Task Management</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Organize and track your team's tasks with drag-and-drop
          </p>
        </div>
        <Dialog open={isNewTaskOpen} onOpenChange={setIsNewTaskOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Task
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
              <DialogDescription>
                Add a new task to your project board
              </DialogDescription>
            </DialogHeader>
            <TaskForm onSubmit={handleCreateTask} submitLabel="Create Task" />
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Task Dialog */}
      <Dialog open={isEditTaskOpen} onOpenChange={setIsEditTaskOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>
              Update task details
            </DialogDescription>
          </DialogHeader>
          <TaskForm onSubmit={handleUpdateTask} submitLabel="Update Task" />
        </DialogContent>
      </Dialog>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((column) => (
          <Column
            key={column.id}
            column={column}
            tasks={getTasksByStatus(column.id as Status)}
            onMove={handleMove}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
