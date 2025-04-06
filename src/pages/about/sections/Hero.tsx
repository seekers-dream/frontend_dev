import aboutImg1 from '@/assets/images/aboutImg1.png';
import aboutImg2 from '@/assets/images/aboutImg2.png';
import aboutImg3 from '@/assets/images/aboutImg3.png';
import aboutImg4 from '@/assets/images/aboutImg4.png';
import HeadingTag from '@/components/headingTag/HeadingTag';
const Hero = () => {
  return (
    <div>
      {' '}
      <div className="w-[90%] mx-auto py-5 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-20">
          {/* sections 1 */}
          <div>
            <HeadingTag title="About SeekersDream" />
            <h1 className="text-4xl md:text-6xl md:leading-[72px] font-semibold my-3">
              Your Dream Home, Our Expertise.
            </h1>
            <p className="text-[#8C8C8C] text-sm md:text-lg">
              Connecting you with premium properties and unparalleled real
              estate services.
            </p>
          </div>
          <div>
            <img src={aboutImg1} alt="about-image" className="w-full" />
          </div>
          {/* sections 2 */}
          <div className="hidden md:block">
            <img src={aboutImg2} alt="about-image" className="w-full" />
          </div>
          <div>
            <p className="text-[#8C8C8C] text-sm md:text-lg md:leading-7 font-normal">
              At SeekersDream, we believe finding a home is more than a
              transaction—it’s about creating a space where dreams grow. Founded
              by a team of dedicated real estate professionals, we set out to
              make the home buying, selling, and renting process seamless and
              personal. With a focus on understanding each client's unique
              needs, we’ve helped countless individuals and families find homes
              that truly fit their lifestyle and aspirations. <br /> <br /> Over
              the years, Seekersdream has grown into a trusted leader in the
              real estate industry. Our success is built on strong relationships
              and a commitment to transparency, integrity, and personalized
              service. Whether it’s guiding first-time buyers or working with
              seasoned investors, we’re proud to be the partner people trust to
              help them find not just a property, but a place to call home.
            </p>
          </div>
          <div className="block md:hidden">
            <img src={aboutImg2} alt="about-image" className="w-full" />
          </div>
          {/* sections 3 */}
          <div>
            <HeadingTag title="Our Vision" />
            <h1 className="text-4xl md:text-6xl md:leading-[72px] font-semibold my-3">
              Tailored Real Estate Solutions for Every Client
            </h1>
            <p className="text-[#8C8C8C] text-sm md:text-lg">
              At SeekersDream, our mission is to provide clients with seamless
              real estate solutions tailored to their unique needs, ensuring a
              rewarding and fulfilling experience at every step.
            </p>
          </div>
          <div>
            <img src={aboutImg3} alt="about-image" className="w-full" />
          </div>
          {/* sections 4 */}
          <div className="hidden md:block">
            <img src={aboutImg4} alt="about-image" className="w-full" />
          </div>
          <div>
            <HeadingTag title="Our Mission" />
            <h1 className="text-4xl md:text-6xl md:leading-[72px] font-semibold my-3">
              Leading with Excellence, Integrity, and Innovation in Real Estate
            </h1>
            <p className="text-[#8C8C8C] text-sm md:text-lg">
              Our vision is to become a trusted leader in the real estate
              industry by delivering excellence, integrity, and innovation in
              every transaction.
            </p>
          </div>
          <div className="block md:hidden">
            <img src={aboutImg4} alt="about-image" className="w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
