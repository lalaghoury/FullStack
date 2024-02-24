import React, { useState } from "react";
import "./StayInTouch.scss";
import { useAuth } from "../../context/AuthContext";
import { Button, Input, message } from "antd";
import axios from "axios";

function StayInTouch() {
  const { auth, setAuth } = useAuth();
  const [email, setEmail] = useState(null)
  const handleNewsletterAction = async () => {
    try {
      console.log(email)
      const response = await axios.post("http://localhost:5000/newsletter/subscribe", { email });
      console.log(response)
      const data = response.data;
      console.log(data)
      if (data.success) {
        message.success(data.message);
        const updatedUser = { ...auth.user, newsletter: data.user.newsletter };
        setAuth((previousAuth) => ({
          ...previousAuth,
          user: updatedUser,
          token: data.token
        }));
        localStorage.setItem("auth", JSON.stringify({ ...auth, user: updatedUser }));
      }
    } catch (error) {
      message.error(error.response.data.message);
      console.log(error);
    }
  };
  return (
    <>
      {
        auth?.user?.newsletter ? null : <div className="stay-in-touch-container">
          <h1 className="font-48">Let’s Stay In Touch!</h1>
          <p className="font-32 text-grey">
            Join our newsletter, so that we reach out to you with our news and
            offers.
          </p>
          <div className="stay-in-wrap">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button onClick={handleNewsletterAction} className="btn-primary-small bold disable-hover" type="primary" htmlType="submit">
              Subscribe
            </Button>
          </div>
        </div >
      }
    </>
  );
}

export default StayInTouch;
