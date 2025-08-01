"use client";
import { Tabs, Chip } from "@/shared/ui";
import { useEffect, useState } from "react";
import { TOP_CATEGORY, SUB_CATEGORY } from "@/shared/config";

interface CategoryTabProps {
  setSelectedType: React.Dispatch<React.SetStateAction<string>>;
}

export const CategoryTab = ({ setSelectedType }: CategoryTabProps) => {
  const [selectedTopTab, setSelectedTopTab] = useState(TOP_CATEGORY[0]);
  const [selectedChip, setSelectedChip] = useState<{
    label: string;
    value: string;
  } | null>(SUB_CATEGORY[TOP_CATEGORY[0].value][0]);
  const chips = SUB_CATEGORY[selectedTopTab.value];
  useEffect(() => {
    if (!selectedChip) {
      setSelectedType(selectedTopTab.value);
      return;
    }
    setSelectedType(selectedChip.value);
  }, [selectedTopTab, selectedChip, setSelectedType]);
  return (
    <div>
      <Tabs
        tabs={TOP_CATEGORY}
        selectedTab={selectedTopTab}
        onChange={(tab) => {
          setSelectedTopTab(tab);
          setSelectedChip(SUB_CATEGORY[tab.value][0] || null);
        }}
      />
      {chips.length > 0 && (
        <div className="mt-2.5 flex flex-wrap gap-2 sm:mt-3.5">
          {chips.map(({ label, value }) => (
            <Chip
              key={value}
              label={label}
              selected={selectedChip?.value === value}
              onClick={() => {
                setSelectedChip({ label, value });
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
