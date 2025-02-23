import { Hero1 } from "./(components)/hero";

const Home = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <Hero1
        badge="💫Visit pitchco.dev"
        heading="Subscribe on waitlist!"
        description="Finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project."
        image={{
          src: "https://www.shadcnblocks.com/images/block/placeholder-1.svg",
          alt: "pitchco.dev"
        }}
      />
    </div>
  );
}
 
export default Home;