import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import ButtonGlow from '@/components/ButtonGlow';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const formSchema = z.object({
  email: z.string().email({ message: 'Inserisci un indirizzo email valido.' }),
  password: z.string().min(6, { message: 'La password deve contenere almeno 6 caratteri.' }),
});

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      await signIn(values.email, values.password);
      toast({
        title: "Accesso effettuato",
        description: "Benvenuto nella dashboard.",
      });
      navigate('/agents');
    } catch (error) {
      toast({
        title: "Errore",
        description: "Credenziali non valide. Riprova.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ai-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-10 h-10 rounded-md bg-[#818fff] flex items-center justify-center mr-3">
              <div className="w-5 h-5 bg-ai-white rounded-sm"></div>
            </div>
            <span className="text-2xl font-display font-bold">aigentic</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Bentornato</h1>
          <p className="text-ai-gray">Accedi al tuo account per continuare</p>
        </div>
        
        <div className="bg-ai-darkblue/30 p-8 rounded-xl border border-ai-darkblue/60">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="nome@azienda.com" 
                        {...field}
                        className="bg-ai-darkblue/50 border-ai-darkblue"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          type={showPassword ? "text" : "password"} 
                          placeholder="••••••••" 
                          {...field}
                          className="bg-ai-darkblue/50 border-ai-darkblue pr-10"
                        />
                        <button 
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="pt-2">
                <ButtonGlow className="w-full" disabled={loading}>
                  {loading ? 'Accesso in corso...' : 'Accedi'}
                </ButtonGlow>
              </div>
              
              <div className="text-center mt-4">
                <p className="text-ai-gray text-sm">
                  Non hai un account?{" "}
                  <button 
                    type="button" 
                    className="text-ai-blue hover:underline"
                    onClick={() => toast({
                      title: "Registrazione",
                      description: "La funzionalità di registrazione sarà disponibile a breve.",
                    })}
                  >
                    Registrati
                  </button>
                </p>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
