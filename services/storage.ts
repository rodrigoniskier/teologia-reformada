import { Course, StorageData, UserProgress, ContactMessage } from '../types';
import { INITIAL_COURSES, DATA_VERSION } from '../constants';

const STORAGE_KEY = 'reformed_lms_data';

export const getStorage = (): StorageData => {
  try {
    const rawData = localStorage.getItem(STORAGE_KEY);
    
    // Configuração inicial padrão
    const initialData: StorageData = {
      version: DATA_VERSION,
      courses: INITIAL_COURSES,
      progress: {},
      messages: [] // Inicializa lista de mensagens
    };

    if (!rawData) {
      saveStorage(initialData);
      return initialData;
    }

    const savedData: StorageData = JSON.parse(rawData);

    // Garante que o array de mensagens exista (para usuários antigos)
    if (!savedData.messages) {
        savedData.messages = [];
    }

    // VERIFICAÇÃO DE VERSÃO
    if (!savedData.version || savedData.version < DATA_VERSION) {
      console.log("Nova versão detectada. Atualizando cursos...");
      
      const upgradedData: StorageData = {
        version: DATA_VERSION,
        courses: INITIAL_COURSES,
        progress: savedData.progress,
        messages: savedData.messages || []
      };
      
      saveStorage(upgradedData);
      return upgradedData;
    }

    return savedData;
  } catch (e) {
    console.error("Failed to load storage", e);
    return { version: DATA_VERSION, courses: INITIAL_COURSES, progress: {}, messages: [] };
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

// --- FUNÇÕES DE MENSAGEM (CORREÇÃO DO ERRO) ---

export const saveMessage = (msg: ContactMessage) => {
  const data = getStorage();
  if (!data.messages) data.messages = [];
  data.messages.unshift(msg);
  saveStorage(data);
};

export const deleteMessage = (id: string) => {
  const data = getStorage();
  if (data.messages) {
      data.messages = data.messages.filter(m => m.id !== id);
      saveStorage(data);
  }
};

export const markMessageAsRead = (id: string) => {
  const data = getStorage();
  if (data.messages) {
      const msg = data.messages.find(m => m.id === id);
      if (msg) {
        msg.read = true;
        saveStorage(data);
      }
  }
};
