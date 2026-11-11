import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Education from './sections/Education';
import Contact from './sections/Contact';
import { profile, contacts, stats, focusAreas, navLinks, experience, projects, skillGroups, education } from './data/resume';

export default function App() {
  return (
    <>
      <NavBar brand={profile.name.split(' ')[0]} links={navLinks} />
      <main>
        <Hero profile={profile} contacts={contacts} company={experience.find((job) => job.current)?.company} />
        <About profile={profile} stats={stats} focusAreas={focusAreas} />
        <Experience items={experience} />
        <Projects items={projects} />
        <Skills groups={skillGroups} />
        <Education items={education} />
        <Contact contacts={contacts} />
      </main>
      <Footer profile={profile} links={navLinks} contacts={contacts} />
    </>
  );
}
