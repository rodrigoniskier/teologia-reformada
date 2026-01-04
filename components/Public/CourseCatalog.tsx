import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Course } from '../../types';
import { getStorage } from '../../services/storage';
import { BookOpen, Video, ArrowRight } from '../ui/Icons';

export const CourseCatalog: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const data = getStorage();
    setCourses(data.courses);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-navy-900 text-parchment py-20 px-8 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/dark-matter.png")' }}></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 tracking-tight">Cursos de Teologia Reformada</h1>
          <h2 className="font-serif text-2xl md:text-3xl text-burgundy-400 mb-6 italic">Rodrigo Niskier</h2>
          <p className="text-xl md:text-2xl text-stone-300 font-serif italic mb-8">
            "Post Tenebras Lux" — Aprendizado teológico profundo para a mente e o coração.
          </p>
          <div className="w-24 h-1 bg-burgundy-600 mx-auto rounded"></div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="flex items-center gap-4 mb-12">
           <div className="h-px bg-stone-300 flex-1"></div>
           <h2 className="text-2xl font-serif font-bold text-navy-800 uppercase tracking-widest">Cursos Disponíveis</h2>
           <div className="h-px bg-stone-300 flex-1"></div>
        </div>

        {courses.length === 0 ? (
          <div className="text-center py-20 text-stone-500">
            <p className="text-xl">Nenhum curso disponível no momento.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map(course => (
              <Link to={`/course/${course.id}`} key={course.id} className="group block h-full">
                <div className="bg-white rounded-lg overflow-hidden shadow-md border border-stone-200 h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="h-48 overflow-hidden relative">
                    <img src={course.coverImage} alt={course.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-navy-900/20 group-hover:bg-navy-900/0 transition-colors"></div>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="mb-2 flex items-center gap-2 text-xs font-bold text-burgundy-700 uppercase tracking-wide">
                      <Video size={12} /> Curso Online
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-navy-900 mb-3 leading-tight group-hover:text-burgundy-800 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-stone-600 mb-6 line-clamp-3 text-sm flex-1">
                      {course.description}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-stone-100 mt-auto">
                      <span className="text-xs text-stone-500 font-serif italic">Por {course.author}</span>
                      <span className="flex items-center gap-1 text-sm font-bold text-navy-800 group-hover:translate-x-1 transition-transform">
                        Acessar <ArrowRight size={16} />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};