import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ProgressBar";
import { mockCourses, mockEnrollments } from "@/data/mockData";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Play, CheckCircle, Circle, Lock } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useState } from "react";

const CoursePage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = mockCourses.find(c => c.id === courseId);
  const enrollment = mockEnrollments.find(e => e.courseId === courseId);
  const [expandedModules, setExpandedModules] = useState<string[]>(["m1"]);

  if (!course) return <div>Course not found</div>;

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) ? prev.filter(id => id !== moduleId) : [...prev, moduleId]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/student/dashboard")} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div>
              <h1 className="font-bold text-lg">{course.title}</h1>
              <p className="text-sm text-muted-foreground">{course.instructor}</p>
            </div>
          </div>
          {enrollment && <ProgressBar progress={enrollment.progress} showLabel={false} />}
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Course Outline */}
        <aside className="w-96 border-r border-border h-[calc(100vh-73px)] overflow-y-auto p-6">
          <h2 className="font-bold text-xl mb-4">Course Content</h2>
          <div className="space-y-4">
            {course.modules.map((module) => (
              <div key={module.id} className="border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleModule(module.id)}
                  className="w-full p-4 text-left font-semibold hover:bg-muted transition-colors flex items-center justify-between"
                >
                  {module.title}
                  <span className="text-sm text-muted-foreground">
                    {module.lessons.length} lessons
                  </span>
                </button>
                
                {expandedModules.includes(module.id) && (
                  <div className="border-t border-border">
                    {module.lessons.map((lesson) => (
                      <NavLink
                        key={lesson.id}
                        to={`/course/${courseId}/lesson/${lesson.id}`}
                        className="flex items-center gap-3 p-4 hover:bg-muted transition-colors border-b border-border last:border-0"
                        activeClassName="bg-primary/10"
                      >
                        {lesson.completed ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : enrollment ? (
                          <Circle className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <Lock className="w-5 h-5 text-muted-foreground" />
                        )}
                        <div className="flex-1">
                          <p className="text-sm font-medium">{lesson.title}</p>
                          <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                        </div>
                        {lesson.type === "video" && <Play className="w-4 h-4 text-muted-foreground" />}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 mb-6">
              <h2 className="text-3xl font-bold mb-4">{course.title}</h2>
              <p className="text-muted-foreground mb-6">{course.description}</p>
              
              <div className="flex gap-4 mb-6">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  {course.level}
                </span>
                <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm">
                  {course.duration}
                </span>
                <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm">
                  {course.students} students
                </span>
              </div>

              {enrollment ? (
                <Button size="lg" className="gap-2">
                  <Play className="w-5 h-5" />
                  Continue Learning
                </Button>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">${course.price}</span>
                    <span className="text-muted-foreground">one-time payment</span>
                  </div>
                  <Button size="lg" onClick={() => navigate(`/payment/checkout/${courseId}`)}>
                    Enroll Now
                  </Button>
                </div>
              )}
            </Card>

            {/* About Instructor */}
            <Card className="p-8">
              <h3 className="text-xl font-bold mb-4">About the Instructor</h3>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                  {course.instructor.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-semibold">{course.instructor}</p>
                  <p className="text-sm text-muted-foreground">Course Instructor</p>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CoursePage;
