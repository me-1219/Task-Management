import { RouterProvider } from "react-router";
import { router } from "./routes";
import { Toaster } from "./components/ui/sonner";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ThemeProvider } from "./contexts/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <DndProvider backend={HTML5Backend}>
        <RouterProvider router={router} />
        <Toaster position="top-left" />
      </DndProvider>
    </ThemeProvider>
  );
}