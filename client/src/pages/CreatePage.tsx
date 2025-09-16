import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Video,
  Image,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Wand2,
  Users,
  Calendar,
  Globe,
  Target,
  Brain,
  Heart,
  Star,
  Clock,
  Download,
} from "lucide-react";

const contentTypes = [
  {
    id: "ebook",
    title: "Interactive eBook",
    description: "Create an engaging digital book with custom illustrations",
    icon: BookOpen,
    color: "from-blue-500 to-indigo-500",
    features: ["Custom illustrations", "Interactive elements", "Multiple formats", "Personalization"],
  },
  {
    id: "video",
    title: "Educational Video",
    description: "Transform content into engaging videos with AI voiceover",
    icon: Video,
    color: "from-purple-500 to-violet-500",
    features: ["AI voiceover", "Custom animations", "Subtitles", "Multiple resolutions"],
  },
  {
    id: "workbook",
    title: "Study Workbook",
    description: "Interactive workbook with exercises and assessments",
    icon: Target,
    color: "from-green-500 to-emerald-500",
    features: ["Interactive exercises", "Progress tracking", "Assessments", "Answer keys"],
  },
  {
    id: "storybook",
    title: "Children's Story",
    description: "Personalized storybook with your child as the main character",
    icon: Heart,
    color: "from-pink-500 to-rose-500",
    features: ["Character customization", "Moral lessons", "Age-appropriate", "Beautiful artwork"],
  },
];

const ageGroups = [
  { id: "preschool", label: "Preschool (3-5)", value: "preschool" },
  { id: "elementary", label: "Elementary (6-11)", value: "elementary" },
  { id: "middle", label: "Middle School (12-14)", value: "middle" },
  { id: "high", label: "High School (15-18)", value: "high" },
  { id: "adult", label: "Adult (18+)", value: "adult" },
];

const subjects = [
  "Mathematics", "Science", "Language Arts", "History", "Geography",
  "Art", "Music", "Physical Education", "Computer Science", "Foreign Languages",
  "Social Studies", "Health", "Life Skills", "Philosophy", "Psychology",
];

const learningStyles = [
  { id: "visual", label: "Visual Learner", description: "Learns best through images, charts, and diagrams" },
  { id: "auditory", label: "Auditory Learner", description: "Learns best through listening and discussion" },
  { id: "kinesthetic", label: "Kinesthetic Learner", description: "Learns best through hands-on activities" },
  { id: "reading", label: "Reading/Writing Learner", description: "Learns best through text and written materials" },
];

const difficultyLevels = [
  { id: "beginner", label: "Beginner", description: "Just starting out" },
  { id: "intermediate", label: "Intermediate", description: "Some prior knowledge" },
  { id: "advanced", label: "Advanced", description: "Extensive background" },
  { id: "expert", label: "Expert", description: "Professional level" },
];

export default function CreatePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedContentType, setSelectedContentType] = useState("");
  const [formData, setFormData] = useState({
    contentType: "",
    title: "",
    description: "",
    ageGroup: "",
    subject: "",
    learningStyle: "",
    difficulty: "",
    language: "english",
    duration: "",
    topics: [] as string[],
    personalDetails: {
      childName: "",
      interests: "",
      favoriteColors: "",
      specialNeeds: "",
    },
    preferences: {
      includeIllustrations: true,
      includeActivities: true,
      includeAssessments: false,
      includeCertificate: false,
    },
  });

  const totalSteps = 6;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleContentTypeSelect = (typeId: string) => {
    setSelectedContentType(typeId);
    setFormData({ ...formData, contentType: typeId });
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handlePersonalDetailChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      personalDetails: { ...formData.personalDetails, [field]: value },
    });
  };

  const handlePreferenceChange = (field: string, value: boolean) => {
    setFormData({
      ...formData,
      preferences: { ...formData.preferences, [field]: value },
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">Choose Your Content Type</h2>
              <p className="text-muted-foreground">
                Select the type of educational content you'd like to create
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {contentTypes.map((type) => (
                <Card
                  key={type.id}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedContentType === type.id
                      ? "ring-2 ring-vebooks-primary shadow-lg"
                      : ""
                  }`}
                  onClick={() => handleContentTypeSelect(type.id)}
                >
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${type.color} flex items-center justify-center`}>
                        <type.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{type.title}</CardTitle>
                        <CardDescription>{type.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {type.features.map((feature, index) => (
                        <Badge key={index} variant="secondary">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">Basic Information</h2>
              <p className="text-muted-foreground">
                Tell us about your content project
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Content Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Introduction to Marine Biology"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what you want to create and what it should cover..."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Age Group</Label>
                  <Select value={formData.ageGroup} onValueChange={(value) => handleInputChange("ageGroup", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select age group" />
                    </SelectTrigger>
                    <SelectContent>
                      {ageGroups.map((age) => (
                        <SelectItem key={age.id} value={age.value}>
                          {age.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Subject Area</Label>
                  <Select value={formData.subject} onValueChange={(value) => handleInputChange("subject", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject.toLowerCase()}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">Learning Preferences</h2>
              <p className="text-muted-foreground">
                Help us personalize the content for optimal learning
              </p>
            </div>
            <div className="space-y-6">
              <div>
                <Label className="text-base font-semibold">Learning Style</Label>
                <RadioGroup
                  value={formData.learningStyle}
                  onValueChange={(value) => handleInputChange("learningStyle", value)}
                  className="mt-3"
                >
                  {learningStyles.map((style) => (
                    <div key={style.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                      <RadioGroupItem value={style.id} id={style.id} className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor={style.id} className="font-medium">
                          {style.label}
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          {style.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div>
                <Label className="text-base font-semibold">Difficulty Level</Label>
                <RadioGroup
                  value={formData.difficulty}
                  onValueChange={(value) => handleInputChange("difficulty", value)}
                  className="mt-3"
                >
                  {difficultyLevels.map((level) => (
                    <div key={level.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                      <RadioGroupItem value={level.id} id={level.id} className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor={level.id} className="font-medium">
                          {level.label}
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          {level.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">Personalization</h2>
              <p className="text-muted-foreground">
                Add personal touches to make the content more engaging
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="childName">Child's Name (Optional)</Label>
                <Input
                  id="childName"
                  placeholder="Enter child's name for personalization"
                  value={formData.personalDetails.childName}
                  onChange={(e) => handlePersonalDetailChange("childName", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="interests">Interests & Hobbies</Label>
                <Textarea
                  id="interests"
                  placeholder="e.g., dinosaurs, space, art, sports..."
                  value={formData.personalDetails.interests}
                  onChange={(e) => handlePersonalDetailChange("interests", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="favoriteColors">Favorite Colors</Label>
                <Input
                  id="favoriteColors"
                  placeholder="e.g., blue, green, purple"
                  value={formData.personalDetails.favoriteColors}
                  onChange={(e) => handlePersonalDetailChange("favoriteColors", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="specialNeeds">Special Considerations (Optional)</Label>
                <Textarea
                  id="specialNeeds"
                  placeholder="Any learning differences, accessibility needs, or special requirements..."
                  value={formData.personalDetails.specialNeeds}
                  onChange={(e) => handlePersonalDetailChange("specialNeeds", e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">Content Preferences</h2>
              <p className="text-muted-foreground">
                Customize what to include in your content
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeIllustrations"
                  checked={formData.preferences.includeIllustrations}
                  onCheckedChange={(checked) =>
                    handlePreferenceChange("includeIllustrations", checked as boolean)
                  }
                />
                <div>
                  <Label htmlFor="includeIllustrations" className="font-medium">
                    Include Custom Illustrations
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    AI-generated images tailored to your content
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeActivities"
                  checked={formData.preferences.includeActivities}
                  onCheckedChange={(checked) =>
                    handlePreferenceChange("includeActivities", checked as boolean)
                  }
                />
                <div>
                  <Label htmlFor="includeActivities" className="font-medium">
                    Include Interactive Activities
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Engaging exercises and interactive elements
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeAssessments"
                  checked={formData.preferences.includeAssessments}
                  onCheckedChange={(checked) =>
                    handlePreferenceChange("includeAssessments", checked as boolean)
                  }
                />
                <div>
                  <Label htmlFor="includeAssessments" className="font-medium">
                    Include Assessments
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Quizzes and tests to measure learning progress
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeCertificate"
                  checked={formData.preferences.includeCertificate}
                  onCheckedChange={(checked) =>
                    handlePreferenceChange("includeCertificate", checked as boolean)
                  }
                />
                <div>
                  <Label htmlFor="includeCertificate" className="font-medium">
                    Include Completion Certificate
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Personalized certificate upon completion
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">Review & Generate</h2>
              <p className="text-muted-foreground">
                Review your selections and generate your personalized content
              </p>
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 text-vebooks-primary" />
                  <span>Content Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Type:</span> {selectedContentType}
                  </div>
                  <div>
                    <span className="font-medium">Age Group:</span> {formData.ageGroup}
                  </div>
                  <div>
                    <span className="font-medium">Subject:</span> {formData.subject}
                  </div>
                  <div>
                    <span className="font-medium">Difficulty:</span> {formData.difficulty}
                  </div>
                </div>
                <div>
                  <span className="font-medium">Title:</span> {formData.title}
                </div>
                <div>
                  <span className="font-medium">Description:</span>
                  <p className="text-muted-foreground mt-1">{formData.description}</p>
                </div>
                {formData.personalDetails.childName && (
                  <div>
                    <span className="font-medium">Personalized for:</span> {formData.personalDetails.childName}
                  </div>
                )}
              </CardContent>
            </Card>
            <div className="text-center">
              <Button size="lg" variant="gradient" className="w-full md:w-auto">
                <Wand2 className="mr-2 h-5 w-5" />
                Generate My Content
              </Button>
              <p className="text-sm text-muted-foreground mt-3">
                Estimated generation time: 2-5 minutes
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Create New Content</h1>
          <Badge variant="outline">
            Step {currentStep} of {totalSteps}
          </Badge>
        </div>
        <Progress value={progress} className="w-full" />
      </div>

      {/* Step Content */}
      <div className="min-h-[500px]">
        {renderStepContent()}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8 pt-6 border-t">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 1}
          className="flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="flex space-x-2">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div
              key={i + 1}
              className={`w-2 h-2 rounded-full ${
                i + 1 <= currentStep ? "bg-vebooks-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>

        {currentStep < totalSteps ? (
          <Button
            onClick={handleNext}
            disabled={currentStep === 1 && !selectedContentType}
            className="flex items-center"
          >
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button variant="gradient">
            <Download className="mr-2 h-4 w-4" />
            Generate
          </Button>
        )}
      </div>
    </div>
  );
}