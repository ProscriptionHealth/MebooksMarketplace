import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Video,
  FileText,
  Heart,
  Search,
  Filter,
  Star,
  Clock,
  Users,
  Play,
  Download,
  Eye,
  Sparkles,
  Target,
  Globe,
  Brain,
  Palette,
  Music,
  Calculator,
  Beaker,
  Map,
} from "lucide-react";

const categories = [
  { id: "all", label: "All Templates", icon: BookOpen },
  { id: "ebook", label: "eBooks", icon: BookOpen },
  { id: "video", label: "Videos", icon: Video },
  { id: "workbook", label: "Workbooks", icon: Target },
  { id: "story", label: "Stories", icon: Heart },
];

const subjects = [
  { id: "math", label: "Mathematics", icon: Calculator, color: "bg-blue-100 text-blue-800" },
  { id: "science", label: "Science", icon: Beaker, color: "bg-green-100 text-green-800" },
  { id: "language", label: "Language Arts", icon: BookOpen, color: "bg-purple-100 text-purple-800" },
  { id: "history", label: "History", icon: Map, color: "bg-orange-100 text-orange-800" },
  { id: "art", label: "Art & Creativity", icon: Palette, color: "bg-pink-100 text-pink-800" },
  { id: "music", label: "Music", icon: Music, color: "bg-yellow-100 text-yellow-800" },
];

const templates = [
  {
    id: 1,
    title: "Ocean Adventures: Marine Biology for Kids",
    description: "Dive deep into the fascinating world of marine life with interactive lessons and beautiful illustrations.",
    type: "ebook",
    subject: "science",
    ageGroup: "Elementary (6-11)",
    duration: "45 minutes",
    rating: 4.9,
    reviews: 127,
    downloads: 2340,
    thumbnail: "/api/placeholder/300/200",
    tags: ["Interactive", "Illustrations", "Ocean", "Animals"],
    difficulty: "Beginner",
    language: "English",
    author: "Dr. Sarah Marine",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    title: "Space Explorer's Guide to the Solar System",
    description: "Journey through space and learn about planets, stars, and galaxies in this comprehensive guide.",
    type: "video",
    subject: "science",
    ageGroup: "Middle School (12-14)",
    duration: "60 minutes",
    rating: 4.8,
    reviews: 89,
    downloads: 1850,
    thumbnail: "/api/placeholder/300/200",
    tags: ["Space", "Planets", "Animation", "3D"],
    difficulty: "Intermediate",
    language: "English",
    author: "Prof. Alex Cosmos",
    createdAt: "2024-01-10",
  },
  {
    id: 3,
    title: "Maya's Mathematical Mystery",
    description: "Follow Maya as she solves puzzles using fractions, decimals, and basic algebra in this story-based learning adventure.",
    type: "story",
    subject: "math",
    ageGroup: "Elementary (6-11)",
    duration: "30 minutes",
    rating: 4.7,
    reviews: 156,
    downloads: 3200,
    thumbnail: "/api/placeholder/300/200",
    tags: ["Story", "Problem Solving", "Adventure", "Personalized"],
    difficulty: "Beginner",
    language: "English",
    author: "Ms. Jennifer Numbers",
    createdAt: "2024-01-20",
  },
  {
    id: 4,
    title: "Creative Writing Workshop",
    description: "Unlock your imagination with guided exercises, prompts, and techniques for young writers.",
    type: "workbook",
    subject: "language",
    ageGroup: "High School (15-18)",
    duration: "120 minutes",
    rating: 4.9,
    reviews: 203,
    downloads: 1680,
    thumbnail: "/api/placeholder/300/200",
    tags: ["Writing", "Creativity", "Exercises", "Portfolio"],
    difficulty: "Advanced",
    language: "English",
    author: "Author Emma Words",
    createdAt: "2024-01-08",
  },
  {
    id: 5,
    title: "Ancient Egypt: Pharaohs and Pyramids",
    description: "Explore the wonders of ancient Egypt through interactive timelines, virtual tours, and engaging activities.",
    type: "ebook",
    subject: "history",
    ageGroup: "Middle School (12-14)",
    duration: "75 minutes",
    rating: 4.6,
    reviews: 94,
    downloads: 1420,
    thumbnail: "/api/placeholder/300/200",
    tags: ["History", "Ancient", "Interactive", "Virtual Tours"],
    difficulty: "Intermediate",
    language: "English",
    author: "Dr. Michael Historian",
    createdAt: "2024-01-12",
  },
  {
    id: 6,
    title: "Colors and Shapes Art Adventure",
    description: "Learn about colors, shapes, and artistic techniques through hands-on projects and digital creativity.",
    type: "video",
    subject: "art",
    ageGroup: "Preschool (3-5)",
    duration: "25 minutes",
    rating: 4.8,
    reviews: 78,
    downloads: 2100,
    thumbnail: "/api/placeholder/300/200",
    tags: ["Art", "Colors", "Shapes", "Hands-on"],
    difficulty: "Beginner",
    language: "English",
    author: "Artist Luna Creative",
    createdAt: "2024-01-18",
  },
];

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");

  const filteredTemplates = templates.filter((template) => {
    const matchesCategory = selectedCategory === "all" || template.type === selectedCategory;
    const matchesSubject = selectedSubject === "all" || template.subject === selectedSubject;
    const matchesSearch =
      searchQuery === "" ||
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSubject && matchesSearch;
  });

  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.downloads - a.downloads;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "title":
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const getSubjectIcon = (subjectId: string) => {
    const subject = subjects.find((s) => s.id === subjectId);
    return subject?.icon || BookOpen;
  };

  const getSubjectColor = (subjectId: string) => {
    const subject = subjects.find((s) => s.id === subjectId);
    return subject?.color || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-4">
          Template <span className="gradient-text">Gallery</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Discover professionally designed templates for creating engaging educational content.
          Start with a template and customize it to match your needs.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest</option>
              <option value="title">Alphabetical</option>
            </select>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Category and Subject Filters */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-4">
          <TabsList className="grid w-full grid-cols-5">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                <category.icon className="h-4 w-4" />
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedSubject === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedSubject("all")}
          >
            All Subjects
          </Button>
          {subjects.map((subject) => (
            <Button
              key={subject.id}
              variant={selectedSubject === subject.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSubject(subject.id)}
              className="flex items-center gap-2"
            >
              <subject.icon className="h-4 w-4" />
              {subject.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Results Summary */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          Showing {sortedTemplates.length} of {templates.length} templates
          {searchQuery && ` for "${searchQuery}"`}
        </p>
      </div>

      {/* Templates Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {sortedTemplates.map((template) => {
          const SubjectIcon = getSubjectIcon(template.subject);
          return (
            <Card key={template.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <SubjectIcon className="h-16 w-16 text-gray-400" />
                </div>
                <div className="absolute top-3 left-3">
                  <Badge variant="secondary" className="capitalize">
                    {template.type}
                  </Badge>
                </div>
                <div className="absolute top-3 right-3">
                  <div className="flex items-center space-x-1 bg-white/90 rounded-full px-2 py-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-medium">{template.rating}</span>
                  </div>
                </div>
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="line-clamp-2 text-lg">{template.title}</CardTitle>
                    <CardDescription className="line-clamp-2 mt-1">
                      {template.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-3">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {template.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {template.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{template.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Subject Badge */}
                  <Badge className={`${getSubjectColor(template.subject)} text-xs`}>
                    <SubjectIcon className="h-3 w-3 mr-1" />
                    {subjects.find((s) => s.id === template.subject)?.label}
                  </Badge>

                  {/* Metadata */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{template.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-3 w-3" />
                        <span>{template.ageGroup}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Download className="h-3 w-3" />
                      <span>{template.downloads.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                    <Button size="sm" variant="gradient" className="flex-1" asChild>
                      <Link href={`/create?template=${template.id}`}>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Use Template
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {sortedTemplates.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No templates found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search or filter criteria
          </p>
          <Button onClick={() => { setSearchQuery(""); setSelectedCategory("all"); setSelectedSubject("all"); }}>
            Clear Filters
          </Button>
        </div>
      )}

      {/* Call to Action */}
      <div className="text-center bg-muted/50 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-2">Don't see what you're looking for?</h2>
        <p className="text-muted-foreground mb-4">
          Create your own custom content from scratch with our AI-powered creation wizard
        </p>
        <Button size="lg" variant="gradient" asChild>
          <Link href="/create">
            <Sparkles className="h-5 w-5 mr-2" />
            Start Creating
          </Link>
        </Button>
      </div>
    </div>
  );
}