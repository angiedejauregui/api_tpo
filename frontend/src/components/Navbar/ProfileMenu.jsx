import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/AuthSlice";

const ProfileMenu = ({  user, initial, isOpen, menuRef }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const handleLogout = async () => {
      dispatch(logout());
      navigate("/login");
    };
  
  return (
    <>
      {isOpen && (
        <div className="dropdown-menu" ref={menuRef}>
          {user ? (
            <>
              <div className="profile-info">
                <div className="initial">
                  {user ? initial : <BsPerson className="icon" />}
                </div>
                <div>
                  <p className="profile-name">
                    {user.name} {user.lastName}
                  </p>
                  <p className="profile-email">{user.email}</p>
                </div>
              </div>

              <div className="profile-actions">
                <button 
                  className="dropdown-button clases"
                  onClick={() => navigate("/history")}
                  >
                    Mis clases
                </button>
                <hr />
                <button 
                  className="dropdown-button"
                  onClick={() => navigate("/profile")}
                >
                    Mi perfil
                </button>
                <button
                  className="dropdown-button logout"
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="profile-actions">
                <button
                  className="dropdown-button"
                  onClick={() => navigate("/login")}
                >
                  Iniciar sesión
                </button>
                <button
                  className="dropdown-button"
                  onClick={() => navigate("/register")}
                >
                  Registrarme
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ProfileMenu;
