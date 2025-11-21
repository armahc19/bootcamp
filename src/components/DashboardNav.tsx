import { NavLink } from "@/components/NavLink";
import { Home, BookOpen, User, Settings, LogOut, LayoutDashboard, Video, DollarSign, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

interface DashboardNavProps {
  role: "student" | "instructor" | "admin";
}

export const DashboardNav = ({ role }: DashboardNavProps) => {
  const getLinks = () => {
    switch (role) {
      case "student":
        return [
          { to: "/student/dashboard", icon: LayoutDashboard, label: "Dashboard" },
          { to: "/student/courses", icon: BookOpen, label: "My Courses" },
          { to: "/student/certificates", icon: Video, label: "Certificates" },
          { to: "/student/profile", icon: User, label: "Profile" }
        ];
      case "instructor":
        return [
          { to: "/instructor/dashboard", icon: LayoutDashboard, label: "Dashboard" },
          { to: "/instructor/courses", icon: BookOpen, label: "My Courses" },
          { to: "/instructor/students", icon: Users, label: "Students" },
          { to: "/instructor/projects", icon: Projector, label: "Projects"},
          { to: "/instructor/profile", icon: User, label: "Profile" }
        ];
      case "admin":
        return [
          { to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
          { to: "/admin/courses", icon: BookOpen, label: "Courses" },
          { to: "/admin/users", icon: Users, label: "Users" },
          { to: "/admin/transactions", icon: DollarSign, label: "Transactions" },
          { to: "/admin/settings", icon: Settings, label: "Settings" }
        ];
    }
  };

  const links = getLinks();
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");  // redirect to login
  };

  return (
    <nav className="min-h-screen w-64 bg-background border-r border-border p-6">
      <div className="mb-8">
        <NavLink to="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          CodeCraft
        </NavLink>
        <p className="text-sm text-muted-foreground mt-1 capitalize">{role} Portal</p>
      </div>

      <div className="space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
            activeClassName="bg-primary/10 text-primary font-medium"
          >
            <link.icon className="w-5 h-5" />
            <span>{link.label}</span>
          </NavLink>
        ))}
      </div>

      <div className="mt-auto pt-8 border-t border-border">
        <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground" onClick={handleLogout}>
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </Button>
      </div>
    </nav>
  );
};
