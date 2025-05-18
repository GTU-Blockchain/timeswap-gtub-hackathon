import { useState } from "react";

const ratingStats = [
  { star: 5, percent: 91 },
  { star: 4, percent: 7 },
  { star: 3, percent: 2 },
  { star: 2, percent: 0 },
  { star: 1, percent: 0 },
];

const ProfileComment = () => {
  // point to the user rating
  const [userRating, setUserRating] = useState(0);
  // for hover rating
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="min-h-screen w-full dark:bg-[var(--color-background-dark)] bg-white flex items-center justify-center py-10">
      <div className="rounded-3xl p-10 max-w-5xl w-full mx-auto my-8 dark:text-white bg-white dark:bg-[var(--color-background-dark)]">
        {/* Profile Header */}
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gray-700 overflow-hidden">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Profile Photo"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="font-bold text-xl">Mehmet Nuri</div>
            <div className="text-gray-400 text-sm">Turkey</div>
          </div>
        </div>

        {/* Rating Overview */}
        <div className="mt-10 mb-10">
          <div className="flex items-center gap-2 text-4xl font-bold">
            4.9
            <span className="text-2xl font-normal dark:text-white">★★★★☆</span>
          </div>
          <div className="text-gray-400 text-md mb-3">150 reviews</div>

          {ratingStats.map((r) => (
            <div key={r.star} className="flex items-center mb-2">
              <span className="w-5">{r.star}</span>
              <div className="bg-[var(--color-placeholder-dark)] rounded h-2 w-80 mx-2 overflow-hidden">
                <div
                  className="bg-[var(--color-secondary)] h-2"
                  style={{ width: `${r.percent}%` }}
                />
              </div>
              <span className="text-gray-400 text-md mx-2">{r.percent}%</span>
            </div>
          ))}
        </div>

        {/* Feedback Form */}
        <div className="mt-12">
          <div className="font-bold text-xl mb-2">
            Leave feedback for Mehmet
          </div>
          <div className="text-gray-400 text-md mb-3">
            Rate your experience with Mehmet
          </div>

          <div className="flex items-center gap-2 text-2xl font-bold mb-2">
            {/* Star Rating */}
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="focus:outline-none"
                onClick={() => setUserRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              >
                <span
                  className={
                    (hoverRating || userRating) >= star
                      ? "text-yellow-400"
                      : "text-gray-400"
                  }
                >
                  ★
                </span>
              </button>
            ))}
            <span className="text-3xl font-normal dark:text-white ml-5">
              {userRating > 0 ? userRating.toFixed(1) : ""}
            </span>
          </div>

          {/* Feedback Textarea */}
          <div className="mt-10">
            <label className="font-bold text-xl mb-3 block">Feedback*</label>
            <textarea
              placeholder="Write your feedback here..."
              className="w-full min-h-25 bg-[var(--color-secondary)] dark:bg-[var(--color-secondary-dark)] border-none rounded-xl dark:text-white p-4 text-sm mb-2 resize-y focus:outline-none"
            />
          </div>

          {/* Checkboxes */}
          <div className="mt-2 space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="accent-[var(--color-primary)] w-4 h-4"
              />
              <span className="text-md">
                I confirm that I have completed a trade with this user
              </span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="accent-[var(--color-primary)] w-4 h-4"
              />
              <span className="text-sm">
                I confirm that this feedback is fair and honest
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComment;