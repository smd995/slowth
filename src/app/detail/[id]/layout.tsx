import { BottomFloatingBarWrapper } from "@/components/molecules/bottomFloatingBar/bottomFloatingBarWrapper";

export default async function DetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex h-screen flex-col">
      <main className="grow">{children}</main>
      <BottomFloatingBarWrapper gatheringId={parseInt(id)} />
    </div>
  );
}
