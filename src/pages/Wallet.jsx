import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import LoadingScreen from "../components/LoadingScreen";

const test = [
  {
    status: "Recieved",
    amount: "0.5",
    time: "2",
  },
  {
    status: "Sent",
    amount: "0.5",
    time: "2",
  },
  {
    status: "Recieved",
    amount: "10.0",
    time: "5",
  },
];

const Wallet = () => {
  const [percentage, setPercentage] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Simulate fetching data from an external source
  useEffect(() => {
    // Example fetch simulation
    setTimeout(() => {
      setPercentage(65); // For example, the wallet is 65% full
    }, 1000);
  }, []);

  return (
    <>
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}
      <Navbar />
      <main className="min-h-screen dark:bg-[var(--color-background-dark)] bg-white flex flex-col items-center justify-center w-full pt-25 pb-25">
        <div className="min-h-30 min-w-5xl mx-auto space-y-4">
          <h2 className="dark:text-white text-black text-3xl font-bold">
            Wallet
          </h2>
          <p className="text-black/50 dark:text-white/50 text-sm">
            Your balance
          </p>
          <p className="text-black/50 dark:text-white/50 text-sm">
            You have {10.0} TIME (1.00 USD) in your wallet.
          </p>
        </div>

        <div className="w-5xl mt-6">
          <div className="flex justify-between">
            <h3 className="text-black/80 dark:text-white/80 mb-2 font-bold">
              TIME balance
            </h3>
            <p className="text-black/80 dark:text-white/80 mb-2 font-bold">
              {"10.000"}
            </p>
          </div>
          <div className="w-full h-3 bg-gray-300 rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--color-primary)] transition-all duration-1000"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <p className=" mb-2 font-extrabold text-sm mt-1 text-[var(--color-placeholder)]">
            {`${"1.00"} USD`}
          </p>
        </div>

        <div className="space-y-4 mt-6">
          <div className="border-2 dark:border-purple-100/50 border-purple-900/50 min-h-16 min-w-5xl py-4 px-6 rounded-xl flex justify-between items-center">
            <div>
              <h5 className="dark:text-white/80 text-black/80 text-xl font-bold">
                Trade
              </h5>
              <p className="dark:text-white/50 text-black/50 font-bold">
                Trade TIME for other tokens, or other tokens for TIME
              </p>
            </div>
            <div className="rounded-xl bg-[var(--color-primary)] px-3 py-0 hover:-translate-y-0.5 transition-all active:scale-[0.97] duration-100 hover:scale-[1.03] text-white flex justify-center items-center text-sm font-bold  w-30 h-10">
              Trade TIME
            </div>
          </div>

          <div className="border-2 dark:border-purple-100/50 border-purple-900/50 min-h-16 min-w-5xl py-4 px-6 rounded-xl flex justify-between items-center">
            <div>
              <h5 className="dark:text-white/80 text-black/80 text-xl font-bold">
                Trade
              </h5>
              <p className="dark:text-white/50 text-black/50 font-bold">
                Trade TIME for other tokens, or other tokens for TIME
              </p>
            </div>
            <div className="rounded-xl bg-[var(--color-primary)] px-3 py-0 hover:-translate-y-0.5 transition-all active:scale-[0.97] duration-100 hover:scale-[1.03] text-white flex justify-center items-center text-sm font-bold  w-30 h-10">
              Offer Skill
            </div>
          </div>

          <div className="border-2 dark:border-purple-100/50 border-purple-900/50 min-h-16 min-w-5xl py-4 px-6 rounded-xl flex justify-between items-center">
            <div>
              <h5 className="dark:text-white/80 text-black/80 text-xl font-bold">
                Trade skill
              </h5>
              <p className="dark:text-white/50 text-black/50 font-bold">
                Trade TIME for a skill, or offer askill for TIME.
              </p>
            </div>
            <div className="rounded-xl bg-[var(--color-primary)] px-3 py-0 hover:-translate-y-0.5 transition-all active:scale-[0.97] duration-100 hover:scale-[1.03] text-white flex justify-center items-center text-sm font-bold  w-30 h-10">
              Trade skill
            </div>
          </div>
        </div>

        <div className="flex flex-col w-5xl mt-8">
          <h4 className="dark:text-white/80 font-bold text-xl">
            Recent activity
          </h4>
          <div className="flex flex-col space-y-4 mt-4">
            {test.map((el, index) => (
              <div
                key={index}
                className="dark:text-white text-black flex flex-cols items-center justify-between hover:bg-[var(--color-secondary)] dark:hover:bg-purple-900/10 p-2 rounded-xl scale-[1.03] transition-all duration-200"
              >
                <div className="flex flex-cols items-center">
                  <div className="min-h-16 min-w-16 bg-[var(--color-placeholder-dark)] dark:bg-[var(--color-secondary-dark)] rounded-xl flex items-center justify-center text-3xl">
                    {el.status === "Recieved" ? "↓" : "↑"}
                  </div>
                  <div className="ml-4">
                    <h5 className="font-semibold">{`${el.status} TIME`}</h5>
                    <p className="text-[var(--color-placeholder)]">{`${el.amount} TIME`}</p>
                  </div>
                </div>
                <p>{`${el.time} days ago.`}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Wallet;
