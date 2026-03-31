import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { DashboardOverview } from "./pages/DashboardOverview";
import { TaskManagement } from "./pages/TaskManagement";
import { TeamCollaboration } from "./pages/TeamCollaboration";
import { FileSharing } from "./pages/FileSharing";
import { ProjectAnalytics } from "./pages/ProjectAnalytics";
import { CalendarView } from "./pages/CalendarView";
import { TimelineView } from "./pages/TimelineView";
import { TimeTracking } from "./pages/TimeTracking";
import { Reports } from "./pages/Reports";
import { NotificationsCenter } from "./pages/NotificationsCenter";
import { WorkloadManagement } from "./pages/WorkloadManagement";
import { ProjectSettings } from "./pages/ProjectSettings";
import { SprintPlanning } from "./pages/SprintPlanning";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: DashboardOverview },
      { path: "tasks", Component: TaskManagement },
      { path: "calendar", Component: CalendarView },
      { path: "timeline", Component: TimelineView },
      { path: "sprints", Component: SprintPlanning },
      { path: "time-tracking", Component: TimeTracking },
      { path: "workload", Component: WorkloadManagement },
      { path: "team", Component: TeamCollaboration },
      { path: "files", Component: FileSharing },
      { path: "analytics", Component: ProjectAnalytics },
      { path: "reports", Component: Reports },
      { path: "notifications", Component: NotificationsCenter },
      { path: "settings", Component: ProjectSettings },
    ],
  },
]);
