
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Megaphone, 
  BarChart3, 
  Zap, 
  UserCircle, 
  Users, 
  Bot, 
  MessageSquare, 
  CreditCard, 
  ShieldAlert,
  Bell,
  LogOut,
  Wallet,
  Menu,
  X,
  Search,
  Eye
} from 'lucide-react';

import { User, UserRole, PlanType } from './types';
import LandingPage from './components/LandingPage';
import Dashboard from './pages/Dashboard';
import AdsManager from './pages/AdsManager';
import TrafficAnalytics from './pages/TrafficAnalytics';
import Upgrade from './pages/Upgrade';
import Profile from './pages/Profile';
import Affiliate from './pages/Affiliate';

// Admin Pages
import BotManager from './pages/Admin/BotManager';
import GroupManager from './pages/Admin/GroupManager';
import UserManager from './pages/Admin/UserManager';
import AdminSettings from './pages/Admin/AdminSettings';
import Withdrawals from './pages/Admin/Withdrawals';
import UserAnalysis from './pages/Admin/UserAnalysis';

const MOCK_USER: User = {
  id: 'user-1',
  name: 'João Silva',
  email: 'joao@exemplo.com',
  role: UserRole.ADMIN, // Set to ADMIN to show all features for demo
  plan: PlanType.FREE,
  isAffiliate: true,
  affiliateBalance: 150.00,
  referralCount: 12,
  referralCode: 'TELE123',
  createdAt: '2023-10-01'
};

const SidebarItem = ({ to, icon: Icon, label, active }: { to: string; icon: any; label: string; active: boolean }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
      active ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </Link>
);

const AppLayout = ({ user, setUser, isImpersonating }: { user: User; setUser: (u: User | null) => void; isImpersonating: boolean }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const isAdmin = user.role === UserRole.ADMIN;

  return (
    <div className="flex h-screen bg-[#0f172a] text-white overflow-hidden">
      {/* Impersonation Banner */}
      {isImpersonating && (
        <div className="fixed top-0 left-0 right-0 bg-red-600 text-white py-2 px-4 text-center z-[60] font-bold animate-pulse">
          🚨 ATENÇÃO: Sua conta está passando por uma análise de segurança. NÃO ALTERE NADA.
        </div>
      )}

      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} flex flex-col transition-all duration-300 bg-[#1e293b] border-r border-slate-700 z-50`}>
        <div className="p-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">T</div>
            {isSidebarOpen && <span>TeleAds<span className="text-blue-500">Pro</span></span>}
          </Link>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          <SidebarItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" active={location.pathname === '/dashboard'} />
          <SidebarItem to="/ads" icon={Megaphone} label="Anúncios" active={location.pathname === '/ads'} />
          <SidebarItem to="/analytics" icon={BarChart3} label="Tráfego" active={location.pathname === '/analytics'} />
          <SidebarItem to="/upgrade" icon={Zap} label="Upgrade" active={location.pathname === '/upgrade'} />
          {user.isAffiliate && (
            <SidebarItem to="/affiliate" icon={Users} label="Afiliados" active={location.pathname === '/affiliate'} />
          )}
          <SidebarItem to="/profile" icon={UserCircle} label="Perfil" active={location.pathname === '/profile'} />

          {isAdmin && (
            <div className="pt-6 mt-6 border-t border-slate-700">
              <p className="px-4 mb-2 text-xs font-semibold text-slate-500 uppercase">Administração</p>
              <SidebarItem to="/admin/bots" icon={Bot} label="Bots" active={location.pathname === '/admin/bots'} />
              <SidebarItem to="/admin/groups" icon={MessageSquare} label="Grupos" active={location.pathname === '/admin/groups'} />
              <SidebarItem to="/admin/users" icon={Users} label="Usuários" active={location.pathname === '/admin/users'} />
              <SidebarItem to="/admin/withdrawals" icon={Wallet} label="Saques" active={location.pathname === '/admin/withdrawals'} />
              <SidebarItem to="/admin/settings" icon={CreditCard} label="Ajustes" active={location.pathname === '/admin/settings'} />
              <SidebarItem to="/admin/analysis" icon={Eye} label="Análise" active={location.pathname === '/admin/analysis'} />
            </div>
          )}
        </nav>

        <div className="p-4 border-t border-slate-700">
          <button 
            onClick={() => setUser(null)}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span className="font-medium">Sair</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 flex items-center justify-between px-8 border-b border-slate-700 bg-[#1e293b]">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="hidden md:block">
              <Menu size={24} />
            </button>
            <h1 className="text-lg font-semibold">
              {location.pathname.split('/').pop()?.toUpperCase() || 'DASHBOARD'}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-white transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-700">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-slate-400 uppercase">{user.plan} PLAN</p>
              </div>
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold">
                {user.name.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 pt-10">
          <Routes>
            <Route path="/dashboard" element={<Dashboard user={user} />} />
            <Route path="/ads" element={<AdsManager user={user} />} />
            <Route path="/analytics" element={<TrafficAnalytics />} />
            <Route path="/upgrade" element={<Upgrade currentPlan={user.plan} />} />
            <Route path="/profile" element={<Profile user={user} />} />
            <Route path="/affiliate" element={<Affiliate user={user} />} />
            
            {isAdmin && (
              <>
                <Route path="/admin/bots" element={<BotManager />} />
                <Route path="/admin/groups" element={<GroupManager />} />
                <Route path="/admin/users" element={<UserManager />} />
                <Route path="/admin/withdrawals" element={<Withdrawals />} />
                <Route path="/admin/settings" element={<AdminSettings />} />
                <Route path="/admin/analysis" element={<UserAnalysis />} />
              </>
            )}
            
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

const App = () => {
  const [user, setUser] = useState<User | null>(null); // Start with null to show landing page
  const [isImpersonating, setIsImpersonating] = useState(false);

  // Auto login for demo purposes (optional)
  // useEffect(() => { setUser(MOCK_USER); }, []);

  if (!user) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage onLogin={() => setUser(MOCK_USER)} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <AppLayout user={user} setUser={setUser} isImpersonating={isImpersonating} />
    </Router>
  );
};

export default App;
