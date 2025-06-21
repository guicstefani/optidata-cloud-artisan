
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
            <Server className="h-16 w-16 text-gold-500 mx-auto mb-4 animate-pulse" />
            <p className="text-gray-400">Carregando configuração...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout 
      title="Calculadora Cloud Premium" 
      subtitle="Configure sua infraestrutura ideal com precisão"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-8">
          {/* VM Selector */}
          <div className="col-span-12 lg:col-span-3">
            <VMSelector />
          </div>

          {/* Main Configuration */}
          <div className="col-span-12 lg:col-span-6">
            <Card className="bg-dark-800/50 border-gold-600/20 p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gold-400">{config.nome}</h2>
                <p className="text-gray-400 text-sm mt-1">Configure os recursos desta máquina virtual</p>
              </div>

              <Tabs defaultValue="recursos" className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-dark-700 border border-gold-600/20 p-1 rounded-lg">
                  <TabsTrigger 
                    value="recursos" 
                    className="flex items-center space-x-2 data-[state=active]:bg-gold-600 data-[state=active]:text-dark-900"
                  >
                    <Server className="h-4 w-4" />
                    <span className="hidden sm:inline">Recursos</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="storage" 
                    className="flex items-center space-x-2 data-[state=active]:bg-gold-600 data-[state=active]:text-dark-900"
                  >
                    <HardDrive className="h-4 w-4" />
                    <span className="hidden sm:inline">Storage</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="licenciamento" 
                    className="flex items-center space-x-2 data-[state=active]:bg-gold-600 data-[state=active]:text-dark-900"
                  >
                    <Shield className="h-4 w-4" />
                    <span className="hidden sm:inline">Licenças</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="extras" 
                    className="flex items-center space-x-2 data-[state=active]:bg-gold-600 data-[state=active]:text-dark-900"
                  >
                    <Settings className="h-4 w-4" />
                    <span className="hidden sm:inline">Extras</span>
                  </TabsTrigger>
                </TabsList>

                <div className="mt-6">
                  <TabsContent value="recursos" className="space-y-6">
                    <PremiumSlider
                      label="vCPU Cores"
                      value={config.vcpu}
                      min={1}
                      max={32}
                      onChange={(value) => updateConfig({ ...config, vcpu: value })}
                      description="Processadores virtuais dedicados"
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
                  </TabsContent>

                  <TabsContent value="storage" className="space-y-6">
                    <PremiumSlider
                      label="SSD Premium"
                      value={config.discoSSD}
                      min={0}
                      max={2000}
                      unit="GB"
                      onChange={(value) => updateConfig({ ...config, discoSSD: value })}
                      description="Armazenamento de alta performance"
                    />
                    
                    <PremiumSlider
                      label="FCM Storage"
                      value={config.discoFCM}
                      min={0}
                      max={10000}
                      unit="GB"
                      onChange={(value) => updateConfig({ ...config, discoFCM: value })}
                      description="Armazenamento econômico de alta capacidade"
                    />
                    
                    <div>
                      <label className="block text-sm font-medium mb-3 text-gold-400">Estratégia de Backup</label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {[
                          { key: 'padrao', label: 'Padrão', desc: 'Backup diário' },
                          { key: 'duplo', label: 'Duplo', desc: 'Redundância extra' },
                          { key: 'triplo', label: 'Triplo', desc: 'Máxima proteção' }
                        ].map((option) => (
                          <button
                            key={option.key}
                            onClick={() => updateConfig({ ...config, backupTipo: option.key as any })}
                            className={`p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                              config.backupTipo === option.key
                                ? 'border-gold-500 bg-gold-500/10 text-gold-400'
                                : 'border-gray-600 bg-dark-700/50 hover:border-gold-600/50 text-gray-300'
                            }`}
                          >
                            <h4 className="font-semibold text-sm">{option.label}</h4>
                            <p className="text-xs text-gray-400 mt-1">{option.desc}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="licenciamento">
                    <LicensingTab config={config} onChange={updateConfig} />
                  </TabsContent>

                  <TabsContent value="extras" className="space-y-6">
                    <PremiumSlider
                      label="IPs Adicionais"
                      value={config.ips_adicionais}
                      min={0}
                      max={10}
                      onChange={(value) => updateConfig({ ...config, ips_adicionais: value })}
                      description="R$ 70 por IP adicional por mês"
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
                  </TabsContent>
                </div>
              </Tabs>
            </Card>
          </div>

          {/* Pricing Sidebar */}
          <div className="col-span-12 lg:col-span-3">
            <PricingBreakdown config={config} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Calculator;
