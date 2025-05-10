import { useState } from "react"
import { Navbar } from "@/components/Navbar"
import { Sidebar } from "@/components/Sidebar"
import { MobileNav } from "@/components/MobileNav"
import { StatsCards } from "@/components/StatsCards"
import { StudentList } from "@/components/StudentList"
import { StudentDetailsModal } from "@/components/StudentDetailsModal"
import { AddStudentModal } from "@/components/AddStudentModal"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { LoginModal } from "@/components/LoginModal"
import { useQuery } from "@tanstack/react-query"
import { useCourses } from "@/lib/courseData"
import { fetchStudents } from "@/lib/mockApi"

export default function Dashboard() {
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [isStudentDetailsModalOpen, setIsStudentDetailsModalOpen] = useState(
    false
  )
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const { user } = useAuth()

  // Fetch students data
  const {
    data: students = [],
    isLoading: loading,
    refetch: refetchStudents
  } = useQuery({
    queryKey: ["students"],
    queryFn: fetchStudents,
    refetchOnWindowFocus: false
  })

  // Get course data for stats
  const { data: courses = [] } = useCourses()

  // Calculate stats
  const activeCourses = courses.filter(course => course.status === "Active")
    .length
  const totalEnrollment = courses.reduce(
    (sum, course) => sum + course.students,
    0
  )
  const newStudentsThisMonth = Math.round(students.length * 0.3) // 30% of students for demo
  const graduationRate = Math.round(85 + (students.length % 10)) // Between 85-95%

  const handleAddStudent = student => {
    // In a real app, this would call an API to add the student
    // For now we'll just refetch the student list
    refetchStudents()
  }

  const handleViewDetails = student => {
    setSelectedStudent(student)
    setIsStudentDetailsModalOpen(true)
  }

  const handleAddStudentClick = () => {
    if (!user) {
      setIsLoginModalOpen(true)
      return
    }
    setIsAddStudentModalOpen(true)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-1 flex pb-16 md:pb-0">
        <Sidebar />
        <main className="flex-1 md:pl-64">
          <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            {/* Dashboard Header */}
            <div className="mb-6 md:flex md:items-center md:justify-between">
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                  StudentTrackr Dashboard
                </h2>
              </div>
              <div className="mt-4 flex md:mt-0 md:ml-4">
                <Button onClick={handleAddStudentClick}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Student
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <StatsCards
              totalStudents={students.length}
              activeCourses={activeCourses}
              newStudents={newStudentsThisMonth}
              graduationRate={graduationRate}
            />

            {/* Student List */}
            <StudentList
              students={students}
              isLoading={loading}
              onViewDetails={handleViewDetails}
            />
          </div>
        </main>
      </div>

    

      {/* Modals */}
      <StudentDetailsModal
        student={selectedStudent}
        isOpen={isStudentDetailsModalOpen}
        onClose={() => setIsStudentDetailsModalOpen(false)}
      />

      <AddStudentModal
        isOpen={isAddStudentModalOpen}
        onClose={() => setIsAddStudentModalOpen(false)}
        onAddStudent={handleAddStudent}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
        <MobileNav />
    </div>
  )
}
