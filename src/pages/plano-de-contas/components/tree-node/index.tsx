import {useState} from 'react';
import * as S from '#pages/plano-de-contas/components/tree-node/styles';
import {NodeProps, TreeNodeProps} from '#pages/plano-de-contas/components/tree-node/types';

function Node(props: NodeProps): JSX.Element {
  const [expand, setExpand] = useState(false);
  return (
    <>
      <S.NodeWrapper onClick={() => setExpand(!expand)} disabled={props.node.children.length === 0}>
        {props.isChildren && (
          <S.HorizontalPipe>
            {props.lastChildren && (
              <S.BorderHider
                height={props.node.children.length === 0 ? 15 : !expand ? 15 : props.node.children.length * 35}
              />
            )}
            {props.node.children.length === 0 && <S.Dot />}
          </S.HorizontalPipe>
        )}
        {props.node.children.length !== 0 && (expand ? <S.ClosedFolder /> : <S.OpenedFolder />)}
        <S.NodeText>{props.node.title}</S.NodeText>
      </S.NodeWrapper>
      {props.node.children.length !== 0 &&
        expand &&
        props.node.children.map((value, index) => (
          <S.ChildrenWrapper marginLeft={props.treeScale < 2 ? props.initialMargin : props.initialMargin + 15}>
            <Node
              initialMargin={props.initialMargin}
              node={value}
              key={value.title}
              isChildren
              lastChildren={index + 1 === props.node.children.length}
              treeScale={props.treeScale + 1}
            />
          </S.ChildrenWrapper>
        ))}
    </>
  );
}

export function TreeNodeComponent(props: TreeNodeProps) {
  return (
    <S.TreeWrapper>
      {props.nodes.map((value) => (
        <Node
          initialMargin={props.initialMargin ?? 0}
          node={value}
          key={value.title}
          isChildren={false}
          lastChildren={false}
          treeScale={1}
        />
      ))}
    </S.TreeWrapper>
  );
}
