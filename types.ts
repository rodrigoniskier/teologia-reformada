export type LessonType = 'video' | 'article' | 'audio' | 'slide';

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctOptionIndex: number;
}

export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
  passingScore: number; // Percentage 0-100
}

export interface Lesson {
  id: string;
  title: string;
  type: LessonType;
  content: string; // URL or text body
}

export interface Module {
  id: string;
  title: string;
  description?: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  author: string;
  coverImage: string;
  modules: Module[];
  finalQuiz?: Quiz;
}

export interface UserProgress {
  courseId: string;
  completedLessonIds: string[];
  quizScore?: number;
  completedDate?: string;
  studentName?: string;
}

export interface StorageData {
  courses: Course[];
  progress: Record<string, UserProgress>; // key is courseId
}