
import React from 'react';
import { VMConfig } from '@/types/calculator';
import { calcularVM } from '@/utils/vmCalculator';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Calculator as CalcIcon, 
  Sparkles,
  ChevronDown,
  ChevronUp,
  AlertTriangle
} from 'lucide-react';

interface PricingBreakdownProps {
  config: VMConfig;
}

const PricingBreakdown: React.FC<PricingBreakdownProps> = ({ config }) => {
  const [showDetails, setShowDetails] = React.useState(true);
  const calculation = calcularVM(config);

  // Validações visuais
  const hasIncompatibilities = 
    (config.bancodados.sql_server_std && !config.sistemaOperacional.windows) ||
    (config.bancodados.sql_server_web && !config.sistemaOperacional.windows);

  const osCount = [
    config.sistemaOperacional.windows,
    config.sistemaOperacional.rhel,
    config.sistemaOperacional.suse
  ].filter(Boolean).length;

  return (
    <Card className="card-premium p-6 sticky top-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gold-500/20 rounded-lg">
          <CalcIcon className="h-6 w-6 text-gold-500" />
        </div>
        <h3 className="text-xl font-bold text-gold-400">Investimento Mensal</h3>
      </div>
      
      {/* Avisos de Incompatibilidade */}
      {(hasIncompatibilities || osCount > 1) && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            <span className="text-red-400 font-semibold text-sm">Atenção!</span>
          </div>
          {hasIncompatibilities && (
            <p className="text-red-400 text-xs">• SQL Server requer Windows Server</p>
          )}
          {osCount > 1 && (
            <p className="text-red-400 text-xs">• Apenas um sistema operacional por VM</p>
          )}
        </div>
      )}
      
      <div className="space-y-4">
        {/* Resumo Principal */}
        <div className="bg-dark-800 rounded-lg p-4 border border-gold-600/20">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Infraestrutura:</span>
              <span className="text-foreground font-mono">R$ {calculation.infraestrutura.total_com_desconto.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Licenciamento:</span>
              <span className="text-foreground font-mono">R$ {calculation.licenciamento.total.toFixed(2)}</span>
            </div>
            <hr className="border-gold-600/20" />
            <div className="flex justify-between text-lg font-bold">
              <span className="text-gradient">Total Mensal:</span>
              <span className="text-gold-400 font-mono">R$ {calculation.total.toFixed(2)}</span>
            </div>
            <div className="text-center text-sm text-gray-400">
              Anual: R$ {(calculation.total * 12).toFixed(2)}
            </div>
          </div>
        </div>

        {/* Detalhamento Completo */}
        <div className="space-y-4">
          {/* Infraestrutura Detalhada */}
          <div className="bg-dark-800/50 rounded-lg p-4">
            <h4 className="font-semibold text-blue-400 mb-3 flex items-center">
              💻 Infraestrutura
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">• vCPU ({config.vcpu} cores × R$ 0,0347 × 720h):</span>
                <span className="font-mono">R$ {calculation.infraestrutura.computacao.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">• RAM ({config.ram}GB × R$ 0,0278 × 720h):</span>
                <span className="font-mono">R$ {((config.ram * 0.0278 * 720)).toFixed(2)}</span>
              </div>
              {config.discoSSD > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-400">• SSD ({config.discoSSD}GB × R$ 0,55):</span>
                  <span className="font-mono">R$ {(config.discoSSD * 0.55).toFixed(2)}</span>
                </div>
              )}
              {config.discoFCM > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-400">• FCM ({config.discoFCM}GB × R$ 0,75):</span>
                  <span className="font-mono">R$ {(config.discoFCM * 0.75).toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-400">• Backup Padrão ({config.discoSSD + config.discoFCM}GB × R$ 0,30):</span>
                <span className="font-mono">R$ {((config.discoSSD + config.discoFCM) * 0.30).toFixed(2)}</span>
              </div>
              {config.backupTipo === 'duplo' && (
                <div className="flex justify-between">
                  <span className="text-gray-400">• Backup Duplo ({config.discoSSD + config.discoFCM}GB × R$ 0,25):</span>
                  <span className="font-mono">R$ {((config.discoSSD + config.discoFCM) * 0.25).toFixed(2)}</span>
                </div>
              )}
              {config.backupTipo === 'triplo' && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-400">• Backup Duplo ({config.discoSSD + config.discoFCM}GB × R$ 0,25):</span>
                    <span className="font-mono">R$ {((config.discoSSD + config.discoFCM) * 0.25).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">• Backup Triplo ({config.discoSSD + config.discoFCM}GB × R$ 0,20):</span>
                    <span className="font-mono">R$ {((config.discoSSD + config.discoFCM) * 0.20).toFixed(2)}</span>
                  </div>
                </>
              )}
              <div className="flex justify-between">
                <span className="text-gray-400">• Monitoramento (obrigatório):</span>
                <span className="font-mono">R$ {calculation.infraestrutura.monitoramento.toFixed(2)}</span>
              </div>
              {calculation.infraestrutura.desconto > 0 && (
                <div className="flex justify-between text-green-400 border-t border-gray-700 pt-2">
                  <span>• Desconto ({config.desconto_individual}%):</span>
                  <span className="font-mono">-R$ {calculation.infraestrutura.desconto.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-semibold border-t border-gray-700 pt-2">
                <span className="text-blue-400">Subtotal Infraestrutura:</span>
                <span className="font-mono text-blue-400">R$ {calculation.infraestrutura.total_com_desconto.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Licenciamento Detalhado */}
          {calculation.licenciamento.total > 0 && (
            <div className="bg-dark-800/50 rounded-lg p-4">
              <h4 className="font-semibold text-purple-400 mb-3">📄 Licenciamento</h4>
              <div className="space-y-2 text-sm">
                {config.sistemaOperacional.windows && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">• Windows Server ({Math.ceil(config.vcpu / 2)} licenças):</span>
                    <span className="font-mono">R$ {(Math.ceil(config.vcpu / 2) * 55).toFixed(2)}</span>
                  </div>
                )}
                {config.sistemaOperacional.rhel && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">• Red Hat Enterprise Linux:</span>
                    <span className="font-mono">R$ 1.200,00</span>
                  </div>
                )}
                {config.sistemaOperacional.suse && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">• SUSE Linux:</span>
                    <span className="font-mono">R$ 900,00</span>
                  </div>
                )}
                {config.bancodados.sql_server_std && config.sistemaOperacional.windows && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">• SQL Server STD ({Math.ceil(config.vcpu / 2)} licenças):</span>
                    <span className="font-mono">R$ {(Math.ceil(config.vcpu / 2) * 800).toFixed(2)}</span>
                  </div>
                )}
                {config.bancodados.sql_server_web && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">• SQL Server Web:</span>
                    <span className="font-mono">R$ 140,00</span>
                  </div>
                )}
                {config.bancodados.mysql_enterprise && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">• MySQL Enterprise:</span>
                    <span className="font-mono">R$ 800,00</span>
                  </div>
                )}
                {config.bancodados.mongodb_enterprise && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">• MongoDB Enterprise:</span>
                    <span className="font-mono">R$ 1.200,00</span>
                  </div>
                )}
                {config.aplicacoes.antivirus && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">• Antivírus:</span>
                    <span className="font-mono">R$ 55,00</span>
                  </div>
                )}
                {config.aplicacoes.thinprint && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">• ThinPrint:</span>
                    <span className="font-mono">R$ 850,00</span>
                  </div>
                )}
                {config.aplicacoes.sap_hana && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">• SAP HANA:</span>
                    <span className="font-mono">R$ 5.000,00</span>
                  </div>
                )}
                {config.tsplus.ativo && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-400">• TSPlus ({config.tsplus.usuarios === 'ilimitado' ? 'Ilimitado' : `${config.tsplus.usuarios} usuários`}):</span>
                      <span className="font-mono">R$ {typeof config.tsplus.usuarios === 'string' ? '1.190,00' : (
                        config.tsplus.usuarios === 3 ? '140,00' :
                        config.tsplus.usuarios === 5 ? '180,00' :
                        config.tsplus.usuarios === 10 ? '310,00' :
                        config.tsplus.usuarios === 15 ? '390,00' :
                        config.tsplus.usuarios === 25 ? '550,00' :
                        config.tsplus.usuarios === 35 ? '730,00' :
                        config.tsplus.usuarios === 49 ? '990,00' : '0,00'
                      )}</span>
                    </div>
                    {config.tsplus.advanced_security && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">• TSPlus Advanced Security:</span>
                        <span className="font-mono">R$ 140,00</span>
                      </div>
                    )}
                    {config.tsplus.two_factor && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">• TSPlus Two Factor Auth:</span>
                        <span className="font-mono">R$ 165,00</span>
                      </div>
                    )}
                  </>
                )}
                {config.waf.tipo !== 'none' && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">• WAF {config.waf.tipo.toUpperCase()}:</span>
                    <span className="font-mono">R$ {
                      config.waf.tipo === 'pro' ? '200,00' :
                      config.waf.tipo === 'business' ? '1.600,00' :
                      config.waf.tipo === 'enterprise' ? '15.600,00' : '0,00'
                    }</span>
                  </div>
                )}
                {config.ips_adicionais > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">• IPs Adicionais ({config.ips_adicionais} × R$ 70):</span>
                    <span className="font-mono">R$ {(config.ips_adicionais * 70).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-semibold border-t border-gray-700 pt-2">
                  <span className="text-purple-400">Subtotal Licenciamento:</span>
                  <span className="font-mono text-purple-400">R$ {calculation.licenciamento.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <Button className="btn-primary w-full">
          <Sparkles className="mr-2 h-4 w-4" />
          Adicionar à Proposta
        </Button>
      </div>
    </Card>
  );
};

export default PricingBreakdown;
