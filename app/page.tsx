import About from "./components/About";
import Blogs from "./components/Blogs";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Nav from "./components/Nav";
import Projects from "./components/Projects";
import Sidebar from "./components/Sidebar";
import Skills from "./components/Skills";

export default function Home() {
  return (
    <>
      <Nav />
      <Sidebar />
      <main className="flex-1">
        <Hero />
        <About />
        <Skills />
        <Marquee />
        <Experience />
        <Projects />
        <Blogs />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
