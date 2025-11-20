import { DashboardNav } from "@/components/DashboardNav";
import { CourseCard } from "@/components/CourseCard";
import { ProgressBar } from "@/components/ProgressBar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { mockCourses, mockEnrollments } from "@/data/mockData";
import { Award, BookOpen, Clock, TrendingUp } from "lucide-react";
import { StatsCard } from "@/components/StatsCard";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  const enrolledCourses = mockEnrollments.map(enrollment => ({
    ...mockCourses.find(c => c.id === enrollment.courseId)!,
    progress: enrollment.progress,
    lastAccessed: enrollment.lastAccessed
  }));

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardNav role="student" />
      
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.displayName || "Student"}!</h1>
            <p className="text-muted-foreground">Continue your learning journey</p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <StatsCard title="Enrolled Courses" value={enrolledCourses.length} icon={BookOpen} />
            <StatsCard title="Completed" value="12" icon={Award} />
            <StatsCard title="Learning Hours" value="45.5" icon={Clock} />
            <StatsCard title="Streak Days" value="7" icon={TrendingUp} trend="+2 this week" trendUp />
          </div>

          {/* Continue Learning */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Continue Learning</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {enrolledCourses.map((course) => (
                <Card key={course.id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate(`/course/${course.id}`)}>
                  <div className="flex gap-4">
                    <img src={course.thumbnail} alt={course.title} className="w-32 h-32 rounded-lg object-cover" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{course.instructor}</p>
                      <ProgressBar progress={course.progress} size="sm" />
                      <Button size="sm" className="mt-3">
                        Resume Learning
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Recommended Courses */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Recommended for You</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockCourses.slice(2).map((course) => (
                <CourseCard key={course.id} {...course} image={course.thumbnail} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
