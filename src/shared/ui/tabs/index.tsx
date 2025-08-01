import clsx from "clsx";
import { MeditationIcon } from "@/components/icons/MeditationIcon";
import { VacationIcon } from "@/components/icons/VacationIcon";

export type Tab = {
  label: string;
  value: string;
  icon?: "meditation" | "vacation";
};

interface TabsProps {
  tabs: Tab[];
  selectedTab: Tab;
  onChange: (tab: Tab) => void;
  className?: string;
}

export const Tabs = ({ tabs, selectedTab, onChange, className }: TabsProps) => {
  const renderIcon = (icon?: Tab["icon"]) => {
    if (!icon) return null;

    const baseClass = "w-6 h-6 ml-1 text-inherit";

    const icons = {
      meditation: <MeditationIcon className={baseClass} />,
      vacation: <VacationIcon className={baseClass} />,
    };

    return icons[icon] ?? null;
  };

  return (
    <div className={clsx("flex gap-3", className)}>
      {tabs.map((tab) => {
        const isSelected = tab.value === selectedTab.value;

        const tabClass = clsx(
          "flex items-center border-b-2 cursor-pointer h-10 text-lg",
          isSelected
            ? "text-secondary-900 border-secondary-900 font-semibold"
            : "text-secondary-400 border-transparent",
        );

        return (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={isSelected}
            className={tabClass}
            onClick={() => {
              if (!isSelected) onChange(tab);
            }}
          >
            <span className="flex items-center">
              {tab.label}
              {renderIcon(tab.icon)}
            </span>
          </button>
        );
      })}
    </div>
  );
};
