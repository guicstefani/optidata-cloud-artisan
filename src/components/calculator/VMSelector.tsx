
import React from 'react';
import { useCalculatorStore } from '@/store/calculator';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { calcularVM } from '@/utils/vmCalculator';
import { 
  Plus, 
  Copy, 
  Trash2, 
  Server,
  Edit2,
  Check
} from 'lucide-react';

const VMSelector: React.FC = () => {
  const { 
    vms, 
    selectedVMId, 
    addVM, 
    removeVM, 
    duplicateVM, 
    selectVM, 
    updateVM,
    getSelectedVM 
  } = useCalculatorStore();

  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [editingName, setEditingName] = React.useState('');

  const startEdit = (vm: any) => {
    setEditingId(vm.id);
    setEditingName(vm.nome);
  };

  const saveEdit = () => {
    if (editingId && editingName.trim()) {
      updateVM(editingId, { nome: editingName.trim() });
    }
    setEditingId(null);
    setEditingName('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingName('');
  };

  React.useEffect(() => {
    if (vms.length > 0 && !selectedVMId) {
      selectVM(vms[0].id);
    }
  }, [vms, selectedVMId, selectVM]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gold-400">Máquinas Virtuais</h3>
        <Button
          onClick={addVM}
          className="btn-primary flex items-center space-x-2"
          size="sm"
        >
          <Plus className="h-4 w-4" />
          <span>Nova VM</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {vms.map((vm) => {
          const calculation = calcularVM(vm);
          const isSelected = vm.id === selectedVMId;
          
          return (
            <Card
              key={vm.id}
              className={`p-4 cursor-pointer transition-all duration-200 ${
                isSelected
                  ? 'border-gold-500 bg-gold-500/10 shadow-lg'
                  : 'border-gray-600 hover:border-gold-600/50 bg-dark-800'
              }`}
              onClick={() => selectVM(vm.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    isSelected ? 'bg-gold-500/20' : 'bg-gray-700'
                  }`}>
                    <Server className={`h-4 w-4 ${
                      isSelected ? 'text-gold-500' : 'text-gray-400'
                    }`} />
                  </div>
                  
                  <div>
                    {editingId === vm.id ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          className="bg-dark-700 border border-gold-600/50 rounded px-2 py-1 text-sm text-foreground focus:outline-none focus:border-gold-500"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') saveEdit();
                            if (e.key === 'Escape') cancelEdit();
                          }}
                          autoFocus
                        />
                        <Button size="sm" variant="ghost" onClick={saveEdit}>
                          <Check className="h-3 w-3" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <h4 className={`font-medium ${
                          isSelected ? 'text-gold-400' : 'text-foreground'
                        }`}>
                          {vm.nome}
                        </h4>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            startEdit(vm);
                          }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Edit2 className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                    
                    <div className="text-xs text-gray-400 mt-1">
                      {vm.vcpu} vCPU • {vm.ram}GB RAM • {vm.discoSSD + vm.discoFCM}GB Storage
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="text-right">
                    <div className={`font-mono text-sm ${
                      isSelected ? 'text-gold-400' : 'text-foreground'
                    }`}>
                      R$ {calculation.total.toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-400">
                      /mês
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        duplicateVM(vm.id);
                      }}
                      className="h-8 w-8 p-0"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                    
                    {vms.length > 1 && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeVM(vm.id);
                        }}
                        className="h-8 w-8 p-0 text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {vms.length > 1 && (
        <div className="mt-4 p-3 bg-dark-800/50 rounded-lg border border-gold-600/20">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Total Geral:</span>
            <span className="font-mono text-lg font-bold text-gold-400">
              R$ {vms.reduce((total, vm) => total + calcularVM(vm).total, 0).toFixed(2)}
            </span>
          </div>
          <div className="text-xs text-gray-500 text-right mt-1">
            {vms.length} VM{vms.length > 1 ? 's' : ''} configurada{vms.length > 1 ? 's' : ''}
          </div>
        </div>
      )}
    </div>
  );
};

export default VMSelector;
