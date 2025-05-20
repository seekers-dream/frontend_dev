import { footer, socialLinks } from '@/utils/constants';
import { Link } from 'react-router-dom';
import IApple from '@/assets/svg/app-store.svg?react';
import IGoogle from '@/assets/svg/google-play.svg?react';
import ILogoWhite from '@/assets/svg/logoWhite.svg?react';
const Footer = () => {
  return (
    <div className="bg-black text-white">
      <div className="w-[90%] mx-auto">
        <ILogoWhite />
        <div className="lg:grid grid-cols-8 gap-10 pb-10">
          <div className="col-span-2 lg:pl-6">
            <p className="text-base leading-7">
              Discover meticulously crafted homes and properties, blending
              contemporary aesthetics with sustainable living.
            </p>

            <div className="flex gap-5 items-center mt-10">
              {socialLinks.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-2xl mr-5 mt-5"
                >
                  {<item.icon />}
                </Link>
              ))}
            </div>
          </div>
          <div className="col-span-4 grid grid-cols-2 lg:grid-cols-4 gap-5 mt-10 lg:mt-0">
            {footer.map((item, idx) => (
              <div key={idx} className="text-white mb-5">
                <h1 className="text-base font-semibold mb-4 ">
                  {item.heading}
                </h1>
                {item.links.map((link) => (
                  <Link
                    to={link.url}
                    className="font-normal mb-4 block text-sm mt-2"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            ))}
          </div>

          <div className="col-span-2 flex flex-col gap-5">
            <h1 className="text-base font-semibold">Download our App</h1>
            <IApple />
            <IGoogle />
          </div>
        </div>
        <div className="text-center text-sm text-white py-10">
          @ 2025 SeekersDream
        </div>
      </div>
    </div>
  );
};

export default Footer;
