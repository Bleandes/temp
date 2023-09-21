import * as Icons from './icon-config';
import {IModuloLayout} from './types';

export const sidebarModuloConfig: IModuloLayout[] = [
  {
    name: 'Cadastros',
    icon: (size?: number, color?: string) => <Icons.Cadastros size={size} color={color} />,
    categorias: [
      {
        name: 'Estoque',
        icon: (size?: number, color?: string) => <Icons.EstoqueCategoria size={size} color={color} />,
        programas: [
          {
            name: 'Fornecedor',
            entrySubprograma: 'Listar',
            route: '/fornecedor',
          },
          {name: 'Grupo', entrySubprograma: 'Listar', route: '/grupo'},
          {
            name: 'Laboratorio',
            entrySubprograma: 'Listar',
            route: '/laboratorio',
          },
          {
            name: 'Produto',
            entrySubprograma: 'Listar',
            route: '/produto',
          },
        ],
      },
      {
        name: 'Geral',
        icon: (size?: number, color?: string) => <Icons.Geral size={size} color={color} />,
        programas: [
          {name: 'Bairro', entrySubprograma: 'Listar', route: '/bairro'},
          {name: 'Cidade', entrySubprograma: 'Listar', route: '/cidade'},
          {name: 'Estado', entrySubprograma: 'Listar', route: '/estado'},
          {name: 'Pais', entrySubprograma: 'Listar', route: '/pais'},
          {name: 'Portador', entrySubprograma: 'Listar', route: '/portador'},
          {name: 'Unidade', entrySubprograma: 'Listar', route: '/unidade'},
        ],
      },
      {
        name: 'Financeiro',
        icon: (size?: number, color?: string) => <Icons.FinanceiroCategoria size={size} color={color} />,
        programas: [
          {name: 'Banco', entrySubprograma: 'Listar', route: '/banco'},
          {
            name: 'PlanoDeContas',
            entrySubprograma: 'Listar',
            route: '/plano-de-contas',
          },
        ],
      },
    ],
  },

  {
    name: 'Estoque',
    icon: (size?: number, color?: string) => <Icons.Estoque size={size} color={color} />,
    categorias: [
      {
        name: 'FaltasEncomendas',
        programas: [],
        icon: (size?: number, color?: string) => <Icons.FaltasEncomendas size={size} color={color} />,
        route: '/faltas-encomendas',
        entrySubprograma: 'Listar',
      },
      // {
      //   name: 'Compras',
      //   programas: [],
      //   icon: (size?: number, color?: string) => <Icons.Compras size={size} color={color} />,
      //   route: '/compras',
      //   entrySubprograma: 'Listar',
      // },
      // {
      //   name: 'ConsultaDePedidos',
      //   programas: [],
      //   icon: (size?: number, color?: string) => <Icons.ConsultaDePedidos size={size} color={color} />,
      //   route: '/compras/consultar-pedido',
      //   entrySubprograma: 'Consultar',
      // },
    ],
  },

  {
    name: 'Financeiro',
    icon: (size?: number, color?: string) => <Icons.Financeiro size={size} color={color} />,
    categorias: [
      {
        name: 'ContasAPagar',
        icon: (size?: number, color?: string) => <Icons.ContasAPagar size={size} color={color} />,
        programas: [],
        entrySubprograma: 'Listar',
        route: '/contas-a-pagar',
      },
      {
        name: 'Relatorios',
        icon: (size?: number, color?: string) => <Icons.Relatorios size={size} color={color} />,
        programas: [
          {
            name: 'ContasPagas',
            entrySubprograma: 'Visualizar',
            route: '/relatorio-contas-pagas',
          },
          {
            name: 'ContasAPagar',
            entrySubprograma: 'Visualizar',
            route: '/relatorio-contas-a-pagar',
          },
        ],
      },
    ],
  },

  {
    name: 'Configuracoes',
    icon: (size?: number, color?: string) => <Icons.Configuracoes size={size} color={color} />,
    categorias: [
      {
        name: 'Acessos',
        icon: (size?: number, color?: string) => <Icons.Acessos size={size} color={color} />,
        programas: [
          {
            name: 'Usuarios',
            entrySubprograma: 'Listar',
            route: '/usuarios',
          },
          // {
          //   name: 'GrupoUsuarios',
          //   entrySubprograma: 'Listar',
          //   route: '/grupo-usuarios',
          // },
        ],
      },
      {
        name: 'Empresa',
        icon: (size?: number, color?: string) => <Icons.Empresa size={size} color={color} />,
        programas: [],
        route: '/empresa',
        entrySubprograma: 'Visualizar',
      },
      {
        name: 'Emails',
        icon: (size?: number, color?: string) => <Icons.Emails size={size} color={color} />,
        programas: [],
        entrySubprograma: 'Visualizar',
        route: '/configuracoes-email',
      },
    ],
  },
];
