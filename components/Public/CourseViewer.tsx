import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Course, Lesson } from '../../types';
import { getStorage, saveProgress, getCourseProgress } from '../../services/storage';
import { Video, FileText, Mic, MonitorPlay, ArrowLeft, ArrowRight, CheckCircle, Lock } from '../ui/Icons';
import { Certificate } from './Certificate';

export const CourseViewer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  
  // Quiz State
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [studentName, setStudentName] = useState('');
  const [showCertificate, setShowCertificate] = useState(false);

  useEffect(() => {
    const data = getStorage();
    const foundCourse = data.courses.find(c => c.id === id);
    if (foundCourse) {
      setCourse(foundCourse);
      const progress = getCourseProgress(foundCourse.id);
      if (progress) {
        setCompletedLessons(progress.completedLessonIds);
        if (progress.quizScore !== undefined) setQuizScore(progress.quizScore);
        if (progress.studentName) setStudentName(progress.studentName);
      }
    }
  }, [id]);

  const handleLessonComplete = () => {
    if (!course) return;
    const currentLesson = course.modules[activeModuleIndex]?.lessons[activeLessonIndex];
    if (currentLesson && !completedLessons.includes(currentLesson.id)) {
      const newCompleted = [...completedLessons, currentLesson.id];
      setCompletedLessons(newCompleted);
      saveProgress({
        courseId: course.id,
        completedLessonIds: newCompleted,
        quizScore: quizScore || undefined,
        studentName: studentName || undefined
      });
    }
  };

  const handleNext = () => {
    if (!course) return;
    handleLessonComplete();

    const currentModule = course.modules[activeModuleIndex];
    
    // Check if more lessons in current module
    if (activeLessonIndex < currentModule.lessons.length - 1) {
      setActiveLessonIndex(activeLessonIndex + 1);
    } 
    // Check if more modules
    else if (activeModuleIndex < course.modules.length - 1) {
      setActiveModuleIndex(activeModuleIndex + 1);
      setActiveLessonIndex(0);
    } 
    // Reached end of content, show quiz entry if available
    else if (course.finalQuiz) {
       setShowQuiz(true);
    }
  };

  const handleQuizSubmit = () => {
    if (!course || !course.finalQuiz) return;
    
    let correctCount = 0;
    course.finalQuiz.questions.forEach(q => {
      if (quizAnswers[q.id] === q.correctOptionIndex) correctCount++;
    });

    const score = (correctCount / course.finalQuiz.questions.length) * 100;
    setQuizScore(score);
    
    saveProgress({
      courseId: course.id,
      completedLessonIds: completedLessons,
      quizScore: score,
      studentName: studentName || undefined
    });
  };

  const renderContent = (lesson: Lesson) => {
    switch (lesson.type) {
      case 'video':
        return (
          <div className="aspect-video w-full bg-black rounded-lg overflow-hidden shadow-lg">
             <iframe className="w-full h-full" src={lesson.content} title={lesson.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </div>
        );
      
      case 'article':
        // Verifica se o conteúdo é um PDF
        const isPdf = lesson.content.trim().toLowerCase().endsWith('.pdf');
        if (isPdf) {
          return (
            <div className="w-full h-[80vh] bg-stone-100 rounded-lg shadow border border-stone-200 overflow-hidden">
               <iframe 
                 src={lesson.content} 
                 className="w-full h-full" 
                 title={lesson.title}
               >
                 <div className="flex flex-col items-center justify-center h-full text-stone-500 gap-4">
                    <p>Seu navegador não suporta a visualização direta.</p>
                    <a 
                      href={lesson.content} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-burgundy-800 underline font-bold"
                    >
                      Clique aqui para baixar o PDF
                    </a>
                 </div>
               </iframe>
            </div>
          );
        }
        return (
          <div className="prose prose-lg prose-stone max-w-none font-body bg-white p-8 rounded-lg shadow border border-stone-100">
            <p className="whitespace-pre-wrap">{lesson.content}</p>
          </div>
        );

      case 'audio':
        return (
          <div className="bg-stone-100 p-8 rounded-lg flex flex-col items-center justify-center gap-4">
             <Mic size={48} className="text-burgundy-800" />
             <audio controls src={lesson.content} className="w-full max-w-md" />
          </div>
        );

      case 'slide':
        // Lógica unificada para Slides (PDF ou Web)
        const isSlidePdf = lesson.content.trim().toLowerCase().endsWith('.pdf');

        if (isSlidePdf) {
          return (
            <div className="w-full h-[80vh] bg-stone-100 rounded-lg shadow border border-stone-200 overflow-hidden">
               <iframe 
                 src={lesson.content} 
                 className="w-full h-full" 
                 title={lesson.title}
               >
                 <div className="flex flex-col items-center justify-center h-full text-stone-500 gap-4">
                    <p>Seu navegador não suporta a visualização direta.</p>
                    <a 
                      href={lesson.content} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-burgundy-800 underline font-bold"
                    >
                      Clique aqui para baixar os Slides
                    </a>
                 </div>
               </iframe>
            </div>
          );
        }

        return (
          <div className="aspect-video w-full bg-stone-900 rounded-lg overflow-hidden shadow-lg flex items-center justify-center">
             {lesson.content.startsWith('http') ? (
               <iframe className="w-full h-full" src={lesson.content} title={lesson.title} frameBorder="0" allowFullScreen></iframe>
             ) : (
               <div className="text-white p-12 text-center">
                  <MonitorPlay size={48} className="mx-auto mb-4 opacity-50" />
                  <span>{lesson.content}</span>
               </div>
             )}
          </div>
        );

      default:
        return <div>Unsupported Content</div>;
    }
  };

  if (!course) return <div className="p-8 text-center">Carregando curso...</div>;

  // Render Certificate View
  if (showCertificate && quizScore !== null && quizScore >= (course.finalQuiz?.passingScore || 80)) {
     return (
       <div className="min-h-screen bg-parchment p-8">
          <Link to="/" className="inline-flex items-center text-burgundy-800 mb-8 font-serif italic no-print hover:underline">
            <ArrowLeft size={16} className="mr-2" /> Voltar ao Início
          </Link>
          <Certificate 
            course={course} 
            studentName={studentName} 
            completedDate={new Date().toLocaleDateString('pt-BR')} 
          />
       </div>
     )
  }

  // Render Quiz View
  if (showQuiz && course.finalQuiz) {
    const isPassed = quizScore !== null && quizScore >= course.finalQuiz.passingScore;
    
    return (
      <div className="max-w-3xl mx-auto p-8">
        <div className="mb-8">
           <button onClick={() => setShowQuiz(false)} className="text-stone-500 flex items-center gap-2 hover:text-stone-800">
             <ArrowLeft size={16} /> Voltar para Aulas
           </button>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-xl border-t-4 border-burgundy-800">
          <h1 className="text-3xl font-serif font-bold text-navy-900 mb-2">{course.finalQuiz.title}</h1>
          <p className="text-stone-600 mb-8">Complete o exame com nota superior a {course.finalQuiz.passingScore}% para receber seu certificado.</p>
          
          {quizScore === null ? (
            <div className="space-y-8">
              {course.finalQuiz.questions.map((q, idx) => (
                <div key={q.id} className="p-4 bg-stone-50 rounded border border-stone-200">
                  <p className="font-semibold text-lg mb-4 text-navy-800">{idx + 1}. {q.text}</p>
                  <div className="space-y-2">
                    {q.options.map((opt, oIdx) => (
                      <label key={oIdx} className="flex items-center gap-3 p-3 bg-white rounded border border-stone-200 cursor-pointer hover:bg-stone-50 transition-colors">
                        <input 
                          type="radio" 
                          name={q.id} 
                          checked={quizAnswers[q.id] === oIdx}
                          onChange={() => setQuizAnswers({...quizAnswers, [q.id]: oIdx})}
                          className="text-burgundy-800 focus:ring-burgundy-500"
                        />
                        <span className="text-stone-700">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
              
              <div className="pt-4">
                 <button 
                  onClick={handleQuizSubmit}
                  className="w-full bg-navy-800 text-white py-3 rounded font-semibold hover:bg-navy-900 shadow-lg"
                 >
                   Finalizar Exame
                 </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
               <div className={`text-6xl font-bold mb-4 ${isPassed ? 'text-green-600' : 'text-red-600'}`}>
                 {quizScore.toFixed(0)}%
               </div>
               <h3 className="text-2xl font-serif font-bold mb-4">
                 {isPassed ? 'Parabéns! Você foi aprovado.' : 'Nota insuficiente. Tente novamente.'}
               </h3>
               
               {isPassed ? (
                 <div className="max-w-md mx-auto mt-8 animate-fade-in">
                    <p className="mb-4 text-stone-600">Digite seu nome completo para o certificado:</p>
                    <input 
                      type="text" 
                      value={studentName}
                      onChange={e => setStudentName(e.target.value)}
                      placeholder="Seu Nome Completo"
                      className="w-full p-3 border border-stone-300 rounded mb-4 text-center text-lg font-serif"
                    />
                    <button 
                      disabled={!studentName.trim()}
                      onClick={() => {
                        saveProgress({
                          courseId: course.id,
                          completedLessonIds: completedLessons,
                          quizScore: quizScore,
                          studentName: studentName
                        });
                        setShowCertificate(true);
                      }}
                      className="w-full bg-burgundy-800 text-white py-3 rounded disabled:opacity-50 hover:bg-burgundy-900"
                    >
                      Gerar Certificado
                    </button>
                 </div>
               ) : (
                 <button 
                   onClick={() => {
                     setQuizScore(null);
                     setQuizAnswers({});
                   }}
                   className="mt-4 px-6 py-2 border border-navy-800 text-navy-800 rounded hover:bg-navy-50"
                 >
                   Tentar Novamente
                 </button>
               )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Standard Lesson View
  const activeModule = course.modules[activeModuleIndex];
  const activeLesson = activeModule?.lessons[activeLessonIndex];

  return (
    <div className="flex h-screen overflow-hidden bg-parchment">
      {/* Sidebar */}
      <aside className="w-80 flex-shrink-0 bg-white border-r border-stone-200 overflow-y-auto flex flex-col">
        <div className="p-6 border-b border-stone-100">
          <Link to="/" className="text-stone-500 hover:text-burgundy-800 flex items-center gap-2 text-sm mb-4">
            <ArrowLeft size={14} /> Voltar ao Catálogo
          </Link>
          <h2 className="font-serif font-bold text-xl text-navy-900 leading-tight">{course.title}</h2>
          <div className="mt-4 w-full bg-stone-200 rounded-full h-2">
            <div 
              className="bg-burgundy-600 h-2 rounded-full transition-all duration-500" 
              style={{ width: `${(completedLessons.length / course.modules.reduce((acc, m) => acc + m.lessons.length, 0)) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div className="flex-1 py-4">
          {course.modules.map((mod, mIdx) => (
            <div key={mod.id} className="mb-6">
              <h3 className="px-6 font-serif font-semibold text-stone-800 mb-2 text-sm uppercase tracking-wider">{mod.title}</h3>
              <ul>
                {mod.lessons.map((lesson, lIdx) => {
                  const isActive = mIdx === activeModuleIndex && lIdx === activeLessonIndex;
                  const isCompleted = completedLessons.includes(lesson.id);
                  
                  return (
                    <li key={lesson.id}>
                      <button 
                        onClick={() => {
                          setActiveModuleIndex(mIdx);
                          setActiveLessonIndex(lIdx);
                          setShowQuiz(false);
                        }}
                        className={`w-full text-left px-6 py-3 flex items-center gap-3 transition-colors ${isActive ? 'bg-burgundy-50 border-r-4 border-burgundy-800' : 'hover:bg-stone-50'}`}
                      >
                        <div className={`flex-shrink-0 ${isCompleted ? 'text-green-600' : (isActive ? 'text-burgundy-800' : 'text-stone-400')}`}>
                          {isCompleted ? <CheckCircle size={18} /> : 
                            (lesson.type === 'video' ? <Video size={18} /> : 
                             lesson.type === 'audio' ? <Mic size={18} /> : 
                             lesson.type === 'slide' ? <MonitorPlay size={18} /> : <FileText size={18} />)
                          }
                        </div>
                        <span className={`text-sm ${isActive ? 'font-semibold text-navy-900' : 'text-stone-600'}`}>{lesson.title}</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}

          {course.finalQuiz && (
            <div className="mt-4 px-6 border-t pt-4">
              <button 
                 onClick={() => setShowQuiz(true)}
                 disabled={course.modules.some(m => m.lessons.some(l => !completedLessons.includes(l.id)))}
                 className={`w-full flex items-center justify-between p-3 rounded border ${showQuiz ? 'border-burgundy-800 bg-burgundy-50' : 'border-stone-200'} ${course.modules.some(m => m.lessons.some(l => !completedLessons.includes(l.id))) ? 'opacity-50 cursor-not-allowed' : 'hover:border-burgundy-300'}`}
              >
                <div className="flex items-center gap-2 font-serif font-bold text-burgundy-900">
                  <CheckCircle size={18} /> Exame Final
                </div>
                {course.modules.some(m => m.lessons.some(l => !completedLessons.includes(l.id))) && <Lock size={14} className="text-stone-400"/>}
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 lg:p-12 flex flex-col">
         {activeLesson ? (
           <div className="max-w-4xl mx-auto w-full animate-fade-in">
              <div className="mb-6">
                <span className="text-burgundy-600 text-sm font-bold uppercase tracking-widest">{activeModule.title}</span>
                <h1 className="text-3xl lg:text-4xl font-serif font-bold text-navy-900 mt-2">{activeLesson.title}</h1>
              </div>
              
              <div className="mb-8">
                {renderContent(activeLesson)}
              </div>
              
              <div className="flex justify-end pt-8 border-t border-stone-300">
                <button 
                  onClick={handleNext}
                  className="bg-navy-800 text-white px-8 py-3 rounded-lg flex items-center gap-2 hover:bg-navy-900 shadow-lg transform transition active:scale-95"
                >
                   {activeLessonIndex === activeModule.lessons.length - 1 && activeModuleIndex === course.modules.length - 1 ? 'Ir para o Exame' : 'Próxima Aula'} 
                   <ArrowRight size={20} />
                </button>
              </div>
           </div>
         ) : (
           <div className="flex-1 flex items-center justify-center text-stone-400">
             Selecione uma aula
           </div>
         )}
      </main>
    </div>
  );
};
