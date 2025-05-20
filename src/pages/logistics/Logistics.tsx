import AboutSection from '../home/sections/AboutSections';
import Hero from './sections/LogisticsHero';
import about1 from '@/assets/images/about.jpg';
import about2 from '@/assets/images/about2.png';
import about3 from '@/assets/images/about3.png';
import about4 from '@/assets/images/about4.png';
import about5 from '@/assets/images/about5.jpg';
import about6 from '@/assets/images/about6.png';
import about7 from '@/assets/images/about7.png';
import about8 from '@/assets/images/about8.png';
import Trucks from './sections/Trucks';
import Ready from '../home/sections/Ready';

export const Logistics = () => {
  return (
    <div>
      <Hero />
      <AboutSection
        title="About SeekersDream Logistics"
        subTitle="Your Logistics Needs, Our Proven Expertise."
        content="At SeekersDream, we are dedicated to supporting businesses and individuals in finding the ideal logistics solutions and smart transport strategies. Our approach combines personalized service, industry expertise, and a commitment to excellence ensuring your logistics journey is smooth, efficient, and tailored to your specific needs."
        about1={about1}
        about2={about2}
        about3={about3}
        about4={about4}
        link="/about"
        linkText="About Us"
      />
      <AboutSection
        title="Book us  now"
        subTitle="Delivering Seamless Logistics, Every Step of the Way."
        content="At SeekersDream, we are committed to helping individuals and families find their perfect homes and smart investment properties. Our approach blends personalized service, expert insights, and a dedication to excellence, ensuring your real estate journey is seamless, rewarding, and tailored to your unique needs."
        about1={about5}
        about2={about6}
        about3={about7}
        about4={about8}
        link="#"
        linkText="Book Us"
      />
      <Trucks />
      <Ready />
    </div>
  );
};
