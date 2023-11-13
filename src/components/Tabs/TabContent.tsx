import { ReactElement, ReactNode } from "react";
import { useTabsContext } from "./TabsContext";
import { TabTitleProps } from "./TabTitle";

interface TabProps extends TabTitleProps {
  component?: ReactNode;
}

interface TabContentProps {
  content: TabProps[];
}

function TabContent({ content }: TabContentProps) {
  const tabsContext = useTabsContext();

  const getTabContentById = () => {
    const tabComponent = content.find(
      (tab) => tab.id === tabsContext?.selectedTab
    );

    return tabComponent?.component;
  };

  return <>{getTabContentById()}</>;
}

export default TabContent;
