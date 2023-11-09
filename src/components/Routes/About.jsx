const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="bg-orange-500 p-4 text-white">
        <div className="container mx-auto">
          <h1 className="text-lg font-bold">Our Food Delivery App</h1>
        </div>
      </nav>
      <main className="flex-grow container mx-auto bg-white p-8">
        <section className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">About Us</h2>
          <p className="text-gray-600">
            Our mission is to bring your favorite meals to your doorstep with
            ease and reliability. Built with the modern web in mind, our app
            provides a seamless ordering experience, tailored for food lovers
            everywhere.
          </p>
        </section>
      </main>
      <footer className="bg-gray-100 p-4 text-center">
        <p className="text-gray-600">
          &copy; {new Date().getFullYear()} Our Food Delivery App. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
};

export default About;
