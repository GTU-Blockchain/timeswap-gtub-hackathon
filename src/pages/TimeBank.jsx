const TimeBank = () => {
    return (
        <div className="min-h-screen dark:bg-[var(--color-background-dark)] flex flex-col items-center pb-12">
            <div className="w-full max-w-5xl dark:bg-[var(--color-background-dark)] rounded-2xl p-8">
                <h2 className="text-4xl font-semibold dark:text-white mb-5">
                    Confirm trade details
                </h2>
                <p className="text-slate-500 mb-6">
                    You're proposing to swap your time for 5 hours of software
                    development
                </p>
                <div className="flex items-center mb-6">
                    <div className="w-24 h-24 rounded-full mr-5 flex items-center justify-center overflow-hidden">
                        <img
                            src="https://randomuser.me/api/portraits/men/32.jpg"
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <div className="dark:text-white font-semibold">
                            Mehmet Nuri Başa
                        </div>
                        <div className="text-slate-500 text-md">Turkey</div>
                        <div className="text-slate-500 text-md">
                            4.7 star rating
                        </div>
                    </div>
                </div>

                {/* What you're trading */}
                <div className="mb-6">
                    <div className="dark:text-white mb-2 font-bold">
                        What you're trading
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-1 dark:bg-[var(--color-secondary-dark)] bg-[var(--color-secondary)] rounded-xl p-4 flex flex-col items-center">
                            <span className="dark:text-white text-sm mb-1">
                                ⏰
                            </span>
                            <span className="dark:text-white font-bold text-lg">
                                20 hours
                            </span>
                            <span className="text-slate-500 text-sm mt-1">
                                Your time
                            </span>
                        </div>
                        <div className="flex-1 dark:bg-[var(--color-secondary-dark)] bg-[var(--color-secondary)] rounded-xl p-4 flex flex-col items-center">
                            <span className="dark:text-white text-sm mb-1">
                                🌐
                            </span>
                            <span className="dark:text-white font-bold text-lg">
                                Software Development
                            </span>
                            <span className="text-slate-500 text-sm mt-1">
                                Your skill
                            </span>
                        </div>
                    </div>
                </div>

                {/* What you'll receive */}
                <div className="mb-6">
                    <div className="dark:text-white mb-2 font-bold">
                        What you'll receive
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-1 dark:bg-[var(--color-secondary-dark)] bg-[var(--color-secondary)] rounded-xl p-4 flex flex-col items-center">
                            <span className="dark:text-white text-sm mb-1">
                                ⏰
                            </span>
                            <span className="dark:text-white font-bold text-lg">
                                5 hours
                            </span>
                            <span className="text-slate-500 text-sm mt-1">
                                Their time
                            </span>
                        </div>
                        <div className="flex-1 dark:bg-[var(--color-secondary-dark)] bg-[var(--color-secondary)] rounded-xl p-4 flex flex-col items-center">
                            <span className="dark:text-white text-sm mb-1">
                                🌐
                            </span>
                            <span className="dark:text-white font-bold text-lg">
                                Software Development
                            </span>
                            <span className="text-slate-500 text-sm mt-1">
                                Their skill
                            </span>
                        </div>
                    </div>
                </div>

                {/* Reputation impact */}
                <div className="mb-6">
                    <div className="dark:text-white mb-2 font-bold">
                        Reputation impact
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-1 dark:bg-[var(--color-secondary-dark)] bg-[var(--color-secondary)] rounded-xl p-4 text-center dark:text-white font-semibold">
                            +0.1
                        </div>
                        <div className="flex-1 dark:bg-[var(--color-secondary-dark)] bg-[var(--color-secondary)] rounded-xl p-4 text-center dark:text-white font-semibold">
                            0.05
                        </div>
                        <div className="flex-1 dark:bg-[var(--color-secondary-dark)] bg-[var(--color-secondary)] rounded-xl p-4 text-center dark:text-white font-semibold">
                            +1
                        </div>
                    </div>
                </div>

                {/* Tokenomic details */}
                <div className="mb-5">
                    <div className="dark:text-white mb-2 font-semibold">
                        Tokenomic details
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-1 dark:bg-[var(--color-secondary-dark)] bg-[var(--color-secondary)] rounded-xl p-4 flex flex-col items-center">
                            <span className="dark:text-white text-sm mb-1">
                                ⏰
                            </span>
                            <span className="dark:text-white font-bold text-lg">
                                You'll receive
                            </span>
                            <span className="text-slate-500 text-sm mt-1">
                                100 TIME
                            </span>
                        </div>
                        <div className="flex-1 dark:bg-[var(--color-secondary-dark)] bg-[var(--color-secondary)] rounded-xl p-4 flex flex-col items-center">
                            <span className="dark:text-white text-sm mb-1">
                                ⏰
                            </span>
                            <span className="dark:text-white font-bold text-lg">
                                You'll pay
                            </span>
                            <span className="text-slate-500 text-sm mt-1">
                                500 TIME
                            </span>
                        </div>
                    </div>
                </div>

                <button className="w-3/5 bg-[var(--color-primary)] hover:bg-[var(--color-secondary-dark)] text-white font-semibold py-3 rounded-xl text-lg transition hover:cursor-pointer">
                    Confirm trade
                </button>
            </div>
        </div>
    );
};

export default TimeBank;
