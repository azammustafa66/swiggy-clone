import React from "react";

import User from "../../User/User";
import UserClass from "../Class Components/UserClass/UserClass";

const About = () => {
  return (
    <div>
      <h1 className="about">About</h1>
      <h2>This is Namaste React Web Series</h2>
      <UserClass name={"My name is Azam"} />
    </div>
  );
};

export default About;
