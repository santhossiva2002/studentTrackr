// Student portrait images from Unsplash
const studentAvatars = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256",
    "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256",
    "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256",
    "https://images.unsplash.com/photo-1569913486515-b74bf7751574?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256"
  ];
  
  const studentNames = [
    'Alice Johnson',
    'Robert Smith',
    'Emma Davis',
    'Michael Wilson',
    'Sophia Brown',
    'James Taylor',
    'Olivia Martinez',
    'William Anderson',
    'Ava Thomas',
    'Benjamin White',
    'Charlotte Harris',
    'Daniel Martin',
    'Mia Thompson',
    'Alexander Garcia',
    'Elizabeth Rodriguez',
    'Henry Lewis',
    'Sofia Lee',
    'David Walker',
    'Amelia Hall',
    'Joseph Allen'
  ];
  
  export const fetchStudents = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const students = Array.from({ length: 20 }, (_, i) => {
          const courses = ['Computer Science', 'Business Administration', 'Engineering', 'Graphic Design', 'Psychology'];
          const statuses = ['Active', 'Inactive', 'On Leave'];
          const randomCourse = courses[Math.floor(Math.random() * courses.length)];
          const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
          const randomAvatar = studentAvatars[Math.floor(Math.random() * studentAvatars.length)];
  
          const year = 2020 + Math.floor(Math.random() * 4);
          const month = 1 + Math.floor(Math.random() * 12);
          const day = 1 + Math.floor(Math.random() * 28);
          const dateStr = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
          const date = new Date(dateStr);
          const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  
          const gpa = (2 + Math.random() * 2).toFixed(1);
  
          return {
            id: `STU${(10000 + i).toString()}`,
            name: studentNames[i],
            email: `student${10000 + i}@university.edu`,
            course: randomCourse,
            enrollmentDate: formattedDate,
            status: randomStatus,
            gpa: gpa,
            avatar: randomAvatar
          };
        });
  
        resolve(students);
      }, 1500);
    });
  };
  