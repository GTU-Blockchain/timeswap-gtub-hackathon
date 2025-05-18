import { useEffect } from "react";

const LoadingScreen = ({ onComplete }) => {
  useEffect(() => {
    setTimeout(() => {
      onComplete();
    }, 1000);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[var(--color-background-dark)] text-white min-h-screen w-full">
      <div className="flex flex-col items-center space-y-6">
        <div className="relative h-20 w-20">
          <div className="absolute inset-0 rounded-full border-4 border-[var(--color-primary)] opacity-60"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full w-1 h-6 bg-[var(--color-primary)] origin-bottom animate-spin duration-2000"></div>
        </div>
        <h2 className="text-3xl font-bold tracking-wide text-[var(--color-primary)] drop-shadow-lg">
          Loading...
        </h2>
        <p className="text-white/60 text-lg font-medium">
          Please wait while we get things ready
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
