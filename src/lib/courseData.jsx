import { useQuery } from "@tanstack/react-query"

// This function will be used across all components that need course data
export const useCourses = () => {
  return useQuery({
    queryKey: ["/api/courses"],
    queryFn: async () => {
      try {
        // In a real app this would be a fetch request to the API
        // For now, we'll return static data that's consistent across all pages

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500))

        return [
          {
            id: "cs101",
            title: "Computer Science",
            description: "Introduction to programming concepts and algorithms",
            students: 32,
            instructor: "Dr. Alan Turing",
            duration: "16 weeks",
            status: "Active"
          },
          {
            id: "ba200",
            title: "Business Administration",
            description: "Principles of management, marketing, and operations",
            students: 28,
            instructor: "Dr. Peter Drucker",
            duration: "12 weeks",
            status: "Active"
          },
          {
            id: "eng150",
            title: "Engineering",
            description:
              "Basics of mechanical, electrical, and civil engineering",
            students: 24,
            instructor: "Dr. Grace Hopper",
            duration: "14 weeks",
            status: "Active"
          },
          {
            id: "gd110",
            title: "Graphic Design",
            description:
              "Fundamentals of design theory, typography, and visual communication",
            students: 18,
            instructor: "Prof. Sarah Jones",
            duration: "10 weeks",
            status: "Active"
          },
          {
            id: "psy201",
            title: "Psychology",
            description: "The science of behavior and mental processes",
            students: 35,
            instructor: "Dr. Carl Jung",
            duration: "15 weeks",
            status: "Active"
          }
        ]
      } catch (error) {
        console.error("Failed to fetch courses:", error)
        return []
      }
    },
    refetchOnWindowFocus: false
  })
}
