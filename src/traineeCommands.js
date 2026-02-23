import { saveTraineeData, loadTraineeData, loadCourseData, saveCourseData } from './storage.js';

function generateId() {
  return Math.floor(Math.random() * 100000);
}

// ============ ADD ============
function addTrainee(args) {
  const [firstName, lastName] = args;

  if (!firstName || !lastName) {
    console.log('Please provide first and last name.');
    return;
  }

  const trainees = loadTraineeData();

  const newTrainee = {
    id: generateId(),
    firstName,
    lastName
  };

  trainees.push(newTrainee);
  saveTraineeData(trainees);

  console.log('Trainee added successfully:', newTrainee);
}

// ============ UPDATE ============
function updateTrainee(args) {
  const [id, newFirstName, newLastName] = args;

  if (!id) {
    console.log('Please provide trainee ID.');
    return;
  }

  const trainees = loadTraineeData();
  const trainee = trainees.find(t => t.id == id);

  if (!trainee) {
    console.log('Trainee not found.');
    return;
  }

  if (newFirstName) trainee.firstName = newFirstName;
  if (newLastName) trainee.lastName = newLastName;

  saveTraineeData(trainees);

  console.log('Trainee updated successfully.');
}

// ============ DELETE ============
function deleteTrainee(args) {
  const [id] = args;

  if (!id) {
    console.log('Please provide trainee ID.');
    return;
  }

  // Remove trainee from trainee list
  const trainees = loadTraineeData();
  const updatedTrainees = trainees.filter(t => t.id != id);
  saveTraineeData(updatedTrainees);

  // Remove trainee from all courses
  const courses = loadCourseData();
  courses.forEach(course => {
    course.participants = course.participants.filter(pid => pid != id);
  });
  saveCourseData(courses);

  console.log('Trainee deleted successfully and removed from all courses.');
}

// ============ GET ONE ============
function fetchTrainee(args) {
  const [id] = args;

  const trainees = loadTraineeData();
  const trainee = trainees.find(t => t.id == id);

  if (!trainee) {
    console.log('Trainee not found.');
    return;
  }

  console.log(trainee);
}

// ============ GET ALL ============
function fetchAllTrainees() {
  const trainees = loadTraineeData();
  console.log(trainees);
}

// ============ HANDLE ============
export function handleTraineeCommand(subcommand, args) {
  switch (subcommand) {
    case 'ADD':
      addTrainee(args);
      break;
    case 'UPDATE':
      updateTrainee(args);
      break;
    case 'DELETE':
      deleteTrainee(args);
      break;
    case 'GET':
      fetchTrainee(args);
      break;
    case 'LIST':
      fetchAllTrainees();
      break;
    default:
      console.log('Unknown trainee command.');
  }
}
