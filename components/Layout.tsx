import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BookOpen, User, Menu, X, Github, Linkedin, Mail, Shield, MessageCircle, Settings 
} from './ui/Icons';
import { ADMIN_PIN } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, isAdmin, setIsAdmin }) => {
  // Estados do Layout Moderno
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<'none' | 'confession' | 'contact'>('none');
  
  // Estados da Lógica de Admin (Recuperados)
  const [showPinDialog, setShowPinDialog] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  
  const location = useLocation();
  const isImmersive = location.pathname.startsWith('/course/');

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      setIsAdmin(true);
      setShowPinDialog(false);
      setPin('');
      setError(false);
    } else {
      setError(true);
      setPin('');
    }
  };

  const openModal = (type: 'confession' | 'contact') => {
    setActiveModal(type);
    setIsMenuOpen(false);
  };

  const closeModal = () => setActiveModal('none');

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans text-stone-800 relative">
      
      {/* --- BARRA DE ADMIN (Aparece só quando logado) --- */}
      {isAdmin && !isImmersive && (
        <div className="bg-burgundy-900 text-white px-4 py-2 text-xs flex justify-between items-center relative z-50">
          <span className="font-bold tracking-wider">MODO ADMINISTRADOR (DESIGNER)</span>
          <div className="flex gap-4">
             <Link to="/admin" className="hover:underline">Painel</Link>
             <button onClick={() => setIsAdmin(false)} className="hover:text-red-300">Sair</button>
          </div>
        </div>
      )}

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
            <button onClick={() => openModal('confession')} className="text-stone-300 hover:text-white transition-colors flex items-center gap-2">
              <Shield size={16} /> Confissão de Fé
            </button>
            <button onClick={() => openModal('contact')} className="text-stone-300 hover:text-white transition-colors flex items-center gap-2">
              <MessageCircle size={16} /> Contato
            </button>
            {/* Mantive o botão de Área do Aluno também, pois é útil para navegação normal */}
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
          <div className="md:hidden bg-navy-800 border-t border-navy-700 p-6 space-y-4 animate-fade-in absolute w-full left-0 z-50 shadow-xl">
             <button onClick={() => openModal('confession')} className="block w-full text-left py-3 text-stone-300 border-b border-navy-700">Confissão de Fé</button>
             <button onClick={() => openModal('contact')} className="block w-full text-left py-3 text-stone-300 border-b border-navy-700">Contato</button>
             <Link to="/admin" className="block py-3 text-stone-300">Área do Aluno</Link>
          </div>
        )}
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 relative z-0 flex flex-col">
        {children}
      </main>

      {/* --- FOOTER --- */}
      {!isImmersive && (
        <footer className="bg-stone-900 text-stone-400 py-12 border-t border-stone-800 mt-auto">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-sm">
            <div>
              <h3 className="text-white font-serif font-bold text-lg mb-4">Sobre o Projeto</h3>
              <p className="leading-relaxed mb-4">
                Dedicado a fornecer ensino teológico sólido, confessional e acessível.
              </p>
              <div className="flex gap-4">
                <a href="https://github.com/rodrigoniskier" target="_blank" rel="noopener noreferrer" className="hover:text-burgundy-400 transition-colors"><Github size={20} /></a>
                <a href="https://www.linkedin.com/in/rodrigoniskier" target="_blank" rel="noopener noreferrer" className="hover:text-burgundy-400 transition-colors"><Linkedin size={20} /></a>
                <a href="mailto:contato@rodrigoniskier.com" className="hover:text-burgundy-400 transition-colors"><Mail size={20} /></a>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-serif font-bold text-lg mb-4">Links Rápidos</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:text-white transition-colors">Início</Link></li>
                <li><button onClick={() => openModal('confession')} className="hover:text-white transition-colors">Nossa Confissão</button></li>
                <li><button onClick={() => openModal('contact')} className="hover:text-white transition-colors">Fale Conosco</button></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-serif font-bold text-lg mb-4">Legal</h3>
              <p className="mb-2">© {new Date().getFullYear()} Rodrigo Niskier.</p>
              
              <div className="flex items-center justify-between mt-4">
                  <p className="text-xs text-stone-600">Soli Deo Gloria.</p>
                  
                  {/* --- AQUI ESTÁ A ENGRENAGEM DE VOLTA --- */}
                  <button 
                    onClick={() => isAdmin ? setIsAdmin(false) : setShowPinDialog(true)}
                    className="opacity-20 hover:opacity-100 transition-opacity p-2 text-stone-500 hover:text-white"
                    aria-label="Acesso Admin"
                  >
                    <Settings size={16} />
                  </button>
              </div>
            </div>
          </div>
        </footer>
      )}

      {/* --- MODALS --- */}
      
      {/* 1. PIN DIALOG (Lógica de Admin) */}
      {showPinDialog && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white p-8 rounded shadow-2xl max-w-sm w-full relative border-t-4 border-burgundy-800">
            <button onClick={() => setShowPinDialog(false)} className="absolute top-2 right-2 text-stone-400 hover:text-stone-800"><X size={20} /></button>
            <h3 className="text-xl font-serif font-bold text-navy-900 mb-4 text-center">Modo Designer</h3>
            <p className="text-sm text-stone-600 mb-6 text-center">Digite o PIN para habilitar a edição.</p>
            <form onSubmit={handlePinSubmit}>
              <input 
                type="password" autoFocus value={pin}
                onChange={e => { setPin(e.target.value); setError(false); }}
                className="w-full text-center text-2xl tracking-[0.5em] p-3 border-b-2 border-stone-300 focus:border-burgundy-800 outline-none mb-6 font-mono"
                maxLength={4} placeholder="••••"
              />
              {error && <p className="text-red-600 text-xs text-center mb-4">PIN incorreto.</p>}
              <button type="submit" className="w-full bg-navy-800 text-white py-3 rounded hover:bg-navy-900 font-semibold">Acessar</button>
            </form>
          </div>
        </div>
      )}

      {/* 2. CONFISSÃO DE FÉ MODAL */}
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
                  Subscrevemos integralmente os Símbolos de Fé de Westminster.
                </p>
                <h3 className="text-navy-900 font-bold mt-6 mb-2">Pilares</h3>
                <ul className="space-y-2 list-disc pl-5">
                  <li><strong>Sola Scriptura</strong></li>
                  <li><strong>Soberania de Deus</strong></li>
                  <li><strong>Depravação Total</strong></li>
                  <li><strong>Eleição Incondicional</strong></li>
                  <li><strong>Expiação Limitada</strong></li>
                </ul>
              </div>
              <div className="mt-8 text-center">
                 <button onClick={closeModal} className="bg-navy-800 text-white px-6 py-2 rounded-lg hover:bg-navy-900 font-semibold">Fechar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. CONTATO MODAL */}
      {activeModal === 'contact' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/90 backdrop-blur-sm animate-fade-in" onClick={closeModal}>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md relative overflow-hidden" onClick={e => e.stopPropagation()}>
             <button onClick={closeModal} className="absolute top-4 right-4 text-stone-400 hover:text-red-500 transition-colors z-10"><X size={24}/></button>
             <div className="bg-navy-900 p-8 text-center relative">
                <Mail size={48} className="text-burgundy-400 mx-auto mb-4 relative z-10" />
                <h2 className="text-2xl font-serif font-bold text-white relative z-10">Fale Conosco</h2>
             </div>
             <div className="p-8">
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Mensagem enviada!'); closeModal(); }}>
                  <input type="text" className="w-full border border-stone-300 rounded p-2" placeholder="Seu Nome" />
                  <input type="email" className="w-full border border-stone-300 rounded p-2" placeholder="Seu Email" />
                  <textarea rows={3} className="w-full border border-stone-300 rounded p-2" placeholder="Mensagem"></textarea>
                  <button type="submit" className="w-full bg-burgundy-800 text-white font-bold py-3 rounded hover:bg-burgundy-900">Enviar</button>
                </form>
             </div>
          </div>
        </div>
      )}

    </div>
  );
};
