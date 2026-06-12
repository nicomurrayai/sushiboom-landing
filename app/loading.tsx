export default function Loading() {
  return (
    <main className="min-h-screen bg-boom-dark text-white">
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="h-2 w-48 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-1/2 animate-[loading-bar_1s_ease-in-out_infinite] bg-boom-orange" />
        </div>
      </div>
    </main>
  );
}
