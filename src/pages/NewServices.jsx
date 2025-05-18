const NewServices = () => {
  return (
      <div className="min-h-screen dark:bg-[var(--color-background-dark)] w-full flex-1 flex flex-col items-center justify-start">
        <div className="w-5xl mt-8 px-12 py-10">
          <h1 className="text-3xl font-bold dark:text-white mb-2">List a new service</h1>
          <p className="text-slate-500 mb-8">You can list any skill you have, or offer to help with anything. Be creative!</p>

          {/* Service Title */}
          <div className="mb-7">
            <label className="block dark:text-white font-semibold mb-2">Service title</label>
            <input
              type="text"
              placeholder="I will help you with..."
              className="w-full bg-[var(--color-secondary)] dark:bg-[var(--color-secondary-dark)] text-[var(--color-placeholder)] dark:text-[var(--color-placeholder-dark)] placeholder-[var(--color-placeholder)] rounded-xl px-4 py-3 outline-none"
            />
          </div>

          {/* Service Description */}
          <div className="mb-7">
            <label className="block dark:text-white font-semibold mb-2">Service description</label>
            <textarea
              placeholder="Describe your service..."
              rows={4}
              className="w-full bg-[var(--color-secondary)] dark:bg-[var(--color-secondary-dark)] text-[var(--color-placeholder)] dark:text-[var(--color-placeholder-dark)] placeholder-[var(--color-placeholder)] rounded-xl px-4 py-3 outline-none resize-none"
            />
          </div>

          {/* Number of hours */}
            <label className="block dark:text-white font-semibold mb-2">Number of hours</label>
          <div className="mb-7">
            <input
              type="number"
              placeholder="Enter number of hours..."
              className="w-full bg-[var(--color-secondary)] dark:bg-[var(--color-secondary-dark)] text-[var(--color-placeholder)] dark:text-[var(--color-placeholder-dark)] placeholder-[var(--color-placeholder)] rounded-xl px-4 py-3 outline-none"
            />
          </div>

          {/* Category */}
          <div className="mb-7">
            <label className="block dark:text-white font-semibold mb-2">Category</label>
            <select
              className="w-full bg-[var(--color-secondary)] dark:bg-[var(--color-secondary-dark)] text-[var(--color-placeholder)] dark:text-[var(--color-placeholder-dark)] placeholder-[var(--color-placeholder)] rounded-xl px-4 py-3 outline-none"
              defaultValue=""
            >
              <option value="" disabled>Select category...</option>
              <option>Design</option>
              <option>Development</option>
              <option>Writing</option>
              <option>Other</option>
            </select>
          </div>

          {/* List Service Button */}
          <div className="flex justify-end mt-8">
            <button className="bg-[var(--color-primary)] text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-[var(--color-placeholder)] transition hover:cursor-pointer">
              List Service
            </button>
          </div>
        

        </div>
      </div>
    
  )
}

export default NewServices