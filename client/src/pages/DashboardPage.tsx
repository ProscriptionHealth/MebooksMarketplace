import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Video,
  FileText,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Share2,
  Clock,
  TrendingUp,
  Users,
  Star,
  Calendar,
  Target,
  Sparkles,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Award,
} from "lucide-react";

const recentContent = [
  {
    id: 1,
    title: "Ocean Adventures: Marine Biology",
    type: "ebook",
    status: "completed",
    createdAt: "2024-01-20",
    downloads: 234,
    views: 567,
    rating: 4.8,
    thumbnail: "/api/placeholder/200/120",
  },
  {
    id: 2,
    title: "Space Explorer's Guide",
    type: "video",
    status: "processing",
    createdAt: "2024-01-18",
    downloads: 0,
    views: 12,
    rating: 0,
    thumbnail: "/api/placeholder/200/120",
  },
  {
    id: 3,
    title: "Maya's Mathematical Mystery",
    type: "story",
    status: "completed",
    createdAt: "2024-01-15",
    downloads: 189,
    views: 432,
    rating: 4.9,
    thumbnail: "/api/placeholder/200/120",
  },
  {
    id: 4,
    title: "Creative Writing Workshop",
    type: "workbook",
    status: "draft",
    createdAt: "2024-01-12",
    downloads: 0,
    views: 23,
    rating: 0,
    thumbnail: "/api/placeholder/200/120",
  },
];

const stats = [
  {
    title: "Total Content",
    value: "24",
    change: "+3",
    changeType: "positive",
    icon: BookOpen,
  },
  {
    title: "Total Downloads",
    value: "1,247",
    change: "+156",
    changeType: "positive",
    icon: Download,
  },
  {
    title: "Avg. Rating",
    value: "4.7",
    change: "+0.2",
    changeType: "positive",
    icon: Star,
  },
  {
    title: "Monthly Views",
    value: "3,890",
    change: "+12%",
    changeType: "positive",
    icon: Eye,
  },
];

const activityData = [
  { date: "Jan 15", views: 120, downloads: 45 },
  { date: "Jan 16", views: 158, downloads: 62 },
  { date: "Jan 17", views: 95, downloads: 38 },
  { date: "Jan 18", views: 203, downloads: 71 },
  { date: "Jan 19", views: 167, downloads: 54 },
  { date: "Jan 20", views: 234, downloads: 89 },
  { date: "Jan 21", views: 198, downloads: 67 },
];

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "ebook":
        return BookOpen;
      case "video":
        return Video;
      case "workbook":
        return Target;
      case "story":
        return FileText;
      default:
        return BookOpen;
    }
  };

  const filteredContent = recentContent.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === "all" || item.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome back, Sarah!</h1>
          <p className="text-muted-foreground">
            Here's what's happening with your content today.
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <Button variant="outline" asChild>
            <Link href="/templates">
              <Eye className="h-4 w-4 mr-2" />
              Browse Templates
            </Link>
          </Button>
          <Button variant="gradient" asChild>
            <Link href="/create">
              <Plus className="h-4 w-4 mr-2" />
              Create New
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={`${stat.changeType === "positive" ? "text-green-600" : "text-red-600"}`}>
                  {stat.change}
                </span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2 text-vebooks-primary" />
                Quick Actions
              </CardTitle>
              <CardDescription>
                Jump right into creating your next educational masterpiece
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-auto p-4 flex-col items-start" asChild>
                  <Link href="/create?type=ebook">
                    <BookOpen className="h-6 w-6 mb-2 text-vebooks-primary" />
                    <div className="text-left">
                      <div className="font-medium">Create eBook</div>
                      <div className="text-sm text-muted-foreground">Interactive digital book</div>
                    </div>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex-col items-start" asChild>
                  <Link href="/create?type=video">
                    <Video className="h-6 w-6 mb-2 text-vebooks-primary" />
                    <div className="text-left">
                      <div className="font-medium">Create Video</div>
                      <div className="text-sm text-muted-foreground">Educational video content</div>
                    </div>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex-col items-start" asChild>
                  <Link href="/create?type=workbook">
                    <Target className="h-6 w-6 mb-2 text-vebooks-primary" />
                    <div className="text-left">
                      <div className="font-medium">Study Workbook</div>
                      <div className="text-sm text-muted-foreground">Interactive exercises</div>
                    </div>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex-col items-start" asChild>
                  <Link href="/templates">
                    <Sparkles className="h-6 w-6 mb-2 text-vebooks-primary" />
                    <div className="text-left">
                      <div className="font-medium">Use Template</div>
                      <div className="text-sm text-muted-foreground">Start from a template</div>
                    </div>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* My Content */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>My Content</CardTitle>
                  <CardDescription>Manage your created educational content</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search your content..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Tabs value={selectedFilter} onValueChange={setSelectedFilter}>
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="ebook">eBooks</TabsTrigger>
                    <TabsTrigger value="video">Videos</TabsTrigger>
                    <TabsTrigger value="workbook">Workbooks</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div className="space-y-4">
                {filteredContent.map((item) => {
                  const TypeIcon = getTypeIcon(item.type);
                  return (
                    <div
                      key={item.id}
                      className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <div className="w-16 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded flex items-center justify-center flex-shrink-0">
                        <TypeIcon className="h-5 w-5 text-gray-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">{item.title}</h3>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                          <span className="capitalize">{item.type}</span>
                          <span>•</span>
                          <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                          <Badge className={getStatusColor(item.status)}>
                            {item.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{item.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Download className="h-4 w-4" />
                          <span>{item.downloads}</span>
                        </div>
                        {item.rating > 0 && (
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>{item.rating}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Activity Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                Activity Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">This Week</span>
                  <span className="font-medium">1,247 views</span>
                </div>
                <Progress value={78} className="h-2" />
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-vebooks-primary rounded-full"></div>
                      <span className="text-muted-foreground">Views</span>
                    </div>
                    <div className="font-medium">1,247</div>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-vebooks-secondary rounded-full"></div>
                      <span className="text-muted-foreground">Downloads</span>
                    </div>
                    <div className="font-medium">423</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="h-5 w-5 mr-2 text-yellow-500" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Star className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">Content Creator</div>
                    <div className="text-xs text-muted-foreground">Created 10+ pieces of content</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">Rising Star</div>
                    <div className="text-xs text-muted-foreground">1000+ total views</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Users className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">Community Favorite</div>
                    <div className="text-xs text-muted-foreground">4.5+ average rating</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tips & Resources */}
          <Card>
            <CardHeader>
              <CardTitle>Tips & Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-vebooks-primary/5 rounded-lg">
                  <h4 className="font-medium text-sm mb-1">Create Better Content</h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    Learn advanced techniques for engaging educational content
                  </p>
                  <Button size="sm" variant="ghost" className="h-6 px-2 text-xs">
                    Learn More
                  </Button>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-sm mb-1">AI Writing Tips</h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    Maximize your AI content generation results
                  </p>
                  <Button size="sm" variant="ghost" className="h-6 px-2 text-xs">
                    View Guide
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}