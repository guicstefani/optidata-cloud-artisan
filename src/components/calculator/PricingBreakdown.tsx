
import React from 'react';
import { VMConfig, VMCalculation } from '@/types/calculator';
import { calcularVM } from '@/utils/vmCalculator';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Calculator as CalcIcon, 
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface PricingBreakdownProps {
  config: VMConfig;
}

const PricingBreakdown: React.FC<PricingBreakdownProps> = ({ config }) => {
  const [showDetails, setShowDetails] = React.useState(false);
  const calculation = calcularVM(config);

  return (
    <Card className="card-premium p-6 sticky top-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gold-500/20 rounded-lg">
          <CalcIcon className="h-6 w-6 text-gold-500" />
        </div>
        <h3 className="text-xl font-bold text-gold-400">Investimento Mensal</h3>
      </div>
      
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

        {/* Botão Ver Detalhes */}
        <Button
          variant="ghost"
          onClick={() => setShowDetails(!showDetails)}
          className="w-full text-gold-400 hover:text-gold-300"
        >
          {showDetails ? (
            <>
              <ChevronUp className="mr-2 h-4 w-4" />
              Ocultar Detalhes
            </>
          ) : (
            <>
              <ChevronDown className="mr-2 h-4 w-4" />
              Ver Detalhes
            </>
          )}
        </Button>

        {/* Detalhamento Expandido */}
        {showDetails && (
          <div className="space-y-4">
            {/* Infraestrutura Detalhada */}
            <div className="bg-dark-800/50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-400 mb-3">💻 Infraestrutura</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Computação ({config.vcpu} vCPU + {config.ram}GB RAM):</span>
                  <span className="font-mono">R$ {calculation.infraestrutura.computacao.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Storage ({config.discoSSD + config.discoFCM}GB + backup):</span>
                  <span className="font-mono">R$ {calculation.infraestrutura.storage.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Monitoramento:</span>
                  <span className="font-mono">R$ {calculation.infraestrutura.monitoramento.toFixed(2)}</span>
                </div>
                {calculation.infraestrutura.desconto > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span>Desconto ({config.desconto_individual}%):</span>
                    <span className="font-mono">-R$ {calculation.infraestrutura.desconto.toFixed(2)}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Licenciamento Detalhado */}
            {calculation.licenciamento.total > 0 && (
              <div className="bg-dark-800/50 rounded-lg p-4">
                <h4 className="font-semibold text-purple-400 mb-3">📄 Licenciamento</h4>
                <div className="space-y-2 text-sm">
                  {calculation.licenciamento.detalhes.sistema_operacional > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Sistema Operacional:</span>
                      <span className="font-mono">R$ {calculation.licenciamento.detalhes.sistema_operacional.toFixed(2)}</span>
                    </div>
                  )}
                  {calculation.licenciamento.detalhes.banco_dados > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Banco de Dados:</span>
                      <span className="font-mono">R$ {calculation.licenciamento.detalhes.banco_dados.toFixed(2)}</span>
                    </div>
                  )}
                  {calculation.licenciamento.detalhes.aplicacoes > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Aplicações:</span>
                      <span className="font-mono">R$ {calculation.licenciamento.detalhes.aplicacoes.toFixed(2)}</span>
                    </div>
                  )}
                  {calculation.licenciamento.detalhes.tsplus > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">TSPlus:</span>
                      <span className="font-mono">R$ {calculation.licenciamento.detalhes.tsplus.toFixed(2)}</span>
                    </div>
                  )}
                  {calculation.licenciamento.detalhes.waf > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">WAF:</span>
                      <span className="font-mono">R$ {calculation.licenciamento.detalhes.waf.toFixed(2)}</span>
                    </div>
                  )}
                  {calculation.licenciamento.detalhes.ips > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">IPs Adicionais:</span>
                      <span className="font-mono">R$ {calculation.licenciamento.detalhes.ips.toFixed(2)}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
        
        <Button className="btn-primary w-full">
          <Sparkles className="mr-2 h-4 w-4" />
          Adicionar à Proposta
        </Button>
      </div>
    </Card>
  );
};

export default PricingBreakdown;
