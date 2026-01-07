import { Course } from './types';

export const ADMIN_PIN = '1517';
// constants.ts

import { Course } from './types';

// Toda vez que você atualizar os cursos no código, AUMENTE este número (1, 2, 3...)
// Isso forçará o navegador dos alunos a baixar os novos cursos.
export const DATA_VERSION = 1; 

export const INITIAL_COURSES: Course[] = [
  // AQUI VOCÊ COLARÁ O CONTEÚDO EXPORTADO DO ADMIN
  // Por enquanto, mantenha o array vazio ou com os dados de exemplo que já tiver
];
