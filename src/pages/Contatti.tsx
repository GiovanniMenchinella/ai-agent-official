import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';

const Contatti = () => {
  return (
    <div className="min-h-screen overflow-hidden">
      <Navbar />
      <div className="container mx-auto px-4 py-16 mt-20">
        <h1 className="text-4xl font-bold text-center mb-12">Contatti</h1>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Mail className="w-6 h-6 text-[#9b87f5]" />
                <div>
                  <h3 className="font-medium mb-1">Email</h3>
                  <p className="text-ai-gray">info@potrai.com</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Phone className="w-6 h-6 text-[#9b87f5]" />
                <div>
                  <h3 className="font-medium mb-1">Telefono</h3>
                  <p className="text-ai-gray">+39 351 561 3920</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <MapPin className="w-6 h-6 text-[#9b87f5]" />
                <div>
                  <h3 className="font-medium mb-1">Sede</h3>
                  <p className="text-ai-gray">Via Vittorio Veneto 7, Firenze</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Linkedin className="w-6 h-6 text-[#9b87f5]" />
                <div>
                  <h3 className="font-medium mb-1">LinkedIn</h3>
                  <a 
                    href="https://www.linkedin.com/company/aigentic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ai-gray hover:text-[#9b87f5] transition-colors"
                  >
                    Seguici su LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contatti;
