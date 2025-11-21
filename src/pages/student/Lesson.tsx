import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useParams, useNavigate} from "react-router-dom";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const StudentLessons = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [projectText, setProjectText] = useState("");

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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate(`/student/courses`)} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Course
          </Button>
          <h1 className="font-bold text-lg">{course.title}</h1>
          <div className="w-24" />
        </div>
      </header>

      <div className="flex">
        {/* Main Content Area */}
        <main className="flex-1 p-8">

          {/* RIGHT SECTION → video player, description, project */}
          <div className="max-w-5xl mx-auto">

            {/* 🔥 Actual Video Player */}
            {course.video_url && (
              <Card className="mb-6 overflow-hidden">
                <video 
                  controls
                  className="w-full rounded"
                  src={course.video_url}
                />
              </Card>
            )}

            {/* Lesson Description */}
            <Card className="p-6 mb-6">
              <h3 className="font-bold text-xl mb-3">Description</h3>
              <p className="text-muted-foreground">{course.description}</p>
            </Card>

            {/* Project Section */}
            {course.mini_project && (
              <Card className="p-8 mb-6">
                <h2 className="text-2xl font-bold mb-4">Project Work</h2>
                <p className="text-muted-foreground mb-6">
                  <pre className="whitespace-pre-wrap text-sm">
                      {course.mini_project}
                      F
                  </pre>
                  F
                </p>

                <div className="space-y-4">
                {/*  <Textarea
                    value={projectText}
                    onChange={(e) => setProjectText(e.target.value)}
                    placeholder="Describe your project..."
                    className="min-h-32"
                  />*/}
                  <Button variant="outline">Upload Files</Button>
                  <Button>Submit Project</Button>
                  {/* Display score of the project */}
                </div>
              </Card>
            )}

            {/* Navigation */}
            <div className="flex gap-4">
              <Button className="gap-2 ml-auto">
                <CheckCircle className="w-4 h-4" />
                Mark Complete
              </Button> 
            </div>
          </div>
        </main>

        {/* RIGHT SIDEBAR → PDF Viewer + Discussion */}
        <aside className="w-96 border-l border-border h-[calc(100vh-73px)] overflow-y-auto p-6">

          {/* PDF Viewer */}
          {course.pdfUrl && (
            <div className="mb-8">
              <h3 className="font-bold mb-3">Lesson PDF</h3>
              <iframe
                src={course.pdfUrl}
                className="w-full h-[400px] rounded border"
              ></iframe>
            </div>
          )}

          {/* Discussion */}
          <div>
            <h3 className="font-bold mb-3">Discussion</h3>

            <div className="space-y-4">
              {/* Example comment */}
              <Card className="p-4">
                <p className="text-sm font-medium mb-1">John Doe</p>
                <p className="text-sm text-muted-foreground">
                  This explanation really helped me understand the concept.
                </p>
                <p className="text-xs text-muted-foreground mt-2">2 days ago</p>
              </Card>

              {/* Add comment */}
              <Textarea placeholder="Add a comment..." className="min-h-24" />
              <Button size="sm">Post Comment</Button>
            </div>
          </div>

        </aside>
      </div>
    </div>
  );
};

export default StudentLessons;
