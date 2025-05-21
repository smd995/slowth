import clsx from "clsx";

export type Tab = {
  label: string;
  value: string;
};

interface TabsProps {
  tabs: Tab[];
  selectedTab: Tab;
  onChange: (tab: Tab) => void;
  className?: string;
}

export const Tabs = ({ tabs, selectedTab, onChange, className }: TabsProps) => {
  const handleClick = (value: string) => {
    const nextTab = tabs.find((t) => t.value === value);
    if (nextTab) onChange(nextTab);
  };

  return (
    <div className={clsx("space-y-1 space-x-3", className)}>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          className={clsx(
            tab.value === selectedTab.value
              ? "text-secondary-900 border-secondary-900 border-b-2"
              : "text-secondary-200 cursor-pointer",
          )}
          onClick={() => handleClick(tab.value)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
