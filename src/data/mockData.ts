// Mock data for the application

export const mockCourses = [
  {
    id: "1",
    title: "Algorithmic Thinking & Problem Solving",
    description: "Master the art of breaking down complex problems into manageable solutions",
    instructor: "Dr. Sarah Chen",
    instructorId: "inst-1",
    price: 49.99,
    isFree: false,
    thumbnail: "/src/assets/course-algorithms.jpg",
    rating: 4.8,
    students: 1234,
    duration: "12 weeks",
    level: "Beginner",
    tags: ["Algorithms", "Problem Solving", "Logic"],
    modules: [
      {
        id: "m1",
        title: "Introduction to Problem Solving",
        lessons: [
          { id: "l1", title: "What Is a Problem?", duration: "15 min", type: "video", completed: true },
          { id: "l2", title: "Understanding Inputs and Outputs", duration: "20 min", type: "video", completed: false },
          { id: "l3", title: "Quiz: Problem Basics", duration: "10 min", type: "quiz", completed: false }
        ]
      },
      {
        id: "m2",
        title: "Algorithm Design",
        lessons: [
          { id: "l4", title: "Flowcharts & Pseudocode", duration: "25 min", type: "video", completed: false },
          { id: "l5", title: "Practice: Design Your First Algorithm", duration: "30 min", type: "project", completed: false }
        ]
      }
    ]
  },
  {
    id: "2",
    title: "Web Development Fundamentals",
    description: "Build modern, responsive websites from scratch",
    instructor: "John Martinez",
    instructorId: "inst-2",
    price: 59.99,
    isFree: false,
    thumbnail: "/src/assets/course-webdev.jpg",
    rating: 4.9,
    students: 2156,
    duration: "16 weeks",
    level: "Beginner",
    tags: ["Web Development", "HTML", "CSS", "JavaScript"],
    modules: []
  },
  {
    id: "3",
    title: "AI Foundations",
    description: "Understand the principles behind artificial intelligence",
    instructor: "Dr. Emily Watson",
    instructorId: "inst-1",
    price: 79.99,
    isFree: false,
    thumbnail: "/src/assets/course-ai.jpg",
    rating: 4.7,
    students: 987,
    duration: "10 weeks",
    level: "Intermediate",
    tags: ["AI", "Machine Learning", "Data Science"],
    modules: []
  }
];

export const mockEnrollments = [
  {
    id: "e1",
    userId: "user-1",
    courseId: "1",
    progress: 35,
    enrolledDate: "2024-01-15",
    lastAccessed: "2024-03-10",
    completedLessons: ["l1"]
  },
  {
    id: "e2",
    userId: "user-1",
    courseId: "2",
    progress: 12,
    enrolledDate: "2024-02-20",
    lastAccessed: "2024-03-08",
    completedLessons: []
  }
];

export const mockInstructorStats = {
  totalStudents: 3421,
  totalRevenue: 42567.89,
  activeCourses: 3,
  avgRating: 4.8,
  monthlyEarnings: [
    { month: "Jan", revenue: 4200 },
    { month: "Feb", revenue: 5100 },
    { month: "Mar", revenue: 6800 },
    { month: "Apr", revenue: 7200 },
    { month: "May", revenue: 8900 },
    { month: "Jun", revenue: 10400 }
  ]
};

export const mockAdminStats = {
  totalUsers: 12456,
  totalInstructors: 234,
  totalCourses: 567,
  totalRevenue: 234567.89,
  pendingCourses: 12,
  activeUsers: 8934,
  monthlySignups: [
    { month: "Jan", count: 450 },
    { month: "Feb", count: 580 },
    { month: "Mar", count: 720 },
    { month: "Apr", count: 890 },
    { month: "May", count: 1100 },
    { month: "Jun", count: 1340 }
  ]
};

export const mockTestimonials = [
  {
    id: "t1",
    name: "Alex Johnson",
    role: "Student",
    avatar: "AJ",
    content: "I built my first interactive game in Scratch thanks to this bootcamp!",
    rating: 5
  },
  {
    id: "t2",
    name: "Maria Garcia",
    role: "Student",
    avatar: "MG",
    content: "Finally understood algorithms and can think like a programmer.",
    rating: 5
  },
  {
    id: "t3",
    name: "David Kim",
    role: "Career Changer",
    avatar: "DK",
    content: "This course helped me transition from sales to software development.",
    rating: 5
  }
];

export const preBootcampCourse = {
  id: "pre-bootcamp",
  title: "Free Pre-Bootcamp: Think Like a Programmer",
  description: "Entry-level introduction to our unique problem-solving approach",
  isFree: true,
  lessons: [
    { id: "pb1", title: "Lesson 1.1: What Is a Problem?", duration: "12 min", type: "video" },
    { id: "pb2", title: "Lesson 1.2: How Computers Interpret Problems", duration: "15 min", type: "video" },
    { id: "pb3", title: "Lesson 1.3: Breaking Down Solutions", duration: "18 min", type: "video" },
    { id: "pb4", title: "Lesson 1.4: Thinking Like a Programmer", duration: "20 min", type: "video" }
  ]
};
