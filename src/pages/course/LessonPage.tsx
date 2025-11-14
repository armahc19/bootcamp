import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { mockCourses } from "@/data/mockData";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { useState } from "react";

const LessonPage = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const [notes, setNotes] = useState("");
  
  const course = mockCourses.find(c => c.id === courseId);
  const lesson = course?.modules.flatMap(m => m.lessons).find(l => l.id === lessonId);

  if (!course || !lesson) return <div>Lesson not found</div>;

  const allLessons = course.modules.flatMap(m => m.lessons);
  const currentIndex = allLessons.findIndex(l => l.id === lessonId);
  const nextLesson = allLessons[currentIndex + 1];
  const prevLesson = allLessons[currentIndex - 1];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate(`/course/${courseId}`)} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Course
          </Button>
          <h1 className="font-bold text-lg">{lesson.title}</h1>
          <div className="w-24" /> {/* Spacer for centering */}
        </div>
      </header>

      <div className="flex">
        {/* Main Content Area */}
        <main className="flex-1 p-8">
          <div className="max-w-5xl mx-auto">
            {/* Video Player Placeholder */}
            {lesson.type === "video" && (
              <Card className="mb-6 aspect-video bg-muted flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-primary border-b-8 border-b-transparent ml-1" />
                  </div>
                  <p className="text-muted-foreground">Video Player</p>
                </div>
              </Card>
            )}

            {lesson.type === "quiz" && (
              <Card className="p-8 mb-6">
                <h2 className="text-2xl font-bold mb-6">Quiz: {lesson.title}</h2>
                <div className="space-y-6">
                  <div>
                    <p className="font-medium mb-3">1. What is the primary purpose of algorithmic thinking?</p>
                    <div className="space-y-2">
                      {["To write code faster", "To break down problems systematically", "To memorize syntax", "To use frameworks"].map((option, i) => (
                        <label key={i} className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-muted cursor-pointer">
                          <input type="radio" name="q1" className="w-4 h-4" />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <Button>Submit Quiz</Button>
                </div>
              </Card>
            )}

            {lesson.type === "project" && (
              <Card className="p-8 mb-6">
                <h2 className="text-2xl font-bold mb-4">Mini Project</h2>
                <p className="text-muted-foreground mb-6">
                  Design an algorithm to solve a real-world problem of your choice. 
                  Upload your flowchart and pseudocode.
                </p>
                <div className="space-y-4">
                  <Textarea placeholder="Describe your approach..." className="min-h-32" />
                  <Button variant="outline">Upload Files</Button>
                  <Button>Submit Project</Button>
                </div>
              </Card>
            )}

            {/* Lesson Description */}
            <Card className="p-6 mb-6">
              <h3 className="font-bold text-xl mb-3">About this lesson</h3>
              <p className="text-muted-foreground">
                In this lesson, you'll learn the fundamental concepts and get hands-on practice 
                with real-world examples.
              </p>
            </Card>

            {/* Navigation */}
            <div className="flex gap-4">
              {prevLesson && (
                <Button
                  variant="outline"
                  onClick={() => navigate(`/course/${courseId}/lesson/${prevLesson.id}`)}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous Lesson
                </Button>
              )}
              <Button
                onClick={() => {/* Mark complete logic */}}
                className="gap-2 ml-auto"
              >
                <CheckCircle className="w-4 h-4" />
                Mark Complete
              </Button>
              {nextLesson && (
                <Button
                  onClick={() => navigate(`/course/${courseId}/lesson/${nextLesson.id}`)}
                  className="gap-2"
                >
                  Next Lesson
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </main>

        {/* Right Sidebar - Notes & Discussion */}
        <aside className="w-96 border-l border-border h-[calc(100vh-73px)] overflow-y-auto p-6">
          <div className="mb-6">
            <h3 className="font-bold mb-3">My Notes</h3>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Take notes while learning..."
              className="min-h-48"
            />
          </div>

          <div>
            <h3 className="font-bold mb-3">Discussion</h3>
            <div className="space-y-4">
              <Card className="p-4">
                <p className="text-sm font-medium mb-1">John Doe</p>
                <p className="text-sm text-muted-foreground">
                  Great explanation! This really helped me understand the concept.
                </p>
                <p className="text-xs text-muted-foreground mt-2">2 days ago</p>
              </Card>
              <Textarea placeholder="Add a comment..." className="min-h-24" />
              <Button size="sm">Post Comment</Button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default LessonPage;
