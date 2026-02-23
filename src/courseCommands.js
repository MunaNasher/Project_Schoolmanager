import { saveCourseData, loadCourseData, loadTraineeData } from './storage.js';

function generateId() {
  return Math.floor(Math.random() * 100000);
}

//Add
function addCourse(args) {
  const [name, startDate] = args;

  if (!name || !startDate) {
    console.log('Please provide course name and start date.');
    return;
  }

  const courses = loadCourseData();

  const newCourse = {
    id: generateId(),
    name,
    startDate,
    participants: []
  };

  courses.push(newCourse);
  saveCourseData(courses);

  console.log('Course added successfully:', newCourse);
}

//update
function updateCourse(args) {
  const [id, newName, newStartDate] = args;

  if (!id) {
    console.log('Please provide course ID.');
    return;
  }

  const courses = loadCourseData();
  const course = courses.find(c => c.id == id);

  if (!course) {
    console.log('Course not found.');
    return;
  }

  if (newName) course.name = newName;
  if (newStartDate) course.startDate = newStartDate;

  saveCourseData(courses);
  console.log('Course updated successfully.');
}

// delete
function deleteCourse(args) {
  const [id] = args;

  if (!id) {
    console.log('Please provide course ID.');
    return;
  }

  const courses = loadCourseData();
  const updated = courses.filter(c => c.id != id);
  saveCourseData(updated);

  console.log('Course deleted successfully.');
}

// join
function joinCourse(args) {
  const [courseId, traineeId] = args;

  if (!courseId || !traineeId) {
    console.log('Please provide course ID and trainee ID.');
    return;
  }

  const courses = loadCourseData();
  const trainees = loadTraineeData();
  const course = courses.find(c => c.id == courseId);
  const trainee = trainees.find(t => t.id == Number(traineeId));

  if (!course) return console.log('Course not found.');
  if (!trainee) return console.log('Trainee not found.');

  // business rule: Max 20 participants per course
  if (course.participants.length >= 20) {
    console.log('Cannot join. Course already has 20 participants.');
    return;
  }

  // business rule: Trainee cannot join more than 5 courses
  const traineeCoursesCount = courses.filter(c => c.participants.includes(Number(traineeId))).length;
  if (traineeCoursesCount >= 5) {
    console.log('Cannot join. Trainee is already in 5 courses.');
    return;
  }

  if (course.participants.includes(Number(traineeId))) {
    console.log('Trainee already joined this course.');
    return;
  }

  course.participants.push(Number(traineeId));
  saveCourseData(courses);

  console.log('Trainee joined successfully.');
}

//leave
function leaveCourse(args) {
  const [courseId, traineeId] = args;

  if (!courseId || !traineeId) {
    console.log('Please provide course ID and trainee ID.');
    return;
  }

  const courses = loadCourseData();
  const course = courses.find(c => c.id == courseId);

  if (!course) return console.log('Course not found.');

  course.participants = course.participants.filter(id => id != traineeId);
  saveCourseData(courses);

  console.log('Trainee removed from course.');
}

// get one 
function getCourse(args) {
  const [id] = args;

  const courses = loadCourseData();
  const course = courses.find(c => c.id == id);

  if (!course) return console.log('Course not found.');

  console.log(course);
}

// get all
function getAllCourses() {
  const courses = loadCourseData();
  console.log(courses);
}

// handel
export function handleCourseCommand(subcommand, args) {
  switch (subcommand) {
    case 'ADD':
      addCourse(args);
      break;
    case 'UPDATE':
      updateCourse(args);
      break;
    case 'DELETE':
      deleteCourse(args);
      break;
    case 'JOIN':
      joinCourse(args);
      break;
    case 'LEAVE':
      leaveCourse(args);
      break;
    case 'GET':
      getCourse(args);
      break;
    case 'LIST':
      getAllCourses();
      break;
    default:
      console.log('Unknown course command.');
  }
}



