import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ProgressBar";
import { preBootcampCourse } from "@/data/mockData";
import { ArrowLeft, Play, CheckCircle, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "@/components/NavLink";

const PreBootcamp = () => {
  const navigate = useNavigate();
  const completedCount = 2; // Mock completed lessons
  const progress = (completedCount / preBootcampCourse.lessons.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate("/")} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
            <NavLink to="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              CodeCraft Academy
            </NavLink>
            <div className="w-24" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12 max-w-5xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">{preBootcampCourse.title}</h1>
          <p className="text-xl text-muted-foreground mb-6">{preBootcampCourse.description}</p>
          <div className="max-w-md mx-auto">
            <ProgressBar progress={progress} />
          </div>
        </div>

        {/* Benefits */}
        <Card className="p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">What You'll Learn</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex gap-3">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="font-medium">Problem-Solving Fundamentals</p>
                <p className="text-sm text-muted-foreground">Understand what problems really are</p>
              </div>
            </div>
            <div className="flex gap-3">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="font-medium">Computational Thinking</p>
                <p className="text-sm text-muted-foreground">Learn how computers process information</p>
              </div>
            </div>
            <div className="flex gap-3">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="font-medium">Solution Design</p>
                <p className="text-sm text-muted-foreground">Break down complex solutions step-by-step</p>
              </div>
            </div>
            <div className="flex gap-3">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="font-medium">Programming Mindset</p>
                <p className="text-sm text-muted-foreground">Develop the thinking patterns of a programmer</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Lessons */}
        <div className="space-y-4 mb-12">
          <h2 className="text-2xl font-bold">Course Lessons</h2>
          {preBootcampCourse.lessons.map((lesson, index) => (
            <Card key={lesson.id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  {index < completedCount ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : (
                    <Play className="w-6 h-6 text-primary" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{lesson.title}</h3>
                  <p className="text-sm text-muted-foreground">{lesson.duration} • {lesson.type}</p>
                </div>
                <Button variant={index < completedCount ? "outline" : "default"}>
                  {index < completedCount ? "Review" : "Start"}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <Card className="p-12 text-center bg-gradient-to-r from-primary/10 to-accent/10">
          <Award className="w-16 h-16 mx-auto mb-4 text-primary" />
          <h2 className="text-3xl font-bold mb-4">Ready for More?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Complete the pre-bootcamp to unlock your certificate and get exclusive access 
            to our full bootcamp program with advanced courses and personalized mentorship.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={() => navigate("/signup")}>
              Join Full Bootcamp
            </Button>
            <Button size="lg" variant="outline">
              Download Certificate
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PreBootcamp;
