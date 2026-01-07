import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Course } from '../../types';
import { getStorage } from '../../services/storage';
import { BookOpen, Video, ArrowRight, Award, CheckCircle, Shield } from '../ui/Icons';

export const CourseCatalog: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const data = getStorage();
    setCourses(data.courses);
  }, []);

  return (
    <div className="min-h-screen bg-parchment font-sans text-stone-800">
      
      {/* --- HERO SECTION: Conexão e Propósito --- */}
      {/* Estratégia PNL: Uso de metáforas visuais ("Luz", "Tenebras") e foco na identidade do estudante. */}
      <div className="relative bg-navy-900 text-parchment py-24 px-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/dark-matter.png")' }}></div>
        
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-burgundy-900/50 border border-burgundy-700 text-burgundy-200 text-xs font-bold tracking-widest uppercase mb-6 animate-fade-in-up">
            Teologia Reformada Confessional
          </span>
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
            Ilumine sua Mente.<br />
            <span className="text-burgundy-400 italic">Aqueça seu Coração.</span>
          </h1>
          <p className="text-xl text-stone-300 max-w-2xl mx-auto mb-10 font-serif leading-relaxed">
            Uma plataforma dedicada ao ensino fiel e acessível. 
            Não apenas informação, mas formação para a vida cristã.
          </p>
          <div className="w-16 h-1 bg-burgundy-600 mx-auto rounded-full"></div>
        </div>
      </div>

      {/* --- HOW IT WORKS: Clareza Cognitiva --- */}
      {/* Estratégia: Reduzir fricção explicando o processo simples. Gatilho de "Compromisso e Coerência". */}
      <div className="bg-white py-16 border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-navy-900">Sua Jornada de Aprendizado</h2>
            <p className="text-stone-500 mt-2">Um caminho estruturado para o seu crescimento.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Conector Visual (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-stone-100 -z-10 transform -translate-y-1/2"></div>

            {/* Step 1 */}
            <div className="bg-white p-6 rounded-lg border border-stone-100 shadow-sm text-center relative">
              <div className="w-16 h-16 bg-navy-50 text-navy-800 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-serif font-bold shadow-inner ring-4 ring-white">1</div>
              <h3 className="font-bold text-lg mb-2 text-navy-900">Estudo Modular</h3>
              <p className="text-sm text-stone-600">Acesse aulas em vídeo, áudio e textos, organizados logicamente para facilitar a compreensão.</p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-lg border border-stone-100 shadow-sm text-center relative">
              <div className="w-16 h-16 bg-navy-50 text-navy-800 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-serif font-bold shadow-inner ring-4 ring-white">2</div>
              <h3 className="font-bold text-lg mb-2 text-navy-900">Verificação</h3>
              <p className="text-sm text-stone-600">Ao final, realize um quiz avaliativo. Não é apenas um teste, mas uma fixação do conhecimento adquirido.</p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-lg border border-stone-100 shadow-sm text-center relative">
              <div className="w-16 h-16 bg-burgundy-50 text-burgundy-800 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-serif font-bold shadow-inner ring-4 ring-white">3</div>
              <h3 className="font-bold text-lg mb-2 text-burgundy-900">Reconhecimento</h3>
              <p className="text-sm text-stone-600">Emita seu certificado de honra, atestando sua dedicação e conclusão ética do conteúdo.</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- COURSE GRID --- */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-center gap-4 mb-12">
           <h2 className="text-2xl font-serif font-bold text-navy-800 uppercase tracking-widest border-l-4 border-burgundy-800 pl-4">Catálogo de Cursos</h2>
           <div className="h-px bg-stone-200 flex-1"></div>
        </div>

        {courses.length === 0 ? (
          <div className="text-center py-20 bg-stone-50 rounded-lg border border-dashed border-stone-300">
            <BookOpen size={48} className="mx-auto text-stone-300 mb-4" />
            <p className="text-xl text-stone-500 font-serif italic">Novos módulos estão sendo preparados.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {courses.map(course => (
              <Link to={`/course/${course.id}`} key={course.id} className="group block h-full">
                <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-stone-200 h-full flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-burgundy-100">
                  <div className="h-56 overflow-hidden relative">
                    <img src={course.coverImage} alt={course.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="text-xs font-bold uppercase tracking-wider bg-burgundy-800/90 px-2 py-1 rounded inline-block mb-2">Curso Online</p>
                    </div>
                  </div>
                  
                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="text-2xl font-serif font-bold text-navy-900 mb-3 leading-tight group-hover:text-burgundy-800 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-stone-600 mb-6 line-clamp-3 text-sm flex-1 leading-relaxed">
                      {course.description}
                    </p>
                    
                    <div className="flex items-center justify-between pt-6 border-t border-stone-100 mt-auto">
                      <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
                        <span className="bg-stone-100 px-2 py-1 rounded text-stone-600">{course.modules.length} Módulos</span>
                        {course.finalQuiz && <span className="text-burgundy-700 flex items-center gap-1"><Award size={12}/> Certificado</span>}
                      </div>
                      <span className="flex items-center gap-2 text-sm font-bold text-navy-800 group-hover:text-burgundy-800 transition-colors">
                        Iniciar <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* --- DISCLAIMER SECTION: Transparência e Ética --- */}
      <div className="bg-stone-100 border-t border-stone-200 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-shrink-0 bg-white p-4 rounded-full shadow-sm text-burgundy-800">
              <Shield size={32} />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-navy-900 mb-3">Sobre a Certificação e Validade</h3>
              <div className="prose prose-stone text-sm text-stone-600">
                <p className="mb-2">
                  <strong>Natureza Livre:</strong> Os cursos oferecidos nesta plataforma são de natureza livre, ministerial e eclesiástica. Eles visam o aprimoramento pessoal, teológico e espiritual.
                </p>
                <p className="mb-2">
                  <strong>Não-Reconhecimento MEC:</strong> Estes cursos <u>não</u> possuem reconhecimento pelo Ministério da Educação (MEC) ou vínculos com instituições acadêmicas seculares oficiais, não servindo para titulação de graduação ou pós-graduação <em>lato/stricto sensu</em>.
                </p>
                <p className="mb-2">
                  <strong>Compromisso de Honra:</strong> O certificado emitido é um atestado simbólico de honra. Ele declara, sob a luz da própria consciência e ética cristã do aluno, que o material foi acessado, estudado e a avaliação concluída com honestidade. O valor deste documento reside na integridade de quem o porta (1 Coríntios 4:2).
                </p>
                <p>
                  <strong>Investimento:</strong> Os cursos disponibilizados aqui são (e sempre serão) inteiramente gratuitos. Entretanto, caso você queira, voluntária e espontaneamente, colaborar com este trabalho, pode fazer um pix de qualquer valor para rrbiom@gmail.com. Muito obrigado e Deus abençoe.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
