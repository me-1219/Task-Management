import { useState } from "react";
import { motion } from "motion/react";
import { FileText, Download, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { toast } from "sonner";

const reportTemplates = [
  { id: "1", name: "Sprint Summary Report", description: "Detailed overview of sprint performance and metrics", category: "Sprint", frequency: "Weekly" },
  { id: "2", name: "Team Productivity Report", description: "Analysis of team productivity and time allocation", category: "Team", frequency: "Monthly" },
  { id: "3", name: "Project Status Report", description: "Current status of all active projects", category: "Project", frequency: "Daily" },
  { id: "4", name: "Budget Overview", description: "Financial summary and expense tracking", category: "Finance", frequency: "Monthly" },
  { id: "5", name: "Time Tracking Summary", description: "Comprehensive time tracking across all projects", category: "Time", frequency: "Weekly" },
  { id: "6", name: "Task Completion Report", description: "Task completion rates and trends", category: "Tasks", frequency: "Daily" },
];

export function Reports() {
  const [category, setCategory] = useState("all");
  const [filteredReports, setFilteredReports] = useState(reportTemplates);

  const handleFilter = () => {
    if (category === "all") {
      setFilteredReports(reportTemplates);
    } else {
      const filtered = reportTemplates.filter(
        (r) => r.category.toLowerCase() === category
      );
      setFilteredReports(filtered);
    }

    toast.success("Filter applied");
  };

  const handleDownload = (reportName: string) => {
    // Simulate file download
    const blob = new Blob([`Report: ${reportName}`], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${reportName}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast.success(`${reportName} downloaded`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Reports</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Generate and download project reports
          </p>
        </div>

        <div className="flex gap-2">
          <Select onValueChange={(value) => setCategory(value)}>
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="sprint">Sprint</SelectItem>
              <SelectItem value="team">Team</SelectItem>
              <SelectItem value="project">Project</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="time">Time</SelectItem>
              <SelectItem value="tasks">Tasks</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" onClick={handleFilter}>
            <Filter className="mr-2 h-4 w-4" />
            Apply
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredReports.map((report, index) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/30">
                    <FileText className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <Badge variant="secondary">{report.frequency}</Badge>
                </div>
                <CardTitle className="text-lg mt-4">{report.name}</CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {report.description}
                </p>

                <div className="flex items-center justify-between">
                  <Badge variant="outline">{report.category}</Badge>

                  <Button
                    size="sm"
                    onClick={() => handleDownload(report.name)}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
