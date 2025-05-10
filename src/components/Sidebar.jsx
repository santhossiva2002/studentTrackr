import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Calendar,
  PieChart
} from "lucide-react"
import { Link, useLocation } from "wouter"

export function Sidebar({ className }) {
  const [location] = useLocation()

  const links = [
    {
      name: "Dashboard",
      href: "/studenttrackr",
      icon: LayoutDashboard
    },
    {
      name: "Students",
      href: "/students",
      icon: Users
    },
    {
      name: "Courses",
      href: "/courses",
      icon: BookOpen
    },
    {
      name: "Schedule",
      href: "/schedule",
      icon: Calendar
    },
    {
      name: "Reports",
      href: "/reports",
      icon: PieChart
    }
  ]

  return (
    <aside
      className={cn(
        "hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 pt-16",
        className
      )}
    >
      <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {links.map(link => {
              const isActive = location === link.href
              return (
                <div key={link.name} className="mb-1">
                  <Link href={link.href}>
                    <div
                      className={cn(
                        "group flex items-center px-2 py-2 text-sm font-medium rounded-md cursor-pointer",
                        isActive
                          ? "bg-primary-50 text-primary-600"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      )}
                    >
                      <link.icon
                        className={cn(
                          "mr-3 flex-shrink-0 h-5 w-5",
                          isActive
                            ? "text-primary-500"
                            : "text-gray-400 group-hover:text-gray-500"
                        )}
                      />
                      {link.name}
                    </div>
                  </Link>
                </div>
              )
            })}
          </nav>
        </div>
      </div>
    </aside>
  )
}
