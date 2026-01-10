export interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'audio' | 'text' | 'slide' | 'article';
  content: string;
  duration?: string;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctOptionIndex: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  author?: string;
  modules: Module[];
  finalQuiz?: {
      id: string;
      title: string;
      passingScore: number;
      questions: Question[];
  };
}

export interface UserProgress {
  courseId: string;
  completedLessons: string[];
  quizScore?: number;
  completedAt?: string;
}

// --- TIPOS DE MENSAGEM (Faltava isso) ---
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  read: boolean;
}

export interface StorageData {
  version: number;
  courses: Course[];
  progress: Record<string, UserProgress>;
  messages: ContactMessage[]; // Adicionado campo de mensagens
}
