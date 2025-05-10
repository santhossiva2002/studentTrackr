import { Navbar } from "@/components/Navbar"
import { Sidebar } from "@/components/Sidebar"
import { MobileNav } from "@/components/MobileNav"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Pie,
  PieChart,
  Cell,
  Legend
} from "recharts"
import { Skeleton } from "@/components/ui/skeleton"

import { useCourses } from "@/lib/courseData"

export default function Reports() {
  // Get courses data
  const { data: courses = [], isLoading: isCoursesLoading } = useCourses()

  // Generate data for enrollment trends using our course data
  const enrollmentData = [
    { month: "Jan", count: 35 },
    { month: "Feb", count: 45 },
    { month: "Mar", count: 60 },
    { month: "Apr", count: 53 },
    { month: "May", count: 48 },
    { month: "Jun", count: 52 },
    { month: "Jul", count: 40 },
    { month: "Aug", count: 65 },
    { month: "Sep", count: 78 },
    { month: "Oct", count: 70 },
    { month: "Nov", count: 63 },
    { month: "Dec", count: 58 }
  ]

  // Generate course distribution data from our courses
  const courseColors = [
    "#0ea5e9",
    "#8b5cf6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#ec4899",
    "#6366f1"
  ]

  const courseData = courses.map((course, index) => ({
    name: course.title.replace(/\s\d+$/, ""), // Remove course numbers
    value: course.students,
    color: courseColors[index % courseColors.length]
  }))

  // Sample data for performance metrics
  const performanceData = [
    { grade: "A", count: 45 },
    { grade: "B", count: 63 },
    { grade: "C", count: 52 },
    { grade: "D", count: 28 },
    { grade: "F", count: 15 }
  ]

  return (
    <div className="h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 relative overflow-y-auto">
        <Sidebar />

        <main className="flex-1 md:pl-64">
          <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            {/* Page Header */}
            <div className="mb-6 md:flex md:items-center md:justify-between">
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                  Reports & Analytics
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  View insights and statistics about students, courses, and
                  performance
                </p>
              </div>
            </div>

            {/* Analytics Summary */}
            <div className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
                        <svg
                          className="text-primary-600 h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 3v18h18"></path>
                          <path d="m19 9-5 5-4-4-3 3"></path>
                        </svg>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            Total Enrollment
                          </dt>
                          <dd>
                            <div className="text-lg font-semibold text-gray-900">
                              {isCoursesLoading ? (
                                <Skeleton className="h-6 w-12" />
                              ) : (
                                courses.reduce(
                                  (sum, course) => sum + course.students,
                                  0
                                )
                              )}
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
                      <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                        <svg
                          className="text-blue-600 h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect
                            width="18"
                            height="18"
                            x="3"
                            y="3"
                            rx="2"
                          ></rect>
                          <path d="M9 9h6v6H9z"></path>
                          <path d="M6 14h.01"></path>
                          <path d="M6 10h.01"></path>
                        </svg>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            Active Courses
                          </dt>
                          <dd>
                            <div className="text-lg font-semibold text-gray-900">
                              {isCoursesLoading ? (
                                <Skeleton className="h-6 w-12" />
                              ) : (
                                courses.filter(c => c.status === "Active")
                                  .length
                              )}
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
                        <svg
                          className="text-amber-600 h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
                        </svg>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            Avg Class Size
                          </dt>
                          <dd>
                            <div className="text-lg font-semibold text-gray-900">
                              {isCoursesLoading ? (
                                <Skeleton className="h-6 w-12" />
                              ) : courses.length > 0 ? (
                                Math.round(
                                  courses.reduce(
                                    (sum, course) => sum + course.students,
                                    0
                                  ) / courses.length
                                )
                              ) : (
                                0
                              )}
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Tabs defaultValue="enrollment" className="space-y-4">
              <TabsList>
                <TabsTrigger value="enrollment">Enrollment</TabsTrigger>
                <TabsTrigger value="courses">Courses</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
              </TabsList>

              <TabsContent value="enrollment">
                <Card>
                  <CardHeader>
                    <CardTitle>Student Enrollment Trends</CardTitle>
                    <CardDescription>
                      Monthly student enrollment over the past year
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-4">
                    {isCoursesLoading ? (
                      <div className="h-[300px] flex items-center justify-center">
                        <div className="space-y-4 w-full px-12">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-32 w-full" />
                          <Skeleton className="h-4 w-3/4 mx-auto" />
                        </div>
                      </div>
                    ) : (
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={enrollmentData}>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Bar
                              dataKey="count"
                              name="Students Enrolled"
                              fill="#0ea5e9"
                              radius={[4, 4, 0, 0]}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="courses">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Distribution</CardTitle>
                    <CardDescription>
                      Number of students enrolled in each course
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isCoursesLoading ? (
                      <div className="h-[300px] flex items-center justify-center">
                        <div className="space-y-4 w-full flex flex-col items-center">
                          <div className="rounded-full h-40 w-40 bg-gray-200 animate-pulse"></div>
                          <Skeleton className="h-4 w-36" />
                          <Skeleton className="h-4 w-28" />
                        </div>
                      </div>
                    ) : (
                      <div className="h-[300px] flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={courseData}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={90}
                              paddingAngle={2}
                              dataKey="value"
                              label={({ name, percent }) =>
                                `${name} ${(percent * 100).toFixed(0)}%`
                              }
                            >
                              {courseData.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={entry.color}
                                />
                              ))}
                            </Pie>
                            <Legend />
                            <Tooltip
                              formatter={value => [
                                `${value} Students`,
                                "Enrollment"
                              ]}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="performance">
                <Card>
                  <CardHeader>
                    <CardTitle>Grade Distribution</CardTitle>
                    <CardDescription>
                      Breakdown of student grades across all courses
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-4">
                    {isCoursesLoading ? (
                      <div className="h-[300px] flex items-center justify-center">
                        <div className="space-y-4 w-full px-12">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-32 w-full" />
                          <Skeleton className="h-4 w-3/4 mx-auto" />
                        </div>
                      </div>
                    ) : (
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={performanceData}>
                            <XAxis dataKey="grade" />
                            <YAxis />
                            <Tooltip />
                            <Bar
                              dataKey="count"
                              name="Students"
                              fill="#8b5cf6"
                              radius={[4, 4, 0, 0]}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            <MobileNav />
          </div>
        </main>
      </div>
    </div>
  )
}
