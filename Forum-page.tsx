import { useEffect, useState } from "react";
import { useRoute, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Settings, UserPlus } from "lucide-react";
import PostItem from "@/components/post-item";
import CreatePostForm from "@/components/create-post-form";
import { forumCodeSchema } from "@shared/schema";

interface ForumData {
  id: number;
  code: string;
  name: string;
  description: string;
  createdById: number;
}

interface PostData {
  id: number;
  title: string;
  content: string;
  forumId: number;
  userId: number;
  createdAt: string;
  author: {
    id: number;
    username: string;
  };
  files: FileData[];
}

interface FileData {
  id: number;
  filename: string;
  originalFilename: string;
  mimetype: string;
  size: number;
  postId: number;
}

export default function ForumPage() {
  const [_, params] = useRoute<{ code: string }>("/forum/:code");
  const [location, setLocation] = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();
  const [forumId, setForumId] = useState<number | null>(null);
  
  const code = params?.code.toUpperCase() || "";
  
  // Validate forum code
  useEffect(() => {
    const result = forumCodeSchema.safeParse(code);
    if (!result.success) {
      toast({
        title: "Invalid forum code",
        description: "Forum code must be 5 characters (A-Z and 1-9)",
        variant: "destructive",
      });
      setLocation("/");
    }
  }, [code, toast, setLocation]);
  
  // Fetch forum data
  const { 
    data: forum,
    isLoading: isForumLoading,
    error: forumError 
  } = useQuery<ForumData>({
    queryKey: [`/api/forums/${code}`],
    enabled: forumCodeSchema.safeParse(code).success,
    onSuccess: (data) => {
      setForumId(data.id);
    },
    onError: () => {
      toast({
        title: "Forum not found",
        description: "The forum you're looking for doesn't exist",
        variant: "destructive",
      });
    }
  });
  
  // Fetch posts
  const { 
    data: posts = [],
    isLoading: isPostsLoading,
    error: postsError
  } = useQuery<PostData[]>({
    queryKey: [`/api/forums/${forumId}/posts`],
    enabled: !!forumId,
  });
  
  // Create post mutation
  const createPostMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await fetch("/api/posts", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Failed to create post");
      }
      
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Post created",
        description: "Your post has been published successfully",
      });
      queryClient.invalidateQueries({
        queryKey: [`/api/forums/${forumId}/posts`],
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to create post",
        description: error.message,
        variant: "destructive",
      });
    }
  });
  
  if (isForumLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  if (forumError || !forum) {
    return null; // Will be redirected by onError
  }
  
  return (
    <section className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Forum Header */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <div className="flex items-center">
              <h1 className="text-2xl font-bold">{forum.name || `Forum ${code}`}</h1>
              <Badge variant="outline" className="ml-3 px-3 py-1 rounded-full font-mono">
                {forum.code}
              </Badge>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {forum.description || "Welcome to this private forum"}
            </p>
          </div>
          <div className="flex mt-4 md:mt-0">
            <Button variant="outline" size="sm" className="rounded-full mr-3">
              <UserPlus className="h-4 w-4 mr-2" />
              Invite
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Forum Posts */}
        <div className="mb-8 space-y-6">
          {isPostsLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : posts.length > 0 ? (
            posts.map((post) => (
              <PostItem key={post.id} post={post} />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No posts yet. Be the first to start a discussion!</p>
            </div>
          )}
        </div>
        
        {/* Create Post Form */}
        <CreatePostForm 
          forumId={forum.id} 
          onSubmit={(formData) => createPostMutation.mutate(formData)}
          isSubmitting={createPostMutation.isPending}
        />
      </div>
    </section>
  );
}
