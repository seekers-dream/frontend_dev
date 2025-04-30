import HeadingTag from '@/components/headingTag/HeadingTag';
import Button from '@/ui/Button';
import InputField from '@/ui/InputField';
import InputTextArea from '@/ui/InputTextArea';
import { alert } from '@/utils/alert';
import { socialLinks } from '@/utils/constants';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import Ready from '../home/sections/Ready';
import { useSendContactMessageMutation } from '@/features/contact/api';
import { contactValidationSchema } from '@/utils/validations';
import { SendContactPayload } from '@/features/contact/interfaces';

export const Contact = () => {
  const [contact, { isLoading }] = useSendContactMessageMutation();

  const handleContactSubmit = (values: SendContactPayload) => {
    contact(values)
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res) {
          alert({
            type: 'success',
            message: 'Message Sent Successfully',
            timer: 2000,
          });
        }
        contactFormik.resetForm();
      })
      .catch((err) => {
        console.log(err);
        alert({
          type: 'error',
          message: err?.data?.data || err?.data?.message || 'An error occurred',
          timer: 3000,
        });
      });
  };

  const contactFormik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      message: '',
    },
    validationSchema: contactValidationSchema,
    onSubmit: (values) => {
      console.log(values);
      handleContactSubmit(values);
    },
  });

  return (
    <div>
      <div className="w-[90%] mx-auto md:flex py-10 md:py-[92px] ">
        <div className="w-full md:w-1/2  flex flex-col justify-between bg-contact-bg bg-bottom h-[500px] md:h-[810px] bg-cover bg-no-repeat  md:rounded-tl-[20px] md:rounded-bl-[20px] py-5 md:py-[53px] px-5 md:px-[52px]">
          <div className="w-full">
            <HeadingTag title="Contact Us" />
            <h1 className="text-4xl md:text-6xl md:leading-[72px] font-semibold">
              Let us guide you home
            </h1>

            <p className="text-[#8C8C8C] text-sm md:text-lg mt-5 md:mt-0">
              We're here to help you find your perfect home or property. Whether
              you have questions, need guidance, or want to schedule a viewing,
              our team is just a message away. Reach out to us and let's make
              your real estate journey smooth and successful.
            </p>
          </div>

          <div className="text-white text-xl">
            <p>Follow us on:</p>
            <div className="flex gap-5 items-center mt-5">
              {socialLinks.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white flex items-center justify-center text-2xl size-[58px] rounded-full border border-white"
                >
                  {<item.icon className="size-[25px]" />}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 bg-[#F7F7F7] md:rounded-tr-[20px] md:rounded-br-[20px] pt-5 md:pt-[53px] pb-5 px-5 md:px-[52px]">
          <div>
            <h1 className="text-[44px] text-black font-medium">Get in touch</h1>
            <p className="text-[#999999]">
              Let’s help you find your dream home! Fill out the form below, and
              we’ll get back to you as soon as possible.
            </p>
          </div>

          <form
            className="mt-[58px] grid grid-cols-2 gap-6"
            onSubmit={contactFormik.handleSubmit}
          >
            <div className="col-span-2 md:col-span-1">
              <InputField
                placeholder="First Name"
                name="firstName"
                type="text"
                className="py-4"
                getFieldProps={contactFormik.getFieldProps}
                touched={contactFormik.touched.firstName as boolean}
                errors={contactFormik.errors.firstName}
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <InputField
                placeholder="Last Name"
                name="lastName"
                type="text"
                className="py-4"
                getFieldProps={contactFormik.getFieldProps}
                touched={contactFormik.touched.lastName as boolean}
                errors={contactFormik.errors.lastName}
              />
            </div>

            <div className="col-span-2">
              <InputField
                placeholder="Email"
                name="email"
                type="email"
                className="py-4"
                getFieldProps={contactFormik.getFieldProps}
                touched={contactFormik.touched.email as boolean}
                errors={contactFormik.errors.email}
              />
            </div>

            <div className="col-span-2">
              <InputField
                placeholder="Phone Number (Optional)"
                name="phoneNumber"
                type="number"
                className="py-4"
                getFieldProps={contactFormik.getFieldProps}
                touched={contactFormik.touched.phoneNumber as boolean}
                errors={contactFormik.errors.phoneNumber}
              />
            </div>

            <div className="col-span-2">
              <InputTextArea
                placeholder="Type your message"
                name="message"
                rows={8}
                getFieldProps={contactFormik.getFieldProps}
                touched={contactFormik.touched.message as boolean}
                errors={contactFormik.errors.message}
              />
            </div>

            <div className="col-span-2 mt-[50px]">
              <Button
                type="submit"
                label="Send Message"
                className="w-full bg-black text-white py-4 "
                loading={isLoading}
                // disabled={isLoading}
              />
            </div>
          </form>
        </div>
      </div>
      <Ready />
    </div>
  );
};
