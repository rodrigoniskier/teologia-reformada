import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Settings, X } from './ui/Icons';
import { ADMIN_PIN } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, isAdmin, setIsAdmin }) => {
  const [showPinDialog, setShowPinDialog] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const location = useLocation();

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

  // Hide header/footer on certificate view or inside course viewer for immersion
  const isImmersive = location.pathname.startsWith('/course/');

  return (
    <div className="min-h-screen flex flex-col relative font-sans text-stone-800">
      
      {/* Admin Indicator Bar */}
      {isAdmin && !isImmersive && (
        <div className="bg-burgundy-900 text-white px-4 py-2 text-xs flex justify-between items-center no-print">
          <span className="font-bold tracking-wider">MODO ADMINISTRADOR (DESIGNER)</span>
          <div className="flex gap-4">
             <Link to="/admin" className="hover:underline">Painel</Link>
             <Link to="/" className="hover:underline">Visualizar Site</Link>
             <button onClick={() => setIsAdmin(false)} className="hover:text-red-300">Sair</button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {children}
      </main>

      {/* Footer / Admin Trigger */}
      {!isImmersive && (
        <footer className="bg-stone-100 border-t border-stone-200 py-12 px-8 mt-auto no-print">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-stone-500 text-sm">
            <div className="mb-4 md:mb-0">
              <p className="font-serif italic">&copy; {new Date().getFullYear()} Cursos de Teologia Reformada - Rodrigo Niskier. Soli Deo Gloria.</p>
            </div>
            
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-burgundy-800 transition-colors">Confissão de Fé</a>
              <a href="#" className="hover:text-burgundy-800 transition-colors">Contato</a>
              {/* Discreet Admin Trigger */}
              <button 
                onClick={() => isAdmin ? setIsAdmin(false) : setShowPinDialog(true)}
                className="opacity-20 hover:opacity-100 transition-opacity p-2"
                aria-label="Admin Access"
              >
                <Settings size={16} />
              </button>
            </div>
          </div>
        </footer>
      )}

      {/* PIN Dialog Modal */}
      {showPinDialog && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded shadow-2xl max-w-sm w-full relative border-t-4 border-burgundy-800">
            <button 
              onClick={() => setShowPinDialog(false)}
              className="absolute top-2 right-2 text-stone-400 hover:text-stone-800"
            >
              <X size={20} />
            </button>
            
            <h3 className="text-xl font-serif font-bold text-navy-900 mb-4 text-center">Acesso Restrito</h3>
            <p className="text-sm text-stone-600 mb-6 text-center">Digite o PIN de acesso para entrar no modo Designer.</p>
            
            <form onSubmit={handlePinSubmit}>
              <input 
                type="password" 
                autoFocus
                value={pin}
                onChange={e => { setPin(e.target.value); setError(false); }}
                className="w-full text-center text-2xl tracking-[0.5em] p-3 border-b-2 border-stone-300 focus:border-burgundy-800 focus:outline-none mb-6 font-mono"
                maxLength={4}
                placeholder="••••"
              />
              {error && <p className="text-red-600 text-xs text-center mb-4">PIN incorreto. Tente novamente.</p>}
              
              <button 
                type="submit"
                className="w-full bg-navy-800 text-white py-3 rounded hover:bg-navy-900 font-semibold"
              >
                Acessar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};