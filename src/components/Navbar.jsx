import { GraduationCap, Bell, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/hooks/useAuth"
import { useState } from "react"
import { LoginModal } from "./LoginModal"

export function Navbar() {
  const { user, logout } = useAuth()
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const openLoginModal = () => {
    setIsLoginModalOpen(true)
  }

  const getInitials = name => {
    if (!name) return "U"
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <>
      <header className="bg-white shadow-sm z-10 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <GraduationCap className="text-primary h-8 w-8 mr-3" />
            <h1 className="text-xl font-semibold text-gray-800">
              StudentTrackr
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-gray-500">
              <Bell className="h-5 w-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full flex items-center"
                >
                  {user ? (
                    <Avatar>
                      <AvatarImage src={user.photoURL || ""} />
                      <AvatarFallback className="bg-primary-100 text-primary-600">
                        {getInitials(user.displayName || "")}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <Avatar>
                      <AvatarFallback className="bg-gray-200 text-gray-500">
                        <span className="sr-only">Guest User</span>G
                      </AvatarFallback>
                    </Avatar>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                {user ? (
                  <>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user.displayName}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={logout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={openLoginModal}
                  >
                    Sign in
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  )
}
