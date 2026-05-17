import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { FeatureGrid } from "./components/FeatureGrid";
import { CompareTable } from "./components/CompareTable";
import { HowItWorks } from "./components/HowItWorks";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#040c08]">
      {/* Gradient backdrop */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: [
            "radial-gradient(ellipse 90% 70% at 18% -5%, rgba(16,185,129,0.32), transparent 55%)",
            "radial-gradient(ellipse 50% 45% at 88% 8%, rgba(20,184,166,0.14), transparent 52%)",
            "radial-gradient(ellipse 60% 55% at 80% 95%, rgba(5,150,105,0.12), transparent 55%)",
            "radial-gradient(ellipse 35% 30% at 5% 85%, rgba(52,211,153,0.07), transparent 48%)",
          ].join(","),
        }}
      />

      <div className="relative z-10">
        <Nav />
        <Hero />
        <FeatureGrid />
        <CompareTable />
        <HowItWorks />
        <Footer />
      </div>
    </div>
  );
}
