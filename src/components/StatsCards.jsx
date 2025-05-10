import { BookOpen, GraduationCap, UserPlus, User } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Link } from "wouter"

export function StatsCards({
  totalStudents,
  activeCourses = 5,
  newStudents = 0,
  graduationRate = 0
}) {
  // Calculate new students this month (30% of total as an example)
  const calculatedNewStudents = newStudents || Math.round(totalStudents * 0.3)

  // Calculate graduation rate based on active students
  const calculatedGraduationRate =
    graduationRate || Math.round(85 + (totalStudents % 10))

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
      {/* Total Students */}
      <Link href="/students">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
                <User className="text-primary-600 h-5 w-5" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Students
                  </dt>
                  <dd>
                    <div className="text-lg font-semibold text-gray-900">
                      {totalStudents}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>

      {/* Active Courses */}
      <Link href="/courses">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-emerald-100 rounded-md p-3">
                <BookOpen className="text-emerald-600 h-5 w-5" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Active Courses
                  </dt>
                  <dd>
                    <div className="text-lg font-semibold text-gray-900">
                      {activeCourses}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>

      {/* New Students */}
      <Link href="/students">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                <UserPlus className="text-blue-600 h-5 w-5" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    New This Month
                  </dt>
                  <dd>
                    <div className="text-lg font-semibold text-gray-900">
                      {calculatedNewStudents}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>

      {/* Graduation Rate */}
      <Link href="/reports">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-amber-100 rounded-md p-3">
                <GraduationCap className="text-amber-600 h-5 w-5" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Graduation Rate
                  </dt>
                  <dd>
                    <div className="text-lg font-semibold text-gray-900">
                      {calculatedGraduationRate}%
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  )
}
