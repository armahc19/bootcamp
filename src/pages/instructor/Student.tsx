import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { DashboardNav } from "@/components/DashboardNav";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const IntStudents = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // filters
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");

  const fetchStudents = async () => {
    try {
      // query users collection for students only
      const q = query(collection(db, "users"), where("role", "==", "student"));
      const snap = await getDocs(q);
      const list = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setStudents(list);
      setFiltered(list);
    } catch (err) {
      console.error("Error fetching students:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // apply filtering
  useEffect(() => {
    let result = students;

    if (search.trim() !== "") {
      result = result.filter((s) =>
        s.name?.toLowerCase().includes(search.toLowerCase()) ||
        s.email?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (courseFilter !== "all") {
      result = result.filter((s) => s.courseName === courseFilter);
    }

    setFiltered(result);
  }, [search, courseFilter, students]);

  const courses = Array.from(new Set(students.map((s) => s.courseName)));

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardNav role="instructor" />

      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Students</h1>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-6">
          <Input
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64"
          />

          <Select onValueChange={(value) => setCourseFilter(value)} defaultValue="all">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              {courses.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : filtered.length === 0 ? (
          <p>No students found.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                {/*<TableHead>Course</TableHead>*/}
                <TableHead>Joined</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filtered.map((s) => (
                <TableRow key={s.id}>
                  <TableCell>{s.fullName}</TableCell>
                  <TableCell>{s.email}</TableCell>
                  {/*<TableCell>{s.courseName || "—"}</TableCell>*/}
                  <TableCell>
                    {s.createdAt?.toDate().toLocaleDateString() || "—"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </main>
    </div>
  );
};

export default IntStudents;
