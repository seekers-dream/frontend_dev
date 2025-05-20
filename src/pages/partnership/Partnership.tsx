import Ready from '../home/sections/Ready';
import Testimonials from '../home/sections/Testimonials';
import Benefits from './sections/Benefits';
import PartnershipHero from './sections/PartnershipHero';
import PartnershipProcess from './sections/PartnershipProcess';

export const Partnership = () => {
  return (
    <div>
      <PartnershipHero />
      <Benefits />
      <PartnershipProcess />
      <Testimonials />
      <Ready />
    </div>
  );
};
