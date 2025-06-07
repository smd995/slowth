type MyPageTab = "meetings" | "reviews" | "created-meetings";

interface TabNavigationProps {
  activeTab: MyPageTab;
  onTabChange: (tab: MyPageTab) => void;
}

const tabs = [
  { id: "meetings" as const, label: "나의 모임" },
  { id: "reviews" as const, label: "나의 리뷰" },
  { id: "created-meetings" as const, label: "내가 만든 모임" },
];

export const TabNavigation = ({
  activeTab,
  onTabChange,
}: TabNavigationProps) => {
  return (
    <div className="border-b border-gray-200">
      <nav className="flex" role="tablist" aria-label="마이페이지 탭">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 border-b-2 px-4 py-3 text-center text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "border-orange-600 text-orange-600"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};
