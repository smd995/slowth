import MyPageContent from "@/components/organisms/myContentPage";

export default function MyPage() {
  return (
    <div className="bg-secondary-100 flex min-h-screen justify-center">
      <div className="bg-secondary-50 w-full max-w-[1200px]">
        <main className="flex flex-col items-center">
          <div className="w-full">
            <h2>마이 페이지</h2>
          </div>

          <div className="mt-6 w-full">
            <MyPageContent />
          </div>
        </main>
      </div>
    </div>
  );
}
