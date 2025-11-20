import { DashboardNav } from "@/components/DashboardNav";
import { StatsCard } from "@/components/StatsCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { mockInstructorStats, mockCourses } from "@/data/mockData";
import { Users, DollarSign, BookOpen, Star, Plus, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

const InstructorDashboard = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;
  const instructorCourses = mockCourses.filter(c => c.instructorId === "inst-1");

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardNav role="instructor" />
      
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.displayName || "Intructor"}!</h1>
              <p className="text-muted-foreground">Manage your courses and track performance</p>
            </div>
            <Button onClick={() => navigate("/instructor/courses/new")} className="gap-2">
              <Plus className="w-5 h-5" />
              Create New Course
            </Button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <StatsCard 
              title="Total Students" 
              value={mockInstructorStats.totalStudents.toLocaleString()} 
              icon={Users} 
              trend="+12% this month"
              trendUp
            />
            <StatsCard 
              title="Total Revenue" 
              value={`$${mockInstructorStats.totalRevenue.toLocaleString()}`} 
              icon={DollarSign}
              trend="+8% this month"
              trendUp
            />
            <StatsCard 
              title="Active Courses" 
              value={mockInstructorStats.activeCourses} 
              icon={BookOpen} 
            />
            <StatsCard 
              title="Average Rating" 
              value={mockInstructorStats.avgRating} 
              icon={Star} 
            />
          </div>

          {/* Revenue Chart */}
          <Card className="p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Revenue Trends</h2>
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div className="h-64 flex items-end justify-between gap-4">
              {mockInstructorStats.monthlyEarnings.map((data) => (
                <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-primary/20 rounded-t-lg relative" style={{ height: `${(data.revenue / 12000) * 100}%` }}>
                    <div className="absolute -top-8 left-0 right-0 text-center text-sm font-medium">
                      ${(data.revenue / 1000).toFixed(1)}k
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{data.month}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* My Courses */}
          {/*
          <section>
            <h2 className="text-2xl font-bold mb-6">My Courses</h2>
            <div className="grid grid-cols-1 gap-4">
              {instructorCourses.map((course) => (
                <Card key={course.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex gap-6">
                    <img src={course.thumbnail} alt={course.title} className="w-48 h-32 rounded-lg object-cover" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl mb-2">{course.title}</h3>
                      <p className="text-muted-foreground mb-4">{course.description}</p>
                      <div className="flex gap-6 text-sm text-muted-foreground">
                        <span>{course.students} students</span>
                        <span>⭐ {course.rating}</span>
                        <span>${course.price}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button variant="outline" onClick={() => navigate(`/instructor/courses/${course.id}/edit`)}>
                        Edit Course
                      </Button>
                      <Button variant="ghost">View Analytics</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
          */}
        </div>
      </main>
    </div>
  );
};

export default InstructorDashboard;
