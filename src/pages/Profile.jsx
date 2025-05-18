import profilePhoto from "../assets/profilePhoto.jpg";

const stats = [
  { label: "Total earned", value: "$1,000" },
  { label: "Reputation score", value: "4.9" },
  { label: "Total trades", value: "100" },
];

const services = [
  {
    title: "Frontend Developer",
    hours: "4 hours",
    category: "Software Development",
    img: profilePhoto,
  },
  {
    title: "Product Manager",
    hours: "4 hours",
    category: "Product",
    img: profilePhoto,
  },
  {
    title: "Designer",
    hours: "4 hours",
    category: "Design",
    img: profilePhoto,
  },
  {
    title: "Software Engineer",
    hours: "4 hours",
    category: "Software Development",
    img: profilePhoto,
  },
];

const tradeHistory = [
  {
    title: "Frontend Developer",
    hours: "4 hours",
    status: "Completed",
    img: profilePhoto,
  },
  {
    title: "Product Manager",
    hours: "4 hours",
    status: "Completed",
    img: profilePhoto,
  },
  {
    title: "Designer",
    hours: "4 hours",
    status: "Completed",
    img: profilePhoto,
  },
  {
    title: "Software Engineer",
    hours: "4 hours",
    status: "Completed",
    img: profilePhoto,
  },
];

const Profile = () => {
  return (
    <div className="min-h-screen flex justify-center items-start py-8 dark:bg-[var(--color-background-dark)] dark:text-white ">
      <div className="rounded-3xl w-full max-w-5xl p-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <img
              src={profilePhoto}
              alt="Profile"
              className="w-25 h-25 rounded-full object-cover"
            />
            <div>
              <h2 className="text-2xl font-semibold">Acme Inc.</h2>
              <p className="text-slate-400 text-sm">
                San Francisco, United States
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="bg-[var(--color-secondary)] dark:bg-[var(--color-secondary-dark)] text-black dark:text-white px-4 py-2 rounded-lg font-medium hover:cursor-pointer hover:scale-105 transition-transform duration-200">
              Comment
            </button>
            <button className="bg-[var(--color-secondary)] dark:bg-[var(--color-secondary-dark)] text-black dark:text-white px-4 py-2 rounded-lg font-medium hover:cursor-pointer hover:scale-105 transition-transform duration-200">
              Edit profile
            </button>
            <button className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg font-medium hover:cursor-pointer hover:scale-105 transition-transform duration-200">
              Trade hours
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-6 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex-1 bg-transparent border border-slate-300 rounded-xl px-6 py-4 flex flex-col items-start hover:cursor-pointer hover:scale-105 transition-transform duration-200"
            >
              <span className="dark:text-white text-xl font-bold">
                {stat.value}
              </span>
              <span className="dark:text-white text-slate-400 text-xs mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Services */}
        <div className="mb-6">
          <h3 className="dark:text-white text-xl font-semibold mb-2">
            Services
          </h3>
          <div>
            {services.map((service, idx) => (
              <div key={idx} className="flex items-center gap-4 mb-4">
                <img
                  src={service.img}
                  alt="Service Photo"
                  className="w-15 h-15 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="dark:text-white">{service.title}</div>
                  <div className="text-slate-400 text-sm">{service.hours}</div>
                </div>
                <button className="text-slate-400 hover:text-slate-900 dark:hover:text-[var(--color-placeholder-dark)] hover:cursor-pointer transition-all duration-200 hover:scale-105">
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19.5 3 21l1.5-4L16.5 3.5z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Trade history */}
        <div>
          <h3 className="dark:text-white text-xl font-semibold mb-4 mt-15">
            Trade history
          </h3>
          <div>
            {tradeHistory.map((trade, idx) => (
              <div key={idx} className="flex items-center gap-4 mb-4">
                <img
                  src={trade.img}
                  alt="Trade Photo"
                  className="w-15 h-15 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="dark:text-white">{trade.title}</div>
                  <div className="text-slate-400 text-sm">{trade.hours}</div>
                </div>
                <div className="text-slate-400 text-md">{trade.status}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
