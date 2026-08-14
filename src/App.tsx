import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { FeatureGrid } from "./components/FeatureGrid";
import { EngineSurface } from "./components/EngineSurface";
import { CompareTable } from "./components/CompareTable";
import { HowItWorks } from "./components/HowItWorks";
import { Footer } from "./components/Footer";
import { FunnelRoutes } from "./components/FunnelRoutes";
import { recordPageLoad } from "./lib/telemetry";
import { useEffect } from "react";
import { MobileReportBridge } from "./components/MobileReportBridge";
import { CspBuilder } from "./components/CspBuilder";
import { CspGuide } from "./components/CspGuide";
import { LinkChecker } from "./components/LinkChecker";

export default function App() {
  const isMobileBridge = /^\/m\/[^/]+\/?$/.test(window.location.pathname);
  const isCspBuilder = /^\/tools\/csp-builder\/?$/.test(window.location.pathname);
  const isCspGuide = /^\/guides\/content-security-policy\/?$/.test(window.location.pathname);
  const isLinkChecker = /^\/check-link\/?$/.test(window.location.pathname);

  useEffect(() => {
    if (!isMobileBridge) recordPageLoad();
  }, [isMobileBridge]);

  if (isMobileBridge) {
    return <MobileReportBridge />;
  }
  if (isCspBuilder) {
    return <CspBuilder />;
  }
  if (isCspGuide) {
    return <CspGuide />;
  }
  if (isLinkChecker) {
    return <LinkChecker />;
  }

  return (
    <div className="noise relative min-h-screen overflow-x-hidden">
      {/* Background — static radial wash matching the app palette */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 18% 0%, rgba(181,106,44,0.14), transparent 34%)," +
            "radial-gradient(circle at 82% 12%, rgba(122,166,182,0.10), transparent 30%)," +
            "linear-gradient(180deg, #070b14 0%, #0b1220 48%, #101827 100%)",
        }}
      />

      <div className="relative z-10">
        <Nav />
        <Hero />
        <FunnelRoutes />
        <FeatureGrid />
        <EngineSurface />
        <CompareTable />
        <HowItWorks />
        <Footer />
      </div>
    </div>
  );
}
