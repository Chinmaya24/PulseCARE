import { useState, useEffect, useRef } from "react";
import { 
  AlertCircle, 
  Bot, 
  Clock, 
  Download, 
  FileText, 
  Loader2, 
  Paperclip, 
  RefreshCw, 
  Search, 
  Send, 
  User as UserIcon
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { toast } from "sonner";

// Healthcare AI API key
const API_KEY = "73cfa2bb96184dd5b9831743b9e668db";
const API_URL = "https://api.openai.com/v1/chat/completions";

// Interfaces for message types
interface Message {
  id: string;
  sender: "user" | "doctor" | "ai";
  content: string;
  timestamp: Date;
  status?: "sending" | "sent" | "delivered" | "seen" | "error";
  attachments?: {
    name: string;
    url: string;
    type: string;
    size: string;
  }[];
}

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  avatar?: string;
  status: "online" | "offline" | "busy";
  lastActive?: Date;
}

// Mock doctors data
const doctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    status: "online",
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialty: "Neurologist",
    status: "offline",
    lastActive: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: "3",
    name: "Dr. Priya Patel",
    specialty: "Pediatrician",
    status: "busy",
  },
  {
    id: "4",
    name: "Dr. James Wilson",
    specialty: "Rheumatologist",
    status: "offline",
    lastActive: new Date(Date.now() - 1000 * 60 * 120),
  },
  {
    id: "5",
    name: "Dr. Emily Roberts",
    specialty: "Dermatologist",
    status: "online",
  },
];

// ... (keep the initialConversations and chatService implementations from previous code)

const PatientMessageDoctor = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isAttaching, setIsAttaching] = useState(false);
  const [showAIDialog, setShowAIDialog] = useState(false);
  const [aiQuery, setAiQuery] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ... (keep previous useEffect hooks and state management)

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i]);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files).slice(0, 3); // Limit to 3 files
      setAttachments(prev => [...prev, ...newFiles]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Doctors List */}
      <div className="w-96 border-r bg-white">
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">My Care Team</h2>
          <div className="relative mb-4">
            <Input
              placeholder="Search doctors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
          <ScrollArea className="h-[calc(100vh-160px)]">
            {filteredDoctors.map((doctor) => (
              <div
                key={doctor.id}
                onClick={() => setSelectedDoctor(doctor)}
                className={`p-4 cursor-pointer hover:bg-gray-50 ${
                  selectedDoctor?.id === doctor.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={doctor.avatar} />
                    <AvatarFallback>
                      {doctor.name.split(' ').map((n) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{doctor.name}</h3>
                      <Badge
                        variant={
                          doctor.status === 'online'
                            ? 'success'
                            : doctor.status === 'busy'
                            ? 'warning'
                            : 'secondary'
                        }
                        className="h-4 px-1.5 text-xs"
                      >
                        {doctor.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {doctor.specialty}
                    </p>
                    {doctor.lastActive && (
                      <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>
                          Active {format(doctor.lastActive, 'MMM d, h:mm a')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        {selectedDoctor ? (
          <>
            <div className="p-4 border-b bg-white">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={selectedDoctor.avatar} />
                  <AvatarFallback>
                    {selectedDoctor.name.split(' ').map((n) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold">{selectedDoctor.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {selectedDoctor.specialty}
                  </p>
                </div>
              </div>
            </div>

            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[75%] rounded-lg p-4 ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {message.sender === 'doctor' && (
                          <UserIcon className="h-4 w-4" />
                        )}
                        <span className="text-sm font-medium">
                          {message.sender === 'user'
                            ? 'You'
                            : selectedDoctor.name}
                        </span>
                        <span className="text-xs opacity-75">
                          {format(message.timestamp, 'h:mm a')}
                        </span>
                      </div>
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      {message.attachments?.map((attachment, index) => (
                        <div
                          key={index}
                          className="mt-2 p-2 bg-white/10 rounded flex items-center gap-2"
                        >
                          <FileText className="h-4 w-4" />
                          <a
                            href={attachment.url}
                            download={attachment.name}
                            className="hover:underline"
                          >
                            {attachment.name}
                          </a>
                          <span className="text-xs opacity-75">
                            ({attachment.size})
                          </span>
                        </div>
                      ))}
                      {message.status === 'error' && (
                        <div className="flex items-center gap-1 mt-2 text-red-200 text-sm">
                          <AlertCircle className="h-4 w-4" />
                          Failed to send
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <div className="p-4 border-t bg-white">
              {attachments.length > 0 && (
                <div className="mb-2 flex flex-wrap gap-2">
                  {attachments.map((file, index) => (
                    <div
                      key={index}
                      className="px-2 py-1 bg-gray-100 rounded flex items-center gap-2 text-sm"
                    >
                      <FileText className="h-4 w-4" />
                      <span>{file.name}</span>
                      <button
                        onClick={() => removeAttachment(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileUpload}
                  multiple
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={attachments.length >= 3}
                >
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 min-h-[40px]"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            Select a doctor to start chatting
          </div>
        )}
      </div>

      {/* AI Assistant Dialog */}
      <Dialog open={showAIDialog} onOpenChange={setShowAIDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              Healthcare AI Assistant
            </DialogTitle>
            <DialogDescription>
              Ask general health questions. For medical emergencies, contact your
              doctor immediately.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              placeholder="Ask a health-related question..."
              className="min-h-[100px]"
            />
            {aiResponse && (
              <div className="p-4 bg-gray-50 rounded-lg whitespace-pre-wrap">
                {aiResponse}
              </div>
            )}
            {isAiLoading && (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              onClick={async () => {
                if (aiResponse) {
                  setAiQuery("");
                  setAiResponse("");
                } else {
                  await handleAskAI();
                }
              }}
              disabled={isAiLoading || !aiQuery.trim()}
            >
              {isAiLoading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : aiResponse ? (
                <RefreshCw className="h-4 w-4 mr-2" />
              ) : (
                <Bot className="h-4 w-4 mr-2" />
              )}
              {aiResponse ? "Ask New Question" : "Ask AI"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PatientMessageDoctor;