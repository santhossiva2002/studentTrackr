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
  import { Input } from "@/components/ui/input"
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
  } from "@/components/ui/select"
  import { ArrowRight, ChevronLeft, ChevronRight, Search } from "lucide-react"
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
  import { Skeleton } from "@/components/ui/skeleton"
  import { useState, useEffect, useMemo } from "react"
  import { useAuth } from "@/hooks/useAuth"
  import { LoginModal } from "./LoginModal"
  import { useLocation } from "wouter"
  
  export function StudentList({ students, isLoading, onViewDetails }) {
    const [filteredStudents, setFilteredStudents] = useState(students)
    const [courseFilter, setCourseFilter] = useState("")
    const [searchQuery, setSearchQuery] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10
    const { user } = useAuth()
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
    const [, navigate] = useLocation()
  
    // Standard course names that match the database
    const courses = [
      "Computer Science",
      "Business Administration",
      "Engineering",
      "Graphic Design",
      "Psychology"
    ]
  
    // Apply filters
    useEffect(() => {
      // Reset to first page when filters change
      setCurrentPage(1)
  
      // Filter students whenever the filter criteria or students array changes
      const filtered = students.filter(student => {
        // Filter by course if specified and not "all"
        const matchesCourse =
          courseFilter && courseFilter !== "all"
            ? student.course === courseFilter
            : true
  
        // Filter by search query if provided
        const searchLower = searchQuery.toLowerCase()
        const matchesSearch = searchQuery
          ? student.name.toLowerCase().includes(searchLower) ||
            student.email.toLowerCase().includes(searchLower) ||
            String(student.id).includes(searchQuery) // Convert ID to string but don't lowercase it
          : true
  
        return matchesCourse && matchesSearch
      })
  
      setFilteredStudents(filtered)
    }, [students, courseFilter, searchQuery])
  
    // Calculate pagination
    const totalPages = Math.ceil(filteredStudents.length / itemsPerPage)
  
    // Get current page items
    const paginatedStudents = useMemo(() => {
      const startIndex = (currentPage - 1) * itemsPerPage
      return filteredStudents.slice(startIndex, startIndex + itemsPerPage)
    }, [filteredStudents, currentPage, itemsPerPage])
  
    // Generate page numbers
    const pageNumbers = useMemo(() => {
      const pages = []
      const maxPageButtons = 5 // Maximum number of page buttons to show
  
      if (totalPages <= maxPageButtons) {
        // Show all pages if there are less than maxPageButtons
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        // Always show first page
        pages.push(1)
  
        // Calculate range of pages to show
        let startPage = Math.max(2, currentPage - 1)
        let endPage = Math.min(totalPages - 1, currentPage + 1)
  
        // Adjust if we're near the start
        if (currentPage <= 3) {
          endPage = Math.min(maxPageButtons - 1, totalPages - 1)
        }
  
        // Adjust if we're near the end
        if (currentPage >= totalPages - 2) {
          startPage = Math.max(2, totalPages - maxPageButtons + 2)
        }
  
        // Add ellipsis after first page if needed
        if (startPage > 2) {
          pages.push("ellipsis-start")
        }
  
        // Add middle pages
        for (let i = startPage; i <= endPage; i++) {
          pages.push(i)
        }
  
        // Add ellipsis before last page if needed
        if (endPage < totalPages - 1) {
          pages.push("ellipsis-end")
        }
  
        // Always show last page if there's more than one page
        if (totalPages > 1) {
          pages.push(totalPages)
        }
      }
  
      return pages
    }, [currentPage, totalPages])
  
    const handleViewDetails = student => {
      if (!user) {
        setIsLoginModalOpen(true)
        return
      }
      // Navigate to student detail page instead of opening modal
      navigate(`/students/${student.id}`)
      // Still call the onViewDetails for backward compatibility
      onViewDetails(student)
    }
  
    const getStatusColor = status => {
      switch (status) {
        case "Active":
          return "bg-green-100 text-green-800 hover:bg-green-200"
        case "Inactive":
          return "bg-red-100 text-red-800 hover:bg-red-200"
        case "On Leave":
          return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
        default:
          return "bg-gray-100 text-gray-800 hover:bg-gray-200"
      }
    }
  
    return (
      <>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          {/* Filters & Search */}
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:justify-between space-y-3 sm:space-y-0 sm:items-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Student List
              </h3>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                {/* Course Filter */}
                <Select value={courseFilter} onValueChange={setCourseFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="All Courses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Courses</SelectItem>
                    {courses.map(course => (
                      <SelectItem key={course} value={course}>
                        {course}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
  
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search students..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
  
          {/* Student List Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Enrollment Date</TableHead>
                  <TableHead>GPA</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading &&
                  Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <TableRow key={i}>
                        <TableCell>
                          <div className="flex items-center">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <div className="ml-4">
                              <Skeleton className="h-4 w-32" />
                              <Skeleton className="h-3 w-24 mt-1" />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-16" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-32" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-24" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-12" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-6 w-20 rounded-full" />
                        </TableCell>
                        <TableCell className="text-right">
                          <Skeleton className="h-8 w-16 ml-auto" />
                        </TableCell>
                      </TableRow>
                    ))}
  
                {!isLoading && filteredStudents.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <Search className="h-10 w-10 text-gray-400 mb-3" />
                        <p className="text-gray-500 text-lg">No students found</p>
                        <p className="text-gray-400 text-sm mt-1">
                          Try adjusting your search or filter criteria
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
  
                {!isLoading &&
                  paginatedStudents.map(student => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={student.avatar}
                              alt={student.name}
                            />
                            <AvatarFallback>
                              {student.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {student.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {student.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-900">
                        {student.id}
                      </TableCell>
                      <TableCell className="text-sm text-gray-900">
                        {student.course}
                      </TableCell>
                      <TableCell className="text-sm text-gray-900">
                        {student.enrollmentDate}
                      </TableCell>
                      <TableCell className="text-sm text-gray-900">
                        {student.gpa}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={getStatusColor(student.status)}
                        >
                          {student.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          className="text-primary-600 hover:text-primary-900 font-medium"
                          onClick={() => handleViewDetails(student)}
                        >
                          View
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
  
          {/* Pagination */}
          {!isLoading && filteredStudents.length > 0 && (
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing{" "}
                    <span className="font-medium">
                      {(currentPage - 1) * itemsPerPage + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium">
                      {Math.min(
                        currentPage * itemsPerPage,
                        filteredStudents.length
                      )}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium">{filteredStudents.length}</span>{" "}
                    results
                  </p>
                </div>
                <div>
                  <nav
                    className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                    aria-label="Pagination"
                  >
                    {/* Previous Page Button */}
                    <button
                      onClick={() =>
                        setCurrentPage(prev => Math.max(1, prev - 1))
                      }
                      disabled={currentPage === 1}
                      className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                        currentPage === 1
                          ? "text-gray-300 cursor-not-allowed"
                          : "text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      <span className="sr-only">Previous</span>
                      <ChevronLeft className="h-5 w-5" />
                    </button>
  
                    {/* Page Numbers */}
                    {pageNumbers.map((pageNumber, index) => {
                      // Handle ellipsis
                      if (
                        pageNumber === "ellipsis-start" ||
                        pageNumber === "ellipsis-end"
                      ) {
                        return (
                          <span
                            key={`ellipsis-${index}`}
                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                          >
                            ...
                          </span>
                        )
                      }
  
                      // Handle number pages
                      return (
                        <button
                          key={index}
                          onClick={() => setCurrentPage(Number(pageNumber))}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            currentPage === pageNumber
                              ? "z-10 bg-primary-50 border-primary-500 text-primary-600"
                              : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {pageNumber}
                        </button>
                      )
                    })}
  
                    {/* Next Page Button */}
                    <button
                      onClick={() =>
                        setCurrentPage(prev => Math.min(totalPages, prev + 1))
                      }
                      disabled={currentPage === totalPages || totalPages === 0}
                      className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                        currentPage === totalPages || totalPages === 0
                          ? "text-gray-300 cursor-not-allowed"
                          : "text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      <span className="sr-only">Next</span>
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </nav>
                </div>
              </div>
              <div className="flex sm:hidden justify-between w-full">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <span className="self-center text-sm text-gray-700">
                  Page {currentPage} of {Math.max(1, totalPages)}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage(prev => Math.min(totalPages, prev + 1))
                  }
                  disabled={currentPage === totalPages || totalPages === 0}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </div>
  
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
        />
      </>
    )
  }
  