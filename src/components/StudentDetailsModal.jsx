import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
  } from "@/components/ui/dialog"
  import { Badge } from "@/components/ui/badge"
  import { Button } from "@/components/ui/button"
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
  import { Progress } from "@/components/ui/progress"
  import { Separator } from "@/components/ui/separator"
  
  export function StudentDetailsModal({ student, isOpen, onClose }) {
    if (!student) return null
  
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
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <div className="flex items-center mb-2">
              <Avatar className="h-16 w-16">
                <AvatarImage src={student.avatar} alt={student.name} />
                <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="ml-4">
                <DialogTitle className="text-lg font-medium text-gray-900">
                  {student.name}
                </DialogTitle>
                <p className="text-sm text-gray-500">{student.email}</p>
              </div>
            </div>
          </DialogHeader>
  
          <Separator />
  
          <div className="py-4">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Student ID</dt>
                <dd className="mt-1 text-sm text-gray-900">{student.id}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Course</dt>
                <dd className="mt-1 text-sm text-gray-900">{student.course}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">
                  Enrollment Date
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {student.enrollmentDate}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">GPA</dt>
                <dd className="mt-1 text-sm text-gray-900">{student.gpa}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <dd className="mt-1 text-sm">
                  <Badge
                    variant="outline"
                    className={getStatusColor(student.status)}
                  >
                    {student.status}
                  </Badge>
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Phone</dt>
                <dd className="mt-1 text-sm text-gray-900">(123) 456-7890</dd>
              </div>
            </dl>
          </div>
  
          <Separator />
  
          <div className="pt-4">
            <h4 className="text-sm font-medium text-gray-500 mb-2">
              Academic Progress
            </h4>
            <Progress value={82} className="h-2.5" />
            <div className="flex justify-between mt-1">
              <span className="text-xs text-gray-500">Credits: 82/120</span>
              <span className="text-xs text-gray-500">82% Complete</span>
            </div>
          </div>
  
          <Separator />
  
          <div className="pt-4">
            <h4 className="text-sm font-medium text-gray-500 mb-2">
              Recent Activity
            </h4>
            <div className="space-y-2">
              <div className="flex items-start">
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-gray-800">
                    Submitted final project for{" "}
                    <span className="font-medium">Web Development</span>
                  </p>
                  <p className="text-xs text-gray-500">Yesterday at 2:30 PM</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-gray-800">
                    Enrolled in{" "}
                    <span className="font-medium">Advanced Database Systems</span>
                  </p>
                  <p className="text-xs text-gray-500">2 days ago</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-gray-800">
                    Course{" "}
                    <span className="font-medium">Mobile App Development</span>{" "}
                    completed
                  </p>
                  <p className="text-xs text-gray-500">1 week ago</p>
                </div>
              </div>
            </div>
          </div>
  
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button>Edit Student</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }
  