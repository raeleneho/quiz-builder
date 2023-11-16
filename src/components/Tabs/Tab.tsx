import { FunctionComponent } from "react";
import { useTabsContext } from "./TabsContext";
import { Button } from "@chakra-ui/react";

interface TabProps {
  id: string;
  TabComponent?: FunctionComponent<TabComponentProps>;
  children?: React.ReactNode;
}

interface TabComponentProps {
  id: string;
  onChange: ((newId: string) => void) | undefined;
  children?: React.ReactNode;
}

const DefaultTab = ({ onChange, id, children }: TabComponentProps) => {
  const handleClick = (newId: string): void => {
    if (onChange) {
      onChange(newId);
    }
  };

  return <Button onClick={() => handleClick(id)}>{children}</Button>;
};

function Tab({ id, children, TabComponent = DefaultTab }: TabProps) {
  const tabContext = useTabsContext();
  return (
    <TabComponent id={id} onChange={tabContext?.setSelectedTab}>
      {children}
    </TabComponent>
  );
}

export default Tab;
