import { LayoutDashboard, Users, BookOpen, Calendar, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { Link, useLocation } from "wouter"

export function MobileNav() {
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
      name: "More",
      href: "/reports",
      icon: Menu
    }
  ]

  return (
    <nav className="md:hidden bg-white border-t border-gray-200 fixed bottom-0 w-full z-10">
      <div className="flex justify-around">
        {links.map(link => {
          const isActive = location === link.href
          return (
            <Link key={link.name} href={link.href}>
              <div
                className={cn(
                  "flex flex-col items-center py-3 px-1 cursor-pointer",
                  isActive ? "text-primary-600" : "text-gray-500"
                )}
              >
                <link.icon className="h-5 w-5" />
                <span className="text-xs mt-1">{link.name}</span>
              </div>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
