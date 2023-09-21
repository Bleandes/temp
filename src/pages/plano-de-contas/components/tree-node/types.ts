import {IPlanoDeConta} from '#pages/plano-de-contas/types';

export interface TreeNode {
  title: string;
  object: IPlanoDeConta;
  children: TreeNode[];
  numeroConta: string;
  numeroContaPai: string;
}

export interface TreeNodeProps {
  nodes: TreeNode[];
  initialMargin?: number;
}

export interface NodeProps {
  node: TreeNode;
  initialMargin: number;
  isChildren: boolean;
  lastChildren: boolean;
  treeScale: number;
}
