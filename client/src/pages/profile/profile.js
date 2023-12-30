import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

function Profile({sessionUser}) {
  // const { user } = useContext(AuthContext);
  return (
    <div>
      <div className="container mt-5">
        <div className="card">
          <div className="row no-gutters">
            <div className="col-md-4">
              {sessionUser.img ? (
                <img
                  src={sessionUser.img}
                  alt="User's Profile"
                  className="card-img img-fluid rounded-circle"
                />
              ) : (
                <div className="card-img placeholder">No Image</div>
              )}
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h2 className="card-title">{sessionUser.username}</h2>
                <p className="card-text">
                  <strong>Email:</strong> {sessionUser.email}
                </p>
                <p className="card-text">
                  <strong>Country:</strong> {sessionUser.country}
                </p>
                <p className="card-text">
                  <strong>City:</strong> {sessionUser.city}
                </p>
                <p className="card-text">
                  <strong>Phone:</strong> {sessionUser.phone}
                </p>
                <p className="card-text">
                  <strong>Join Date:</strong>{" "}
                  {new Date(sessionUser.createdAt).toLocaleDateString()}
                </p>
                <button className="btn btn-primary">Edit Profile</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
