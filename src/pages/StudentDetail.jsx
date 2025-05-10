import { useParams, useLocation } from "wouter"
import { Navbar } from "@/components/Navbar"
import { Sidebar } from "@/components/Sidebar"
import { MobileNav } from "@/components/MobileNav"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  ArrowLeft,
  User,
  Mail,
  Calendar,
  BookOpen,
  Award,
  Clock,
  FileText,
  Edit,
  Trash
} from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { useCourses } from "@/lib/courseData"
import { useAuth } from "@/hooks/useAuth"
import { fetchStudents } from "@/lib/mockApi" // adjust this import path

export default function StudentDetail() {
  const { id } = useParams()
  const [, navigate] = useLocation()
  const { user } = useAuth()

  // Get student data
  const { data: student, isLoading: isStudentLoading } = useQuery({
    queryKey: ["students"],
    queryFn: fetchStudents,
    refetchOnWindowFocus: false
  })

  // Get courses data (for additional information)
  const { data: courses = [] } = useCourses()

  // Generate mock attendance data for the student
  const attendanceData = [
    { date: "2023-09-05", status: "Present" },
    { date: "2023-09-07", status: "Present" },
    { date: "2023-09-12", status: "Absent" },
    { date: "2023-09-14", status: "Present" },
    { date: "2023-09-19", status: "Present" },
    { date: "2023-09-21", status: "Late" },
    { date: "2023-09-26", status: "Present" },
    { date: "2023-09-28", status: "Present" }
  ]

  // Generate mock grades data for the student
  const gradesData = [
    { assignment: "Quiz 1", grade: "85/100", submitted: "2023-09-10" },
    { assignment: "Homework 1", grade: "92/100", submitted: "2023-09-15" },
    {
      assignment: "Project Proposal",
      grade: "88/100",
      submitted: "2023-09-22"
    },
    { assignment: "Midterm Exam", grade: "79/100", submitted: "2023-10-05" },
    { assignment: "Quiz 2", grade: "90/100", submitted: "2023-10-12" },
    { assignment: "Research Paper", grade: "94/100", submitted: "2023-10-25" }
  ]

  // Find the course details
  const courseDetails = student
    ? courses.find(c => c.title === student.course)
    : null

  // Handle back navigation
  const handleBack = () => {
    navigate("/students")
  }

  // Handle edit student (would open edit modal in a real app)
  const handleEdit = () => {
    if (!user) {
      // Would prompt login in a real implementation
      alert("Please log in to edit student information")
      return
    }
    alert("Edit functionality would be implemented here")
  }

  // Handle delete student (would confirm deletion in a real app)
  const handleDelete = () => {
    if (!user) {
      // Would prompt login in a real implementation
      alert("Please log in to delete a student")
      return
    }
    alert("Delete functionality would be implemented here")
  }

  return (
    <div className="h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 relative overflow-y-auto">
        <Sidebar />

        <main className="flex-1 md:pl-64">
          <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            {/* Header with Back Button */}
            <div className="mb-6 flex items-center">
              <Button variant="ghost" onClick={handleBack} className="mr-4 p-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                  {isStudentLoading ? (
                    <Skeleton className="h-8 w-48" />
                  ) : (
                    student?.name || "Student Details"
                  )}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Student profile and academic information
                </p>
              </div>
            </div>

            {isStudentLoading ? (
              // Loading skeleton
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow">
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <Skeleton className="h-32 w-32 rounded-full" />
                      <div className="flex-1 space-y-4">
                        <Skeleton className="h-6 w-1/3" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-1/4" />
                        <div className="flex gap-4 mt-4">
                          <Skeleton className="h-10 w-20" />
                          <Skeleton className="h-10 w-20" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Skeleton className="h-96 w-full rounded-lg" />
              </div>
            ) : (
              <>
                {/* Student Profile Card */}
                <Card className="mb-6">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Avatar */}
                      <div className="flex-shrink-0">
                        <div className="relative h-32 w-32 rounded-full overflow-hidden bg-gray-100">
                          {student?.avatar ? (
                            <img
                              src={student.avatar}
                              alt={student.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full w-full bg-primary-100 text-primary-600">
                              <User className="h-16 w-16" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Profile Info */}
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900">
                              {student?.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              ID: {student?.id}
                            </p>
                          </div>
                          <Badge
                            className={
                              student?.status === "Active"
                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                : student?.status === "On Leave"
                                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                : "bg-red-100 text-red-800 hover:bg-red-100"
                            }
                          >
                            {student?.status}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 text-gray-500 mr-2" />
                            <span className="text-sm">{student?.email}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                            <span className="text-sm">
                              Enrolled: {student?.enrollmentDate}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <BookOpen className="h-4 w-4 text-gray-500 mr-2" />
                            <span className="text-sm">
                              Course: {student?.course}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Award className="h-4 w-4 text-gray-500 mr-2" />
                            <span className="text-sm">GPA: {student?.gpa}</span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 mt-6">
                          <Button variant="outline" onClick={handleEdit}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            onClick={handleDelete}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash className="h-4 w-4 mr-2" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Tabs for different sections */}
                <Tabs defaultValue="academic" className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="academic">Academic Info</TabsTrigger>
                    <TabsTrigger value="attendance">Attendance</TabsTrigger>
                    <TabsTrigger value="grades">Grades</TabsTrigger>
                  </TabsList>

                  {/* Academic Info Tab */}
                  <TabsContent value="academic">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Academic Information
                        </CardTitle>
                        <CardDescription>
                          Course details and academic standing
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {/* Course Details */}
                          <div>
                            <h4 className="text-md font-semibold mb-3">
                              Course Details
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-md border p-4">
                              <div>
                                <p className="text-sm font-medium text-gray-500">
                                  Course
                                </p>
                                <p className="text-sm text-gray-900">
                                  {student?.course}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-500">
                                  Instructor
                                </p>
                                <p className="text-sm text-gray-900">
                                  {courseDetails?.instructor || "Not available"}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-500">
                                  Duration
                                </p>
                                <p className="text-sm text-gray-900">
                                  {courseDetails?.duration || "Not available"}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-500">
                                  Status
                                </p>
                                <p className="text-sm text-gray-900">
                                  {courseDetails?.status || "Not available"}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Academic Standing */}
                          <div>
                            <h4 className="text-md font-semibold mb-3">
                              Academic Standing
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <Card>
                                <CardContent className="p-5">
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                                      <Award className="text-blue-600 h-5 w-5" />
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                      <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">
                                          Overall GPA
                                        </dt>
                                        <dd>
                                          <div className="text-lg font-semibold text-gray-900">
                                            {student?.gpa}
                                          </div>
                                        </dd>
                                      </dl>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>

                              <Card>
                                <CardContent className="p-5">
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                                      <Clock className="text-green-600 h-5 w-5" />
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                      <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">
                                          Attendance Rate
                                        </dt>
                                        <dd>
                                          <div className="text-lg font-semibold text-gray-900">
                                            {Math.round(
                                              (attendanceData.filter(
                                                a => a.status === "Present"
                                              ).length /
                                                attendanceData.length) *
                                                100
                                            )}
                                            %
                                          </div>
                                        </dd>
                                      </dl>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>

                              <Card>
                                <CardContent className="p-5">
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 bg-amber-100 rounded-md p-3">
                                      <FileText className="text-amber-600 h-5 w-5" />
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                      <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">
                                          Assignments
                                        </dt>
                                        <dd>
                                          <div className="text-lg font-semibold text-gray-900">
                                            {gradesData.length} Completed
                                          </div>
                                        </dd>
                                      </dl>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Attendance Tab */}
                  <TabsContent value="attendance">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Attendance Record
                        </CardTitle>
                        <CardDescription>
                          Class attendance history
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Date</TableHead>
                              <TableHead>Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {attendanceData.map((record, index) => (
                              <TableRow key={index}>
                                <TableCell>
                                  {new Date(record.date).toLocaleDateString(
                                    "en-US",
                                    {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric"
                                    }
                                  )}
                                </TableCell>
                                <TableCell>
                                  <Badge
                                    variant="outline"
                                    className={
                                      record.status === "Present"
                                        ? "bg-green-100 text-green-800"
                                        : record.status === "Late"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-red-100 text-red-800"
                                    }
                                  >
                                    {record.status}
                                  </Badge>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Grades Tab */}
                  <TabsContent value="grades">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Grades & Assignments
                        </CardTitle>
                        <CardDescription>
                          Academic performance and submissions
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Assignment</TableHead>
                              <TableHead>Grade</TableHead>
                              <TableHead>Submitted</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {gradesData.map((record, index) => (
                              <TableRow key={index}>
                                <TableCell className="font-medium">
                                  {record.assignment}
                                </TableCell>
                                <TableCell>{record.grade}</TableCell>
                                <TableCell>
                                  {new Date(
                                    record.submitted
                                  ).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric"
                                  })}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                      <CardFooter className="border-t p-4">
                        <div className="flex items-center justify-between w-full">
                          <span className="text-sm text-gray-500">
                            Overall Average:
                          </span>
                          <span className="font-semibold">
                            {Math.round(
                              gradesData.reduce((sum, item) => {
                                const score = parseInt(item.grade.split("/")[0])
                                return sum + score
                              }, 0) / gradesData.length
                            )}
                            /100
                          </span>
                        </div>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                </Tabs>
            
              </>
              
            )}
            
          </div>
        </main>
      </div>
    </div>
  )
}
