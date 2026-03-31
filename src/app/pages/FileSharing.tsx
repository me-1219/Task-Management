// FileSharing.tsx
import { useState, useRef, useCallback } from "react";
import { motion } from "motion/react";
import {
  Upload,
  File,
  FileText,
  FileSpreadsheet,
  FileImage,
  FileVideo,
  Download,
  MoreVertical,
  Trash2,
  Eye,
  Share2,
  Clock,
  Search,
} from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Progress } from "../components/ui/progress";
import { toast } from "sonner";

interface FileItem {
  id: string;
  name: string;
  type: "pdf" | "doc" | "sheet" | "image" | "video" | "other";
  size: string;
  uploadedBy: {
    name: string;
    avatar: string;
  };
  uploadedAt: string;
  version: number;
  downloads: number;
}

const fileIcons = {
  pdf: FileText,
  doc: FileText,
  sheet: FileSpreadsheet,
  image: FileImage,
  video: FileVideo,
  other: File,
};

const fileColors = {
  pdf: "text-red-600 bg-red-50",
  doc: "text-blue-600 bg-blue-50",
  sheet: "text-green-600 bg-green-50",
  image: "text-purple-600 bg-purple-50",
  video: "text-orange-600 bg-orange-50",
  other: "text-gray-600 bg-gray-50",
};

// Mock files to start
const mockFiles: FileItem[] = [
  {
    id: "1",
    name: "Project Requirements.pdf",
    type: "pdf",
    size: "2.4 MB",
    uploadedBy: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    uploadedAt: "2026-03-29",
    version: 3,
    downloads: 24,
  },
  {
    id: "2",
    name: "Design Mockups.fig",
    type: "other",
    size: "8.7 MB",
    uploadedBy: {
      name: "Michael Brown",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    },
    uploadedAt: "2026-03-28",
    version: 1,
    downloads: 18,
  },
  {
    id: "3",
    name: "Budget Spreadsheet.xlsx",
    type: "sheet",
    size: "524 KB",
    uploadedBy: {
      name: "Emily Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
    uploadedAt: "2026-03-27",
    version: 5,
    downloads: 42,
  },
];

export function FileSharing() {
  const [files, setFiles] = useState<FileItem[]>(mockFiles);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const getFileType = (name: string): FileItem["type"] => {
    if (name.endsWith(".pdf")) return "pdf";
    if (name.endsWith(".doc") || name.endsWith(".docx")) return "doc";
    if (name.endsWith(".xls") || name.endsWith(".xlsx")) return "sheet";
    if (name.match(/\.(jpg|jpeg|png|gif)$/)) return "image";
    if (name.match(/\.(mp4|mov|avi)$/)) return "video";
    return "other";
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
    else return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          const newFile: FileItem = {
            id: Date.now().toString(),
            name: selectedFile.name,
            type: getFileType(selectedFile.name),
            size: formatFileSize(selectedFile.size),
            uploadedBy: {
              name: "You",
              avatar: "",
            },
            uploadedAt: new Date().toISOString(),
            version: 1,
            downloads: 0,
          };
          setFiles((prev) => [newFile, ...prev]);
          setIsUploading(false);
          toast.success("File uploaded successfully!");
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files?.[0];
    if (!droppedFile) return;

    const event = { target: { files: [droppedFile] } } as any;
    handleFileUpload(event);
  }, []);

  const handleDelete = (fileId: string) => {
    setFiles(files.filter((f) => f.id !== fileId));
    toast.success("File deleted successfully!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">File Sharing</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Upload, organize, and share files with your team
          </p>
        </div>
      </div>

      {/* Upload Area */}
      <Card
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed transition-all duration-300 ${
          isDragging
            ? "border-indigo-400 bg-indigo-50 dark:border-indigo-600 dark:bg-indigo-950/30"
            : "border-border bg-muted/30"
        }`}
      >
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div
            className={`rounded-full p-4 transition-colors ${
              isDragging ? "bg-indigo-100 dark:bg-indigo-900/50" : "bg-muted"
            }`}
          >
            <Upload
              className={`h-8 w-8 ${
                isDragging ? "text-indigo-600 dark:text-indigo-400" : "text-muted-foreground"
              }`}
            />
          </div>
          <h3 className="mt-4 font-semibold text-foreground">
            {isDragging ? "Drop files here" : "Upload files"}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Drag and drop or click to browse
          </p>
          <Button className="mt-4" onClick={() => fileInputRef.current?.click()}>
            Browse Files
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileUpload}
          />

          {isUploading && (
            <div className="mt-6 w-full max-w-md space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Uploading...</span>
                <span className="font-medium text-foreground">{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search files..."
            className="pl-9 bg-background"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Files Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredFiles.map((file, index) => {
          const Icon = fileIcons[file.type];
          const colorClass = fileColors[file.type];

          return (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {/* File Icon & Actions */}
                    <div className="flex items-start justify-between">
                      <div className={`rounded-lg p-3 ${colorClass} dark:bg-opacity-20`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Preview
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share2 className="mr-2 h-4 w-4" />
                            Share
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600 dark:text-red-400"
                            onClick={() => handleDelete(file.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {/* File Info */}
                    <div>
                      <h3 className="font-medium text-foreground line-clamp-1">{file.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{file.size}</p>
                    </div>

                    {/* Version */}
                    {file.version > 1 && (
                      <Badge variant="secondary" className="text-xs">
                        <Clock className="mr-1 h-3 w-3" />
                        v{file.version}
                      </Badge>
                    )}

                    {/* Uploader Info */}
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={file.uploadedBy.avatar} />
                          <AvatarFallback>
                            {file.uploadedBy.name.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">
                          {file.uploadedBy.name.split(" ")[0]}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(file.uploadedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>

                    {/* Downloads */}
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Download className="h-3 w-3" />
                      {file.downloads} downloads
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filteredFiles.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-muted p-4">
            <File className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="mt-4 font-semibold text-foreground">No files found</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Try adjusting your search or upload new files
          </p>
        </div>
      )}
    </div>
  );
}