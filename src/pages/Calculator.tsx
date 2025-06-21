
import React from 'react';
import Layout from '@/components/layout/Layout';
import PremiumSlider from '@/components/calculator/PremiumSlider';
import LicensingTab from '@/components/calculator/LicensingTab';
import PricingBreakdown from '@/components/calculator/PricingBreakdown';
import VMSelector from '@/components/calculator/VMSelector';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCalculatorStore } from '@/store/calculator';
import { 
  Server, 
  HardDrive, 
  Shield, 
  Zap,
  Settings
} from 'lucide-react';

const Calculator = () => {
  const { getSelectedVM, updateVM } = useCalculatorStore();
  const config = getSelectedVM();

  const updateConfig = (newConfig: any) => {
    if (config) {
      updateVM(config.id, newConfig);
    }
  };

  if (!config) {
    return (
      <Layout title="Calculadora Cloud Premium">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-gray-400">Carregando configuração...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout 
      title="Calculadora Cloud Premium" 
      subtitle="Configure sua infraestrutura ideal com precisão cirúrgica"
    >
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
        {/* VM Selector Sidebar */}
        <div className="xl:col-span-1">
          <VMSelector />
        </div>

        {/* Configuration Panel */}
        <div className="xl:col-span-3">
          <Tabs defaultValue="recursos" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-dark-800 border border-gold-600/20">
              <TabsTrigger value="recursos" className="flex items-center space-x-2">
                <Server className="h-4 w-4" />
                <span className="hidden sm:inline">Recursos</span>
              </TabsTrigger>
              <TabsTrigger value="storage" className="flex items-center space-x-2">
                <HardDrive className="h-4 w-4" />
                <span className="hidden sm:inline">Storage</span>
              </TabsTrigger>
              <TabsTrigger value="licenciamento" className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">Licenças</span>
              </TabsTrigger>
              <TabsTrigger value="otimizacao" className="flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Extras</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="recursos" className="mt-6">
              <Card className="card-premium card-hover p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-gold-500/20 rounded-lg">
                    <Server className="h-6 w-6 text-gold-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gold-400">Recursos Computacionais</h3>
                    <p className="text-sm text-gray-400">Configure CPU e memória para {config.nome}</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <PremiumSlider
                    label="vCPU Cores"
                    value={config.vcpu}
                    min={1}
                    max={32}
                    onChange={(value) => updateConfig({ ...config, vcpu: value })}
                    description="Processamento virtual dedicado"
                  />
                  
                  <PremiumSlider
                    label="Memória RAM"
                    value={config.ram}
                    min={1}
                    max={128}
                    unit="GB"
                    onChange={(value) => updateConfig({ ...config, ram: value })}
                    description="Memória de alta performance"
                  />
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="storage" className="mt-6">
              <Card className="card-premium card-hover p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <HardDrive className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gold-400">Armazenamento</h3>
                    <p className="text-sm text-gray-400">Discos SSD e FCM para {config.nome}</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <PremiumSlider
                    label="SSD Premium"
                    value={config.discoSSD}
                    min={0}
                    max={2000}
                    unit="GB"
                    onChange={(value) => updateConfig({ ...config, discoSSD: value })}
                    description="Alta performance IOPS"
                  />
                  
                  <PremiumSlider
                    label="FCM Storage"
                    value={config.discoFCM}
                    min={0}
                    max={10000}
                    unit="GB"
                    onChange={(value) => updateConfig({ ...config, discoFCM: value })}
                    description="Alta capacidade econômica"
                  />
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gold-400">Estratégia de Backup</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { key: 'padrao', label: 'Padrão', desc: 'Backup diário' },
                        { key: 'duplo', label: 'Duplo', desc: 'Redundância extra' },
                        { key: 'triplo', label: 'Triplo', desc: 'Máxima proteção' }
                      ].map((option) => (
                        <button
                          key={option.key}
                          onClick={() => updateConfig({ ...config, backupTipo: option.key as any })}
                          className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                            config.backupTipo === option.key
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
              </Card>
            </TabsContent>

            <TabsContent value="licenciamento" className="mt-6">
              <LicensingTab config={config} onChange={updateConfig} />
            </TabsContent>

            <TabsContent value="otimizacao" className="mt-6">
              <Card className="card-premium card-hover p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <Zap className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gold-400">Configurações Extras</h3>
                    <p className="text-sm text-gray-400">IPs adicionais e descontos para {config.nome}</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <PremiumSlider
                    label="IPs Adicionais"
                    value={config.ips_adicionais}
                    min={0}
                    max={10}
                    onChange={(value) => updateConfig({ ...config, ips_adicionais: value })}
                    description="R$ 70/IP adicional por mês"
                  />
                  
                  <PremiumSlider
                    label="Desconto Individual"
                    value={config.desconto_individual}
                    min={0}
                    max={50}
                    unit="%"
                    onChange={(value) => updateConfig({ ...config, desconto_individual: value })}
                    description="Desconto aplicado apenas na infraestrutura"
                  />
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Pricing Sidebar */}
        <div className="xl:col-span-1">
          <PricingBreakdown config={config} />
        </div>
      </div>
    </Layout>
  );
};

export default Calculator;
