export default async function DetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col">
      <main>{children}</main>
    </div>
  );
}
