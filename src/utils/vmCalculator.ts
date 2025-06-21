
import { VMConfig, VMCalculation } from '@/types/calculator';
import { 
  PRECOS_OPTIDATA, 
  arredondar, 
  calcularComputacao, 
  calcularStorage, 
  calcularWindowsServer, 
  calcularSQLServer 
} from './pricing';

export function calcularVM(vm: VMConfig): VMCalculation {
  // 1. INFRAESTRUTURA
  const computacao = calcularComputacao(vm.vcpu, vm.ram);
  const storage = calcularStorage(vm.discoFCM, vm.discoSSD, vm.backupTipo);
  const monitoramento = PRECOS_OPTIDATA.monitoramento_vm;
  
  const subtotalInfra = computacao + storage + monitoramento;
  
  // 2. LICENCIAMENTO
  let sistemaOperacional = 0;
  let bancoDados = 0;
  let aplicacoes = 0;
  let tsplus = 0;
  let waf = 0;
  let ips = 0;
  
  // Sistemas Operacionais
  if (vm.sistemaOperacional.windows) {
    sistemaOperacional += calcularWindowsServer(vm.vcpu);
  }
  if (vm.sistemaOperacional.rhel) {
    sistemaOperacional += PRECOS_OPTIDATA.rhel;
  }
  if (vm.sistemaOperacional.suse) {
    sistemaOperacional += PRECOS_OPTIDATA.suse;
  }
  
  // Bancos de Dados
  if (vm.bancodados.sql_server_std && vm.sistemaOperacional.windows) {
    bancoDados += calcularSQLServer(vm.vcpu);
  }
  if (vm.bancodados.sql_server_web) {
    bancoDados += PRECOS_OPTIDATA.sql_server_web;
  }
  if (vm.bancodados.mysql_enterprise) {
    bancoDados += PRECOS_OPTIDATA.mysql_enterprise;
  }
  if (vm.bancodados.mongodb_enterprise) {
    bancoDados += PRECOS_OPTIDATA.mongodb_enterprise;
  }
  
  // Aplicações
  if (vm.aplicacoes.antivirus) {
    aplicacoes += PRECOS_OPTIDATA.antivirus;
  }
  if (vm.aplicacoes.thinprint) {
    aplicacoes += PRECOS_OPTIDATA.thinprint;
  }
  if (vm.aplicacoes.sap_hana) {
    aplicacoes += PRECOS_OPTIDATA.sap_hana;
  }
  
  // TSPlus
  if (vm.tsplus.ativo) {
    tsplus += PRECOS_OPTIDATA.tsplus[vm.tsplus.usuarios];
    if (vm.tsplus.advanced_security) {
      tsplus += PRECOS_OPTIDATA.tsplus_advanced_security;
    }
    if (vm.tsplus.two_factor) {
      tsplus += PRECOS_OPTIDATA.tsplus_two_factor;
    }
  }
  
  // WAF
  if (vm.waf.tipo !== 'none') {
    waf += PRECOS_OPTIDATA.waf[vm.waf.tipo];
  }
  
  // IPs Adicionais
  if (vm.ips_adicionais > 0) {
    ips += vm.ips_adicionais * PRECOS_OPTIDATA.ip_adicional;
  }
  
  const totalLicenciamento = sistemaOperacional + bancoDados + aplicacoes + tsplus + waf + ips;
  
  // 3. APLICAR DESCONTO INDIVIDUAL (apenas infraestrutura)
  const descontoValor = subtotalInfra * (vm.desconto_individual / 100);
  const infraComDesconto = subtotalInfra - descontoValor;
  
  // 4. TOTAL FINAL
  const totalFinal = infraComDesconto + totalLicenciamento;
  
  return {
    infraestrutura: {
      computacao: arredondar(computacao),
      storage: arredondar(storage),
      monitoramento: monitoramento,
      subtotal: arredondar(subtotalInfra),
      desconto: arredondar(descontoValor),
      total_com_desconto: arredondar(infraComDesconto)
    },
    licenciamento: {
      total: arredondar(totalLicenciamento),
      detalhes: {
        sistema_operacional: arredondar(sistemaOperacional),
        banco_dados: arredondar(bancoDados),
        aplicacoes: arredondar(aplicacoes),
        tsplus: arredondar(tsplus),
        waf: arredondar(waf),
        ips: arredondar(ips)
      }
    },
    total: arredondar(totalFinal)
  };
}
