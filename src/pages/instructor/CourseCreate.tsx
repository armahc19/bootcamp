import { DashboardNav } from "@/components/DashboardNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { ArrowLeft, Upload, Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const CourseCreate = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handlePublish = () => {
    toast({
      title: "Course Created!",
      description: "Your course has been published successfully."
    });
    navigate("/instructor/dashboard");
  };

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardNav role="instructor" />
      
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" onClick={() => navigate("/instructor/dashboard")} className="mb-6 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>

          <h1 className="text-4xl font-bold mb-2">Create New Course</h1>
          <p className="text-muted-foreground mb-8">Step {step} of 3</p>

          {/* Progress Indicator */}
          <div className="flex gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`flex-1 h-2 rounded-full ${s <= step ? "bg-primary" : "bg-muted"}`}
              />
            ))}
          </div>

          {step === 1 && (
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">Basic Information</h2>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="title">Course Title</Label>
                  <Input id="title" placeholder="e.g., Advanced JavaScript Patterns" className="mt-2" />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Describe what students will learn in this course"
                    className="mt-2 min-h-32"
                  />
                </div>

                <div>
                  <Label htmlFor="objectives">Learning Objectives</Label>
                  <Textarea 
                    id="objectives" 
                    placeholder="List the key learning outcomes (one per line)"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Tags</Label>
                  <div className="flex gap-2 mt-2">
                    <Input 
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      placeholder="Add tags (e.g., JavaScript, Advanced)"
                    />
                    <Button onClick={addTag} type="button">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {tags.map(tag => (
                      <span key={tag} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-2">
                        {tag}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => removeTag(tag)} />
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="level">Level</Label>
                    <Select>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Input id="duration" placeholder="e.g., 8 weeks" className="mt-2" />
                  </div>
                </div>

                <Button onClick={() => setStep(2)} className="w-full">
                  Next: Pricing & Media
                </Button>
              </div>
            </Card>
          )}

          {step === 2 && (
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">Pricing & Media</h2>
              
              <div className="space-y-6">
                <div>
                  <Label>Course Thumbnail</Label>
                  <div className="mt-2 border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer">
                    <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</p>
                  </div>
                </div>

                <div>
                  <Label>Pricing Type</Label>
                  <Select>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select pricing" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="free">Free</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="price">Price (USD)</Label>
                  <Input id="price" type="number" placeholder="49.99" className="mt-2" />
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                    Previous
                  </Button>
                  <Button onClick={() => setStep(3)} className="flex-1">
                    Next: Course Structure
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {step === 3 && (
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">Course Structure</h2>
              
              <div className="space-y-4 mb-6">
                <p className="text-muted-foreground">Add modules and lessons to your course</p>
                
                <Button variant="outline" className="w-full gap-2">
                  <Plus className="w-4 h-4" />
                  Add Module
                </Button>

                <div className="border border-border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Module 1: Getting Started</h3>
                  <div className="space-y-2 ml-4">
                    <div className="text-sm text-muted-foreground">No lessons yet</div>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Plus className="w-3 h-3" />
                      Add Lesson
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                  Previous
                </Button>
                <Button onClick={handlePublish} className="flex-1">
                  Publish Course
                </Button>
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default CourseCreate;
