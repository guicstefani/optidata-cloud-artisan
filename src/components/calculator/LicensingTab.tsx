
import React from 'react';
import { VMConfig } from '@/types/calculator';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PRECOS_OPTIDATA } from '@/utils/pricing';
import { 
  Shield, 
  Database, 
  Server, 
  Users,
  Lock,
  Globe
} from 'lucide-react';

interface LicensingTabProps {
  config: VMConfig;
  onChange: (config: VMConfig) => void;
}

const LicensingTab: React.FC<LicensingTabProps> = ({ config, onChange }) => {
  const updateConfig = (updates: Partial<VMConfig>) => {
    onChange({ ...config, ...updates });
  };

  const hasWindows = config.sistemaOperacional.windows;

  return (
    <div className="space-y-6">
      {/* Sistema Operacional */}
      <Card className="card-premium p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <Server className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gold-400">Sistema Operacional</h3>
            <p className="text-sm text-gray-400">Selecione apenas um sistema</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => updateConfig({
              sistemaOperacional: {
                windows: true,
                rhel: false,
                suse: false,
                linux_gratuito: null
              }
            })}
            className={`p-4 rounded-lg border-2 transition-all duration-300 ${
              hasWindows
                ? 'border-gold-500 bg-gold-500/10 text-gold-400'
                : 'border-gray-600 bg-dark-800 hover:border-gold-600/50'
            }`}
          >
            <h4 className="font-semibold">Windows Server</h4>
            <p className="text-xs text-gray-400 mt-1">R$ {PRECOS_OPTIDATA.windows_server}/licença</p>
          </button>
          
          <button
            onClick={() => updateConfig({
              sistemaOperacional: {
                windows: false,
                rhel: true,
                suse: false,
                linux_gratuito: null
              }
            })}
            className={`p-4 rounded-lg border-2 transition-all duration-300 ${
              config.sistemaOperacional.rhel
                ? 'border-gold-500 bg-gold-500/10 text-gold-400'
                : 'border-gray-600 bg-dark-800 hover:border-gold-600/50'
            }`}
          >
            <h4 className="font-semibold">Red Hat Enterprise</h4>
            <p className="text-xs text-gray-400 mt-1">R$ {PRECOS_OPTIDATA.rhel}/mês</p>
          </button>
          
          <button
            onClick={() => updateConfig({
              sistemaOperacional: {
                windows: false,
                rhel: false,
                suse: true,
                linux_gratuito: null
              }
            })}
            className={`p-4 rounded-lg border-2 transition-all duration-300 ${
              config.sistemaOperacional.suse
                ? 'border-gold-500 bg-gold-500/10 text-gold-400'
                : 'border-gray-600 bg-dark-800 hover:border-gold-600/50'
            }`}
          >
            <h4 className="font-semibold">SUSE Linux</h4>
            <p className="text-xs text-gray-400 mt-1">R$ {PRECOS_OPTIDATA.suse}/mês</p>
          </button>
        </div>
      </Card>

      {/* Banco de Dados */}
      <Card className="card-premium p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-green-500/20 rounded-lg">
            <Database className="h-6 w-6 text-green-500" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gold-400">Banco de Dados</h3>
            <p className="text-sm text-gray-400">Licenças de banco de dados</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`p-4 rounded-lg border ${hasWindows ? 'border-gray-600' : 'border-red-500/50 bg-red-500/5'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">SQL Server Standard</span>
              <input
                type="checkbox"
                checked={config.bancodados.sql_server_std}
                disabled={!hasWindows}
                onChange={(e) => updateConfig({
                  bancodados: {
                    ...config.bancodados,
                    sql_server_std: e.target.checked
                  }
                })}
                className="w-4 h-4"
              />
            </div>
            <p className="text-xs text-gray-400">R$ {PRECOS_OPTIDATA.sql_server_std}/licença</p>
            {!hasWindows && (
              <p className="text-xs text-red-400 mt-1">Requer Windows Server</p>
            )}
          </div>
          
          <div className="p-4 rounded-lg border border-gray-600">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">MySQL Enterprise</span>
              <input
                type="checkbox"
                checked={config.bancodados.mysql_enterprise}
                onChange={(e) => updateConfig({
                  bancodados: {
                    ...config.bancodados,
                    mysql_enterprise: e.target.checked
                  }
                })}
                className="w-4 h-4"
              />
            </div>
            <p className="text-xs text-gray-400">R$ {PRECOS_OPTIDATA.mysql_enterprise}/mês</p>
          </div>
        </div>
      </Card>

      {/* TSPlus Terminal Services */}
      <Card className="card-premium p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-purple-500/20 rounded-lg">
            <Users className="h-6 w-6 text-purple-500" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gold-400">Terminal Services</h3>
            <p className="text-sm text-gray-400">TSPlus para acesso remoto</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={config.tsplus.ativo}
              onChange={(e) => updateConfig({
                tsplus: {
                  ...config.tsplus,
                  ativo: e.target.checked
                }
              })}
              className="w-4 h-4"
            />
            <label className="font-semibold">Ativar TSPlus</label>
          </div>
          
          {config.tsplus.ativo && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">Número de usuários:</label>
                <Select
                  value={config.tsplus.usuarios.toString()}
                  onValueChange={(value) => updateConfig({
                    tsplus: {
                      ...config.tsplus,
                      usuarios: value === 'ilimitado' ? 'ilimitado' : parseInt(value) as any
                    }
                  })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(PRECOS_OPTIDATA.tsplus).map(([users, price]) => (
                      <SelectItem key={users} value={users}>
                        {users === 'ilimitado' ? 'Ilimitado' : `Até ${users}`} usuários - R$ {price}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={config.tsplus.advanced_security}
                    onChange={(e) => updateConfig({
                      tsplus: {
                        ...config.tsplus,
                        advanced_security: e.target.checked
                      }
                    })}
                    className="w-4 h-4"
                  />
                  <label className="text-sm">Advanced Security (+R$ {PRECOS_OPTIDATA.tsplus_advanced_security})</label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={config.tsplus.two_factor}
                    onChange={(e) => updateConfig({
                      tsplus: {
                        ...config.tsplus,
                        two_factor: e.target.checked
                      }
                    })}
                    className="w-4 h-4"
                  />
                  <label className="text-sm">Two Factor Auth (+R$ {PRECOS_OPTIDATA.tsplus_two_factor})</label>
                </div>
              </div>
            </>
          )}
        </div>
      </Card>

      {/* WAF - Web Application Firewall */}
      <Card className="card-premium p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-red-500/20 rounded-lg">
            <Shield className="h-6 w-6 text-red-500" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gold-400">Web Application Firewall</h3>
            <p className="text-sm text-gray-400">Proteção avançada para aplicações web</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {(['none', 'pro', 'business', 'enterprise'] as const).map((tipo) => (
            <button
              key={tipo}
              onClick={() => updateConfig({
                waf: { tipo }
              })}
              className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                config.waf.tipo === tipo
                  ? 'border-gold-500 bg-gold-500/10 text-gold-400'
                  : 'border-gray-600 bg-dark-800 hover:border-gold-600/50'
              }`}
            >
              <h4 className="font-semibold capitalize">{tipo === 'none' ? 'Nenhum' : tipo}</h4>
              <p className="text-xs text-gray-400 mt-1">
                {tipo === 'none' ? 'R$ 0' : `R$ ${PRECOS_OPTIDATA.waf[tipo]}/mês`}
              </p>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default LicensingTab;
