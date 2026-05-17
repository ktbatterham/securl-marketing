import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { FeatureGrid } from "./components/FeatureGrid";
import { CompareTable } from "./components/CompareTable";
import { HowItWorks } from "./components/HowItWorks";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="noise relative min-h-screen overflow-x-hidden bg-[#030b06]">
      {/* Animated gradient blobs — fixed so they persist while scrolling */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {/* Primary emerald — top left, large */}
        <div
          className="blob-a absolute rounded-full"
          style={{
            width: "80vw",
            height: "75vh",
            top: "-20vh",
            left: "-15vw",
            background: "radial-gradient(ellipse at center, rgba(16,185,129,0.44) 0%, transparent 65%)",
          }}
        />
        {/* Teal — top right */}
        <div
          className="blob-b absolute rounded-full"
          style={{
            width: "55vw",
            height: "60vh",
            top: "-10vh",
            right: "-10vw",
            background: "radial-gradient(ellipse at center, rgba(20,184,166,0.28) 0%, transparent 65%)",
          }}
        />
        {/* Violet — dead centre viewport, always visible */}
        <div
          className="blob-c absolute rounded-full"
          style={{
            width: "70vw",
            height: "70vh",
            top: "15vh",
            left: "15vw",
            background: "radial-gradient(ellipse at center, rgba(99,102,241,0.20) 0%, transparent 65%)",
          }}
        />
        {/* Emerald — bottom right */}
        <div
          className="blob-b absolute rounded-full"
          style={{
            width: "60vw",
            height: "60vh",
            bottom: "-15vh",
            right: "-10vw",
            background: "radial-gradient(ellipse at center, rgba(16,185,129,0.26) 0%, transparent 65%)",
            animationDelay: "-8s",
          }}
        />
        {/* Violet — bottom left */}
        <div
          className="blob-a absolute rounded-full"
          style={{
            width: "50vw",
            height: "50vh",
            bottom: "-5vh",
            left: "-10vw",
            background: "radial-gradient(ellipse at center, rgba(129,140,248,0.18) 0%, transparent 65%)",
            animationDelay: "-14s",
          }}
        />
        {/* Teal — mid-left, fills the mid-viewport gap */}
        <div
          className="blob-c absolute rounded-full"
          style={{
            width: "40vw",
            height: "45vh",
            top: "35vh",
            left: "-5vw",
            background: "radial-gradient(ellipse at center, rgba(20,184,166,0.16) 0%, transparent 65%)",
            animationDelay: "-6s",
          }}
        />
      </div>

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
