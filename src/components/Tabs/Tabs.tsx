// interface TabTitleProps {
//   items: {
//     id: string
//     title: string
//   }[]
// }

import Tab from "./TabTitle";
import { TabsProvider } from "./TabsContext";

//Tabs holds the state of the selected tab

// interface TabContentProps {
//   items: {
//     id: string
//     content: string | JSX.Element
//   }[]

// }

interface TabsProps {
  children?: React.ReactNode;
}

function Tabs({ children }: TabsProps) {
  return (
    <div className="side-bar-right">
      <TabsProvider>{children}</TabsProvider>
    </div>
  );
}

export default Tabs;
