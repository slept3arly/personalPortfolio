import About from "@/components/About";
import Contact from "@/components/Contact";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Resume from "@/components/Resume";
import TechStack from "@/components/TechStack";
import Container from "@/components/ui/Container";

export default function Home() {
  return (
    <div id="top" className="relative min-h-dvh">
      <Navbar />

      <main id="content" className="relative pb-16 pt-4 md:pb-20 md:pt-6">
        <Container>
          <Hero />

          {/* Who you are */}
          <About />

          {/* What you’ve built (most important) */}
          <Projects />

          {/* What you can work with */}
          <TechStack />

          {/* Proof of work / depth */}
          <Experience />

          {/* Academic context (secondary) */}
          <Education />

          {/* Action */}
          <Resume />
          <Contact />

          <Footer />
        </Container>
      </main>
    </div>
  );
}
