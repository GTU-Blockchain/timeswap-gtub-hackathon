import { useAccount } from "wagmi";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import { useState } from "react";

function Home() {
    const account = useAccount();
    const [isLoaded, setIsLoaded] = useState(false);

    const howItWorks = [
        {
            title: "1. List your Devices",
            paragraph:
                "You can list any service, skill or time-based offering you'd like to trade. This can be anything from a 30 minute consultation to a 3 hour cooking class",
        },
        {
            title: "2. Find people to swap time or skills with",
            paragraph:
                "You can search for people interested in swapping time or skills based on the services they offer, their availability, or the number of hours they'd like to swap",
        },
        {
            title: "3. Start a conversation and find a time that works for both of you.",
            paragraph:
                "Once you've found someone to swap time with, you can start a conversation in the chat and find a time that works for both of you.",
        },
    ];

    return (
        <>
          {account.isConnected ? (
            <Link
              to={"/explore"}
              className="rounded-xl bg-[var(--color-primary)] px-6 py-3 hover:scale-[1.03] transition-all active:scale-[0.97] duration-100 font-semibold text-white"
            >
              Explore
            </Link>
          ) : (
            <Link
              to={"/"}
              className="rounded-xl bg-[var(--color-primary)] px-6 py-3 hover:scale-[1.03] transition-all active:scale-[0.97] duration-100 font-semibold text-white"
            >
              Join Now
            </Link>
          )}
        </div>

        <div className="max-w-5xl w-full">
          <h3 className="text-2xl font-semibold text-star mb-10">
            How it works
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {howItWorks.map((element, index) => (
              <div
                key={index}
                className="dark:bg-[var(--color-secondary-dark)] bg-[var(--color-secondary)] p-6 rounded-xl border-1 border-solid dark:border-purple-100/50 border-purple-900/50 hover:scale-[1.03]transition-all dark:hover:bg-purple-900/10 hover:bg-[var(--color-placeholder)] duration-200 hover:-translate-y-1"
              >
                <p className="dark:text-white text-black text-3xl font-bold">
                  &rarr;
                </p>
                <h4 className="dark:text-white text-black text-xl font-extrabold mb-2">
                  {element.title}
                </h4>
                <p className="dark:text-purple-100/50 ">{element.paragraph}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-5xl w-full">
          <h3 className="text-2xl font-semibold text-star mb-10">
            TimeSwap benefits
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-6 rounded-xl border-1 border-solid dark:border-purple-100/50 border-purple-900/50 hover:scale-[1.03]transition-all hover:bg-purple-900/10 duration-200 hover:-translate-y-1 space-y-4">
              <p className="font-semibold dark:text-white/50 text-black/50">
                100% control
              </p>
              <p className="dark:text-white/75 text-black/75 font-bold text-2xl">
                You decide who to swap time with and what to offer
              </p>
              <p className="text-green-500">+50%</p>
            </div>

            <div className="p-6 rounded-xl border-1 border-solid dark:border-purple-100/50 border-purple-900/50 hover:scale-[1.03]transition-all hover:bg-purple-900/10 duration-200 hover:-translate-y-1 space-y-4">
              <p className="font-semibold dark:text-white/50 text-black/50">
                0% fee
              </p>
              <p className="dark:text-white/75 text-black/75 font-bold text-2xl">
                Keep 100% of your earnings, no fees on trades
              </p>
              <p className="text-red-500">-20%</p>
            </div>

            <div className="p-6 rounded-xl border-1 border-solid dark:border-purple-100/50 border-purple-900/50 hover:scale-[1.03]transition-all hover:bg-purple-900/10 duration-200 hover:-translate-y-1 space-y-4">
              <p className="font-semibold dark:text-white/50 text-black/50">
                No middleman
              </p>
              <p className="dark:text-white/75 text-black/75 font-bold text-2xl">
                No platform fees, no payment processing fees
              </p>
              <p className="text-red-500">-5%</p>
            </div>
          </div>
        </div>

        <div className="max-w-5xl w-full flex flex-col justify-center items-center mt-20 space-y-2 mb-30">
          <h3 className="text-3xl dark:text-white/90 text-black/90 font-extrabold">
            Ready to swap time and skills?
          </h3>
          <p className="font-semibold dark:text-white/50 text-black/50 mb-6">
            Join our growing community of time bankers today!
          </p>
          {account.isConnected ? (
            <Link
              to={"/explore"}
              className="rounded-xl bg-[var(--color-primary)] px-6 py-3 hover:scale-[1.03] transition-all active:scale-[0.97] duration-100 font-semibold text-white"
            >
              Explore
            </Link>
          ) : (
            <Link
              to={"/"}
              className="rounded-xl bg-[var(--color-primary)] px-6 py-3 hover:scale-[1.03] transition-all active:scale-[0.97] duration-100 font-semibold text-white"
            >
              Join Now
            </Link>
          )}
        </div>
      </main>
    </>
  );
}

export default Home;
