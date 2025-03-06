function Button({
  text,
  type,
}: {
  text: string;
  type: 'submit' | 'reset' | 'button';
}) {
  return (
    <button
      type={type}
      className="rounded-md py-3 text-center bg-[#001F3F] text-[20px] w-full md:w-[300px] hover:text-[#001F3F] hover:bg-white text-[white] hover:border-[#001F3F] hover:border"
    >
      {text}
    </button>
  );
}
export default Button;
