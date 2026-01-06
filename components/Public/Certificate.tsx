import React from 'react';
import { Course } from '../../types';
import { Award, Printer } from '../ui/Icons';

interface CertificateProps {
  course: Course;
  studentName: string;
  completedDate: string;
}

export const Certificate: React.FC<CertificateProps> = ({ course, studentName, completedDate }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col items-center animate-fade-in">
      {/* Screen Controls */}
      <div className="mb-6 flex gap-4 no-print">
        <button 
          onClick={handlePrint}
          className="bg-navy-800 text-white px-6 py-3 rounded-lg shadow hover:bg-navy-900 flex items-center gap-2"
        >
          <Printer size={20} /> Imprimir / Salvar PDF
        </button>
      </div>

      {/* Certificate Container - Scaled for screen, Fixed for Print */}
      <div className="relative bg-white text-center text-navy-900 p-12 border-8 border-double border-burgundy-800 w-full max-w-[800px] aspect-[1.414] shadow-2xl mx-auto print:shadow-none print:w-full print:h-full print:max-w-none print:border-8 print:m-0 print:absolute print:inset-0 print:aspect-auto flex flex-col justify-center items-center">
        
        {/* Decorative Corners */}
        <div className="absolute top-4 left-4 w-16 h-16 border-t-4 border-l-4 border-burgundy-900" />
        <div className="absolute top-4 right-4 w-16 h-16 border-t-4 border-r-4 border-burgundy-900" />
        <div className="absolute bottom-4 left-4 w-16 h-16 border-b-4 border-l-4 border-burgundy-900" />
        <div className="absolute bottom-4 right-4 w-16 h-16 border-b-4 border-r-4 border-burgundy-900" />

        {/* Content */}
        <div className="mb-8 text-burgundy-800">
           <Award size={64} className="mx-auto opacity-80" />
        </div>
        
        <h1 className="font-serif text-5xl font-bold mb-4 uppercase tracking-wider text-burgundy-900">Certificado de Conclusão</h1>
        
        <p className="font-serif italic text-xl text-stone-600 mb-8">Este documento certifica que</p>
        
        <h2 className="font-serif text-4xl font-bold text-navy-900 mb-2 border-b-2 border-stone-300 pb-2 px-12 inline-block min-w-[50%]">
          {studentName}
        </h2>
        
        <p className="font-serif italic text-xl text-stone-600 mt-8 mb-4">completou satisfatoriamente o curso</p>
        
        <h3 className="font-serif text-3xl font-bold text-navy-800 mb-12">{course.title}</h3>
        
        <div className="flex justify-between w-full px-16 mt-auto pt-12">
          <div className="text-center">
            <div className="w-48 border-t border-navy-900 mb-2 mx-auto"></div>
            <p className="font-sans text-sm uppercase tracking-widest text-stone-500">Data</p>
            <p className="font-serif font-bold">{completedDate}</p>
          </div>
          
          <div className="text-center">
             <div className="w-48 border-t border-navy-900 mb-2 mx-auto relative">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Signature_sample.svg/1200px-Signature_sample.svg.png" className="h-12 absolute -top-10 left-10 opacity-70 grayscale" alt="signature" />
             </div>
            <p className="font-sans text-sm uppercase tracking-widest text-stone-500">Diretor Acadêmico</p>
            <p className="font-serif font-bold">Cursos de Teologia Reformada - Rodrigo Niskier</p>
          </div>
        </div>
      </div>
    </div>
  );
};
