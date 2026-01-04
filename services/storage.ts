import { Course, StorageData, UserProgress } from '../types';
import { INITIAL_COURSES } from '../constants';

const STORAGE_KEY = 'reformed_lms_data';

export const getStorage = (): StorageData => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      const initial: StorageData = {
        courses: INITIAL_COURSES,
        progress: {}
      };
      saveStorage(initial);
      return initial;
    }
    return JSON.parse(data);
  } catch (e) {
    console.error("Failed to load storage", e);
    return { courses: [], progress: {} };
  }
};

export const saveStorage = (data: StorageData) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Failed to save storage", e);
  }
};

export const saveCourse = (course: Course) => {
  const data = getStorage();
  const index = data.courses.findIndex(c => c.id === course.id);
  if (index >= 0) {
    data.courses[index] = course;
  } else {
    data.courses.push(course);
  }
  saveStorage(data);
  return data.courses;
};

export const deleteCourse = (courseId: string) => {
  const data = getStorage();
  data.courses = data.courses.filter(c => c.id !== courseId);
  saveStorage(data);
  return data.courses;
};

export const saveProgress = (progress: UserProgress) => {
  const data = getStorage();
  data.progress[progress.courseId] = progress;
  saveStorage(data);
  return data.progress;
};

export const getCourseProgress = (courseId: string): UserProgress | undefined => {
  const data = getStorage();
  return data.progress[courseId];
};