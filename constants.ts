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

export const INITIAL_COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Introdução à Teologia do Pacto',
    description: 'Um estudo fundamental sobre como Deus se relaciona com o homem através de alianças ao longo da história redentiva.',
    author: 'Rev. João Calvino (IA)',
    coverImage: 'https://picsum.photos/800/400?grayscale',
    modules: [
      {
        id: 'm1',
        title: 'Fundamentos da Aliança',
        lessons: [
          {
            id: 'l1',
            title: 'O que é uma Aliança?',
            type: 'article',
            content: 'Na teologia reformada, uma aliança é um vínculo soberanamente administrado de sangue e vida...'
          },
          {
            id: 'l2',
            title: 'O Pacto das Obras',
            type: 'video',
            content: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // Placeholder
          }
        ]
      }
    ],
    finalQuiz: {
      id: 'q1',
      title: 'Exame Final: Teologia do Pacto',
      passingScore: 80,
      questions: [
        {
          id: 'qu1',
          text: 'Qual pacto foi estabelecido com Adão antes da queda?',
          options: ['Pacto da Graça', 'Pacto das Obras', 'Pacto de Redenção', 'Pacto Noético'],
          correctOptionIndex: 1
        },
        {
          id: 'qu2',
          text: 'Quem é o mediador do Pacto da Graça?',
          options: ['Moisés', 'Abraão', 'Jesus Cristo', 'Davi'],
          correctOptionIndex: 2
        }
      ]
    }
  },
  {
    id: 'c2',
    title: 'Os Cinco Solas da Reforma',
    description: 'Explorando os pilares doutrinários que definiram a Reforma Protestante do século XVI.',
    author: 'Martinho Lutero (IA)',
    coverImage: 'https://picsum.photos/800/401?sepia',
    modules: [
      {
        id: 'm1',
        title: 'Sola Scriptura',
        lessons: [
          {
            id: 'l1',
            title: 'A Autoridade das Escrituras',
            type: 'article',
            content: 'A Escritura é a única regra inerrante de fé e prática para o cristão...'
          }
        ]
      }
    ],
    finalQuiz: {
      id: 'q2',
      title: 'Exame Final: Os Solas',
      passingScore: 80,
      questions: [
        {
          id: 'qu1',
          text: 'O que significa Sola Fide?',
          options: ['Somente a Fé', 'Somente a Graça', 'Somente Cristo', 'Glória a Deus'],
          correctOptionIndex: 0
        }
      ]
    }
  }
];
