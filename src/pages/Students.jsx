import { Navbar } from "@/components/Navbar"
import { Sidebar } from "@/components/Sidebar"
import { StudentList } from "@/components/StudentList"
import { StudentDetailsModal } from "@/components/StudentDetailsModal"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchStudents } from "@/lib/mockApi" // adjust this import path
import { MobileNav } from "@/components/MobileNav"
export default function Students() {
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)

  // Fetch students from API
  const { data: students = [], isLoading } = useQuery({
    queryKey: ["students"],
    queryFn: fetchStudents,
    refetchOnWindowFocus: false
  })

  const handleViewDetails = student => {
    setSelectedStudent(student)
    setIsDetailsModalOpen(true)
  }

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
                  Students
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  View and manage all students enrolled in your institution
                </p>
              </div>
            </div>

            {/* Student List */}
            <div className="mt-4">
              <StudentList
                students={students}
                isLoading={isLoading}
                onViewDetails={handleViewDetails}
              />
            </div>
          </div>
          <MobileNav />
        </main>
      </div>

      {/* Student Details Modal */}
      <StudentDetailsModal
        student={selectedStudent}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
      />
    </div>
  )
}
