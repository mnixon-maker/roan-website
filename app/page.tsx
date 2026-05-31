import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Origin from "@/components/sections/Origin";
import TwoUp from "@/components/sections/TwoUp";
import TransitionLine from "@/components/sections/TransitionLine";
import Steps from "@/components/sections/Steps";
import Pillars from "@/components/sections/Pillars";
import Sample from "@/components/sections/Sample";
import Testimonials from "@/components/sections/Testimonials";
import Closing from "@/components/sections/Closing";
import Faq from "@/components/sections/Faq";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Preloader />
      <SmoothScroll />
      <Header />
      <main>
        <Hero />
        <Origin />
        <TwoUp
          cards={[
            {
              ph: "ph-sky",
              tag: "Photo · herd on the ridge line",
              title: "No middlemen, by design",
              body: "Most supplement brands buy organ powder from a broker who buys from a renderer who buys from a feedlot. We skipped all three.",
            },
            {
              ph: "ph-deep",
              tag: "Photo · freeze-dryer at the ranch barn",
              title: "Whole-food, never isolated",
              body: "Vitamins in food come bound to the cofactors that make them work. Strip the organ down to a single compound and you lose the point.",
            },
          ]}
        />
        <TransitionLine />
        <Steps />
        <Pillars />
        <Testimonials />
        <Sample />
        <Closing />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
