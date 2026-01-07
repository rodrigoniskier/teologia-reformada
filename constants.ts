import { Course } from './types';

export const ADMIN_PIN = '1517';

// Toda vez que você atualizar os cursos no código, AUMENTE este número (1, 2, 3...)
export const DATA_VERSION = 3; 

export const INITIAL_COURSES: Course[] = [
  {
    "id": "1767791811245",
    "title": "História da Autorrevelação Especial de Deus",
    "description": "Este tema é conhecido também como Teologia Bíblica. \n\nEle explora a continuidade e as (aparentes) tensões entre o Antigo e o Novo Testamento. \n\nO conteúdo examina temas fundamentais como a revelação progressiva, o conceito de pacto (berith) e a natureza da lei mosaica em relação à graça cristã, a identidade de Deus, sua santidade, transcendência e a manifestação de sua vontade através de figuras como Moisés e os profetas. \n\nO curso também avalia métodos de interpretação, contrastando a crítica histórica com abordagens canônicas e teológicas que buscam compreender a unidade das Escrituras. \n\nPor fim, debatem-se tópicos específicos como a expiação, a escatologia, o papel do Messias e o impacto do pensamento moderno na doutrina da criação.",
    "author": "Autor",
    "coverImage": "https://rodrigoniskier.github.io/teologia-reformada/img/teobib.png",
    "modules": [
      {
        "id": "1767792036221",
        "title": "Módulo 01",
        "lessons": [
          {
            "id": "1767792043418",
            "title": "Conteúdo",
            "type": "article",
            "content": "https://rodrigoniskier.github.io/teologia-reformada/cursos/historiadaautorrevelacao/conteudo.pdf"
          },
          {
            "id": "1767792090650",
            "title": "Aula 01 - Slides",
            "type": "slide",
            "content": "https://rodrigoniskier.github.io/teologia-reformada/cursos/historiadaautorrevelacao/aula01.pdf"
          },
          {
            "id": "1767792205591",
            "title": "Aula 01 - Vídeo",
            "type": "video",
            "content": "https://www.youtube.com/embed/q1NRFmWNS8c"
          },
          {
            "id": "1767792826900",
            "title": "Aula 01 - Banner",
            "type": "article",
            "content": "https://rodrigoniskier.github.io/teologia-reformada/img/aula01banner.pdf"
          }
        ]
      }
    ]
  }
];
