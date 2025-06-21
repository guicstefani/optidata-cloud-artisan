
import React from 'react';
import { Bell, User, Search, Menu, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  title = "Dashboard", 
  subtitle = "Visão geral da sua operação cloud" 
}) => {
  return (
    <header className="bg-dark-900/50 backdrop-blur-md border-b border-gold-600/20 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Title Section */}
        <div>
          <h1 className="text-2xl font-bold text-gradient">{title}</h1>
          <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Buscar clientes, propostas..."
              className="input-premium pl-10 w-64"
            />
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative hover-glow">
            <Bell className="h-5 w-5 text-gold-400" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-gold-500 rounded-full text-xs flex items-center justify-center text-dark-900 font-bold">
              3
            </span>
          </Button>

          {/* User Menu */}
          <div className="flex items-center space-x-3 pl-4 border-l border-gold-600/20">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gold-400">João Silva</p>
              <p className="text-xs text-gray-400">Especialista Comercial</p>
            </div>
            <div className="relative">
              <div className="h-10 w-10 bg-gradient-to-r from-gold-600 to-gold-500 rounded-full flex items-center justify-center text-dark-900 font-bold text-sm">
                JS
              </div>
              <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-dark-900" />
            </div>
            <Button variant="ghost" size="sm" className="hover-glow">
              <LogOut className="h-4 w-4 text-gray-400" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
