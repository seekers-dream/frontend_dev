import Button from '@/ui/Button';
import { RxAvatar } from 'react-icons/rx';
import { useParams } from 'react-router-dom';
import { FiMail } from 'react-icons/fi';
import { MdOutlinePhone } from 'react-icons/md';

export const PropertyDetails = () => {
  const { propertyId } = useParams<{ propertyId: string }>();
  console.log(propertyId);
  return (
    <div>
      <div className="w-[90%] mx-auto">
        <div>Images</div>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-12 gap-5 pb-10">
          <div className="col-span-8">
            <div>
              <h1 className="text-black font-semibold text-3xl md:text-6xl">
                Edenbrook Residences
              </h1>
              <p className="mt-5 text-base md:text-xl text-[#8C8C8C] font-normal">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
            </div>

            <div className="my-5">Address</div>
          </div>
          <div className="col-span-6 md:col-span-4 space-y-10">
            <div className="font-bold text-black border border-[#F0F0F0] rounded-2xl p-5">
              <p className="text-base md:text-2xl">Price</p>
              <h1 className="text-2xl md:text-4xl"> NGN 400,000</h1>
            </div>

            <div className=" text-black border border-[#F0F0F0] rounded-2xl p-5">
              <p className="font-semibold text-base md:text-2xl">
                Thinking of renting?
              </p>
              <div className="flex gap-5 justify-center items-center my-10">
                <Button
                  type="button"
                  label="Tour in person"
                  className="bg-black  w-1/2 text-white"
                />
                <Button
                  type="button"
                  label="Tour via video call"
                  className="text-black w-1/2"
                />
              </div>
              <div>
                <Button
                  type="button"
                  label="Request Showing"
                  className="w-full hover:text-white rounded-[9999px] text-black"
                />
                <p className="my-10 text-center text-sm text-black font-semibold">
                  or
                </p>
                <Button
                  type="button"
                  label="Start an offer"
                  className="w-full rounded-[9999px] text-white bg-black"
                />
              </div>
            </div>

            <div className=" text-black border border-[#F0F0F0] rounded-2xl p-5">
              <p className="font-semibold text-base md:text-2xl">
                Inquire About this Property
              </p>
              <div className="flex items-center gap-5 my-10">
                <div>
                  <RxAvatar className="size-[80px]" />
                </div>
                <div>
                  <h1 className="font-semibold text-black text-xl">John Doe</h1>
                  <p className="text-[#8C8C8C] font-normal text-base">
                    Joh@gmail.com
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <Button
                  type="button"
                  label="Message"
                  icon={<FiMail />}
                  className="rounded-[9999px] flex-row-reverse bg-black text-white w-1/2"
                />
                <Button
                  type="button"
                  label="Call"
                  icon={<MdOutlinePhone />}
                  className="rounded-[9999px] flex-row-reverse text-black hover:text-white w-1/2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
