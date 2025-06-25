import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import { useSelector } from "react-redux";
import { PiHouse } from "react-icons/pi";
import { BsPerson } from "react-icons/bs";
import ProfileMenu from "./ProfileMenu";
import { useNavigate } from "react-router-dom";
import NotificationsDropdown from "./NotificationsDropdown";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();
  const buttonRef = useRef();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = useSelector((state) => state.auth.user);
  const initial = user?.name?.charAt(0).toUpperCase();

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <header>
        <h1 className="title">FITMATCH</h1>
        <div className="btns">
          {user && (
            <>
          <div className="btn" onClick={() => navigate("/")}>
            <PiHouse className="icon" />
          </div>
          <div className="btn">
            <NotificationsDropdown token={token} />
          </div>
</>
          )}
          <div className="profile-btn" ref={buttonRef} onClick={toggleDropdown}>
            <div className="btn initial">
              {user ? initial : <BsPerson className="icon" />}
            </div>
            <svg
              width="15"
              height="10"
              viewBox="0 0 15 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 6.55671e-07L7.5 6.54354L0 0L-1.51087e-07 3.45646L7.5 10L15 3.48285L15 6.55671e-07Z"
                fill="white"
              />
            </svg>
          </div>
          
          <ProfileMenu
            user={user}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            menuRef={menuRef}
            initial={initial}
          />
        </div>
      </header>
    </>
  );
};

export default Navbar;
