import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useParams } from "react-router-dom";

const StudentLessons = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("courses")
        .select(`
          id,
          title,
          description,
          video_url,
          pdf_url,
          mini_project
        `)
        .eq("id", courseId)
        .single();

      if (error) {
        console.error("Error fetching course:", error);
        setLoading(false);
        return;
      }

      setCourse(data);
      setLoading(false);
    };

    fetchCourseDetails();
  }, [courseId]);

  if (loading) return <div>Loading course...</div>;
  if (!course) return <div>Course not found</div>;

  return (
    <div>
      <h1>{course.title}</h1>
      <p>{course.description}</p>

      {/* video preview */}
      {course.video_url && (
        <video src={course.video_url} controls className="w-full rounded mb-6" />
      )}

      {/* pdf preview */}
      {course.pdf_url && (
        <iframe
          src={course.pdf_url}
          className="w-full h-[600px] border rounded"
        />
      )}

      {/* mini project */}
      {course.mini_project && (
        <div className="p-4 border rounded mt-6">
          <h2 className="font-bold text-xl mb-2">Mini Project</h2>
          <p>{course.mini_project}</p>
        </div>
      )}

    </div>
  );
};

export default StudentLessons;
