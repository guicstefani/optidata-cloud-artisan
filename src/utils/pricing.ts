
export const PRECOS_OPTIDATA = {
  // INFRAESTRUTURA (por hora)
  vcpu_hora: 0.0347,
  ram_hora: 0.0278,
  horas_mes: 720,
  
  // STORAGE (mensal)
  fcm_gb: 0.75,
  ssd_gb: 0.55,
  
  // BACKUP (sobre total storage)
  backup_padrao: 0.30,
  backup_duplo: 0.25,
  backup_triplo: 0.20,
  
  // MONITORAMENTO
  monitoramento_vm: 100,
  
  // SISTEMAS OPERACIONAIS
  windows_server: 55,
  rhel: 1200,
  suse: 900,
  
  // BANCO DE DADOS
  sql_server_std: 800,
  sql_server_web: 140,
  mysql_enterprise: 800,
  mongodb_enterprise: 1200,
  
  // MIDDLEWARE E APLICAÇÕES
  antivirus: 55,
  thinprint: 850,
  sap_hana: 5000,
  
  // TERMINAL SERVICES (TSPlus)
  tsplus: {
    3: 140,
    5: 180,
    10: 310,
    15: 390,
    25: 550,
    35: 730,
    49: 990,
    ilimitado: 1190
  },
  tsplus_advanced_security: 140,
  tsplus_two_factor: 165,
  
  // WEB APPLICATION FIREWALL
  waf: {
    pro: 200,
    business: 1600,
    enterprise: 15600
  },
  
  // OUTROS
  ip_adicional: 70
};

export function arredondar(valor: number): number {
  return Math.round(valor * 100) / 100;
}

export function calcularComputacao(vcpu: number, ram: number): number {
  const custoVcpu = vcpu * PRECOS_OPTIDATA.vcpu_hora * PRECOS_OPTIDATA.horas_mes;
  const custoRam = ram * PRECOS_OPTIDATA.ram_hora * PRECOS_OPTIDATA.horas_mes;
  return arredondar(custoVcpu + custoRam);
}

export function calcularStorage(fcm: number, ssd: number, tipoBackup: string): number {
  const storageTotal = fcm + ssd;
  const custoStorage = (fcm * PRECOS_OPTIDATA.fcm_gb) + (ssd * PRECOS_OPTIDATA.ssd_gb);
  
  let custoBackup = storageTotal * PRECOS_OPTIDATA.backup_padrao;
  
  if (tipoBackup === 'duplo') {
    custoBackup += storageTotal * PRECOS_OPTIDATA.backup_duplo;
  } else if (tipoBackup === 'triplo') {
    custoBackup += storageTotal * (PRECOS_OPTIDATA.backup_duplo + PRECOS_OPTIDATA.backup_triplo);
  }
  
  return arredondar(custoStorage + custoBackup);
}

export function calcularWindowsServer(vcpu: number): number {
  const licencas = Math.ceil(vcpu / 2);
  return licencas * PRECOS_OPTIDATA.windows_server;
}

export function calcularSQLServer(vcpu: number): number {
  const licencas = Math.ceil(vcpu / 2);
  return licencas * PRECOS_OPTIDATA.sql_server_std;
}
