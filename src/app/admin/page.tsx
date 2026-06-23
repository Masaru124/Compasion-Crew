"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Lock,
  Eye,
  EyeOff,
  Trash2,
  LogOut,
  MessageSquare,
  AlertCircle,
  Plus,
  Edit2,
  Calendar,
  MapPin,
  Clock,
  Users,
  Image as ImageIcon,
  Check,
  X,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { client, urlFor } from "@/sanity/client";
import { allStoriesQuery } from "@/sanity/queries";
import {
  verifyAdminPasswordAction,
  toggleApproveStoryAction,
  deleteStoryAction,
  createEventAction,
  updateEventAction,
  deleteEventAction,
  getEventsAction,
} from "@/app/actions/moderator-actions";
import Image from "next/image";

interface Story {
  _id: string;
  quote: string;
  name: string;
  role: string;
  location: string;
  approved: boolean;
}

interface EventFormState {
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  category: string;
  spots: number;
  isPast: boolean;
  registrationOpen: boolean;
  details: string;
}

const initialFormState: EventFormState = {
  title: "",
  description: "",
  date: "",
  startTime: "09:00",
  endTime: "17:00",
  location: "",
  category: "Expert Talk",
  spots: 100,
  isPast: false,
  registrationOpen: true,
  details: "",
};

// Date & Time Helpers
const toISODateString = (dateStr: string) => {
  try {
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      return d.toISOString().split("T")[0];
    }
  } catch (e) {}
  return "";
};

const to24hTime = (timeStr: string) => {
  try {
    const clean = timeStr.trim().toLowerCase();
    if (/^\d{2}:\d{2}$/.test(clean)) return clean;
    
    const match = clean.match(/^(\d+):(\d+)\s*(am|pm)$/);
    if (match) {
      let hours = parseInt(match[1], 10);
      const minutes = match[2];
      const ampm = match[3];
      if (ampm === "pm" && hours < 12) hours += 12;
      if (ampm === "am" && hours === 12) hours = 0;
      return `${hours.toString().padStart(2, "0")}:${minutes}`;
    }
  } catch (e) {}
  return "";
};

const parseTimeRange = (timeRangeStr: string) => {
  if (!timeRangeStr) return { start: "09:00", end: "17:00" };
  const parts = timeRangeStr.split(" - ");
  if (parts.length === 2) {
    return {
      start: to24hTime(parts[0]) || "09:00",
      end: to24hTime(parts[1]) || "17:00",
    };
  }
  return {
    start: to24hTime(timeRangeStr) || "09:00",
    end: "17:00",
  };
};

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  // Tabs: "testimonials" | "events"
  const [activeTab, setActiveTab] = useState<"testimonials" | "events">("testimonials");

  // Testimonials state
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoadingStories, setIsLoadingStories] = useState(true);

  // Events state
  const [events, setEvents] = useState<any[]>([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any | null>(null);
  
  const [eventForm, setEventForm] = useState<EventFormState>(initialFormState);
  const [eventFormImage, setEventFormImage] = useState<File | null>(null);
  const [eventFormGallery, setEventFormGallery] = useState<File[]>([]);
  
  const [removeCurrentImage, setRemoveCurrentImage] = useState(false);
  const [removeCurrentGallery, setRemoveCurrentGallery] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const [actionError, setActionError] = useState("");
  const [processingId, setProcessingId] = useState<string | null>(null);

  // Check session storage for existing auth
  useEffect(() => {
    const savedPassword = sessionStorage.getItem("admin_secret");
    if (savedPassword) {
      setPassword(savedPassword);
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch stories
  const fetchStories = useCallback(async () => {
    setIsLoadingStories(true);
    try {
      const data = await client.fetch(allStoriesQuery, {}, { next: { revalidate: 0 } });
      setStories(data || []);
    } catch (err: unknown) {
      console.error("Failed to load reviews:", err);
      setActionError("Failed to retrieve reviews from database.");
    } finally {
      setIsLoadingStories(false);
    }
  }, []);

  // Fetch events
  const fetchEvents = useCallback(async () => {
    setIsLoadingEvents(true);
    try {
      const data = await getEventsAction();
      setEvents(data || []);
    } catch (err: unknown) {
      console.error("Failed to load events:", err);
      setActionError("Failed to retrieve events from database.");
    } finally {
      setIsLoadingEvents(false);
    }
  }, [getEventsAction]);

  useEffect(() => {
    if (isAuthenticated) {
      if (activeTab === "testimonials") {
        fetchStories();
      } else {
        fetchEvents();
      }
    }
  }, [isAuthenticated, activeTab, fetchStories, fetchEvents]);

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsVerifying(true);

    const res = await verifyAdminPasswordAction(password);
    setIsVerifying(false);

    if (res.success) {
      sessionStorage.setItem("admin_secret", password);
      setIsAuthenticated(true);
    } else {
      setLoginError(res.error || "Incorrect secret password.");
    }
  };

  // Handle Logout
  const handleLogout = () => {
    sessionStorage.removeItem("admin_secret");
    setIsAuthenticated(false);
    setPassword("");
    setStories([]);
    setEvents([]);
  };

  // Toggle testimonial approval status
  const handleToggleApproval = async (storyId: string, currentStatus: boolean) => {
    setProcessingId(storyId);
    setActionError("");
    
    const res = await toggleApproveStoryAction(storyId, currentStatus, password);
    setProcessingId(null);

    if (res.success) {
      setStories((prev) =>
        prev.map((s) => (s._id === storyId ? { ...s, approved: !currentStatus } : s))
      );
    } else {
      setActionError(res.error || "Failed to update review status.");
    }
  };

  // Delete review
  const handleDeleteStory = async (storyId: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this testimonial?")) {
      return;
    }

    setProcessingId(storyId);
    setActionError("");

    const res = await deleteStoryAction(storyId, password);
    setProcessingId(null);

    if (res.success) {
      setStories((prev) => prev.filter((s) => s._id !== storyId));
    } else {
      setActionError(res.error || "Failed to delete review.");
    }
  };

  // Event Form actions
  const handleEventFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionError("");
    setFormSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("password", password);
      formData.append("title", eventForm.title);
      formData.append("description", eventForm.description);
      formData.append("date", eventForm.date);
      
      // Combine start and end times
      const timeRange = `${eventForm.startTime} - ${eventForm.endTime}`;
      formData.append("time", timeRange);
      
      formData.append("location", eventForm.location);
      formData.append("category", eventForm.category);
      formData.append("spots", eventForm.spots.toString());
      formData.append("isPast", eventForm.isPast.toString());
      formData.append("registrationOpen", eventForm.registrationOpen.toString());
      formData.append("details", eventForm.details);
      
      if (eventFormImage) {
        formData.append("image", eventFormImage);
      }
      if (removeCurrentImage) {
        formData.append("removeImage", "true");
      }

      if (eventFormGallery.length > 0) {
        eventFormGallery.forEach((file) => {
          formData.append("gallery", file);
        });
      }
      if (removeCurrentGallery) {
        formData.append("removeGallery", "true");
      }

      let res;
      if (editingEvent) {
        res = await updateEventAction(editingEvent.id, formData);
      } else {
        res = await createEventAction(formData);
      }

      if (res.success) {
        setEventForm(initialFormState);
        setEventFormImage(null);
        setEventFormGallery([]);
        setRemoveCurrentImage(false);
        setRemoveCurrentGallery(false);
        setEditingEvent(null);
        setShowEventForm(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
        if (galleryInputRef.current) galleryInputRef.current.value = "";
        fetchEvents();
      } else {
        setActionError(res.error || "Failed to save event.");
      }
    } catch (err: any) {
      setActionError(err.message || "An error occurred while saving the event.");
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleStartEditEvent = (ev: any) => {
    const times = parseTimeRange(ev.time);
    
    setEditingEvent(ev);
    setEventForm({
      title: ev.title || "",
      description: ev.description || "",
      date: toISODateString(ev.date) || ev.date || "",
      startTime: times.start,
      endTime: times.end,
      location: ev.location || "",
      category: ev.category || "Expert Talk",
      spots: ev.spots || 0,
      isPast: ev.isPast || false,
      registrationOpen: ev.registrationOpen !== false,
      details: ev.details || "",
    });
    setEventFormImage(null);
    setEventFormGallery([]);
    setRemoveCurrentImage(false);
    setRemoveCurrentGallery(false);
    setShowEventForm(true);
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this event?")) {
      return;
    }

    setProcessingId(eventId);
    setActionError("");

    const res = await deleteEventAction(eventId, password);
    setProcessingId(null);

    if (res.success) {
      setEvents((prev) => prev.filter((ev) => ev.id !== eventId));
    } else {
      setActionError(res.error || "Failed to delete event.");
    }
  };

  const getEventImageUrl = (img: any) => {
    if (!img) return null;
    if (typeof img === "string") return img;
    if (img.asset || img._type === "image") {
      return urlFor(img).url();
    }
    return null;
  };

  // Stats calculation
  const totalSubmissions = stories.length;
  const liveReviews = stories.filter((s) => s.approved).length;
  const pendingReviews = totalSubmissions - liveReviews;

  const totalEvents = events.length;
  const upcomingEventsCount = events.filter((ev) => !ev.isPast).length;
  const pastEventsCount = totalEvents - upcomingEventsCount;

  // Render Login Panel
  if (!isAuthenticated) {
    return (
      <main className="planner-bg min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-[420px] glass-panel p-8 rounded-2xl border border-border shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-terracotta" />
          
          <div className="text-center mb-8">
            <span className="micro-label text-primary block mb-2">
              COMPASSION CREW CONTROL
            </span>
            <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground">
              Sign In to Desk
            </h1>
            <p className="text-xs text-muted-foreground mt-2">
              Enter the admin secret key to access the moderation console.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2 relative">
              <div className="absolute left-3.5 top-[38px] text-muted-foreground">
                <Lock className="w-4 h-4" />
              </div>
              <Input
                type="password"
                required
                placeholder="Enter secret password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 h-12 rounded-xl bg-background/50 border border-border/80 focus-visible:ring-accent"
              />
            </div>

            {loginError && (
              <div className="flex gap-2 items-center text-xs text-destructive bg-destructive/5 border border-destructive/20 p-3 rounded-lg">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <Button
              type="submit"
              size="xl"
              disabled={isVerifying}
              className="w-full rounded-xl hover:-translate-y-0.5 transition-transform"
            >
              {isVerifying ? "Verifying secret..." : "Access Desk"}
            </Button>
          </form>
        </div>
      </main>
    );
  }

  // Render Main Moderator Desk
  return (
    <main className="planner-bg min-h-screen flex-1 overflow-hidden">
      <div className="container mx-auto max-w-[1200px] px-4 py-8 lg:py-12 pt-32">
        
        {/* Desk Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 pb-6 border-b border-border/60">
          <div>
            <span className="micro-label text-accent block mb-2">
              COMPASSION CREW ADMIN
            </span>
            <h1 className="font-display text-4xl font-semibold text-foreground tracking-tight">
              Console Dashboard
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Tabs Selector */}
            <div className="flex rounded-xl bg-muted p-1 border border-border">
              <button
                onClick={() => { setActiveTab("testimonials"); setActionError(""); }}
                className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
                  activeTab === "testimonials"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Testimonials
              </button>
              <button
                onClick={() => { setActiveTab("events"); setActionError(""); }}
                className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
                  activeTab === "events"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Events
              </button>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="rounded-lg group text-xs flex items-center gap-2 hover:bg-destructive/5 hover:text-destructive hover:border-destructive/30"
            >
              Sign Out
              <LogOut className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Action / Error Alerts */}
        {actionError && (
          <div className="mb-6 flex gap-2 items-center text-sm text-destructive bg-destructive/5 border border-destructive/20 p-4 rounded-xl">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{actionError}</span>
          </div>
        )}

        {/* Dynamic Content Views */}
        {activeTab === "testimonials" ? (
          <>
            {/* Stats Strip */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-card/40 border border-border/50 rounded-xl p-4 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-accent" />
                <span className="micro-label text-muted-foreground block mb-1">Total Received</span>
                <div className="font-heading text-2xl font-light text-foreground">{totalSubmissions}</div>
              </div>
              <div className="bg-card/40 border border-border/50 rounded-xl p-4 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-success" />
                <span className="micro-label text-muted-foreground block mb-1">Live on Site</span>
                <div className="font-heading text-2xl font-light text-foreground">{liveReviews}</div>
              </div>
              <div className="bg-card/40 border border-border/50 rounded-xl p-4 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                <span className="micro-label text-muted-foreground block mb-1">Pending Review</span>
                <div className="font-heading text-2xl font-light text-foreground">{pendingReviews}</div>
              </div>
            </div>

            {/* Testimonials List */}
            <div className="glass-panel border border-border rounded-2xl p-6 relative min-h-[400px]">
              <div className="absolute inset-0 pointer-events-none blueprint-surface opacity-[0.03]" />
              <div className="relative z-10">
                {isLoadingStories ? (
                  <div className="flex flex-col items-center justify-center h-64 gap-3 text-muted-foreground">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                    <span className="text-xs">Fetching testimonials...</span>
                  </div>
                ) : stories.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64 gap-2 text-muted-foreground">
                    <MessageSquare className="w-10 h-10 text-muted-foreground/30 mb-2" />
                    <p className="text-sm font-medium">No testimonials found</p>
                    <p className="text-xs">Submitted user reviews will show up here for moderation.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {stories.map((story) => (
                      <div
                        key={story._id}
                        className="p-6 rounded-xl border border-border bg-background/50 hover:bg-background/80 transition-colors flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                      >
                        <div className="space-y-3 max-w-2xl">
                          <blockquote className="text-foreground/90 text-sm leading-relaxed italic">
                            &ldquo;{story.quote}&rdquo;
                          </blockquote>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                            <span className="font-medium text-foreground">{story.name}</span>
                            <span className="text-muted-foreground font-light">{story.role}</span>
                            <span className="text-accent/80 font-mono text-[10px]">{story.location}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 w-full md:w-auto shrink-0 justify-end">
                          <span
                            className={`micro-label text-[10px] px-2 py-0.5 rounded-full border ${
                              story.approved
                                ? "bg-success/5 text-success border-success/20"
                                : "bg-primary/5 text-primary border-primary/20"
                            }`}
                          >
                            {story.approved ? "Live" : "Pending"}
                          </span>

                          <Button
                            size="sm"
                            variant={story.approved ? "outline" : "default"}
                            disabled={processingId === story._id}
                            onClick={() => handleToggleApproval(story._id, story.approved)}
                            className="rounded-lg h-9 text-xs flex items-center gap-1.5 min-w-[95px] justify-center"
                          >
                            {processingId === story._id ? (
                              <div className="animate-spin rounded-full h-3 w-3 border-b border-current" />
                            ) : story.approved ? (
                              <>
                                <EyeOff className="w-3.5 h-3.5" />
                                Hide
                              </>
                            ) : (
                              <>
                                <Eye className="w-3.5 h-3.5" />
                                Publish
                              </>
                            )}
                          </Button>

                          <Button
                            size="sm"
                            variant="destructive"
                            disabled={processingId === story._id}
                            onClick={() => handleDeleteStory(story._id)}
                            className="rounded-lg h-9 w-9 p-0 flex items-center justify-center hover:bg-destructive"
                          >
                            {processingId === story._id ? (
                              <div className="animate-spin rounded-full h-3 w-3 border-b border-current" />
                            ) : (
                              <Trash2 className="w-3.5 h-3.5" />
                            )}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Events Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-card/40 border border-border/50 rounded-xl p-4 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-accent" />
                <span className="micro-label text-muted-foreground block mb-1">Total Events</span>
                <div className="font-heading text-2xl font-light text-foreground">{totalEvents}</div>
              </div>
              <div className="bg-card/40 border border-border/50 rounded-xl p-4 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-success" />
                <span className="micro-label text-muted-foreground block mb-1">Upcoming</span>
                <div className="font-heading text-2xl font-light text-foreground">{upcomingEventsCount}</div>
              </div>
              <div className="bg-card/40 border border-border/50 rounded-xl p-4 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-muted-foreground" />
                <span className="micro-label text-muted-foreground block mb-1">Past / Recapped</span>
                <div className="font-heading text-2xl font-light text-foreground">{pastEventsCount}</div>
              </div>
            </div>

            {/* Events Operations Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-heading font-medium text-foreground tracking-tight">
                {showEventForm ? (editingEvent ? "Edit Event Details" : "Add New Event") : "All Events"}
              </h2>
              {!showEventForm && (
                <Button
                  onClick={() => {
                    setEditingEvent(null);
                    setEventForm(initialFormState);
                    setEventFormImage(null);
                    setEventFormGallery([]);
                    setRemoveCurrentImage(false);
                    setRemoveCurrentGallery(false);
                    setShowEventForm(true);
                  }}
                  className="rounded-xl flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Event
                </Button>
              )}
            </div>

            {/* Form View / Event List */}
            {showEventForm ? (
              <div className="glass-panel border border-border rounded-2xl p-8 relative">
                <form onSubmit={handleEventFormSubmit} className="space-y-6 max-w-3xl">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Title */}
                    <div className="space-y-2">
                      <Label htmlFor="title">Event Title *</Label>
                      <Input
                        id="title"
                        required
                        placeholder="e.g. Expert Talk: Inspiring Changemakers"
                        value={eventForm.title}
                        onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                      />
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                      <Label htmlFor="category">Event Category *</Label>
                      <select
                        id="category"
                        required
                        value={eventForm.category}
                        onChange={(e) => setEventForm({ ...eventForm, category: e.target.value })}
                        className="h-12 w-full rounded-xl border border-input bg-white px-3 py-2 text-sm text-foreground transition-all outline-none dark:bg-muted/50"
                      >
                        <option value="Expert Talk">Expert Talk</option>
                        <option value="Community Meetup">Community Meetup</option>
                        <option value="Service Drive">Service Drive</option>
                        <option value="Campaign">Campaign</option>
                        <option value="Workshop">Workshop</option>
                      </select>
                    </div>

                    {/* Date Picker */}
                    <div className="space-y-2">
                      <Label htmlFor="date">Event Date *</Label>
                      <Input
                        id="date"
                        type="date"
                        required
                        value={eventForm.date}
                        onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                      />
                    </div>

                    {/* Start Time Picker */}
                    <div className="space-y-2">
                      <Label htmlFor="startTime">Start Time *</Label>
                      <Input
                        id="startTime"
                        type="time"
                        required
                        value={eventForm.startTime}
                        onChange={(e) => setEventForm({ ...eventForm, startTime: e.target.value })}
                      />
                    </div>

                    {/* End Time Picker */}
                    <div className="space-y-2">
                      <Label htmlFor="endTime">End Time *</Label>
                      <Input
                        id="endTime"
                        type="time"
                        required
                        value={eventForm.endTime}
                        onChange={(e) => setEventForm({ ...eventForm, endTime: e.target.value })}
                      />
                    </div>

                    {/* Location */}
                    <div className="space-y-2">
                      <Label htmlFor="location">Event Location / Venue *</Label>
                      <Input
                        id="location"
                        required
                        placeholder="e.g. Taj Hotel, Bangalore or Online (Zoom)"
                        value={eventForm.location}
                        onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                      />
                    </div>

                    {/* Spots */}
                    <div className="space-y-2">
                      <Label htmlFor="spots">Available Spots *</Label>
                      <Input
                        id="spots"
                        type="number"
                        required
                        min={0}
                        value={eventForm.spots}
                        onChange={(e) => setEventForm({ ...eventForm, spots: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Short Description *</Label>
                    <Textarea
                      id="description"
                      required
                      rows={3}
                      placeholder="Brief card summary of the event (1-2 sentences)..."
                      value={eventForm.description}
                      onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                    />
                  </div>

                  {/* Details / Recap */}
                  <div className="space-y-2">
                    <Label htmlFor="details">Event Details / Recap Content</Label>
                    <Textarea
                      id="details"
                      rows={5}
                      placeholder="Detailed information for upcoming events, or wrap-up/recap for past events..."
                      value={eventForm.details}
                      onChange={(e) => setEventForm({ ...eventForm, details: e.target.value })}
                    />
                  </div>

                  {/* Image Upload */}
                  <div className="space-y-2">
                    <Label htmlFor="image">Event Cover Image</Label>
                    <div className="flex items-center gap-4">
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setEventFormImage(e.target.files[0]);
                            setRemoveCurrentImage(false);
                          }
                        }}
                        className="file:mr-4 file:py-1 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-primary-foreground hover:file:opacity-90"
                      />
                    </div>

                    {/* Existing Image Preview */}
                    {editingEvent && getEventImageUrl(editingEvent.image) && !removeCurrentImage && (
                      <div className="mt-2 flex items-center gap-3 bg-muted/40 p-3 rounded-lg border border-border max-w-sm">
                        <div className="relative w-12 h-12 rounded overflow-hidden">
                          <Image
                            src={getEventImageUrl(editingEvent.image)!}
                            alt="Current cover"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="text-xs text-muted-foreground truncate flex-1">Existing Cover</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setRemoveCurrentImage(true)}
                          className="h-8 text-destructive hover:bg-destructive/10 text-xs px-2"
                        >
                          Remove
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Gallery Multi-Image Upload */}
                  <div className="space-y-2 pt-2">
                    <Label htmlFor="gallery">Event Gallery Images (Select Multiple)</Label>
                    <div className="flex items-center gap-4">
                      <Input
                        id="gallery"
                        type="file"
                        multiple
                        accept="image/*"
                        ref={galleryInputRef}
                        onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            const files = Array.from(e.target.files);
                            setEventFormGallery(files);
                            setRemoveCurrentGallery(false);
                          }
                        }}
                        className="file:mr-4 file:py-1 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-primary-foreground hover:file:opacity-90"
                      />
                    </div>

                    {/* Existing Gallery Preview */}
                    {editingEvent && editingEvent.gallery && editingEvent.gallery.length > 0 && !removeCurrentGallery && (
                      <div className="mt-2 space-y-2 max-w-xl">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground font-semibold">
                            Existing Gallery ({editingEvent.gallery.length} images):
                          </span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setRemoveCurrentGallery(true)}
                            className="h-8 text-destructive hover:bg-destructive/10 text-xs px-2"
                          >
                            Remove Entire Gallery
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2 p-2 rounded-lg border border-border bg-muted/30">
                          {editingEvent.gallery.map((img: any, i: number) => {
                            const url = getEventImageUrl(img);
                            return url ? (
                              <div key={i} className="relative w-12 h-12 rounded overflow-hidden border border-border/80">
                                <Image src={url} alt={`Gallery ${i}`} fill className="object-cover" />
                              </div>
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}

                    {removeCurrentGallery && (
                      <p className="text-xs text-warning mt-1">
                        Current gallery images will be cleared upon saving.
                      </p>
                    )}

                    {eventFormGallery.length > 0 && (
                      <p className="text-xs text-success mt-1">
                        New gallery selection: {eventFormGallery.length} images ready to upload.
                      </p>
                    )}
                  </div>

                  {/* Toggles */}
                  <div className="flex flex-wrap gap-8 py-2">
                    {/* isPast */}
                    <div className="flex items-center gap-3">
                      <input
                        id="isPast"
                        type="checkbox"
                        checked={eventForm.isPast}
                        onChange={(e) => setEventForm({ ...eventForm, isPast: e.target.checked })}
                        className="h-5 w-5 rounded border-border text-primary focus:ring-accent accent-primary"
                      />
                      <Label htmlFor="isPast" className="cursor-pointer font-normal">
                        Mark as **Past Event** (recap mode, no registration)
                      </Label>
                    </div>

                    {/* registrationOpen */}
                    {!eventForm.isPast && (
                      <div className="flex items-center gap-3">
                        <input
                          id="registrationOpen"
                          type="checkbox"
                          checked={eventForm.registrationOpen}
                          onChange={(e) => setEventForm({ ...eventForm, registrationOpen: e.target.checked })}
                          className="h-5 w-5 rounded border-border text-primary focus:ring-accent accent-primary"
                        />
                        <Label htmlFor="registrationOpen" className="cursor-pointer font-normal">
                          Enable User Registration
                        </Label>
                      </div>
                    )}
                  </div>

                  {/* Form Actions */}
                  <div className="flex gap-4 pt-4 border-t border-border">
                    <Button
                      type="submit"
                      disabled={formSubmitting}
                      className="min-w-[120px]"
                    >
                      {formSubmitting ? "Saving..." : "Save Event"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowEventForm(false);
                        setEditingEvent(null);
                        setEventForm(initialFormState);
                        setEventFormImage(null);
                        setEventFormGallery([]);
                        setRemoveCurrentImage(false);
                        setRemoveCurrentGallery(false);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            ) : (
              /* Events List Table */
              <div className="glass-panel border border-border rounded-2xl p-6 relative min-h-[400px]">
                <div className="absolute inset-0 pointer-events-none blueprint-surface opacity-[0.03]" />
                <div className="relative z-10">
                  {isLoadingEvents ? (
                    <div className="flex flex-col items-center justify-center h-64 gap-3 text-muted-foreground">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                      <span className="text-xs">Fetching events...</span>
                    </div>
                  ) : events.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 gap-2 text-muted-foreground text-center">
                      <Calendar className="w-10 h-10 text-muted-foreground/30 mb-2 mx-auto" />
                      <p className="text-sm font-medium">No events found in database</p>
                      <p className="text-xs max-w-sm mt-1">Use the &quot;Add Event&quot; button to create your first dynamic event.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {events.map((ev) => {
                        const coverUrl = getEventImageUrl(ev.image);
                        return (
                          <div
                            key={ev.id}
                            className="p-5 rounded-xl border border-border bg-background/50 hover:bg-background/80 transition-colors flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                          >
                            <div className="flex gap-4 items-start max-w-3xl">
                              {/* Event cover thumbnail */}
                              <div className="w-16 h-16 rounded-lg overflow-hidden border border-border bg-muted shrink-0 relative flex items-center justify-center text-muted-foreground">
                                {coverUrl ? (
                                  <Image
                                    src={coverUrl}
                                    alt={ev.title}
                                    fill
                                    className="object-cover"
                                  />
                                ) : (
                                  <ImageIcon className="w-6 h-6 opacity-30" />
                                )}
                              </div>

                              <div className="space-y-2">
                                <div className="flex flex-wrap items-center gap-2">
                                  <h3 className="font-heading text-lg font-medium text-foreground tracking-tight">
                                    {ev.title}
                                  </h3>
                                  <span className="text-[10px] micro-label bg-muted border border-border/80 rounded-full px-2 py-0.5">
                                    {ev.category}
                                  </span>
                                  {ev.isPast ? (
                                    <span className="text-[9px] font-semibold text-muted-foreground border border-border rounded-full px-2 bg-neutral-100">
                                      Past
                                    </span>
                                  ) : (
                                    <span className="text-[9px] font-semibold text-success border border-success/20 rounded-full px-2 bg-success/5">
                                      Upcoming
                                    </span>
                                  )}
                                  {!ev.isPast && !ev.registrationOpen && (
                                    <span className="text-[9px] font-semibold text-destructive border border-destructive/20 rounded-full px-2 bg-destructive/5">
                                      Reg Closed
                                    </span>
                                  )}
                                  {ev.gallery && ev.gallery.length > 0 && (
                                    <span className="text-[9px] font-semibold text-accent border border-accent/20 rounded-full px-2 bg-accent/5">
                                      Gallery ({ev.gallery.length} items)
                                    </span>
                                  )}
                                </div>

                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {ev.date}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3.5 h-3.5" />
                                    {ev.time}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <MapPin className="w-3.5 h-3.5" />
                                    {ev.location}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Users className="w-3.5 h-3.5" />
                                    {ev.spots} spots
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-2 w-full md:w-auto shrink-0 justify-end">
                              <Button
                                size="sm"
                                variant="outline"
                                disabled={processingId === ev.id}
                                onClick={() => handleStartEditEvent(ev)}
                                className="rounded-lg h-9 text-xs flex items-center gap-1.5"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                                Edit
                              </Button>

                              <Button
                                size="sm"
                                variant="destructive"
                                disabled={processingId === ev.id}
                                onClick={() => handleDeleteEvent(ev.id)}
                                className="rounded-lg h-9 w-9 p-0 flex items-center justify-center hover:bg-destructive"
                              >
                                {processingId === ev.id ? (
                                  <div className="animate-spin rounded-full h-3 w-3 border-b border-current" />
                                ) : (
                                  <Trash2 className="w-3.5 h-3.5" />
                                )}
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
