import { Button } from "./ui/button";

export default function LandingPage() {
  return (
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
  );
}
