import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Container from "./components/ui/Container";
import Experience from "./components/Experience";
import Education from "./components/Education";
import TechStack from "./components/TechStack";
import Resume from "./components/Resume";
import Certifications from "./components/Certifications";

export default function Home() {
  return (
    <div id="top" className="min-h-dvh bg-black">
      <Navbar />
      <main className="pb-12 pt-10 sm:pt-14">
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