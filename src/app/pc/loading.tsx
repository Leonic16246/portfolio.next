export default function Loading() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-6 h-6 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
        <p className="font-geist-mono text-xs tracking-widest uppercase text-white/30">
          Loading...
        </p>
      </div>
    </div>
  );
}