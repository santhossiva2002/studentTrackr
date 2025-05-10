import { Switch, Route } from "wouter"
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"
import NotFound from "@/pages/not-found"
import Dashboard from "@/pages/Dashboard"
import Students from "@/pages/Students"
import StudentDetail from "@/pages/StudentDetail"
import Courses from "@/pages/Courses"
import Schedule from "@/pages/Schedule"
import Reports from "@/pages/Reports"
import { AuthProvider } from "@/hooks/useAuth"

function Router() {
  return (
    <Switch>
      <Route path="/studenttrackr" component={Dashboard} />
      <Route path="/students" component={Students} />
      <Route path="/students/:id" component={StudentDetail} />
      <Route path="/courses" component={Courses} />
      <Route path="/schedule" component={Schedule} />
      <Route path="/reports" component={Reports} />
      <Route component={NotFound} />
    </Switch>
  )
}

function App() {
  return (
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </AuthProvider>
  )
}

export default App
