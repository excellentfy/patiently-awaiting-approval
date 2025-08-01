
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard } from "@/pages/Dashboard";
import { Toaster } from "sonner";
import { useEffect, useState } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

const App = () => {
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    console.log("App component mounted - GitHub Pages optimized");
    console.log("Location:", window.location.href);
    
    // Aplicar tema escuro
    document.documentElement.classList.add('dark');
    
    setIsReady(true);
  }, []);

  // Para GitHub Pages, sempre usar HashRouter
  const RouterComponent = Router;

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Carregando Dashboard ASPERUS...</p>
        </div>
      </div>
    );
  }
  
  return (
    <QueryClientProvider client={queryClient}>
      <RouterComponent>
        <div className="min-h-screen dark">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </div>
        <Toaster position="top-right" theme="dark" />
      </RouterComponent>
    </QueryClientProvider>
  );
};

export default App;
