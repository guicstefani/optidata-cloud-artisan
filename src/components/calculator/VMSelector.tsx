
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
  Check,
  X
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gold-400">Máquinas Virtuais</h2>
          <p className="text-sm text-gray-400 mt-1">{vms.length} VM{vms.length !== 1 ? 's' : ''} configurada{vms.length !== 1 ? 's' : ''}</p>
        </div>
        <Button
          onClick={addVM}
          className="bg-gold-600 hover:bg-gold-500 text-dark-900 font-semibold px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105"
          size="sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nova VM
        </Button>
      </div>

      {/* VM List */}
      <div className="space-y-3">
        {vms.map((vm) => {
          const calculation = calcularVM(vm);
          const isSelected = vm.id === selectedVMId;
          
          return (
            <Card
              key={vm.id}
              className={`p-4 cursor-pointer transition-all duration-200 group ${
                isSelected
                  ? 'border-gold-500 bg-gold-500/5 shadow-lg ring-1 ring-gold-500/20'
                  : 'border-gray-700 hover:border-gold-600/50 bg-dark-800/80 hover:bg-dark-800'
              }`}
              onClick={() => selectVM(vm.id)}
            >
              <div className="flex items-center justify-between">
                {/* VM Info */}
                <div className="flex items-center space-x-3 flex-1">
                  <div className={`p-2 rounded-lg ${
                    isSelected ? 'bg-gold-500/20' : 'bg-gray-700/50'
                  }`}>
                    <Server className={`h-4 w-4 ${
                      isSelected ? 'text-gold-500' : 'text-gray-400'
                    }`} />
                  </div>
                  
                  <div className="flex-1">
                    {/* VM Name */}
                    {editingId === vm.id ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          className="bg-dark-700 border border-gold-600/50 rounded px-2 py-1 text-sm text-foreground focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') saveEdit();
                            if (e.key === 'Escape') cancelEdit();
                          }}
                          autoFocus
                        />
                        <Button size="sm" variant="ghost" onClick={saveEdit} className="h-7 w-7 p-0">
                          <Check className="h-3 w-3 text-green-400" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={cancelEdit} className="h-7 w-7 p-0">
                          <X className="h-3 w-3 text-red-400" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <h3 className={`font-medium ${
                          isSelected ? 'text-gold-400' : 'text-foreground'
                        }`}>
                          {vm.nome}
                        </h3>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            startEdit(vm);
                          }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                        >
                          <Edit2 className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                    
                    {/* VM Specs */}
                    <div className="text-xs text-gray-400 mt-1">
                      {vm.vcpu} vCPU • {vm.ram}GB RAM • {vm.discoSSD + vm.discoFCM}GB Storage
                    </div>
                  </div>
                </div>

                {/* Price & Actions */}
                <div className="flex items-center space-x-3">
                  {/* Price */}
                  <div className="text-right">
                    <div className={`font-mono text-sm font-bold ${
                      isSelected ? 'text-gold-400' : 'text-foreground'
                    }`}>
                      R$ {calculation.total.toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-400">
                      /mês
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        duplicateVM(vm.id);
                      }}
                      className="h-7 w-7 p-0 hover:bg-blue-500/20 hover:text-blue-400"
                      title="Duplicar VM"
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
                        className="h-7 w-7 p-0 hover:bg-red-500/20 hover:text-red-400"
                        title="Remover VM"
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

      {/* Total Summary */}
      {vms.length > 1 && (
        <Card className="bg-gradient-to-r from-gold-600/10 to-gold-500/10 border-gold-600/30 p-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-gold-400">Total Geral</h3>
              <p className="text-xs text-gray-400">{vms.length} máquinas virtuais</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gold-400 font-mono">
                R$ {vms.reduce((total, vm) => total + calcularVM(vm).total, 0).toFixed(2)}
              </div>
              <div className="text-sm text-gray-400">
                por mês
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default VMSelector;
