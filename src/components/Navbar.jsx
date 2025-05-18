import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import { Link } from "react-router-dom";
import { useAccount } from "wagmi";

const Navbar = () => {
  const account = useAccount();

  return (
    <nav className="fixed top-0 dark:bg-[var(--color-background-dark)] bg-[var(--color-background-light)] h-16 w-full flex justify-between px-10 border-b border-px border-[#291E27] font-bold z-40">
      <div className="dark:text-white text-black h-full flex justify-center items-center pl-5">
        TimeSwap
      </div>

      <div className="flex items-center space-x-4">
        {account.isConnected && (
          <div className="flex justify-between text-white  text-sm">
            <Link
              to={"/"}
              className="px-4 py-2 hover:-translate-y-0.5 transition-all active:scale-[0.97] duration-100 hover:text-[var(--color-placeholder-dark)] "
            >
              Home
            </Link>

            <Link
              to={"/explore"}
              className="px-4 py-2 hover:-translate-y-0.5 transition-all active:scale-[0.97] duration-100 hover:text-[var(--color-placeholder-dark)] "
            >
              Explore
            </Link>

            <Link
              to={"/create"}
              className="px-4 py-2 hover:-translate-y-0.5 transition-all active:scale-[0.97] duration-100 hover:text-[var(--color-placeholder-dark)] "
            >
              Create
            </Link>

            <Link
              to={`/trades/${account.address}`}
              className="rounded-xl bg-[var(--color-primary)] px-4 py-2 hover:-translate-y-0.5 transition-all active:scale-[0.97] duration-100 hover:text-[var(--color-placeholder-dark)] hover:scale-[1.03]"
            >
              My Trades
            </Link>
          </div>
        )}

        <ConnectButton accountStatus={"avatar"} chainStatus={"none"} />
      </div>
    </nav>
  );
};

export default Navbar;
