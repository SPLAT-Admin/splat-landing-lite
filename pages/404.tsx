export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
      <h1 className="text-5xl font-extrabold text-red-600 mb-4">
        She's Not Here, Darling!
      </h1>
      <p className="text-lg text-gray-300 mb-6 text-center max-w-md">
        You've wandered into a dark alley... but there's no party here.
        Let's get you back to the action.
      </p>
      <a
        href="/"
        className="bg-red-600 text-white px-6 py-3 rounded-2xl shadow-lg hover:bg-red-700 transition"
      >
        Take Me Home
      </a>
    </div>
  );
}
