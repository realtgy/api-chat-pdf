import { Button } from "./ui/button";

export default function LandingPage() {
  return (
    <>
      {/* hero */}
      <section className="bg-[#062427]">
        <div className="section-container flex flex-col text-white md:flex-row items-center">
          {/* Left Side Content */}
          <div className="flex flex-col mb-32 space-y-12 text-center md:w-1/2 md:text-left">
            {/* Header */}
            <h1 className="max-w-md text-4xl md:text-5xl md:leading-tight">
              Chat with andy PDF document
            </h1>
            {/* Descripition */}
            <p className="max-w-md md:max-w-sm text-white/80 font-light leading-7">
              From legal agreements to financial reports, PDF.ai brings your
              documents to life. You can ask questions, get summaries, find
              information, and more.
            </p>
            {/* CTA */}
            <div className="flext justify-center md:justify-start">
              {/* Button */}
              <Button variant="orange" className="px-6 py-3">
                Get started for free
              </Button>
              {/* Customers */}
              <div className="flex justify-start mt-6">
                <img
                  src="user_1.jpeg"
                  className="h-6 w-6 my-auto object-cover rounded-md ring-2 ring-green-950"
                  alt=""
                />
                <img
                  src="user_2.jpeg"
                  className="h-6 w-6 my-auto object-cover rounded-md ring-2 ring-green-950"
                  alt=""
                />
                <img
                  src="user_3.jpeg"
                  className="h-6 w-6 my-auto object-cover rounded-md ring-2 ring-green-950"
                  alt=""
                />
                <img
                  src="user_4.jpeg"
                  className="h-6 w-6 my-auto object-cover rounded-md ring-2 ring-green-950"
                  alt=""
                />
                <img
                  src="user_5.jpeg"
                  className="h-6 w-6 my-auto object-cover rounded-md ring-2 ring-green-950"
                  alt=""
                />
                <p className="ml-2 my-auto text-sm text-slate-400">
                  Loved by 5,000+ happy users
                </p>
              </div>
            </div>
          </div>

          {/* right */}
          <div className="md:w-1/2">
            <img src="hero.svg" alt="" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-container">
        <h1 className="text-center text-4xl font-semibold mb-5 sm:mb-10">
          AI Document Agents
        </h1>
        <p className="text-center text-slate-500 mb-10 max-w-2xl mx-auto">
          Create specialized AI agents for document analysis. Upload PDFs,
          extract insights, answer questions about your documents.
        </p>

        <div className="text-black grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-10">
          {/* Feature 1 */}
          <div className="rounded-b-xl px-5 pb-5 pt-3 shadow-lg">
            <div className="flex-col">
              <div className="flex items-center justify-center">
                <img src="feature_1.svg" alt="" />
              </div>
              <p className="text-xl font-medium">Eduction</p>
              <span className="block text-sm text-gray-500 mt-3">
                Specialized AI agents for education professionals
              </span>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="rounded-b-xl px-5 pb-5 pt-3 shadow-lg">
            <div className="flex-col">
              <div className="flex items-center justify-center">
                <img src="feature_2.svg" alt="" />
              </div>
              <p className="text-xl font-medium">Research</p>
              <span className="block text-sm text-gray-500 mt-3">
                Specialized AI agents for research professionals
              </span>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="rounded-b-xl px-5 pb-5 pt-3 shadow-lg">
            <div className="flex-col">
              <div className="flex items-center justify-center">
                <img src="feature_3.svg" alt="" />
              </div>
              <p className="text-xl font-medium">Finance</p>
              <span className="block text-sm text-gray-500 mt-3">
                Specialized AI agents for finance professionals
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-container text-center">
        <h1 className="font-semibold text-4xl">Get started</h1>
        <p className="mt-6 mb-6 text-gray-500 ">
          Upload a document and start chatting with it today.
          <br />
          No credit card required.
        </p>
        <div className="w-full max-w-sm mx-auto px-4">
          <Button variant="orange">Sign up for free.</Button>
        </div>
      </section>
    </>
  );
}
