import {useEffect, useState} from 'react';
import {usePlanoDeContasModuleApi} from './api';
import {IPlanoDeConta} from './types';
import {Screen} from '#components/screen';
import {TreeNode} from './components/tree-node/types';
import {TreeNodeComponent} from './components/tree-node';

function PlanoDeContas() {
  const api = usePlanoDeContasModuleApi();
  const [tree, setTree] = useState<TreeNode[]>([]);

  function vetorParaArvore(planos: IPlanoDeConta[]) {
    const mapaContas: any = {};
    const arvore: TreeNode[] = [];

    planos.forEach((plano) => {
      mapaContas[plano.numeroConta] = {
        numeroConta: plano.numeroConta,
        numeroContaPai: plano.numeroContaPai,
        title: `[${plano.numeroConta}] ${plano.descricao}`,
        children: [],
        object: {...plano},
      };
    });

    planos.forEach((plano) => {
      const pai = mapaContas[plano.numeroContaPai];
      if (pai) {
        pai.children.push(mapaContas[plano.numeroConta]);
      } else {
        arvore.push(mapaContas[plano.numeroConta]);
      }
    });

    setTree(arvore);
    return arvore;
  }

  useEffect(() => {
    async function init() {
      const response = await api.listaPlanoDeContas();

      const sorted = response.sort((a, b) => {
        const numeroContaA = a.numeroConta.split('.');
        const numeroContaB = b.numeroConta.split('.');
        for (let i = 0; i < Math.max(numeroContaA.length, numeroContaB.length); i++) {
          const numeroA = parseInt(numeroContaA[i]) || 0;
          const numeroB = parseInt(numeroContaB[i]) || 0;

          if (numeroA !== numeroB) {
            return numeroA - numeroB;
          }
        }

        return 0;
      });

      vetorParaArvore(sorted);
    }
    init();
  }, []);

  return (
    <Screen title="planoDeContas.title">
      <TreeNodeComponent initialMargin={17} nodes={tree} />
    </Screen>
  );
}

export const routes = [
  {
    path: '/plano-de-contas',
    element: () => <PlanoDeContas />,
  },
];
