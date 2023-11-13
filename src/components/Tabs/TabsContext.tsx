import { createContext, useContext, useState } from "react";

interface TabsContextData {
  selectedTab: string;
  setSelectedTab: (tabId: string) => void;
}

const TabsContext = createContext<TabsContextData | null>(null);

export const useTabsContext = () => {
  const tabsContext = useContext(TabsContext);
  if (tabsContext === undefined) {
    console.log("error running");
    throw new Error("useTabsContext must be used within a TabsProvider");
  }
  return tabsContext;
};

export const TabsProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedTab, setSelectedTab] = useState("boo");
  return (
    <TabsContext.Provider value={{ selectedTab, setSelectedTab }}>
      {children}
    </TabsContext.Provider>
  );
};
