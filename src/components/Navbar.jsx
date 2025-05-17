import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import { Link } from "react-router-dom";
import { useAccount } from "wagmi";

const Navbar = () => {
  const account = useAccount();

  return (
    <nav className="fixed top-0 dark:bg-[var(--color-background-dark)] bg-[var(--color-background-light)] h-16 w-full flex justify-between px-10 border-b border-px border-[#291E27] font-bold">
      <div className="dark:text-white text-black h-full flex justify-center items-center pl-5">
        TimeSwap
      </div>

      <div className="flex items-center space-x-4">
        {account.isConnected && (
          <div className="flex justify-between text-white  text-sm">
            <Link to={"/home"} className="px-4 py-2">Home</Link>

            <Link to={"/explore"} className="px-4 py-2"> Explore </Link>

            <Link to={"/create"} className="px-4 py-2"> Create </Link>

            <Link 
              to={`/trades/${account.address}`}
              className="rounded-xl bg-[var(--color-primary)] px-4 py-2"
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
