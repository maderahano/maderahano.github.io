import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Timeline } from './components/Timeline';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Education } from './components/Education';
import { Interests } from './components/Interests';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Navbar />
        <main id="main">
          <Hero />
          <About />
          <Timeline />
          <Skills />
          <Projects />
          <Education />
          <Interests />
          <Contact />
        </main>
        <Footer />
      </MotionConfig>
    </LazyMotion>
  );
}
