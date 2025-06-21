
import React from 'react';
import Layout from '@/components/layout/Layout';
import StatCard from '@/components/ui/StatCard';
import { 
  Calculator, 
  Users, 
  FileText, 
  TrendingUp,
  DollarSign,
  Target,
  Clock,
  Award
} from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: 'Propostas do Mês',
      value: '47',
      subtitle: '12 aguardando aprovação',
      icon: FileText,
      trend: { value: 15.3, label: 'vs mês anterior', isPositive: true }
    },
    {
      title: 'Valor Total',
      value: 'R$ 847.2K',
      subtitle: 'Receita mensal projetada',
      icon: DollarSign,
      color: 'green' as const,
      trend: { value: 23.1, label: 'crescimento', isPositive: true }
    },
    {
      title: 'Taxa de Conversão',
      value: '73.2%',
      subtitle: 'Meta: 70%',
      icon: Target,
      color: 'blue' as const,
      trend: { value: 5.7, label: 'melhoria', isPositive: true }
    },
    {
      title: 'Tempo Médio',
      value: '4.8 dias',
      subtitle: 'Da proposta ao fechamento',
      icon: Clock,
      color: 'gold' as const,
      trend: { value: -12.5, label: 'redução', isPositive: true }
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'proposal',
      title: 'Nova proposta criada',
      description: 'Infraestrutura Microsoft para TechCorp',
      time: '5 min atrás',
      user: 'João Silva',
      status: 'success'
    },
    {
      id: 2,
      type: 'approval',
      title: 'Proposta aprovada',
      description: 'Cloud Analytics - DataFlow Ltda',
      time: '2 horas atrás',
      user: 'Maria Santos',
      status: 'success'
    },
    {
      id: 3,
      type: 'client',
      title: 'Novo cliente cadastrado',
      description: 'InnovaTech Solutions',
      time: '4 horas atrás',
      user: 'Carlos Lima',
      status: 'info'
    }
  ];

  return (
    <Layout 
      title="Dashboard Executivo" 
      subtitle="Acompanhe sua performance e métricas em tempo real"
    >
      {/* Welcome Hero */}
      <div className="mb-8">
        <div className="relative overflow-hidden card-premium p-8">
          <div className="absolute inset-0 bg-gradient-to-r from-gold-600/10 to-gold-500/5"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-gradient mb-2">
              Bem-vindo de volta, João! 👋
            </h2>
            <p className="text-gray-400 text-lg">
              Você está 23% acima da meta mensal. Continue assim!
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
            <StatCard {...stat} />
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <div className="card-premium">
            <h3 className="text-xl font-bold text-gold-400 mb-6">Ações Rápidas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="btn-primary text-left p-6 space-y-2 hover-scale">
                <Calculator className="h-8 w-8 mb-3" />
                <h4 className="font-semibold text-lg">Nova Proposta</h4>
                <p className="text-sm opacity-80">Criar calculadora premium</p>
              </button>
              <button className="btn-secondary text-left p-6 space-y-2 hover-scale">
                <Users className="h-8 w-8 mb-3" />
                <h4 className="font-semibold text-lg">Gerenciar Clientes</h4>
                <p className="text-sm opacity-80">Ver todos os clientes</p>
              </button>
            </div>
          </div>
        </div>

        <div className="card-premium">
          <h3 className="text-xl font-bold text-gold-400 mb-6">Performance</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Meta Mensal</span>
              <span className="text-lg font-bold text-green-400">123%</span>
            </div>
            <div className="w-full bg-dark-700 rounded-full h-3">
              <div className="bg-gradient-to-r from-gold-600 to-gold-500 h-3 rounded-full animate-pulse" style={{ width: '123%' }}></div>
            </div>
            <div className="pt-4 border-t border-gold-600/10">
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-gold-500" />
                <span className="text-sm text-gold-400 font-semibold">Top Performer</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card-premium">
        <h3 className="text-xl font-bold text-gold-400 mb-6">Atividade Recente</h3>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div key={activity.id} className="flex items-center space-x-4 p-4 rounded-lg bg-dark-800/50 hover:bg-dark-700/50 transition-all duration-300">
              <div className={`w-3 h-3 rounded-full ${
                activity.status === 'success' ? 'bg-green-400' : 'bg-blue-400'
              }`}></div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground">{activity.title}</h4>
                <p className="text-sm text-gray-400">{activity.description}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">{activity.time}</p>
                <p className="text-xs text-gold-400">{activity.user}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
