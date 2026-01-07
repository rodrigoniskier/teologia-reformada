import React, { useState, useEffect } from 'react';
import { Course, Module, Lesson, Quiz } from '../../types';
import { getStorage, saveCourse, deleteCourse } from '../../services/storage';
import { Plus, Trash2, Edit, X, CheckCircle, Award, BookOpen } from '../ui/Icons';

export const AdminDashboard: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  useEffect(() => {
    const data = getStorage();
    setCourses(data.courses);
  }, []);

  const handleCreateCourse = () => {
    const newCourse: Course = {
      id: Date.now().toString(),
      title: 'Novo Curso',
      description: 'Descrição do curso...',
      author: 'Autor',
      coverImage: 'https://picsum.photos/800/400',
      modules: []
    };
    setEditingCourse(newCourse);
  };
{/* Dentro do return, procure o header onde está o botão Novo Curso */}
<div className="flex gap-2"> {/* Envolva os botões numa div flex */}
  <button 
    onClick={handleExportData}
    className="bg-stone-200 text-navy-900 px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-stone-300 shadow-md transition-all border border-stone-300"
  >
    {/* Ícone de Download ou similar */}
    Exportar JSON
  </button>

  <button 
    onClick={handleCreateCourse}
    className="bg-navy-800 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-navy-900 shadow-md transition-all"
  >
    <Plus size={20} /> Novo Curso
  </button>
</div>
  const handleSaveCourse = () => {
    if (editingCourse) {
      const updatedList = saveCourse(editingCourse);
      setCourses(updatedList);
      setEditingCourse(null);
    }
  };

  const handleDeleteCourse = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este curso?')) {
      const updatedList = deleteCourse(id);
      setCourses(updatedList);
    }
  };
// Função para copiar os dados para a área de transferência
  const handleExportData = () => {
    // Converte os cursos atuais em texto formatado JSON
    const dataString = JSON.stringify(courses, null, 2);
    
    // Copia para o clipboard do computador
    navigator.clipboard.writeText(dataString).then(() => {
      alert("DADOS COPIADOS!\n\nAgora vá no arquivo 'constants.ts' e substitua o valor de INITIAL_COURSES por este conteúdo que você acabou de copiar.\n\nNão esqueça de aumentar o número da versão!");
    }).catch(err => {
      console.error('Erro ao copiar', err);
      alert("Erro ao copiar. Veja o console.");
    });
  };
  if (editingCourse) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-stone-200">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-serif font-bold text-navy-900">Editor de Curso</h2>
          <div className="space-x-2">
            <button onClick={() => setEditingCourse(null)} className="px-4 py-2 text-stone-600 hover:text-stone-800">Cancelar</button>
            <button onClick={handleSaveCourse} className="px-4 py-2 bg-burgundy-800 text-white rounded hover:bg-burgundy-900 flex items-center gap-2">
              <CheckCircle size={18} /> Salvar
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid gap-4">
            <label className="block">
              <span className="text-stone-700 font-semibold">Título do Curso</span>
              <input 
                type="text" 
                value={editingCourse.title} 
                onChange={e => setEditingCourse({...editingCourse, title: e.target.value})}
                className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-burgundy-500 focus:ring focus:ring-burgundy-200 p-2 border"
              />
            </label>
            <label className="block">
              <span className="text-stone-700 font-semibold">Descrição</span>
              <textarea 
                value={editingCourse.description} 
                onChange={e => setEditingCourse({...editingCourse, description: e.target.value})}
                className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-burgundy-500 focus:ring focus:ring-burgundy-200 p-2 border"
                rows={3}
              />
            </label>
            <label className="block">
              <span className="text-stone-700 font-semibold">URL da Imagem de Capa</span>
              <input 
                type="text" 
                value={editingCourse.coverImage} 
                onChange={e => setEditingCourse({...editingCourse, coverImage: e.target.value})}
                className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-burgundy-500 focus:ring focus:ring-burgundy-200 p-2 border"
              />
            </label>
          </div>

          <div className="border-t pt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-serif font-semibold text-navy-800">Módulos</h3>
              <button 
                onClick={() => setEditingCourse({
                  ...editingCourse, 
                  modules: [...editingCourse.modules, { id: Date.now().toString(), title: 'Novo Módulo', lessons: [] }]
                })}
                className="text-sm px-3 py-1 bg-navy-800 text-white rounded flex items-center gap-1 hover:bg-navy-900"
              >
                <Plus size={14} /> Adicionar Módulo
              </button>
            </div>

            {editingCourse.modules.map((mod, mIndex) => (
              <div key={mod.id} className="mb-6 p-4 bg-stone-50 rounded border border-stone-200">
                <div className="flex justify-between items-center mb-3">
                  <input 
                    value={mod.title}
                    onChange={e => {
                      const newModules = [...editingCourse.modules];
                      newModules[mIndex].title = e.target.value;
                      setEditingCourse({...editingCourse, modules: newModules});
                    }}
                    className="font-semibold text-lg bg-transparent border-b border-dashed border-stone-400 focus:outline-none focus:border-burgundy-500 w-full mr-4"
                  />
                  <button 
                    onClick={() => {
                      const newModules = editingCourse.modules.filter(m => m.id !== mod.id);
                      setEditingCourse({...editingCourse, modules: newModules});
                    }}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="space-y-2 pl-4 border-l-2 border-stone-300">
                  {mod.lessons.map((lesson, lIndex) => (
                    <div key={lesson.id} className="flex gap-2 items-center">
                      <select 
                        value={lesson.type}
                        onChange={e => {
                          const newModules = [...editingCourse.modules];
                          newModules[mIndex].lessons[lIndex].type = e.target.value as any;
                          setEditingCourse({...editingCourse, modules: newModules});
                        }}
                        className="text-xs p-1 border rounded"
                      >
                        <option value="article">Artigo</option>
                        <option value="video">Vídeo</option>
                        <option value="audio">Áudio</option>
                        <option value="slide">Slide</option>
                      </select>
                      <input 
                        value={lesson.title}
                        onChange={e => {
                          const newModules = [...editingCourse.modules];
                          newModules[mIndex].lessons[lIndex].title = e.target.value;
                          setEditingCourse({...editingCourse, modules: newModules});
                        }}
                        className="flex-1 text-sm p-1 border rounded"
                        placeholder="Título da Aula"
                      />
                      <input 
                        value={lesson.content}
                        onChange={e => {
                          const newModules = [...editingCourse.modules];
                          newModules[mIndex].lessons[lIndex].content = e.target.value;
                          setEditingCourse({...editingCourse, modules: newModules});
                        }}
                        className="flex-1 text-sm p-1 border rounded"
                        placeholder="Conteúdo (Texto ou LInk PDF)"
                      />
                      <button 
                        onClick={() => {
                          const newModules = [...editingCourse.modules];
                          newModules[mIndex].lessons = newModules[mIndex].lessons.filter(l => l.id !== lesson.id);
                          setEditingCourse({...editingCourse, modules: newModules});
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  <button 
                    onClick={() => {
                      const newModules = [...editingCourse.modules];
                      newModules[mIndex].lessons.push({
                        id: Date.now().toString(),
                        title: 'Nova Aula',
                        type: 'article',
                        content: ''
                      });
                      setEditingCourse({...editingCourse, modules: newModules});
                    }}
                    className="text-xs text-navy-700 hover:underline mt-2 flex items-center gap-1"
                  >
                    <Plus size={12} /> Adicionar Aula
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-6 bg-burgundy-50 p-4 rounded">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-serif font-semibold text-burgundy-900">Exame de Certificação (Quiz Final)</h3>
              {!editingCourse.finalQuiz && (
                <button 
                  onClick={() => setEditingCourse({
                    ...editingCourse, 
                    finalQuiz: { id: Date.now().toString(), title: 'Exame Final', questions: [], passingScore: 80 }
                  })}
                  className="text-sm px-3 py-1 bg-burgundy-800 text-white rounded hover:bg-burgundy-900"
                >
                  Criar Quiz
                </button>
              )}
            </div>

            {editingCourse.finalQuiz && (
              <div className="space-y-4">
                 <label className="flex items-center gap-2">
                    <span className="font-semibold text-sm">Nota de Corte (%):</span>
                    <input 
                      type="number"
                      value={editingCourse.finalQuiz.passingScore}
                      onChange={e => setEditingCourse({
                        ...editingCourse,
                        finalQuiz: { ...editingCourse.finalQuiz!, passingScore: Number(e.target.value) }
                      })}
                      className="w-20 p-1 border rounded"
                    />
                 </label>
                 
                 {editingCourse.finalQuiz.questions.map((q, qIndex) => (
                   <div key={q.id} className="bg-white p-3 rounded shadow-sm border border-burgundy-100">
                      <div className="flex justify-between mb-2">
                        <span className="text-xs font-bold text-burgundy-800">Questão {qIndex + 1}</span>
                        <button 
                           onClick={() => {
                              const newQuiz = {...editingCourse.finalQuiz!};
                              newQuiz.questions = newQuiz.questions.filter(qu => qu.id !== q.id);
                              setEditingCourse({...editingCourse, finalQuiz: newQuiz});
                           }}
                           className="text-red-500"
                        ><Trash2 size={14}/></button>
                      </div>
                      <input 
                        className="w-full mb-2 p-1 border rounded text-sm"
                        value={q.text}
                        onChange={e => {
                           const newQuiz = {...editingCourse.finalQuiz!};
                           newQuiz.questions[qIndex].text = e.target.value;
                           setEditingCourse({...editingCourse, finalQuiz: newQuiz});
                        }}
                        placeholder="Enunciado da questão"
                      />
                      <div className="space-y-1 pl-4">
                        {q.options.map((opt, oIndex) => (
                           <div key={oIndex} className="flex gap-2 items-center">
                              <input 
                                type="radio" 
                                name={`correct-${q.id}`} 
                                checked={q.correctOptionIndex === oIndex}
                                onChange={() => {
                                   const newQuiz = {...editingCourse.finalQuiz!};
                                   newQuiz.questions[qIndex].correctOptionIndex = oIndex;
                                   setEditingCourse({...editingCourse, finalQuiz: newQuiz});
                                }}
                              />
                              <input 
                                value={opt}
                                onChange={e => {
                                   const newQuiz = {...editingCourse.finalQuiz!};
                                   newQuiz.questions[qIndex].options[oIndex] = e.target.value;
                                   setEditingCourse({...editingCourse, finalQuiz: newQuiz});
                                }}
                                className="flex-1 p-1 border rounded text-xs"
                                placeholder={`Opção ${oIndex + 1}`}
                              />
                           </div>
                        ))}
                      </div>
                   </div>
                 ))}
                 
                 <button 
                    onClick={() => {
                       const newQuiz = {...editingCourse.finalQuiz!};
                       newQuiz.questions.push({
                          id: Date.now().toString(),
                          text: '',
                          options: ['','','',''],
                          correctOptionIndex: 0
                       });
                       setEditingCourse({...editingCourse, finalQuiz: newQuiz});
                    }}
                    className="text-xs text-burgundy-700 hover:underline flex items-center gap-1"
                 >
                   <Plus size={12} /> Adicionar Questão
                 </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-navy-900">Painel Administrativo</h1>
          <p className="text-stone-600">Gerencie minicursos, módulos e certificações.</p>
        </div>
        <button 
          onClick={handleCreateCourse}
          className="bg-navy-800 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-navy-900 shadow-md transition-all"
        >
          <Plus size={20} /> Novo Curso
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course.id} className="bg-white rounded-lg shadow border border-stone-200 overflow-hidden group">
            <div className="h-40 bg-stone-200 overflow-hidden relative">
              <img src={course.coverImage} alt={course.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button 
                  onClick={() => setEditingCourse(course)}
                  className="bg-white p-2 rounded-full text-navy-900 hover:bg-stone-100"
                >
                  <Edit size={20} />
                </button>
                <button 
                  onClick={() => handleDeleteCourse(course.id)}
                  className="bg-red-600 p-2 rounded-full text-white hover:bg-red-700"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-serif font-bold text-xl text-navy-900 mb-2">{course.title}</h3>
              <p className="text-sm text-stone-600 line-clamp-2">{course.description}</p>
              <div className="mt-4 flex items-center gap-4 text-xs text-stone-500">
                <span className="flex items-center gap-1"><BookOpen size={14} /> {course.modules.length} Módulos</span>
                {course.finalQuiz && <span className="flex items-center gap-1 text-burgundy-700"><Award size={14} /> Certificado</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
