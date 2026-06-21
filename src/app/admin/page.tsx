"use client";

import { useState, useEffect, useCallback } from "react";
import { Lock, Eye, EyeOff, Trash2, LogOut, MessageSquare, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { client } from "@/sanity/client";
import { allStoriesQuery } from "@/sanity/queries";
import {
  verifyAdminPasswordAction,
  toggleApproveStoryAction,
  deleteStoryAction,
} from "@/app/actions/moderator-actions";

interface Story {
  _id: string;
  quote: string;
  name: string;
  role: string;
  location: string;
  approved: boolean;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionError, setActionError] = useState("");
  const [processingId, setProcessingId] = useState<string | null>(null);

  // Check session storage for existing auth
  useEffect(() => {
    const savedPassword = sessionStorage.getItem("admin_secret");
    if (savedPassword) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPassword(savedPassword);
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch stories
  const fetchStories = useCallback(async () => {
    setIsLoading(true);
    try {
      // Direct fetch bypasses Next.js page cache to show fresh data
      const data = await client.fetch(allStoriesQuery, {}, { next: { revalidate: 0 } });
      setStories(data || []);
    } catch (err: unknown) {
      console.error("Failed to load reviews:", err);
      setActionError("Failed to retrieve reviews from database.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchStories();
    }
  }, [isAuthenticated, fetchStories]);

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
  };

  // Toggle approval status
  const handleToggleApproval = async (storyId: string, currentStatus: boolean) => {
    setProcessingId(storyId);
    setActionError("");
    
    const res = await toggleApproveStoryAction(storyId, currentStatus, password);
    setProcessingId(null);

    if (res.success) {
      // Update local state directly for responsive UI feel
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

  // Stats calculation
  const totalSubmissions = stories.length;
  const liveReviews = stories.filter((s) => s.approved).length;
  const pendingReviews = totalSubmissions - liveReviews;

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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 pb-6 border-b border-border/60">
          <div>
            <span className="micro-label text-accent block mb-2">
              COMPASSION CREW ADMIN
            </span>
            <h1 className="font-display text-4xl font-semibold text-foreground tracking-tight">
              Testimonials Desk
            </h1>
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

        {/* Action / Error Alerts */}
        {actionError && (
          <div className="mb-6 flex gap-2 items-center text-sm text-destructive bg-destructive/5 border border-destructive/20 p-4 rounded-xl">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{actionError}</span>
          </div>
        )}

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

        {/* Main Content Grid */}
        <div className="glass-panel border border-border rounded-2xl p-6 relative min-h-[400px]">
          <div className="absolute inset-0 pointer-events-none blueprint-surface opacity-[0.03]" />
          
          <div className="relative z-10">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-64 gap-3 text-muted-foreground">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                <span className="text-xs">Fetching submissions...</span>
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
                      {/* Approved Badge Status */}
                      <span
                        className={`micro-label text-[10px] px-2 py-0.5 rounded-full border ${
                          story.approved
                            ? "bg-success/5 text-success border-success/20"
                            : "bg-primary/5 text-primary border-primary/20"
                        }`}
                      >
                        {story.approved ? "Live" : "Pending"}
                      </span>

                      {/* Action buttons */}
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
      </div>
    </main>
  );
}
