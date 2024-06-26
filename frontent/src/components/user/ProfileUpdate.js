import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile as updateProfileAction } from "../../actions/userActions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { clearUpdateProfile } from "../../slices/authSlice";
import MetaData from "../layouts/MetaData";
const ProfileUpdate = () => {
  const { isAuthenticated, loading, error ,isUpdated,user} = useSelector(
    (state) => state.authState
  );
  const dispatch = useDispatch();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [avatar, setAvatar] = useState(user.avatar);
  const [avatarPreview, setAvatarPreview] = useState(user.avatar);
  const navigater = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const fromData = new FormData();

    fromData.append("name", name);
    fromData.append("email", email);
    fromData.append("avatar", avatar);
    dispatch(updateProfileAction(fromData));
  };
  const handleAvatar = async (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(e.target.files[0]);
      }
    };

   await reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (isUpdated) {
      toast("profile Change Success .!", {
        type: "success",
        onOpen:()=>{
            navigater("/");
            dispatch(clearUpdateProfile())
        }
      });
    }
    if (error) {
      toast(error, {
        type: "error",
      });
    }
  }, [isAuthenticated, error,isUpdated,dispatch,navigater]);
 
  return (
    <Fragment>
      <MetaData title={'UpdateProfile'}/>
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form
            className="shadow-lg"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <h1 className="mt-2 mb-5">Update Profile</h1>

            <div className="form-group">
              <label htmlFor="email_field">Name</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="avatar_upload">Avatar</label>
              <div className="d-flex align-items-center">
                <div>
                  <figure className="avatar mr-3 item-rtl">
                    <img
                      src={avatarPreview}
                      className="rounded-circle"
                      alt="Avatar Preview"
                    />
                  </figure>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    name="avatar"
                    className="custom-file-input"
                    id="customFile"
                    onChange={handleAvatar}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Avatar
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn update-btn btn-block mt-4 mb-3"
              disabled={loading}
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default ProfileUpdate;
