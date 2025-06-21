
import React from 'react';
import { VMConfig } from '@/types/calculator';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PRECOS_OPTIDATA } from '@/utils/pricing';
import { 
  Shield, 
  Database, 
  Server, 
  Users,
  Lock,
  Globe,
  HardDrive,
  Zap
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
  const osCount = [config.sistemaOperacional.windows, config.sistemaOperacional.rhel, config.sistemaOperacional.suse].filter(Boolean).length;

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
            <p className="text-sm text-gray-400">Selecione apenas um sistema operacional</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => updateConfig({
              sistemaOperacional: {
                windows: true,
                rhel: false,
                suse: false,
                linux_gratuito: null
              },
              // Limpar licenças incompatíveis
              bancodados: {
                ...config.bancodados,
                sql_server_std: false // Resetar para que possa ser selecionado novamente
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
            <p className="text-xs text-gold-400 mt-1">{Math.ceil(config.vcpu / 2)} licenças</p>
          </button>
          
          <button
            onClick={() => updateConfig({
              sistemaOperacional: {
                windows: false,
                rhel: true,
                suse: false,
                linux_gratuito: null
              },
              // Limpar SQL Server se não for Windows
              bancodados: {
                ...config.bancodados,
                sql_server_std: false,
                sql_server_web: false
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
              },
              // Limpar SQL Server se não for Windows
              bancodados: {
                ...config.bancodados,
                sql_server_std: false,
                sql_server_web: false
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

          <button
            onClick={() => updateConfig({
              sistemaOperacional: {
                windows: false,
                rhel: false,
                suse: false,
                linux_gratuito: 'Ubuntu 22.04'
              },
              // Limpar SQL Server se não for Windows
              bancodados: {
                ...config.bancodados,
                sql_server_std: false,
                sql_server_web: false
              }
            })}
            className={`p-4 rounded-lg border-2 transition-all duration-300 ${
              config.sistemaOperacional.linux_gratuito
                ? 'border-gold-500 bg-gold-500/10 text-gold-400'
                : 'border-gray-600 bg-dark-800 hover:border-gold-600/50'
            }`}
          >
            <h4 className="font-semibold">Linux Gratuito</h4>
            <p className="text-xs text-gray-400 mt-1">Ubuntu, CentOS, etc</p>
            <p className="text-xs text-green-400 mt-1">R$ 0,00</p>
          </button>
        </div>

        {osCount > 1 && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg">
            <p className="text-red-400 text-sm">⚠️ Apenas um sistema operacional pode ser selecionado por VM</p>
          </div>
        )}
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
          {/* SQL Server Standard */}
          <div className={`p-4 rounded-lg border transition-all ${hasWindows ? 'border-gray-600 bg-dark-800' : 'border-red-500/50 bg-red-500/5'}`}>
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
                className="w-4 h-4 disabled:opacity-50"
              />
            </div>
            <p className="text-xs text-gray-400">R$ {PRECOS_OPTIDATA.sql_server_std}/licença</p>
            {hasWindows && (
              <p className="text-xs text-gold-400">{Math.ceil(config.vcpu / 2)} licenças necessárias</p>
            )}
            {!hasWindows && (
              <p className="text-xs text-red-400 mt-1">Requer Windows Server</p>
            )}
          </div>

          {/* SQL Server Web */}
          <div className="p-4 rounded-lg border border-gray-600 bg-dark-800">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">SQL Server Web</span>
              <input
                type="checkbox"
                checked={config.bancodados.sql_server_web}
                onChange={(e) => updateConfig({
                  bancodados: {
                    ...config.bancodados,
                    sql_server_web: e.target.checked
                  }
                })}
                className="w-4 h-4"
              />
            </div>
            <p className="text-xs text-gray-400">R$ {PRECOS_OPTIDATA.sql_server_web}/mês</p>
          </div>

          {/* MySQL Enterprise */}
          <div className="p-4 rounded-lg border border-gray-600 bg-dark-800">
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

          {/* MongoDB Enterprise */}
          <div className="p-4 rounded-lg border border-gray-600 bg-dark-800">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">MongoDB Enterprise</span>
              <input
                type="checkbox"
                checked={config.bancodados.mongodb_enterprise}
                onChange={(e) => updateConfig({
                  bancodados: {
                    ...config.bancodados,
                    mongodb_enterprise: e.target.checked
                  }
                })}
                className="w-4 h-4"
              />
            </div>
            <p className="text-xs text-gray-400">R$ {PRECOS_OPTIDATA.mongodb_enterprise}/mês</p>
          </div>

          {/* PostgreSQL (Gratuito) */}
          <div className="p-4 rounded-lg border border-green-600/50 bg-green-500/5">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">PostgreSQL</span>
              <input
                type="checkbox"
                checked={config.bancodados.postgresql}
                onChange={(e) => updateConfig({
                  bancodados: {
                    ...config.bancodados,
                    postgresql: e.target.checked
                  }
                })}
                className="w-4 h-4"
              />
            </div>
            <p className="text-xs text-green-400">Gratuito - R$ 0,00</p>
          </div>
        </div>
      </Card>

      {/* Aplicações e Middleware */}
      <Card className="card-premium p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-purple-500/20 rounded-lg">
            <Zap className="h-6 w-6 text-purple-500" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gold-400">Aplicações e Middleware</h3>
            <p className="text-sm text-gray-400">Software adicional</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border border-gray-600 bg-dark-800">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">Antivírus</span>
              <input
                type="checkbox"
                checked={config.aplicacoes.antivirus}
                onChange={(e) => updateConfig({
                  aplicacoes: {
                    ...config.aplicacoes,
                    antivirus: e.target.checked
                  }
                })}
                className="w-4 h-4"
              />
            </div>
            <p className="text-xs text-gray-400">R$ {PRECOS_OPTIDATA.antivirus}/mês</p>
          </div>

          <div className="p-4 rounded-lg border border-gray-600 bg-dark-800">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">ThinPrint</span>
              <input
                type="checkbox"
                checked={config.aplicacoes.thinprint}
                onChange={(e) => updateConfig({
                  aplicacoes: {
                    ...config.aplicacoes,
                    thinprint: e.target.checked
                  }
                })}
                className="w-4 h-4"
              />
            </div>
            <p className="text-xs text-gray-400">R$ {PRECOS_OPTIDATA.thinprint}/mês</p>
          </div>

          <div className="p-4 rounded-lg border border-gray-600 bg-dark-800">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">SAP HANA</span>
              <input
                type="checkbox"
                checked={config.aplicacoes.sap_hana}
                onChange={(e) => updateConfig({
                  aplicacoes: {
                    ...config.aplicacoes,
                    sap_hana: e.target.checked
                  }
                })}
                className="w-4 h-4"
              />
            </div>
            <p className="text-xs text-gray-400">R$ {PRECOS_OPTIDATA.sap_hana}/mês</p>
          </div>
        </div>

        {/* Avisos SAP HANA */}
        {config.aplicacoes.sap_hana && (
          <div className="mt-4 space-y-2">
            {config.ram < 64 && (
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/50 rounded-lg">
                <p className="text-yellow-400 text-sm">⚠️ SAP HANA recomenda mínimo 64GB de RAM</p>
              </div>
            )}
            {!config.sistemaOperacional.suse && !config.sistemaOperacional.rhel && (
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/50 rounded-lg">
                <p className="text-yellow-400 text-sm">⚠️ SAP HANA é recomendado com SUSE ou Red Hat Enterprise Linux</p>
              </div>
            )}
          </div>
        )}
      </Card>

      {/* TSPlus Terminal Services */}
      <Card className="card-premium p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <Users className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gold-400">Terminal Services - TSPlus</h3>
            <p className="text-sm text-gray-400">Acesso remoto a aplicações</p>
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
                <label className="block text-sm font-medium mb-2 text-gold-400">Número de usuários:</label>
                <Select
                  value={config.tsplus.usuarios.toString()}
                  onValueChange={(value) => updateConfig({
                    tsplus: {
                      ...config.tsplus,
                      usuarios: value === 'ilimitado' ? 'ilimitado' : parseInt(value) as any
                    }
                  })}
                >
                  <SelectTrigger className="bg-dark-800 border-gray-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-dark-800 border-gray-600">
                    {Object.entries(PRECOS_OPTIDATA.tsplus).map(([users, price]) => (
                      <SelectItem key={users} value={users}>
                        {users === 'ilimitado' ? 'Ilimitado' : `Até ${users}`} usuários - R$ {price}/mês
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-3">
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
                  <label className="text-sm">Advanced Security - R$ {PRECOS_OPTIDATA.tsplus_advanced_security}/mês</label>
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
                  <label className="text-sm">Two Factor Authentication - R$ {PRECOS_OPTIDATA.tsplus_two_factor}/mês</label>
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
                {tipo === 'none' ? 'R$ 0,00' : `R$ ${PRECOS_OPTIDATA.waf[tipo]}/mês`}
              </p>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default LicensingTab;
