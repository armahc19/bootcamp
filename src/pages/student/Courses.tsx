import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { DashboardNav } from "@/components/DashboardNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";



const StudentCourses = () => {
  const navigate = useNavigate();

  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState<string | null>(null);

  const { user } = useAuth(); // Firebase user

  const fetchCourses = async () => {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setCourses(data);
    setLoading(false);
  };
  
  const handleEnroll = async (courseId: string) => {
    const auth = getAuth();
    const user = auth.currentUser

    if (!user) return alert("You must be logged in");
    setEnrolling(courseId);
  
    const { error } = await supabase
      .from("enrollments")
      .insert({ student_id: user.uid, course_id: courseId })
      .select();
  
    setEnrolling(null);
  
    if (error) {
      // If the enrollment already exists, redirect directly
      if (error.code === "23505") {
        console.log("Already enrolled, redirecting...");
        navigate(`/student/lessons/${courseId}`);
        return;
      }
      console.error(error);
      alert("Enrollment failed!");
      return;
    }
  
    // Enrollment successful
    alert("Enrolled successfully!");
    navigate(`student/lessons/${courseId}`);
  };
  
  

  {/*const handleEnroll = async (courseId: string) => {
    if (!user) return alert("You must be logged in");

    setEnrolling(courseId);

    const { error } = await supabase.from("enrollments").insert({
      student_id: user.uid,
      course_id: courseId,
    });

    setEnrolling(null);

    if (error) {
      console.error(error);
      alert("Enrollment failed!");
    } else {
      alert("Enrolled successfully!");
    }
  };*/}

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardNav role="student" />

      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Available Courses</h1>

        {loading ? (
          <p>Loading courses...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                {course.thumbnail_url && (
                  <img
                    src={course.thumbnail_url}
                    alt={course.title}
                    className="h-48 w-full object-cover"
                  />
                )}

                <CardHeader>
                  <CardTitle>{course.title}</CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    {course.description?.slice(0, 120)}...
                  </p>

                 {/* <p className="font-semibold mb-4">
                    Price: {course.price ? `$${course.price}` : "Free"}
                  </p>*/}

                  <Button
                    className="w-full"
                    disabled={enrolling === course.id}
                    onClick={() => handleEnroll(course.id)}
                  >
                    {enrolling === course.id ? "Enrolling..." : "Enroll"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default StudentCourses;
