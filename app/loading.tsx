export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3">
        {/* Logo */}
        <img
          src="/Bino.png"
          alt="O'zbekiston Respublikasi"
          className="w-[700px] h-auto object-contain"
        />

        {/* Progress bar */}
        <div className="loading-bar" style={{ width: "500px" }}>
          <div className="loading-bar-fill" />
        </div>
      </div>
    </div>
  );
}
