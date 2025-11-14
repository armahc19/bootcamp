import { Button } from "@/components/ui/button";
import { CategoryCard } from "@/components/CategoryCard";
import { CourseCard } from "@/components/CourseCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { Brain, Code, Bot, Network, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";
import courseAlgorithms from "@/assets/course-algorithms.jpg";
import courseWebDev from "@/assets/course-webdev.jpg";
import courseAI from "@/assets/course-ai.jpg";
import courseSystem from "@/assets/course-system.jpg";

const Index = () => {
  const categories = [
    {
      icon: Brain,
      title: "Problem-Solving Fundamentals",
      description: "Master the art of breaking down complex problems into manageable solutions"
    },
    {
      icon: Code,
      title: "Web Development",
      description: "Build modern, responsive websites from scratch with HTML, CSS, and JavaScript"
    },
    {
      icon: Bot,
      title: "AI Foundations",
      description: "Understand artificial intelligence concepts and implement basic AI solutions"
    },
    {
      icon: Network,
      title: "System Design",
      description: "Learn to architect scalable systems and understand software architecture patterns"
    }
  ];

  const featuredCourses = [
    {
      image: courseAlgorithms,
      title: "Algorithmic Thinking & Problem Solving",
      instructor: "Dr. Sarah Johnson",
      rating: 4.9
    },
    {
      image: courseWebDev,
      title: "Full-Stack Web Development",
      instructor: "Mark Anderson",
      rating: 4.8
    },
    {
      image: courseAI,
      title: "AI & Machine Learning Basics",
      instructor: "Prof. David Chen",
      rating: 4.7
    },
    {
      image: courseSystem,
      title: "System Design & Architecture",
      instructor: "Emily Rodriguez",
      rating: 4.8
    }
  ];

  const testimonials = [
    {
      quote: "I built my first interactive game in Scratch thanks to this bootcamp!",
      author: "Alex Thompson",
      role: "Student, Pre-Bootcamp Graduate"
    },
    {
      quote: "Finally understood algorithms and can think like a programmer.",
      author: "Maria Garcia",
      role: "Web Developer"
    },
    {
      quote: "The step-by-step approach made coding accessible and fun!",
      author: "James Wilson",
      role: "Career Switcher"
    }
  ];

  const courseFeatures = [
    "Understand real-world problems",
    "Identify inputs, outputs, and edge cases",
    "Learn flowcharting and pseudocode",
    "Build mini-projects from scratch"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-hero-gradient bg-clip-text text-transparent">
              CodeCraft Academy
            </h1>
            <div className="flex gap-4">
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        className="relative py-24 md:py-32 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Learn to Think Like a Programmer.<br />Create from Scratch.
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Zero to Creator: Build real skills, solve problems, and launch projects from scratch.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/pre-bootcamp">
              <Button size="lg" className="text-lg px-8">
                Start Free Pre-Bootcamp
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 backdrop-blur text-white border-white hover:bg-white hover:text-foreground">
              Explore Courses
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Master Key Programming Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <CategoryCard key={index} {...category} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Featured Courses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCourses.map((course, index) => (
              <CourseCard key={index} {...course} />
            ))}
          </div>
        </div>
      </section>

      {/* Course Preview Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <img 
                  src={courseAlgorithms} 
                  alt="Algorithmic Thinking Course"
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-4 text-foreground">
                  Algorithmic Thinking & Problem Solving
                </h2>
                <p className="text-muted-foreground mb-6">
                  Learn how to break problems, design algorithms, draw flowcharts, and write pseudocode. 
                  Build a strong foundation in computational thinking.
                </p>
                <div className="space-y-3 mb-6">
                  {courseFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4">
                  <Link to="/pre-bootcamp">
                    <Button>Start Free Pre-Bootcamp</Button>
                  </Link>
                  <Button variant="outline">Enroll in Full Course</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Student Success Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-hero-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Think. Solve. Create.
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Pre-Bootcamp available for free — start your journey today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/pre-bootcamp">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Start Free Pre-Bootcamp
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 backdrop-blur text-white border-white hover:bg-white hover:text-foreground">
              Enroll in Full Bootcamp
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 CodeCraft Academy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
