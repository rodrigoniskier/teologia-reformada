import React from 'react';
import { Course } from '../../types';
import { Award, Printer, ShieldCheck } from '../ui/Icons';

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
    <div className="flex flex-col items-center animate-fade-in bg-stone-100 min-h-screen p-8">
      {/* Screen Controls */}
      <div className="mb-8 flex gap-4 no-print">
        <button 
          onClick={handlePrint}
          className="bg-navy-800 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-navy-900 flex items-center gap-2 font-semibold transition-transform active:scale-95"
        >
          <Printer size={20} /> Imprimir / Salvar PDF
        </button>
      </div>

      {/* Certificate Container */}
      <div className="relative bg-white text-center text-navy-900 p-16 border-[16px] border-double border-burgundy-900 w-full max-w-[1100px] aspect-[1.414] shadow-2xl mx-auto print:shadow-none print:w-full print:h-full print:max-w-none print:border-[10px] print:m-0 print:absolute print:inset-0 print:aspect-auto flex flex-col">
        
        {/* Marca d'água de fundo (opcional/decorativa) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
            <Award size={400} />
        </div>

        {/* Decorative Corners */}
        <div className="absolute top-6 left-6 w-24 h-24 border-t-4 border-l-4 border-burgundy-800" />
        <div className="absolute top-6 right-6 w-24 h-24 border-t-4 border-r-4 border-burgundy-800" />
        <div className="absolute bottom-6 left-6 w-24 h-24 border-b-4 border-l-4 border-burgundy-800" />
        <div className="absolute bottom-6 right-6 w-24 h-24 border-b-4 border-r-4 border-burgundy-800" />

        {/* Header */}
        <div className="mb-10 text-burgundy-800 relative z-10">
           <Award size={72} className="mx-auto" />
           <h1 className="font-serif text-6xl font-bold mt-6 uppercase tracking-[0.15em] text-burgundy-900">Certificado</h1>
           <p className="font-serif text-xl italic text-stone-500 mt-2">de Conclusão de Curso Livre</p>
        </div>
        
        {/* Body */}
        <div className="flex-1 flex flex-col justify-center relative z-10">
            <p className="font-serif italic text-2xl text-stone-600 mb-8">Certificamos, para os devidos fins, que</p>
            
            <h2 className="font-serif text-5xl font-bold text-navy-900 mb-4 pb-4 border-b-2 border-stone-300 inline-block mx-auto min-w-[60%]">
            {studentName}
            </h2>
            
            <p className="font-serif italic text-2xl text-stone-600 mt-8 mb-6">
                concluiu com êxito o fluxo de aprendizado e avaliação do curso
            </p>
            
            <h3 className="font-serif text-4xl font-bold text-navy-800 mb-4">{course.title}</h3>
            <p className="text-stone-500 font-serif">ministrado na plataforma de Cursos de Teologia Reformada - Rodrigo Niskier.</p>
        </div>
        
        {/* Signatures */}
        <div className="flex justify-between w-full px-20 mt-16 relative z-10">
          <div className="text-center">
            <p className="font-serif font-bold text-xl mb-2">{completedDate}</p>
            <div className="w-64 border-t border-navy-900 mb-2 mx-auto"></div>
            <p className="font-sans text-xs uppercase tracking-widest text-stone-500 font-bold">Data de Emissão</p>
          </div>
          
          <div className="text-center">
             <div className="w-64 border-t border-navy-900 mb-2 mx-auto relative h-12 flex items-end justify-center">
                {/* Espaço para assinatura digital ou imagem */}
                <span className="font-serif text-3xl italic text-burgundy-900 font-bold opacity-80">Rodrigo Niskier</span>
             </div>
            <p className="font-sans text-xs uppercase tracking-widest text-stone-500 font-bold">Diretor Acadêmico</p>
          </div>
        </div>

        {/* Disclaimer Footer (Required by User) */}
        <div className="mt-12 pt-6 border-t border-stone-200 text-center relative z-10">
            <div className="flex items-center justify-center gap-2 text-stone-400 mb-1">
                <ShieldCheck size={14} />
                <span className="text-[10px] uppercase font-bold tracking-wider">Declaração de Validade</span>
            </div>
            <p className="text-[10px] text-stone-500 leading-tight max-w-3xl mx-auto font-sans text-justify">
                Este certificado comprova o acesso ao material didático, o cumprimento do fluxo pedagógico e a aprovação na avaliação final por parte do aluno supracitado. 
                O portador declara, por sua própria consciência e ética diante de Deus, ter cumprido honestamente os requisitos. 
                Este documento não possui reconhecimento pelo MEC ou instituições governamentais, tratando-se de um curso livre de caráter cultural e eclesiástico.
            </p>
        </div>

      </div>
    </div>
  );
};
