import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-ai-darkblue bg-black">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center mb-6">
              <div className="w-8 h-8 rounded-md bg-[#818fff] flex items-center justify-center mr-3">
                <div className="w-4 h-4 bg-ai-white rounded-sm"></div>
              </div>
              <span className="text-xl font-display font-bold">aigentic</span>
            </Link>
            <p className="text-ai-gray mb-6">
              Automatizziamo la crescita della tua azienda con soluzioni AI avanzate. 
              Libera tempo e risorse con i nostri agenti intelligenti.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/in/giovanni-menchinella-6b2b7aa3/" target="_blank" rel="noopener noreferrer" className="text-ai-gray hover:text-ai-white transition">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Azienda</h3>
            <ul className="space-y-3">
              <li><Link to="/chi-siamo" className="text-ai-gray hover:text-ai-white transition">Chi siamo</Link></li>
              <li><Link to="/contatti" className="text-ai-gray hover:text-ai-white transition">Contatti</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Link utili</h3>
            <ul className="space-y-3">
              <li><Link to="/privacy-policy" className="text-ai-gray hover:text-ai-white transition">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="text-ai-gray hover:text-ai-white transition">Termini di Servizio</Link></li>
              <li><Link to="/cookie-policy" className="text-ai-gray hover:text-ai-white transition">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-ai-darkblue mt-10 pt-6 text-center text-ai-gray text-sm">
          <p>&copy; {new Date().getFullYear()} Aigentic. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
