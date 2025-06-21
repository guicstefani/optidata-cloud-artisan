
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import PremiumSlider from '@/components/calculator/PremiumSlider';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Server, 
  HardDrive, 
  Shield, 
  Zap,
  TrendingUp,
  Calculator as CalcIcon,
  Sparkles
} from 'lucide-react';

interface VMConfig {
  vcpu: number;
  ram: number;
  ssd: number;
  fcm: number;
  backup: 'padrao' | 'duplo' | 'triplo';
}

const PRECOS = {
  vcpu_hora: 0.0347,
  ram_hora: 0.0278,
  horas_mes: 720,
  ssd_gb: 0.55,
  fcm_gb: 0.75,
  backup_padrao: 0.30,
  backup_duplo: 0.25,
  backup_triplo: 0.20,
  monitoramento: 100
};

const Calculator = () => {
  const [config, setConfig] = useState<VMConfig>({
    vcpu: 4,
    ram: 8,
    ssd: 100,
    fcm: 0,
    backup: 'padrao'
  });

  const calcularCustos = () => {
    const computacao = (config.vcpu * PRECOS.vcpu_hora + config.ram * PRECOS.ram_hora) * PRECOS.horas_mes;
    const storage = config.ssd * PRECOS.ssd_gb + config.fcm * PRECOS.fcm_gb;
    const storageTotal = config.ssd + config.fcm;
    
    let backup = storageTotal * PRECOS.backup_padrao;
    if (config.backup === 'duplo') backup += storageTotal * PRECOS.backup_duplo;
    if (config.backup === 'triplo') backup += storageTotal * (PRECOS.backup_duplo + PRECOS.backup_triplo);
    
    const infraestrutura = computacao + storage + backup;
    const total = infraestrutura + PRECOS.monitoramento;
    
    return {
      computacao: Math.round(computacao * 100) / 100,
      storage: Math.round(storage * 100) / 100,
      backup: Math.round(backup * 100) / 100,
      monitoramento: PRECOS.monitoramento,
      infraestrutura: Math.round(infraestrutura * 100) / 100,
      total: Math.round(total * 100) / 100
    };
  };

  const custos = calcularCustos();

  return (
    <Layout 
      title="Calculadora Cloud Premium" 
      subtitle="Configure sua infraestrutura ideal com precisão cirúrgica"
    >
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Configuration Panel */}
        <div className="xl:col-span-2 space-y-6">
          {/* Recursos Computacionais */}
          <div className="card-premium card-hover">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gold-500/20 rounded-lg">
                <Server className="h-6 w-6 text-gold-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gold-400">Recursos Computacionais</h3>
                <p className="text-sm text-gray-400">Configure CPU e memória</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <PremiumSlider
                label="vCPU Cores"
                value={config.vcpu}
                min={1}
                max={32}
                onChange={(value) => setConfig(prev => ({ ...prev, vcpu: value }))}
                description="Processamento virtual dedicado"
              />
              
              <PremiumSlider
                label="Memória RAM"
                value={config.ram}
                min={1}
                max={128}
                unit="GB"
                onChange={(value) => setConfig(prev => ({ ...prev, ram: value }))}
                description="Memória de alta performance"
              />
            </div>
          </div>

          {/* Armazenamento */}
          <div className="card-premium card-hover">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <HardDrive className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gold-400">Armazenamento</h3>
                <p className="text-sm text-gray-400">Discos SSD e FCM</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <PremiumSlider
                label="SSD Premium"
                value={config.ssd}
                min={0}
                max={2000}
                unit="GB"
                onChange={(value) => setConfig(prev => ({ ...prev, ssd: value }))}
                description="Alta performance IOPS"
              />
              
              <PremiumSlider
                label="FCM Storage"
                value={config.fcm}
                min={0}
                max={10000}
                unit="GB"
                onChange={(value) => setConfig(prev => ({ ...prev, fcm: value }))}
                description="Alta capacidade econômica"
              />
            </div>
          </div>

          {/* Backup */}
          <div className="card-premium card-hover">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Shield className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gold-400">Proteção de Dados</h3>
                <p className="text-sm text-gray-400">Estratégia de backup</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { key: 'padrao', label: 'Padrão', desc: 'Backup diário' },
                { key: 'duplo', label: 'Duplo', desc: 'Redundância extra' },
                { key: 'triplo', label: 'Triplo', desc: 'Máxima proteção' }
              ].map((option) => (
                <button
                  key={option.key}
                  onClick={() => setConfig(prev => ({ ...prev, backup: option.key as any }))}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                    config.backup === option.key
                      ? 'border-gold-500 bg-gold-500/10 text-gold-400'
                      : 'border-gray-600 bg-dark-800 hover:border-gold-600/50'
                  }`}
                >
                  <h4 className="font-semibold">{option.label}</h4>
                  <p className="text-xs text-gray-400 mt-1">{option.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Preview & Pricing */}
        <div className="space-y-6">
          {/* VM Preview */}
          <div className="card-premium">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Zap className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold text-gold-400">Preview 3D</h3>
            </div>
            
            <div className="space-y-4">
              <div className="bg-dark-800 rounded-lg p-4 border border-gold-600/20">
                <div className="text-center">
                  <div className="text-2xl mb-2">🖥️</div>
                  <h4 className="font-semibold text-gold-400">VM Configuration</h4>
                </div>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">vCPU:</span>
                    <span className="text-gold-400 font-mono">{config.vcpu} cores</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">RAM:</span>
                    <span className="text-gold-400 font-mono">{config.ram} GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">SSD:</span>
                    <span className="text-gold-400 font-mono">{config.ssd} GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">FCM:</span>
                    <span className="text-gold-400 font-mono">{config.fcm} GB</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Breakdown */}
          <div className="card-premium">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gold-500/20 rounded-lg">
                <CalcIcon className="h-6 w-6 text-gold-500" />
              </div>
              <h3 className="text-xl font-bold text-gold-400">Investimento</h3>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Computação:</span>
                  <span className="text-foreground font-mono">R$ {custos.computacao}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Storage:</span>
                  <span className="text-foreground font-mono">R$ {custos.storage}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Backup:</span>
                  <span className="text-foreground font-mono">R$ {custos.backup}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Monitoramento:</span>
                  <span className="text-foreground font-mono">R$ {custos.monitoramento}</span>
                </div>
                <hr className="border-gold-600/20" />
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-gradient">Total Mensal:</span>
                  <span className="text-gold-400 font-mono">R$ {custos.total}</span>
                </div>
                <div className="text-center text-sm text-gray-400">
                  Anual: R$ {(custos.total * 12).toFixed(2)}
                </div>
              </div>
              
              <Button className="btn-primary w-full">
                <Sparkles className="mr-2 h-4 w-4" />
                Adicionar à Proposta
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Calculator;
