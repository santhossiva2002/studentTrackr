import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
  } from "@/components/ui/dialog"
  import { Button } from "@/components/ui/button"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
  import { Separator } from "@/components/ui/separator"
  import { Lock } from "lucide-react"
  import { useState } from "react"
  import { useAuth } from "@/hooks/useAuth"
  import { useToast } from "@/hooks/use-toast"
  
  export function LoginModal({ isOpen, onClose }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const { loginWithGoogle } = useAuth()
    const { toast } = useToast()
  
    const handleLogin = async e => {
      e.preventDefault()
      setError("")
      setIsLoading(true)
  
      // Simulated login (in a real app, would use Firebase auth)
      setTimeout(() => {
        setIsLoading(false)
        setError(
          "Login with email/password is not implemented. Please use Google login."
        )
      }, 1000)
    }
  
    const handleGoogleLogin = async () => {
      try {
        await loginWithGoogle()
        onClose()
        toast({
          title: "Successfully logged in",
          description: "You can now add students and view their details",
          variant: "success"
        })
      } catch (error) {
        toast({
          title: "Login failed",
          description: "There was a problem logging in with Google",
          variant: "destructive"
        })
      }
    }
  
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
              <Lock className="h-6 w-6 text-primary-600" />
            </div>
            <DialogTitle className="text-center text-lg font-medium leading-6 text-gray-900 mt-4">
              Sign in to your account
            </DialogTitle>
            <DialogDescription className="text-center mt-1 text-sm text-gray-500">
              Required to view student details or add new students
            </DialogDescription>
          </DialogHeader>
  
          {error && (
            <div className="rounded-md bg-red-50 p-4 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">{error}</h3>
                </div>
              </div>
            </div>
          )}
  
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <Label htmlFor="email">Email address</Label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="mt-1"
                required
              />
            </div>
  
            <div className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="mt-1"
                required
              />
            </div>
  
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>
  
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:text-primary-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>
  
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
  
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-background text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
  
            <div className="mt-6 grid gap-3">
              <Button
                variant="outline"
                type="button"
                onClick={handleGoogleLogin}
                className="w-full"
              >
                <svg
                  className="mr-2 h-4 w-4 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                </svg>
                Google
              </Button>
            </div>
          </div>
  
          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <a
                href="#"
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                Sign up
              </a>
            </p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }
  