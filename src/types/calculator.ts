
export interface VMConfig {
  id: string;
  nome: string;
  
  // RECURSOS COMPUTACIONAIS
  vcpu: number;
  ram: number;
  
  // ARMAZENAMENTO
  discoFCM: number;
  discoSSD: number;
  backupTipo: 'padrao' | 'duplo' | 'triplo';
  
  // SISTEMA OPERACIONAL (apenas um)
  sistemaOperacional: {
    windows: boolean;
    rhel: boolean;
    suse: boolean;
    linux_gratuito: string | null;
  };
  
  // BANCO DE DADOS
  bancodados: {
    sql_server_std: boolean;
    sql_server_web: boolean;
    mysql_enterprise: boolean;
    mongodb_enterprise: boolean;
    postgresql: boolean;
  };
  
  // APLICAÇÕES E MIDDLEWARE
  aplicacoes: {
    antivirus: boolean;
    thinprint: boolean;
    sap_hana: boolean;
  };
  
  // TERMINAL SERVICES
  tsplus: {
    ativo: boolean;
    usuarios: 3 | 5 | 10 | 15 | 25 | 35 | 49 | 'ilimitado';
    advanced_security: boolean;
    two_factor: boolean;
  };
  
  // SEGURANÇA
  waf: {
    tipo: 'none' | 'pro' | 'business' | 'enterprise';
  };
  
  // EXTRAS
  ips_adicionais: number;
  desconto_individual: number;
  
  created_at: string;
  updated_at: string;
}

export interface VMCalculation {
  infraestrutura: {
    computacao: number;
    storage: number;
    monitoramento: number;
    subtotal: number;
    desconto: number;
    total_com_desconto: number;
  };
  licenciamento: {
    total: number;
    detalhes: {
      sistema_operacional: number;
      banco_dados: number;
      aplicacoes: number;
      tsplus: number;
      waf: number;
      ips: number;
    };
  };
  total: number;
}

export interface ValidationResult {
  valida: boolean;
  errors: string[];
  warnings: string[];
}
