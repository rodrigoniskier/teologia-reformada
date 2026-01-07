import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, User, Menu, X, Instagram, Linkedin, Mail, Shield, MessageCircle } from './ui/Icons';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<'none' | 'confession' | 'contact'>('none');

  const openModal = (type: 'confession' | 'contact') => {
    setActiveModal(type);
    setIsMenuOpen(false); // Fecha o menu mobile se estiver aberto
  };

  const closeModal = () => setActiveModal('none');

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans text-stone-800">
      
      {/* --- HEADER --- */}
      <header className="bg-navy-900 text-white shadow-lg sticky top-0 z-40 border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-burgundy-700 p-2 rounded-lg group-hover:bg-burgundy-600 transition-colors">
              <BookOpen size={24} className="text-white" />
            </div>
            <div>
              <h1 className="font-serif text-xl font-bold leading-none tracking-wide">Teologia Reformada</h1>
              <p className="text-xs text-stone-400 font-medium tracking-widest uppercase group-hover:text-stone-300 transition-colors">Soli Deo Gloria</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <button 
              onClick={() => openModal('confession')}
              className="text-stone-300 hover:text-white transition-colors flex items-center gap-2"
            >
              <Shield size={16} /> Confissão de Fé
            </button>
            <button 
              onClick={() => openModal('contact')}
              className="text-stone-300 hover:text-white transition-colors flex items-center gap-2"
            >
              <MessageCircle size={16} /> Contato
            </button>
            <Link to="/admin" className="bg-stone-800 hover:bg-stone-700 px-4 py-2 rounded-full transition-all flex items-center gap-2 border border-stone-700">
              <User size={16} /> Área do Aluno
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-stone-300" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-navy-800 border-t border-navy-700 p-6 space-y-4 animate-fade-in">
             <button 
              onClick={() => openModal('confession')} 
              className="block w-full text-left py-3 text-stone-300 border-b border-navy-700"
            >
              Confissão de Fé
            </button>
            <button 
              onClick={() => openModal('contact')} 
              className="block w-full text-left py-3 text-stone-300 border-b border-navy-700"
            >
              Contato
            </button>
            <Link to="/admin" className="block py-3 text-stone-300">Área do Aluno</Link>
          </div>
        )}
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 relative z-0">
        {children}
      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-stone-900 text-stone-400 py-12 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-sm">
          <div>
            <h3 className="text-white font-serif font-bold text-lg mb-4">Sobre o Projeto</h3>
            <p className="leading-relaxed mb-4">
              Dedicado a fornecer ensino teológico sólido, confessional e acessível. Nossa missão é edificar a igreja através do conhecimento profundo das Escrituras e da tradição reformada.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/rodrigo_niskier/" target="_blank" rel="noopener noreferrer" className="hover:text-burgundy-400 transition-colors"><Instagram size={20} /></a>
              <a href="https://www.linkedin.com/in/rodrigo-niskier-200549156/" target="_blank" rel="noopener noreferrer" className="hover:text-burgundy-400 transition-colors"><Linkedin size={20} /></a>
              <a href="mailto:niskier.rodrigo@gmail.com" className="hover:text-burgundy-400 transition-colors"><Mail size={20} /></a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-serif font-bold text-lg mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-white transition-colors">Início</Link></li>
              <li><button onClick={() => openModal('confession')} className="hover:text-white transition-colors">Nossa Confissão</button></li>
              <li><button onClick={() => openModal('contact')} className="hover:text-white transition-colors">Fale Conosco</button></li>
              <li><Link to="/admin" className="hover:text-white transition-colors">Portal do Aluno</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-serif font-bold text-lg mb-4">Legal</h3>
            <p className="mb-2">© {new Date().getFullYear()} Rodrigo Niskier. Todos os direitos reservados.</p>
            <p className="text-xs text-stone-600">
              Este site não possui vínculos governamentais. O conteúdo é de natureza confessional e eclesiástica.
            </p>
          </div>
        </div>
      </footer>

      {/* --- MODALS --- */}
      
      {/* 1. CONFISSÃO DE FÉ MODAL */}
      {activeModal === 'confession' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/90 backdrop-blur-sm animate-fade-in" onClick={closeModal}>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto relative" onClick={e => e.stopPropagation()}>
            <button onClick={closeModal} className="absolute top-4 right-4 text-stone-400 hover:text-red-500 transition-colors"><X size={24}/></button>
            
            <div className="p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="text-burgundy-800" size={32} />
                <h2 className="text-3xl font-serif font-bold text-navy-900">Nossa Confissão de Fé</h2>
              </div>
              
              <div className="prose prose-stone text-stone-600 leading-relaxed">
                <p className="font-medium text-lg text-navy-800">
                  Subscrevemos integralmente os Símbolos de Fé de Westminster (Confissão de Fé, Catecismo Maior e Breve Catecismo) como fiel exposição do sistema de doutrina ensinado nas Sagradas Escrituras.
                </p>
                
                <h3 className="text-navy-900 font-bold mt-6 mb-2">Pilares Doutrinários</h3>
                <ul className="space-y-2 list-disc pl-5">
                  <li><strong>Sola Scriptura:</strong> A Bíblia é a única regra infalível de fé e prática, inspirada por Deus e inerrante.</li>
                  <li><strong>Soberania de Deus:</strong> Deus é o Criador e Senhor absoluto de todas as coisas, governando o universo segundo Seu santo conselho.</li>
                  <li><strong>Depravação Total:</strong> O homem, após a Queda, está morto em delitos e pecados, incapaz de salvar-se por seus próprios méritos.</li>
                  <li><strong>Eleição Incondicional:</strong> A salvação é um ato da livre graça de Deus, que escolheu os seus desde a eternidade, não por méritos previstos, mas por pura misericórdia.</li>
                  <li><strong>Expiação Limitada:</strong> Cristo morreu eficazmente pelos seus eleitos, garantindo a redenção completa daqueles que o Pai lhe deu.</li>
                </ul>

                <div className="bg-stone-50 border-l-4 border-burgundy-800 p-4 mt-8">
                  <p className="italic text-sm">
                    "O fim supremo e principal do homem é glorificar a Deus e gozá-lo para sempre."
                    <br/><span className="font-bold not-italic text-xs mt-1 block">- Breve Catecismo de Westminster, Pergunta 1.</span>
                  </p>
                </div>
              </div>

              <div className="mt-8 text-center">
                 <button onClick={closeModal} className="bg-navy-800 text-white px-6 py-2 rounded-lg hover:bg-navy-900 transition-colors font-semibold">Entendi</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. CONTATO MODAL */}
      {activeModal === 'contact' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/90 backdrop-blur-sm animate-fade-in" onClick={closeModal}>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md relative overflow-hidden" onClick={e => e.stopPropagation()}>
             <button onClick={closeModal} className="absolute top-4 right-4 text-stone-400 hover:text-red-500 transition-colors z-10"><X size={24}/></button>
             
             {/* Header Decorativo */}
             <div className="bg-navy-900 p-8 text-center relative">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <Mail size={48} className="text-burgundy-400 mx-auto mb-4 relative z-10" />
                <h2 className="text-2xl font-serif font-bold text-white relative z-10">Fale Conosco</h2>
                <p className="text-stone-300 text-sm mt-2 relative z-10">Dúvidas, sugestões ou testemunhos?</p>
             </div>

             <div className="p-8">
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Mensagem enviada (simulação)!'); closeModal(); }}>
                  <div>
                    <label className="block text-xs font-bold uppercase text-stone-500 mb-1">Seu Nome</label>
                    <input type="text" className="w-full border border-stone-300 rounded-lg p-2 focus:ring-2 focus:ring-burgundy-500 focus:border-burgundy-500 outline-none" placeholder="João Calvino" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-stone-500 mb-1">Seu Email</label>
                    <input type="email" className="w-full border border-stone-300 rounded-lg p-2 focus:ring-2 focus:ring-burgundy-500 focus:border-burgundy-500 outline-none" placeholder="exemplo@email.com" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-stone-500 mb-1">Mensagem</label>
                    <textarea rows={3} className="w-full border border-stone-300 rounded-lg p-2 focus:ring-2 focus:ring-burgundy-500 focus:border-burgundy-500 outline-none" placeholder="Como podemos ajudar você hoje?"></textarea>
                  </div>
                  <button type="submit" className="w-full bg-burgundy-800 text-white font-bold py-3 rounded-lg hover:bg-burgundy-900 transition-all transform hover:-translate-y-1 shadow-md">
                    Enviar Mensagem
                  </button>
                </form>
                
                <div className="mt-6 text-center pt-6 border-t border-stone-100">
                  <p className="text-xs text-stone-400">Ou envie um email direto para:niskier.rodrigo@gmail.com</p>
                  <a href="mailto:contato@rodrigoniskier.com" className="text-burgundy-700 font-bold hover:underline">contato@rodrigoniskier.com</a>
                </div>
             </div>
          </div>
        </div>
      )}

    </div>
  );
};
