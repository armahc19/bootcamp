import { DashboardNav } from "@/components/DashboardNav";
import { StatsCard } from "@/components/StatsCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockAdminStats, mockCourses } from "@/data/mockData";
import { Users, BookOpen, DollarSign, TrendingUp, CheckCircle, Clock } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardNav role="admin" />
      
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Platform overview and management</p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <StatsCard 
              title="Total Users" 
              value={mockAdminStats.totalUsers.toLocaleString()} 
              icon={Users}
              trend="+15% this month"
              trendUp
            />
            <StatsCard 
              title="Active Courses" 
              value={mockAdminStats.totalCourses} 
              icon={BookOpen}
              trend="+8% this month"
              trendUp
            />
            <StatsCard 
              title="Total Revenue" 
              value={`$${mockAdminStats.totalRevenue.toLocaleString()}`} 
              icon={DollarSign}
              trend="+22% this month"
              trendUp
            />
            <StatsCard 
              title="Pending Reviews" 
              value={mockAdminStats.pendingCourses} 
              icon={Clock}
            />
          </div>

          {/* Signups Chart */}
          <Card className="p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Monthly Signups</h2>
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div className="h-64 flex items-end justify-between gap-4">
              {mockAdminStats.monthlySignups.map((data) => (
                <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-accent/20 rounded-t-lg relative" style={{ height: `${(data.count / 1500) * 100}%` }}>
                    <div className="absolute -top-8 left-0 right-0 text-center text-sm font-medium">
                      {data.count}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{data.month}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Pending Course Approvals */}
          <Card className="p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Pending Course Approvals</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course Title</TableHead>
                  <TableHead>Instructor</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockCourses.slice(0, 3).map((course) => (
                  <TableRow key={course.id}>
                    <TableCell className="font-medium">{course.title}</TableCell>
                    <TableCell>{course.instructor}</TableCell>
                    <TableCell>2 days ago</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" className="gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Approve
                        </Button>
                        <Button size="sm" variant="outline">Review</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          {/* Recent Transactions */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { user: "Alice Johnson", course: "Web Development", amount: "$59.99", date: "Today", status: "Completed" },
                  { user: "Bob Smith", course: "AI Foundations", amount: "$79.99", date: "Yesterday", status: "Completed" },
                  { user: "Carol White", course: "Algorithms", amount: "$49.99", date: "2 days ago", status: "Pending" }
                ].map((tx, i) => (
                  <TableRow key={i}>
                    <TableCell>{tx.user}</TableCell>
                    <TableCell>{tx.course}</TableCell>
                    <TableCell className="font-medium">{tx.amount}</TableCell>
                    <TableCell>{tx.date}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        tx.status === "Completed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {tx.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
