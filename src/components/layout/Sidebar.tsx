
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Calculator, 
  Users, 
  FileText, 
  BarChart3, 
  Settings,
  Zap,
  Database,
  Cloud
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: BarChart3 },
  { name: 'Calculadora', href: '/calculator', icon: Calculator },
  { name: 'Clientes', href: '/clients', icon: Users },
  { name: 'Propostas', href: '/proposals', icon: FileText },
  { name: 'Templates', href: '/templates', icon: Database },
  { name: 'Relatórios', href: '/reports', icon: BarChart3 },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-72 bg-dark-900 border-r border-gold-600/20">
      {/* Logo */}
      <div className="flex h-20 items-center justify-center border-b border-gold-600/20">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Cloud className="h-10 w-10 text-gold-500 animate-float" />
            <Zap className="absolute -bottom-1 -right-1 h-4 w-4 text-gold-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gradient">Optidata</h1>
            <p className="text-xs text-gold-400 font-mono">Cloud Premium</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-8 px-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={`
                    group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300
                    ${isActive 
                      ? 'bg-gradient-to-r from-gold-600/20 to-gold-500/10 text-gold-400 border-r-2 border-gold-500' 
                      : 'text-gray-300 hover:text-gold-400 hover:bg-dark-800'
                    }
                  `}
                >
                  <item.icon className={`
                    mr-3 h-5 w-5 transition-all duration-300
                    ${isActive ? 'text-gold-500 scale-110' : 'text-gray-400 group-hover:text-gold-500'}
                  `} />
                  {item.name}
                  {isActive && (
                    <div className="ml-auto h-2 w-2 bg-gold-500 rounded-full animate-pulse" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="card-premium text-center">
          <div className="text-gold-500 text-sm font-semibold mb-2">
            💎 Premium Version
          </div>
          <div className="text-xs text-gray-400">
            Calculadora Cloud Optidata v2.0
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
