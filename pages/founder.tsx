import Header from "../components/Header";
import Footer from "../components/Footer";

export default function FounderSale() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />

      <section className="text-center py-20 px-6 bg-gradient-to-r from-deep-crimson to-black">
        <h1 className="text-6xl md:text-7xl font-extrabold">Founder Sale: Closed</h1>
        <p className="mt-6 text-2xl md:text-3xl max-w-2xl mx-auto">
          Thank you to everyone who claimed their $25 lifetime membership. This exclusive offer is now closed.
        </p>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-12 space-y-8 text-base md:text-lg">
        <p className="text-[16px] md:text-[18px]">
          Our Founder Sale gave early supporters lifetime access to SPL@T Premium for a one-time payment. You believed in the vision before the app even dropped — and we love you for that.
        </p>
        <p className="text-[16px] md:text-[18px]">
          As we move closer to public launch, we may reopen the program for a limited time. Want to be the first to know?
        </p>
        <form className="flex flex-col md:flex-row items-center gap-4">
          <input 
            type="email" 
            placeholder="Enter your email"
            className="w-full md:w-auto flex-1 px-4 py-3 rounded-md text-black focus:outline-none text-[16px]"
          />
          <button
            type="submit"
            className="bg-deep-crimson hover:bg-[#a21b2e] text-white font-bold py-3 px-6 rounded-md transition text-[16px]"
          >
            Notify Me
          </button>
        </form>
        <p className="text-sm text-gray-400">
          No spam, no bullshit. Just a heads up if we reopen the gates.
        </p>
      </section>

      <Footer />
    </div>
  );
}
