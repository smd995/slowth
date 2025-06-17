import MyPageContent from "@/components/organisms/myContentPage";

export default function MyPage() {
  return (
    <div className="bg-secondary-100 flex min-h-screen justify-center">
      <div className="bg-secondary-50 w-full max-w-[1200px]">
        <div className="mx-4 my-6 flex flex-col items-center">
          <div className="w-full">
            <h2>마이 페이지</h2>
          </div>

          <div className="mt-6 w-full">
            <MyPageContent />
          </div>
        </div>
      </div>
    </div>
  );
}
