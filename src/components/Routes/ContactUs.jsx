const ContactUs = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="font-bold text-3xl p-4 m-4">Contact Us</h1>
      <form className="flex flex-col gap-y-4">
        <input
          type="text"
          placeholder="Name"
          className="border border-black p-2 outline-none"
        />
        <textarea
          rows={10}
          cols={50}
          placeholder="Message"
          className="border border-black outline-none"
        ></textarea>
      </form>
      <button
        type="submit"
        className="bg-black text-white hover:bg-white hover:text-black mt-3 px-5 py-0.5 rounded-md"
      >
        Submit
      </button>
    </div>
  );
};

export default ContactUs;
