import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Forbidden from "./pages/Forbidden";
import StudentDashboard from "./pages/student/Dashboard";
import InstructorDashboard from "./pages/instructor/Dashboard";
import CourseCreate from "./pages/instructor/CourseCreate";
import AdminDashboard from "./pages/admin/Dashboard";
import CoursePage from "./pages/course/CoursePage";
import LessonPage from "./pages/course/LessonPage";
import PreBootcamp from "./pages/PreBootcamp";
import Checkout from "./pages/payment/Checkout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { AuthProvider } from "@/context/AuthContext";
import IntCourses from "@/pages/instructor/Courselist";
import IntStudents from "@/pages/instructor/Student"
import StudentCourses from "@/pages/student/Courses"
import StudentLessons from "@/pages/student/Lesson"



const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/403" element={<Forbidden />} />

          
          {/* Student Routes */}
         {/* <Route path="/student/dashboard" element={<StudentDashboard />} />*/}
          <Route
            path="/student/dashboard"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/student/courses"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <StudentCourses />
              </ProtectedRoute>
            }
          />

        <Route
          path="/student/lessons/:coursId"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentLessons />
            </ProtectedRoute>
          }
        />


          
          
          {/* Instructor Routes */}
         {/* <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
          <Route path="/instructor/courses/new" element={<CourseCreate />} />
          <Route path="/instructor/courses/:id/edit" element={<CourseCreate />} />*/}

          <Route
            path="/instructor/dashboard"
            element={
              <ProtectedRoute allowedRoles={["instructor"]}>
                <InstructorDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/instructor/courses/new"
            element={
              <ProtectedRoute allowedRoles={["instructor"]}>
                <CourseCreate />
              </ProtectedRoute>
            }
          />

          <Route
            path="/instructor/courses/:id/edit"
            element={
              <ProtectedRoute allowedRoles={["instructor"]}>
                <CourseCreate />
              </ProtectedRoute>
            }
          />

          <Route
            path="/instructor/courses"
            element={
              <ProtectedRoute allowedRoles={["instructor"]}>
                <IntCourses />
              </ProtectedRoute>
            }
          />

            <Route
              path="/instructor/students"
              element={
                <ProtectedRoute allowedRoles={["instructor"]}>
                  <IntStudents />
                </ProtectedRoute>
              }
            />



          
          
          {/* Admin Routes */}
          {/*<Route path="/admin/dashboard" element={<AdminDashboard />} />*/}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          
          {/* Course Routes */}
          <Route path="/course/:courseId" element={<CoursePage />} />
          <Route path="/course/:courseId/lesson/:lessonId" element={<LessonPage />} />
          
          {/* Pre-Bootcamp */}
          <Route path="/pre-bootcamp" element={<PreBootcamp />} />
          
          {/* Payment */}
          <Route path="/payment/checkout/:courseId" element={<Checkout />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
