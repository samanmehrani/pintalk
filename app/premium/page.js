export default function Pay() {
  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center bg-background opacity-85 w-full min-h-screen z-30 pointer-events-none">
        <p className="text-5xl text-foreground font-extrabold mb-20 opacity-50">Inactive</p>
      </div>

      <main className="pt-safe-20 mb-safe flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold text-center mb-4">Upgrade to Premium</h1>
        <p className="text-sm text-gray-400 text-center mb-8 px-10">
          Enjoy exclusive features and benefits when you upgrade to the premium version of our app!
        </p>

        <div className="max-w-3xl w-full space-y-6">
          <div className="md:rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-2">Premium Features</h2>
            <ul className="list-disc list-inside text-sm">
              <li className="mb-2">Showing companies with activities similar to yours</li>
              <li className="mb-2">You can see the main importing and exporting companies around your area in the <b>EMC</b> section</li>
              <li className="mb-2">This allows you to check the advanced analysis of your competitors</li>
            </ul>
          </div>

          <div className="md:rounded-3xl p-6 pb-36">
            <h2 className="text-3xl font-semibold mb-2">Choose Your Plan</h2>
            <div className="grid sm:grid-cols-3 gap-4 mt-5">
              <div className="border-2 border-purple-700 text-purple-700 rounded-3xl p-4 text-center">
                <h3 className="text-xl font-bold">Monthly Plan</h3>
                <p className="text-3xl mt-2">$9.99</p>
                <button className="mt-6 border-2 border-purple-700 rounded-3xl py-2 px-5 hover:bg-purple-400/25">Subscribe Now</button>
              </div>
              <div className="border-2 border-rose-700 text-rose-700 rounded-3xl p-4 text-center">
                <h3 className="text-xl font-bold">Yearly Plan</h3>
                <p className="text-3xl mt-2">$49.99</p>
                <button className="mt-6 border-2 border-rose-700 rounded-3xl py-2 px-5 hover:bg-rose-400/25">Subscribe Now</button>
              </div>
              <div className="bg-foreground bg-opacity-25 text-background rounded-3xl p-4 text-center">
                <h3 className="text-xl font-bold">Lifetime subscription</h3>
                <p className="text-3xl mt-2">$299.99</p>
                <button className="mt-6 border-2 border-background rounded-3xl py-2 px-5 hover:bg-gray-400/25">Subscribe Now</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}