const availableHours = [
  { day: "Monday", label: "Mon 8AM - 5PM" },
  { day: "Tuesday", label: "Tue 8AM - 5PM" },
  { day: "Wednesday", label: "Wed 8AM - 5PM" },
  { day: "Thursday", label: "Thu 8AM - 5PM" },
  { day: "Friday", label: "Fri 8AM - 5PM" },
  { day: "Saturday", label: "Sat 8AM - 5PM" },
  { day: "Sunday", label: "Sun 8AM - 5PM" },
];

const Details = () => {
  return (
    <div className="min-h-screen dark:bg-[var(--color-background-dark)] flex justify-center items-start py-8">
      <div className="w-full max-w-5xl p-10">
        {/* Service Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold dark:text-white mb-3">
              1:1 Product Management Coaching
            </h1>
            <a href="#" className="text-[var(--color-placeholder-dark)] underline text-sm font-medium">By Mehmet</a>
          </div>
          <button className="bg-[var(--color-primary)] hover:bg-[var(--color-placeholder-dark)] hover:cursor-pointer text-white px-6 py-2 rounded-lg font-semibold transition">
            Trade Service
          </button>
        </div>

        {/* Description */}
        <div className="text-slate-500 mb-10 max-w-3xl">
          I've been a product manager at Google and Facebook, now I'm a Partner at a venture capital firm. I can help you with product strategy, roadmap planning, and career advice.
        </div>

        {/* Reputation */}
        <div className="mb-10">
          <div className="font-bold dark:text-white mb-3">Reputation</div>
          <div className="flex gap-6">
            <div className="flex-1 bg-[var(--color-secondary)] dark:bg-[var(--color-secondary-dark)] rounded-xl p-6 flex flex-col items-center">
              <span className="text-3xl font-bold dark:text-white  mb-2">4.9</span>
              <span className="text-[var(--color-placeholder-dark)] text-md">Average Rating</span>
            </div>
            <div className="flex-1 bg-[var(--color-secondary)] dark:bg-[var(--color-secondary-dark)] rounded-xl p-6 flex flex-col items-center">
              <span className="text-3xl font-bold dark:text-white mb-1">10</span>
              <span className="text-[var(--color-placeholder-dark)] text-md">Reviews</span>
            </div>
          </div>
        </div>

        {/* Category */}
        <div className="mb-10">
          <div className="font-bold dark:text-white mb-1">Category</div>
          <div className="text-slate-500">Product Management</div>
        </div>

        {/* Available Hours */}
        <div className="font-bold dark:text-white mb-4">Available Hours</div>
        <div className="flex flex-col gap-4">
            {availableHours.map((item) => (
            <div
                key={item.day}
                className="flex items-center bg-[var(--color-secondary)] dark:bg-[var(--color-secondary-dark)] rounded-xl px-4 py-4"
            >
                <div className="flex items-center gap-3 flex-1">
                <span className="bg-[var(--color-primary)] text-white rounded-lg p-2">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                      <rect x="3" y="5" width="18" height="16" rx="3" fill="none" stroke="#fff" strokeWidth="1.5"/>
                      <path d="M16 3v4M8 3v4M3 9h18" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
                      <rect x="7" y="13" width="2" height="2" rx="0.5" fill="#fff"/>
                      <rect x="11" y="13" width="2" height="2" rx="0.5" fill="#fff"/>
                      <rect x="15" y="13" width="2" height="2" rx="0.5" fill="#fff"/>
                    </svg>
                </span>
                <div>
                    <div className="dark:text-white font-medium">{item.day}</div>
                    <div className="text-[var(--color-placeholder-dark)] text-sm">{item.label}</div>
                </div>
                </div>
                <span className="text-slate-400 text-2xl">&gt;</span>
            </div>
            ))}
        </div>
        
      </div>
    </div>
  );
};

export default Details;