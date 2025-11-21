import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useParams, useNavigate} from "react-router-dom";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { FileText } from 'lucide-react';
import { getAuth } from "firebase/auth";

const StudentLessons = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [projectText, setProjectText] = useState("");
  const auth = getAuth();
  const user = auth.currentUser;

  // Define the interface for project score
interface ProjectScore {
  score: number;
  maxScore: number;
  feedback?: string;
  gradedDate: string;
}

// In your component, add the state with TypeScript typing
const [projectScore, setProjectScore] = useState<ProjectScore | null>({
  score: 0, // Example score - set to null if not graded
  maxScore: 100,
  feedback: "No submission",
  gradedDate: "2024-01-15"
});

  // Add this function to handle file upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;
    
      // Check if file is PDF
      if (file.type !== 'application/pdf') {
        alert('Please upload a PDF file');
        return;
      }

      try {
        // You need to get the actual student_id from your auth/enrollment system
        // This is a placeholder - replace with actual student ID
        const studentId = user?.uid;
    
        // Create a unique file name
        const fileExt = file.name.split('.').pop();
        const fileName = `${studentId}_${courseId}_${Date.now()}.${fileExt}`;
        const filePath = `project-submissions/${fileName}`;
    
        // Upload file to Supabase storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('projects')
          .upload(filePath, file);
    
        if (uploadError) {
          throw uploadError;
        }
    
        // Get the public URL
        const { data: urlData } = supabase.storage
          .from('projects')
          .getPublicUrl(filePath);
    
        // Insert or update project submission record (using upsert for unique constraint)
        const { data: projectData, error: projectError } = await supabase
          .from('project_submissions')
          .upsert([
            {
              course_id: courseId,
              student_id: studentId,
              file_url: urlData.publicUrl,
              file_path: filePath,
              submitted_at: new Date().toISOString(),
              status: 'submitted'
            }
          ])
          .select()
          .single();
    
        if (projectError) {
          throw projectError;
        }
    
        alert('Project submitted successfully!');
        
      } catch (error) {
        console.error('Error uploading project:', error);
        alert('Error uploading project. Please try again.');
      }
  
  };


  // Add state to track current submission
const [currentSubmission, setCurrentSubmission] = useState(null);

// Function to fetch current project submission
const fetchProjectSubmission = async () => {
  try {
    const studentId = "YOUR_STUDENT_ID_HERE"; // Replace with actual student ID
    
    const { data, error } = await supabase
      .from('project_submissions')
      .select('*')
      .eq('course_id', courseId)
      .eq('student_id', studentId)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
      throw error;
    }

    setCurrentSubmission(data || null);
    
    // If there's a submission with score, update projectScore state
    if (data && data.score !== null) {
      setProjectScore({
        score: data.score,
        maxScore: 100,
        feedback: data.feedback || '',
        gradedDate: data.graded_at || new Date().toISOString()
      });
    }
  } catch (error) {
    console.error('Error fetching project submission:', error);
  }
};

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
    if (courseId) {
      fetchProjectSubmission();
    }
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
  // Updated project section with file display
<Card className="p-8 mb-6">
  <h2 className="text-2xl font-bold mb-4">Project Work</h2>
  <p className="text-muted-foreground mb-6">
    <pre className="whitespace-pre-wrap text-sm">
      {course.mini_project}
    </pre>
  </p>

  <div className="space-y-4">
    {/* Hidden file input */}
    <input
      type="file"
      id="project-upload"
      accept=".pdf"
      onChange={handleFileUpload}
      className="hidden"
    />
    
    <div className="flex gap-4 items-center">
      <Button 
        variant="outline" 
        onClick={() => document.getElementById('project-upload')?.click()}
      >
        Upload PDF File
      </Button>
      
      {currentSubmission && (
        <div className="flex items-center gap-2 text-sm text-green-600">
          <FileText className="w-4 h-4" />
          <span>Submitted: {new Date(currentSubmission.submitted_at).toLocaleDateString()}</span>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => window.open(currentSubmission.file_url, '_blank')}
          >
            View Submission
          </Button>
        </div>
      )}
    </div>
    
    {/* Project Score Display Section */}
    <div className="mt-6 p-4 border rounded-lg bg-muted/50">
      <h3 className="text-lg font-semibold mb-3">Project Evaluation</h3>
      
      {projectScore ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Score:</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-green-600">
                {projectScore.score}/{projectScore.maxScore}
              </span>
              <div className="w-16 bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-green-600 h-2.5 rounded-full" 
                  style={{ 
                    width: `${(projectScore.score / projectScore.maxScore) * 100}%` 
                  }}
                ></div>
              </div>
            </div>
          </div>
          
          {projectScore.feedback && (
            <div>
              <span className="text-sm font-medium block mb-1">Feedback:</span>
              <p className="text-sm text-muted-foreground bg-white p-3 rounded border">
                {projectScore.feedback}
              </p>
            </div>
          )}
          
          <div className="text-xs text-muted-foreground">
            Graded on: {projectScore.gradedDate}
          </div>
        </div>
      ) : (
        <div className="text-center py-4">
          <div className="text-muted-foreground mb-2">
            <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
          </div>
          <p className="text-sm text-muted-foreground">
            {currentSubmission 
              ? "Your project is under review." 
              : "Your project has not been submitted yet."}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {currentSubmission 
              ? "Please wait for instructor evaluation." 
              : "Upload your PDF file to submit your project."}
          </p>
        </div>
      )}
    </div>
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
