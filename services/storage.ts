import { Course, StorageData, UserProgress } from '../types';
import { INITIAL_COURSES, DATA_VERSION } from '../constants';

const STORAGE_KEY = 'reformed_lms_data';

export const getStorage = (): StorageData => {
  try {
    const rawData = localStorage.getItem(STORAGE_KEY);
    
    // Configuração inicial padrão
    const initialData: StorageData = {
      version: DATA_VERSION,
      courses: INITIAL_COURSES,
      progress: {}
    };

    if (!rawData) {
      saveStorage(initialData);
      return initialData;
    }

    const savedData: StorageData = JSON.parse(rawData);

    // VERIFICAÇÃO DE VERSÃO MÁGICA
    // Se a versão salva for menor que a versão do código, atualizamos os cursos
    if (!savedData.version || savedData.version < DATA_VERSION) {
      console.log("Nova versão detectada. Atualizando cursos...");
      
      const upgradedData: StorageData = {
        version: DATA_VERSION,     // Atualiza a versão
        courses: INITIAL_COURSES,  // Pega os cursos novos do arquivo constants.ts
        progress: savedData.progress // Mantém o progresso do aluno (não apaga o que ele já estudou)
      };
      
      saveStorage(upgradedData);
      return upgradedData;
    }

    return savedData;
  } catch (e) {
    console.error("Failed to load storage", e);
    return { version: DATA_VERSION, courses: INITIAL_COURSES, progress: {} };
  }
};

export const saveStorage = (data: StorageData) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Failed to save storage", e);
  }
};

// As funções abaixo continuam iguais, apenas a tipagem do data já inclui a versão
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
