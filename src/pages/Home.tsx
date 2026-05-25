import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Honours from '../components/sections/Honours';
import Education from '../components/sections/Education';
import News from '../components/sections/News';
import Contact from '../components/sections/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Honours />
      <Education />
      <News />
      <Contact />
    </>
  );
}
