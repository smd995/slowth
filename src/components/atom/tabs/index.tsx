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
          onClick={() => {
            if (tab.value !== selectedTab.value) onChange(tab);
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
