
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { VMConfig } from '@/types/calculator';

interface CalculatorState {
  vms: VMConfig[];
  selectedVMId: string | null;
  
  // VM Actions
  addVM: () => string;
  updateVM: (id: string, config: Partial<VMConfig>) => void;
  removeVM: (id: string) => void;
  duplicateVM: (id: string) => string;
  selectVM: (id: string) => void;
  
  // Getters
  getVM: (id: string) => VMConfig | undefined;
  getSelectedVM: () => VMConfig | undefined;
  getTotalCost: () => number;
}

const createDefaultVM = (): VMConfig => ({
  id: 'vm-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9),
  nome: `VM-${Date.now().toString().slice(-4)}`,
  vcpu: 4,
  ram: 8,
  discoSSD: 100,
  discoFCM: 0,
  backupTipo: 'padrao',
  sistemaOperacional: {
    windows: false,
    rhel: false,
    suse: false,
    linux_gratuito: 'Ubuntu 22.04'
  },
  bancodados: {
    sql_server_std: false,
    sql_server_web: false,
    mysql_enterprise: false,
    mongodb_enterprise: false,
    postgresql: true
  },
  aplicacoes: {
    antivirus: false,
    thinprint: false,
    sap_hana: false
  },
  tsplus: {
    ativo: false,
    usuarios: 3,
    advanced_security: false,
    two_factor: false
  },
  waf: {
    tipo: 'none'
  },
  ips_adicionais: 0,
  desconto_individual: 0,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
});

export const useCalculatorStore = create<CalculatorState>()(
  persist(
    (set, get) => ({
      vms: [createDefaultVM()],
      selectedVMId: null,

      addVM: () => {
        const newVM = createDefaultVM();
        set((state) => ({
          vms: [...state.vms, newVM],
          selectedVMId: newVM.id
        }));
        return newVM.id;
      },

      updateVM: (id, config) => {
        set((state) => ({
          vms: state.vms.map((vm) =>
            vm.id === id
              ? { ...vm, ...config, updated_at: new Date().toISOString() }
              : vm
          )
        }));
      },

      removeVM: (id) => {
        set((state) => {
          const newVMs = state.vms.filter((vm) => vm.id !== id);
          const newSelectedId = state.selectedVMId === id 
            ? (newVMs.length > 0 ? newVMs[0].id : null)
            : state.selectedVMId;
          
          return {
            vms: newVMs.length > 0 ? newVMs : [createDefaultVM()],
            selectedVMId: newSelectedId
          };
        });
      },

      duplicateVM: (id) => {
        const vm = get().getVM(id);
        if (!vm) return '';
        
        const newVM = {
          ...vm,
          id: 'vm-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9),
          nome: vm.nome + ' (Cópia)',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        set((state) => ({
          vms: [...state.vms, newVM],
          selectedVMId: newVM.id
        }));
        
        return newVM.id;
      },

      selectVM: (id) => {
        set({ selectedVMId: id });
      },

      getVM: (id) => {
        return get().vms.find((vm) => vm.id === id);
      },

      getSelectedVM: () => {
        const { vms, selectedVMId } = get();
        if (!selectedVMId) return vms[0];
        return vms.find((vm) => vm.id === selectedVMId) || vms[0];
      },

      getTotalCost: () => {
        const { vms } = get();
        return vms.reduce((total, vm) => {
          // Aqui você pode importar e usar calcularVM
          // Por enquanto retorno 0 para não quebrar
          return total;
        }, 0);
      }
    }),
    {
      name: 'optidata-calculator-store',
      version: 1,
    }
  )
);
