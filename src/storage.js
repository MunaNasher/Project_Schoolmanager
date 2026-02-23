import fs from 'node:fs';

const TRAINEE_DATA_FILE_PATH = './data/trainees.json';
const COURSE_DATA_FILE_PATH = './data/courses.json';

// ======== TRAINEE DATA ========
export function loadTraineeData() {
  if (!fs.existsSync(TRAINEE_DATA_FILE_PATH)) return [];
  
  try {
    const data = fs.readFileSync(TRAINEE_DATA_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading trainees data. Returning empty array.', error.message);
    return [];
  }
}

export function saveTraineeData(data) {
  try {
    fs.writeFileSync(TRAINEE_DATA_FILE_PATH, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error saving trainees data.', error.message);
  }
}

// ======== COURSE DATA ========
export function loadCourseData() {
  if (!fs.existsSync(COURSE_DATA_FILE_PATH)) return [];
  
  try {
    const data = fs.readFileSync(COURSE_DATA_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading courses data. Returning empty array.', error.message);
    return [];
  }
}

export function saveCourseData(data) {
  try {
    fs.writeFileSync(COURSE_DATA_FILE_PATH, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error saving courses data.', error.message);
  }
}