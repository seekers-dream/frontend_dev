import Testimonials from '../home/sections/Testimonials';
import Faq from '../home/sections/Faq';
import Ready from '../home/sections/Ready';
import Hero from './sections/Hero';
import WhatWeStand from './sections/WhatWeStand';
export const About = () => {
  return (
    <div>
      <Hero />
      <WhatWeStand />
      <Testimonials />
      <Faq />
      <Ready />
    </div>
  );
};
