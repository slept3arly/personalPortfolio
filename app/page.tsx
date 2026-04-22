import About from "@/components/About";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Resume from "@/components/Resume";
import Skills from "@/components/Skills";
import TechStack from "@/components/TechStack";
import Container from "@/components/ui/Container";

export default function Home() {
  return (
    <div id="top" className="relative min-h-dvh">
      <Navbar />
      <main id="content" className="relative pb-20 pt-8 md:pb-24 md:pt-10">
        <Container>
          <Hero />
          <About />
          <Projects />
          <TechStack />
          <Skills />
          <Experience />
          <Education />
          <Certifications />
          <Resume />
          <Contact />
          <Footer />
        </Container>
      </main>
    </div>
  );
}
