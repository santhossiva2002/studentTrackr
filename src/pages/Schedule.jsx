import { Navbar } from "@/components/Navbar"
import { Sidebar } from "@/components/Sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { CalendarClock, Users, GraduationCap } from "lucide-react"
import { MobileNav } from "@/components/MobileNav"
import { fetchStudents } from "@/lib/mockApi"
import { useCourses } from "@/lib/courseData"

// Generate events based on courses
const useEvents = date => {
  const { data: courses = [] } = useCourses()

  return useQuery({
    queryKey: ["students"],
    queryFn: fetchStudents,
    refetchOnWindowFocus: false,
    queryKey: ["students", date.toISOString().split("T")[0]],
    queryFn: async () => {
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 500))

      // In a real app, this would call the API with the selected date
      // For now, we'll generate events based on courses
      const activeCourses = courses.filter(course => course.status === "Active")

      if (activeCourses.length === 0) return []

      // Generate events from active courses
      const events = []

      // Morning classes
      if (activeCourses.length > 0) {
        events.push({
          id: 1,
          title: activeCourses[0].title,
          time: "09:00 AM - 10:30 AM",
          location: "Room 301",
          type: "Lecture",
          course: activeCourses[0]
        })
      }

      // Late morning
      if (activeCourses.length > 1) {
        events.push({
          id: 2,
          title: activeCourses[1].title,
          time: "11:00 AM - 12:30 PM",
          location: "Room 205",
          type: "Seminar",
          course: activeCourses[1]
        })
      }

      // Always add these admin events
      events.push({
        id: 3,
        title: "Faculty Meeting",
        time: "02:00 PM - 03:00 PM",
        location: "Conference Room A",
        type: "Meeting"
      })

      events.push({
        id: 4,
        title: "Office Hours",
        time: "03:30 PM - 05:00 PM",
        location: "Faculty Office",
        type: "Office Hours"
      })

      return events
    },
    refetchOnWindowFocus: false
  })
}

export default function Schedule() {
  const [date, setDate] = useState(new Date())

  // Get events for the selected date
  const { data: events = [], isLoading } = useEvents(date)

  // Calculate stats
  const totalEvents = events.length
  const totalHours = events.reduce((total, event) => {
    const timeString = event.time
    const [start, end] = timeString.split(" - ")

    // Extract hours from AM/PM format
    const extractHours = timeStr => {
      const parts = timeStr.split(":")
      let hours = parseInt(parts[0])
      const minutes = parseInt(parts[1].split(" ")[0])
      const isPM = timeStr.includes("PM")

      if (isPM && hours !== 12) hours += 12
      if (!isPM && hours === 12) hours = 0

      return hours + minutes / 60
    }

    const startHour = extractHours(start)
    const endHour = extractHours(end)

    return total + (endHour - startHour)
  }, 0)

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
                  Schedule
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Manage classes, events, and appointments
                </p>
              </div>
             
            </div>

            {/* Schedule Stats */}
            <div className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
                        <CalendarClock className="text-primary-600 h-5 w-5" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            Total Events Today
                          </dt>
                          <dd>
                            <div className="text-lg font-semibold text-gray-900">
                              {totalEvents}
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
                        <Users className="text-blue-600 h-5 w-5" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            Classes Today
                          </dt>
                          <dd>
                            <div className="text-lg font-semibold text-gray-900">
                              {
                                events.filter(
                                  e =>
                                    e.type === "Lecture" || e.type === "Seminar"
                                ).length
                              }
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
                        <GraduationCap className="text-amber-600 h-5 w-5" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            Total Hours
                          </dt>
                          <dd>
                            <div className="text-lg font-semibold text-gray-900">
                              {totalHours.toFixed(1)}
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Tabs defaultValue="calendar" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="calendar">Calendar</TabsTrigger>
                <TabsTrigger value="list">List View</TabsTrigger>
              </TabsList>

              <TabsContent value="calendar" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Calendar Component */}
                  <Card className="md:col-span-1">
                    <CardHeader>
                      <CardTitle className="text-lg">Select Date</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={newDate => {
                          if (newDate) setDate(newDate)
                        }}
                        className="rounded-md border"
                      />
                    </CardContent>
                  </Card>

                  {/* Events for Selected Date */}
                  <Card className="md:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-lg">
                        Events for{" "}
                        {date.toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                          year: "numeric"
                        })}
                      </CardTitle>
                     
                    </CardHeader>
                    <CardContent>
                      {isLoading ? (
                        <div className="space-y-4">
                          {[1, 2, 3].map(i => (
                            <div key={i} className="border rounded-lg p-4">
                              <div className="flex justify-between items-start">
                                <div className="w-full">
                                  <div className="h-5 bg-gray-200 rounded w-1/3 mb-2 animate-pulse"></div>
                                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-1 animate-pulse"></div>
                                  <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                                </div>
                                <div className="h-6 bg-gray-200 rounded w-16 animate-pulse"></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : events.length > 0 ? (
                        <div className="space-y-4">
                          {events.map(event => (
                            <div
                              key={event.id}
                              className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="text-md font-medium text-gray-900">
                                    {event.title}
                                  </h3>
                                  <p className="text-sm text-gray-500">
                                    {event.time}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    Location: {event.location}
                                  </p>
                                </div>
                                <Badge
                                  variant="outline"
                                  className={
                                    event.type === "Lecture"
                                      ? "bg-blue-100 text-blue-800"
                                      : event.type === "Seminar"
                                      ? "bg-green-100 text-green-800"
                                      : event.type === "Meeting"
                                      ? "bg-amber-100 text-amber-800"
                                      : "bg-purple-100 text-purple-800"
                                  }
                                >
                                  {event.type}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-10">
                          <p className="text-gray-500">
                            No events scheduled for this date
                          </p>
                          <Button variant="outline" className="mt-2">
                            Create Event
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="list">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Upcoming Events</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="space-y-4">
                        {[1, 2, 3, 4].map(i => (
                          <div key={i} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start">
                              <div className="w-full">
                                <div className="h-5 bg-gray-200 rounded w-1/3 mb-2 animate-pulse"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/4 mb-1 animate-pulse"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                              </div>
                              <div className="h-6 bg-gray-200 rounded w-16 animate-pulse"></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {events.map(event => (
                          <div
                            key={event.id}
                            className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-md font-medium text-gray-900">
                                  {event.title}
                                </h3>
                                <p className="text-sm text-gray-500">
                                  Today • {event.time}
                                </p>
                                <p className="text-sm text-gray-500">
                                  Location: {event.location}
                                </p>
                              </div>
                              <Badge
                                variant="outline"
                                className={
                                  event.type === "Lecture"
                                    ? "bg-blue-100 text-blue-800"
                                    : event.type === "Seminar"
                                    ? "bg-green-100 text-green-800"
                                    : event.type === "Meeting"
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-purple-100 text-purple-800"
                                }
                              >
                                {event.type}
                              </Badge>
                            </div>
                          </div>
                        ))}
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
