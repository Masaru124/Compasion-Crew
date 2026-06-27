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
  Mail,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  toggleApproveStoryAction,
  deleteStoryAction,
  createEventAction,
  updateEventAction,
  deleteEventAction,
  getEventsAction,
  getStoriesAction,
  getBlogsAction,
  getTeamMembersAction,
  createBlogAction,
  updateBlogAction,
  deleteBlogAction,
} from "@/app/actions/moderator-actions";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";

interface Story {
  id: string;
  quote: string;
  name: string;
  role: string;
  location: string;
  approved: boolean;
}

interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  spots: number;
  image: string | null;
  isPast: boolean;
  registrationOpen: boolean;
  details: string | null;
  gallery: string[] | null;
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

interface BlogItem {
  id: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt: string;
  category: string;
  mainImage: string | null;
  authorName: string | null;
  authorRole: string | null;
  authorBio: string | null;
  authorEmail: string | null;
  body: string;
  seoTitle: string | null;
  seoDescription: string | null;
  keywords: string[] | null;
}

interface BlogFormState {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  body: string;
  authorId: string;
  authorName: string;
  authorRole: string;
  authorBio: string;
  authorEmail: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string;
}

interface TeamMemberItem {
  id: string;
  name: string;
  role: string;
  bio: string;
  linkedin: string | null;
  x: string | null;
  email: string | null;
}

const initialBlogFormState: BlogFormState = {
  title: "",
  slug: "",
  category: "Social Impact",
  excerpt: "",
  body: "",
  authorId: "custom",
  authorName: "",
  authorRole: "",
  authorBio: "",
  authorEmail: "",
  seoTitle: "",
  seoDescription: "",
  keywords: "",
};

// Date & Time Helpers
const toISODateString = (dateStr: string) => {
  try {
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      return d.toISOString().split("T")[0];
    }
  } catch {}
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
  } catch {}
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
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";
  const isLoadingSession = status === "loading";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  // Tabs: "testimonials" | "events" | "blogs"
  const [activeTab, setActiveTab] = useState<"testimonials" | "events" | "blogs">("testimonials");

  // Testimonials state
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoadingStories, setIsLoadingStories] = useState(true);

  // Events state
  const [events, setEvents] = useState<EventItem[]>([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  
  const [eventForm, setEventForm] = useState<EventFormState>(initialFormState);
  const [eventFormImage, setEventFormImage] = useState<File | null>(null);
  const [eventFormGallery, setEventFormGallery] = useState<File[]>([]);
  
  const [removeCurrentImage, setRemoveCurrentImage] = useState(false);
  const [removeCurrentGallery, setRemoveCurrentGallery] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);

  // Blogs state
  const [blogsList, setBlogsList] = useState<BlogItem[]>([]);
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(true);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogItem | null>(null);

  const [blogForm, setBlogForm] = useState<BlogFormState>(initialBlogFormState);
  const [blogFormImage, setBlogFormImage] = useState<File | null>(null);
  const [removeBlogImage, setRemoveBlogImage] = useState(false);
  const [blogSubmitting, setBlogSubmitting] = useState(false);

  const [teamMembers, setTeamMembers] = useState<TeamMemberItem[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const blogFileInputRef = useRef<HTMLInputElement>(null);

  const [actionError, setActionError] = useState("");
  const [processingId, setProcessingId] = useState<string | null>(null);

  // Fetch stories
  const fetchStories = useCallback(async () => {
    setIsLoadingStories(true);
    try {
      const data = await getStoriesAction();
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
  }, []);

  // Fetch blogs
  const fetchBlogs = useCallback(async () => {
    setIsLoadingBlogs(true);
    try {
      const data = await getBlogsAction();
      setBlogsList(data as BlogItem[] || []);
    } catch (err: unknown) {
      console.error("Failed to load blogs:", err);
      setActionError("Failed to retrieve blogs from database.");
    } finally {
      setIsLoadingBlogs(false);
    }
  }, []);

  // Fetch team members list
  const fetchTeamMembersList = useCallback(async () => {
    try {
      const data = await getTeamMembersAction();
      setTeamMembers(data as TeamMemberItem[] || []);
    } catch (err: unknown) {
      console.error("Failed to load team members:", err);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const timer = setTimeout(() => {
        fetchTeamMembersList();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, fetchTeamMembersList]);

  useEffect(() => {
    if (isAuthenticated) {
      if (activeTab === "testimonials") {
        const timer = setTimeout(() => {
          fetchStories();
        }, 0);
        return () => clearTimeout(timer);
      } else if (activeTab === "events") {
        const timer = setTimeout(() => {
          fetchEvents();
        }, 0);
        return () => clearTimeout(timer);
      } else if (activeTab === "blogs") {
        const timer = setTimeout(() => {
          fetchBlogs();
        }, 0);
        return () => clearTimeout(timer);
      }
    }
  }, [isAuthenticated, activeTab, fetchStories, fetchEvents, fetchBlogs]);

  // Handle Login via NextAuth
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsVerifying(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setLoginError("Invalid email or password.");
      }
    } catch {
      setLoginError("An error occurred. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  // Handle Logout via NextAuth
  const handleLogout = () => {
    signOut({ redirect: false });
  };

  // Toggle testimonial approval status
  const handleToggleApproval = async (storyId: string, currentStatus: boolean) => {
    setProcessingId(storyId);
    setActionError("");
    
    const res = await toggleApproveStoryAction(storyId, currentStatus);
    setProcessingId(null);

    if (res.success) {
      setStories((prev) =>
        prev.map((s) => (s.id === storyId ? { ...s, approved: !currentStatus } : s))
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

    const res = await deleteStoryAction(storyId);
    setProcessingId(null);

    if (res.success) {
      setStories((prev) => prev.filter((s) => s.id !== storyId));
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
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An error occurred while saving the event.";
      setActionError(msg);
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleStartEditEvent = (ev: EventItem) => {
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

    const res = await deleteEventAction(eventId);
    setProcessingId(null);

    if (res.success) {
      setEvents((prev) => prev.filter((ev) => ev.id !== eventId));
    } else {
      setActionError(res.error || "Failed to delete event.");
    }
  };

  // Blog Form Actions
  const handleBlogFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionError("");
    setBlogSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", blogForm.title);
      formData.append("slug", blogForm.slug);
      formData.append("category", blogForm.category);
      formData.append("excerpt", blogForm.excerpt);
      formData.append("body", blogForm.body);
      formData.append("authorName", blogForm.authorName);
      formData.append("authorRole", blogForm.authorRole);
      formData.append("authorBio", blogForm.authorBio);
      formData.append("authorEmail", blogForm.authorEmail);
      formData.append("seoTitle", blogForm.seoTitle);
      formData.append("seoDescription", blogForm.seoDescription);
      formData.append("keywords", blogForm.keywords);

      if (blogFormImage) {
        formData.append("image", blogFormImage);
      }
      if (removeBlogImage) {
        formData.append("removeImage", "true");
      }

      let res;
      if (editingBlog) {
        res = await updateBlogAction(editingBlog.id, formData);
      } else {
        res = await createBlogAction(formData);
      }

      if (res.success) {
        setBlogForm(initialBlogFormState);
        setBlogFormImage(null);
        setRemoveBlogImage(false);
        setEditingBlog(null);
        setShowBlogForm(false);
        if (blogFileInputRef.current) blogFileInputRef.current.value = "";
        fetchBlogs();
      } else {
        setActionError(res.error || "Failed to save blog post.");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An error occurred while saving the blog post.";
      setActionError(msg);
    } finally {
      setBlogSubmitting(false);
    }
  };

  const getBodyPlainText = (body: string | null | undefined): string => {
    if (!body) return "";
    try {
      const parsed = JSON.parse(body);
      if (Array.isArray(parsed)) {
        return parsed
          .map((block: unknown) => {
            const b = block as Record<string, unknown>;
            if (b && Array.isArray(b.children)) {
              return b.children
                .map((c: unknown) => {
                  const child = c as Record<string, unknown>;
                  return typeof child.text === "string" ? child.text : "";
                })
                .join("");
            }
            return "";
          })
          .filter(Boolean)
          .join("\n\n");
      }
    } catch {
      return body;
    }
    return body;
  };

  const handleStartEditBlog = (post: BlogItem) => {
    // Find matching author ID in team members if any
    let matchedAuthorId = "custom";
    if (post.authorName) {
      const matched = teamMembers.find(
        (m) => m.name.toLowerCase() === post.authorName?.toLowerCase()
      );
      if (matched) {
        matchedAuthorId = matched.id;
      }
    }

    setEditingBlog(post);
    setBlogForm({
      title: post.title || "",
      slug: post.slug || "",
      category: post.category || "Social Impact",
      excerpt: post.excerpt || "",
      body: getBodyPlainText(post.body),
      authorId: matchedAuthorId,
      authorName: post.authorName || "",
      authorRole: post.authorRole || "",
      authorBio: post.authorBio || "",
      authorEmail: post.authorEmail || "",
      seoTitle: post.seoTitle || "",
      seoDescription: post.seoDescription || "",
      keywords: post.keywords ? post.keywords.join(", ") : "",
    });
    setBlogFormImage(null);
    setRemoveBlogImage(false);
    setShowBlogForm(true);
  };

  const handleDeleteBlog = async (blogId: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this blog post?")) {
      return;
    }

    setProcessingId(blogId);
    setActionError("");

    const res = await deleteBlogAction(blogId);
    setProcessingId(null);

    if (res.success) {
      setBlogsList((prev) => prev.filter((b) => b.id !== blogId));
    } else {
      setActionError(res.error || "Failed to delete blog post.");
    }
  };

  const handleAuthorSelectionChange = (authorId: string) => {
    if (authorId === "custom") {
      setBlogForm((prev) => ({
        ...prev,
        authorId: "custom",
        authorName: "",
        authorRole: "",
        authorBio: "",
        authorEmail: "",
      }));
    } else {
      const member = teamMembers.find((m) => m.id === authorId);
      if (member) {
        setBlogForm((prev) => ({
          ...prev,
          authorId,
          authorName: member.name,
          authorRole: member.role,
          authorBio: member.bio,
          authorEmail: member.email || "",
        }));
      }
    }
  };

  const generateSlugFromTitle = () => {
    const slug = blogForm.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
    setBlogForm((prev) => ({ ...prev, slug }));
  };

  const getEventImageUrl = (img: unknown) => {
    if (!img) return null;
    if (typeof img === "string") return img;
    return null;
  };

  // Stats calculation
  const totalSubmissions = stories.length;
  const liveReviews = stories.filter((s) => s.approved).length;
  const pendingReviews = totalSubmissions - liveReviews;

  const totalEvents = events.length;
  const upcomingEventsCount = events.filter((ev) => !ev.isPast).length;
  const pastEventsCount = totalEvents - upcomingEventsCount;

  // Render loading state
  if (isLoadingSession) {
    return (
      <main className="planner-bg min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          <span className="text-sm">Loading...</span>
        </div>
      </main>
    );
  }

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
              Enter your admin credentials to access the moderation console.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2 relative">
              <div className="absolute left-3.5 top-[38px] text-muted-foreground">
                <Mail className="w-4 h-4" />
              </div>
              <Input
                type="email"
                required
                placeholder="Admin email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-12 rounded-xl bg-background/50 border border-border/80 focus-visible:ring-accent"
              />
            </div>

            <div className="space-y-2 relative">
              <div className="absolute left-3.5 top-[38px] text-muted-foreground">
                <Lock className="w-4 h-4" />
              </div>
              <Input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 h-12 rounded-xl bg-background/50 border border-border/80 focus-visible:ring-accent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-[38px] text-muted-foreground hover:text-foreground focus:outline-none transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
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
              {isVerifying ? "Signing in..." : "Sign In"}
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
              <button
                onClick={() => { setActiveTab("blogs"); setActionError(""); }}
                className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
                  activeTab === "blogs"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Blogs
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
                        key={story.id}
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
                            disabled={processingId === story.id}
                            onClick={() => handleToggleApproval(story.id, story.approved)}
                            className="rounded-lg h-9 text-xs flex items-center gap-1.5 min-w-[95px] justify-center"
                          >
                            {processingId === story.id ? (
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
                            disabled={processingId === story.id}
                            onClick={() => handleDeleteStory(story.id)}
                            className="rounded-lg h-9 w-9 p-0 flex items-center justify-center hover:bg-destructive"
                          >
                            {processingId === story.id ? (
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
        ) : activeTab === "events" ? (
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
                          {editingEvent.gallery.map((img: string, i: number) => {
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
        ) : (
          <>
            {/* Blogs Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-card/40 border border-border/50 rounded-xl p-4 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-accent" />
                <span className="micro-label text-muted-foreground block mb-1">Total Blogs</span>
                <div className="font-heading text-2xl font-light text-foreground">{blogsList.length}</div>
              </div>
              <div className="bg-card/40 border border-border/50 rounded-xl p-4 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-success" />
                <span className="micro-label text-muted-foreground block mb-1">Categories</span>
                <div className="font-heading text-2xl font-light text-foreground">
                  {Array.from(new Set(blogsList.map((b) => b.category))).length}
                </div>
              </div>
              <div className="bg-card/40 border border-border/50 rounded-xl p-4 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                <span className="micro-label text-muted-foreground block mb-1">Guest Authors</span>
                <div className="font-heading text-2xl font-light text-foreground">
                  {blogsList.filter((b) => !teamMembers.some((m) => m.name === b.authorName)).length}
                </div>
              </div>
            </div>

            {/* Blogs Operations Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-heading font-medium text-foreground tracking-tight">
                {showBlogForm ? (editingBlog ? "Edit Blog Details" : "Write New Blog") : "All Blog Articles"}
              </h2>
              {!showBlogForm && (
                <Button
                  onClick={() => {
                    setEditingBlog(null);
                    setBlogForm(initialBlogFormState);
                    setBlogFormImage(null);
                    setRemoveBlogImage(false);
                    setShowBlogForm(true);
                  }}
                  className="rounded-xl flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Write Article
                </Button>
              )}
            </div>

            {/* Form View / Blogs List */}
            {showBlogForm ? (
              <div className="glass-panel border border-border rounded-2xl p-8 relative">
                <form onSubmit={handleBlogFormSubmit} className="space-y-6 max-w-4xl">
                  
                  {/* Section 1: Article Info */}
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-4 pb-1 border-b border-border/50">
                      1. Article Details
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Title */}
                      <div className="space-y-2">
                        <Label htmlFor="blog-title">Blog Title *</Label>
                        <Input
                          id="blog-title"
                          required
                          placeholder="e.g. 5 Ways to Help Stray Animals This Summer"
                          value={blogForm.title}
                          onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                        />
                      </div>

                      {/* Category */}
                      <div className="space-y-2">
                        <Label htmlFor="blog-category">Category *</Label>
                        <Input
                          id="blog-category"
                          required
                          placeholder="e.g. Animal Welfare, Education, volunteering"
                          value={blogForm.category}
                          onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                        />
                      </div>

                      {/* Slug */}
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="blog-slug">URL Slug *</Label>
                        <div className="flex gap-2">
                          <Input
                            id="blog-slug"
                            required
                            placeholder="e.g. ways-to-help-stray-animals"
                            value={blogForm.slug}
                            onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value })}
                            className="font-mono text-xs"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={generateSlugFromTitle}
                            className="shrink-0 text-xs px-3"
                          >
                            Generate
                          </Button>
                        </div>
                        <p className="text-[10px] text-muted-foreground">
                          Unique URL identifier. e.g., compassioncrew.in/blog/{"<slug>"}
                        </p>
                      </div>

                      {/* Excerpt */}
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="blog-excerpt">Short Excerpt / Card Summary *</Label>
                        <Textarea
                          id="blog-excerpt"
                          required
                          rows={2}
                          placeholder="A quick 1-2 sentence preview to show on the card list..."
                          value={blogForm.excerpt}
                          onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                        />
                      </div>

                      {/* Body Content */}
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="blog-body">Article Body Content *</Label>
                        <Textarea
                          id="blog-body"
                          required
                          rows={12}
                          placeholder="Write the full content of the blog post here. Separate paragraphs with double line breaks (press Enter twice)."
                          value={blogForm.body}
                          onChange={(e) => setBlogForm({ ...blogForm, body: e.target.value })}
                          className="font-sans text-sm leading-relaxed"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Media */}
                  <div className="pt-4">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-4 pb-1 border-b border-border/50">
                      2. Cover Picture
                    </h3>
                    <div className="space-y-2">
                      <Label htmlFor="blog-image">Upload Cover Image</Label>
                      <Input
                        id="blog-image"
                        type="file"
                        accept="image/*"
                        ref={blogFileInputRef}
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setBlogFormImage(e.target.files[0]);
                            setRemoveBlogImage(false);
                          }
                        }}
                        className="file:mr-4 file:py-1 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-primary-foreground hover:file:opacity-90"
                      />

                      {/* Existing Cover Image Preview */}
                      {editingBlog && editingBlog.mainImage && !removeBlogImage && (
                        <div className="mt-2 flex items-center gap-3 bg-muted/40 p-3 rounded-lg border border-border max-w-sm">
                          <div className="relative w-12 h-12 rounded overflow-hidden">
                            <Image
                              src={editingBlog.mainImage}
                              alt="Current cover"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="text-xs text-muted-foreground truncate flex-1">Current Cover Image</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setRemoveBlogImage(true)}
                            className="h-8 text-destructive hover:bg-destructive/10 text-xs px-2"
                          >
                            Remove
                          </Button>
                        </div>
                      )}

                      {removeBlogImage && (
                        <p className="text-xs text-warning mt-1">
                          Current cover image will be removed. Default fallback image will be shown.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Section 3: Author details */}
                  <div className="pt-4">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-4 pb-1 border-b border-border/50">
                      3. Author Settings
                    </h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="blog-author-select">Select Author profile</Label>
                        <select
                          id="blog-author-select"
                          value={blogForm.authorId}
                          onChange={(e) => handleAuthorSelectionChange(e.target.value)}
                          className="h-12 w-full rounded-xl border border-input bg-white px-3 py-2 text-sm text-foreground transition-all outline-none dark:bg-muted/50"
                        >
                          <option value="custom">Custom / Guest Author (Enter details manually)</option>
                          {teamMembers.map((m) => (
                            <option key={m.id} value={m.id}>
                              {m.name} — {m.role}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Author Name */}
                        <div className="space-y-2">
                          <Label htmlFor="author-name">Author Name *</Label>
                          <Input
                            id="author-name"
                            required
                            placeholder="e.g. Khushi Joshi"
                            value={blogForm.authorName}
                            onChange={(e) => setBlogForm({ ...blogForm, authorName: e.target.value })}
                            disabled={blogForm.authorId !== "custom"}
                          />
                        </div>

                        {/* Author Role */}
                        <div className="space-y-2">
                          <Label htmlFor="author-role">Author Role / Designation</Label>
                          <Input
                            id="author-role"
                            placeholder="e.g. Founder & Coordinator"
                            value={blogForm.authorRole}
                            onChange={(e) => setBlogForm({ ...blogForm, authorRole: e.target.value })}
                            disabled={blogForm.authorId !== "custom"}
                          />
                        </div>

                        {/* Author Email */}
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="author-email">Author Email Address</Label>
                          <Input
                            id="author-email"
                            type="email"
                            placeholder="e.g. author@compassioncrew.in"
                            value={blogForm.authorEmail}
                            onChange={(e) => setBlogForm({ ...blogForm, authorEmail: e.target.value })}
                            disabled={blogForm.authorId !== "custom"}
                          />
                        </div>

                        {/* Author Bio */}
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="author-bio">Author Biography</Label>
                          <Textarea
                            id="author-bio"
                            rows={3}
                            placeholder="Brief description about the author..."
                            value={blogForm.authorBio}
                            onChange={(e) => setBlogForm({ ...blogForm, authorBio: e.target.value })}
                            disabled={blogForm.authorId !== "custom"}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section 4: SEO Optimizations */}
                  <div className="pt-4">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-4 pb-1 border-b border-border/50">
                      4. SEO & Meta Customizations (Optional)
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* SEO Title */}
                      <div className="space-y-2">
                        <Label htmlFor="seo-title">Custom SEO Title</Label>
                        <Input
                          id="seo-title"
                          placeholder="Defaults to Blog Title if empty..."
                          value={blogForm.seoTitle}
                          onChange={(e) => setBlogForm({ ...blogForm, seoTitle: e.target.value })}
                        />
                      </div>

                      {/* SEO Keywords */}
                      <div className="space-y-2">
                        <Label htmlFor="seo-keywords">Search Keywords (Comma-separated)</Label>
                        <Input
                          id="seo-keywords"
                          placeholder="e.g. stray dogs, animal shelter, volunteer bangalore"
                          value={blogForm.keywords}
                          onChange={(e) => setBlogForm({ ...blogForm, keywords: e.target.value })}
                        />
                      </div>

                      {/* SEO Description */}
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="seo-description">Meta Description</Label>
                        <Textarea
                          id="seo-description"
                          rows={2}
                          placeholder="Defaults to Excerpt if empty. Recommended 150-160 characters..."
                          value={blogForm.seoDescription}
                          onChange={(e) => setBlogForm({ ...blogForm, seoDescription: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="flex gap-4 pt-4 border-t border-border">
                    <Button
                      type="submit"
                      disabled={blogSubmitting}
                      className="min-w-[120px]"
                    >
                      {blogSubmitting ? "Saving..." : "Save Blog Post"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowBlogForm(false);
                        setEditingBlog(null);
                        setBlogForm(initialBlogFormState);
                        setBlogFormImage(null);
                        setRemoveBlogImage(false);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            ) : (
              /* Blogs List Cards */
              <div className="glass-panel border border-border rounded-2xl p-6 relative min-h-[400px]">
                <div className="absolute inset-0 pointer-events-none blueprint-surface opacity-[0.03]" />
                <div className="relative z-10">
                  {isLoadingBlogs ? (
                    <div className="flex flex-col items-center justify-center h-64 gap-3 text-muted-foreground">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                      <span className="text-xs">Fetching blogs...</span>
                    </div>
                  ) : blogsList.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 gap-2 text-muted-foreground text-center">
                      <BookOpen className="w-10 h-10 text-muted-foreground/30 mb-2 mx-auto" />
                      <p className="text-sm font-medium">No blog posts found in database</p>
                      <p className="text-xs max-w-sm mt-1">Use the &quot;Write Article&quot; button to create your first article.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {blogsList.map((blog) => {
                        return (
                          <div
                            key={blog.id}
                            className="p-5 rounded-xl border border-border bg-background/50 hover:bg-background/80 transition-colors flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                          >
                            <div className="flex gap-4 items-start max-w-3xl">
                              {/* Thumbnail cover */}
                              <div className="w-16 h-16 rounded-lg overflow-hidden border border-border bg-muted shrink-0 relative flex items-center justify-center text-muted-foreground">
                                {blog.mainImage ? (
                                  <Image
                                    src={blog.mainImage}
                                    alt={blog.title}
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
                                    {blog.title}
                                  </h3>
                                  <span className="text-[10px] micro-label bg-muted border border-border/80 rounded-full px-2 py-0.5">
                                    {blog.category}
                                  </span>
                                </div>

                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                                  <span className="font-medium text-foreground">
                                    By {blog.authorName || "Staff Coordinator"}
                                  </span>
                                  <span>•</span>
                                  <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
                                  <span>•</span>
                                  <span className="font-mono text-[10px] text-accent">
                                    /{blog.slug}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-2 w-full md:w-auto shrink-0 justify-end">
                              <Button
                                size="sm"
                                variant="outline"
                                disabled={processingId === blog.id}
                                onClick={() => handleStartEditBlog(blog)}
                                className="rounded-lg h-9 text-xs flex items-center gap-1.5"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                                Edit
                              </Button>

                              <Button
                                size="sm"
                                variant="destructive"
                                disabled={processingId === blog.id}
                                onClick={() => handleDeleteBlog(blog.id)}
                                className="rounded-lg h-9 w-9 p-0 flex items-center justify-center hover:bg-destructive"
                              >
                                {processingId === blog.id ? (
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
