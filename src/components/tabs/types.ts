export interface TabConfigProps {
  name: string;
  tabIndex: number;
  onPress: () => void;
}

export interface TabViewProps {
  index: number;
}

export interface TabsProps {
  tabConfig: string[];
}
