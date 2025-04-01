import React, { useState, useEffect } from 'react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Menu, X, LogOut, User } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/components/ui/use-toast'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logout effettuato",
        description: "Hai effettuato il logout con successo.",
      });
      navigate('/login');
    } catch (error) {
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante il logout.",
        variant: "destructive"
      });
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-6 lg:px-10",
        isScrolled ? "glass-dark" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <div className="w-8 h-8 rounded-md bg-[#818fff] flex items-center justify-center mr-3">
              <div className="w-4 h-4 bg-ai-white rounded-sm"></div>
            </div>
            <span className="text-xl font-display font-bold">aigentic</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-ai-white hover:text-[#818fff] transition-colors">Home</Link>
          {user && (
            <Link to="/agents" className="text-ai-white hover:text-[#818fff] transition-colors">Agenti</Link>
          )}
        </nav>

        {/* Call to Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <div className="text-ai-gray mr-2">
                <User size={16} className="inline mr-1" /> {user.email}
              </div>
              <Button 
                variant="ghost" 
                className="text-ai-gray hover:text-white hover:bg-transparent"
                onClick={handleLogout}
              >
                <LogOut size={16} className="mr-1" />
                Esci
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button className="bg-[#818fff] hover:bg-ai-blue text-white">
                Accedi
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-ai-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass-dark p-4 animate-fadeIn">
          <nav className="flex flex-col space-y-4 py-4">
            <Link 
              to="/" 
              className="text-ai-white hover:text-[#818fff] px-4 py-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            {user && (
              <Link 
                to="/agents" 
                className="text-ai-white hover:text-[#818fff] px-4 py-2 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Agenti
              </Link>
            )}
            
            <div className="flex flex-col space-y-2 pt-4 border-t border-ai-darkblue">
              {user ? (
                <>
                  <div className="text-ai-gray px-4 py-2">
                    <User size={16} className="inline mr-1" /> {user.email}
                  </div>
                  <Button 
                    variant="ghost" 
                    className="text-ai-gray hover:text-white justify-start px-4"
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LogOut size={16} className="mr-1" />
                    Esci
                  </Button>
                </>
              ) : (
                <Link 
                  to="/login" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button className="bg-[#818fff] hover:bg-ai-blue text-white w-full">
                    Accedi
                  </Button>
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Navbar
