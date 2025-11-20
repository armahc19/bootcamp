import { DashboardNav } from "@/components/DashboardNav";
import { StatsCard } from "@/components/StatsCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { mockInstructorStats, mockCourses } from "@/data/mockData";
import { Users, DollarSign, BookOpen, Star, Plus, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { Input } from "@/components/ui/input";
import { useEffect,useState } from "react";
import { supabase } from "@/supabase/supabase"; 


const IntCourses = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  const [courses, setCourses] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  {/*
  const instructorCourses = mockCourses.filter(c => c.instructorId === "inst-1");
  const [search, setSearch] = useState("");
  const filteredCourses = instructorCourses.filter(course =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );*/}

  // -------------------------------------
  // FETCH COURSES FROM SUPABASE
  // -------------------------------------
  useEffect(() => {
    const fetchCourses = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("instructor_id", user.uid);   // 🔥 IMPORTANT

      if (error) {
        console.error("Error fetching courses:", error);
      } else {
        setCourses(data || []);
      }

      setLoading(false);
    };

    fetchCourses();
  }, [user]);

  // -------------------------------------
  // SEARCH FILTER
  // -------------------------------------
  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );
  


  return (
    <div className="flex min-h-screen bg-background">
      <DashboardNav role="instructor" />
      
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-4xl font-bold mb-2">Instructor Courses</h3>
            </div>

            {/* search bar */}
            <div className="w-72">
            <Input
                placeholder="Search courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
                </div>


          </div>

            {/* LOADING STATE */}
            {loading && <p>Loading courses...</p>}

          {/* My Courses */}
          {/* COURSES LIST */}
          {!loading && (
            <section>
              <h2 className="text-2xl font-bold mb-6">My Courses</h2>

              {filteredCourses.length === 0 ? (
                <p>No courses found.</p>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {filteredCourses.map((course) => (
                    <Card
                      key={course.id}
                      className="p-6 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex gap-6">
                          {/* THUMBNAIL */}
                          <img
                            src={course.thumbnail_url}
                            className="w-48 h-32 rounded-md object-cover"
                            alt={course.title}
                          />

                        <div className="flex-1">
                          <h3 className="font-semibold text-xl mb-2">
                            {course.title}
                          </h3>
                          <p className="text-muted-foreground mb-4">
                            {course.description}
                          </p>

                          <div className="flex gap-6 text-sm text-muted-foreground">
                            <span>Level: {course.level}</span>
                            <span>Duration: {course.duration}</span>
                            <span>Tags: {course.tags?.length || 0}</span>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <Button
                            variant="outline"
                            onClick={() =>
                              navigate(`/instructor/courses/${course.id}/edit`)
                            }
                          >
                            Edit Course
                          </Button>
                          <Button variant="ghost">View Analytics</Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default IntCourses;
