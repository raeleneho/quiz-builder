import { ReactNode } from "react";
// import { useTabsContext } from "./TabsContext";
// import { TabTitleProps } from "./TabTitle";

// interface TabContentProps {
//   content: TabProps[];
// }

// function TabContent({ content }: TabContentProps) {
//   const tabsContext = useTabsContext();

//   const getTabContentById = () => {
//     const tabComponent = content.find(
//       (tab) => tab.id === tabsContext?.selectedTab
//     );

//     return tabComponent?.component;
//   };

//   return <>{getTabContentById()}</>;
// }

// export default TabContent;

import { useTabsContext } from "./TabsContext";

interface TabContentProps {
  id: string;
  children?: (() => void) | undefined;
}

export function TabContent({ id, children }: TabContentProps) {
  const tabContext = useTabsContext();
  return tabContext?.selectedTab === id ? <>{children}</> : <></>;
}

export default TabContent;
