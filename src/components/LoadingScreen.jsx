import { useEffect } from "react";

const LoadingScreen = ({ onComplete }) => {
  useEffect(() => {
    setTimeout(() => {
      onComplete();
    }, 1000);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 dark:bg-[var(--color-background-dark)] bg-white text-gray-100 flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold tracking-wide text-[var(--color-primary)] drop-shadow-lg">
        Loading...
      </h2>
      <p className="dark:text-white/60 text-black/60 text-lg font-medium mb-4">
        Please wait while we get things ready
      </p>
      <div className="w-[200px] h-3 dark:bg-gray-800 bg-gray-200 rounded relative overflow-hidden">
        <div className="w-[40%] h-full bg-[var(--color-primary)] shadow-[0_0_15px_#3b82f6] animate-loading-bar"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
