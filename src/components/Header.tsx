export const Header = () => {
  return (
    <header className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg border-b border-primary/20">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white drop-shadow-sm">Dashboard ASPERUS</h1>
              <p className="text-white/90 mt-2 text-lg font-medium">Painel de controle para agendamentos</p>
            </div>
          </div>
          <div className="text-right">
            <div className="bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
              <p className="text-white/90 font-medium">Sistema de Agendamentos</p>
              <p className="text-white/70 text-sm">Em tempo real</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};