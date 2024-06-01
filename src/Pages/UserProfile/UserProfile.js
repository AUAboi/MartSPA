import React, { useEffect, useLayoutEffect, useState } from "react";
import useRedirectLogoutUser from "./../../customHooks/useRedirectLogoutUser";
import { useDispatch, useSelector } from "react-redux";
import {
  RESET,
  getProfile,
  sendVerificationMail,
  updateProfile,
} from "../../redux/features/auth/authSlice";
import { ShowOnlyAdmin, ShowOnlyVendor } from "../../protectLinks/protectedLinks";
import { toast } from "react-toastify";
import {
  ref,
  // uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../../config/firebase";
import Alert from "../../components/alert/Alert";
import { BiPencil } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import LoadingSpinner from "../../components/loader/Loader";

const Profile = () => {
  useRedirectLogoutUser("/login");
  const { isLoading, isSuccess, isLoggedIn, message, user } = useSelector(
    (state) => state.auth
  );
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialState = {
    uName: user?.name || "name",
    mobile: user?.mobile || "+923330000000",
    email: user?.email || "email@gmail.com",
    photo: user?.photo || "url",
    bio: user?.bio || "bio",
    isVerified: user?.isVerified || false,
    role: user?.role || "no role",
  };
  const [profile, setProfile] = useState(initialState);
  const [profilePreview, setProfilePreview] = useState(null);
  const [image, setImage] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileExtension, setFileExtension] = useState("");
  const [editProfile, setEditProfile] = useState(true);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("");
  const [validName, setValidName] = useState(true);
  const [validMobile, setValidMobile] = useState(true);

  const updateState = (e) => {
    setProfile((profile) => ({
      ...profile,
      [e.target.name]: e.target.value,
    }));
  };


  useEffect(() => {
    var regexp = /^[A-Za-z\s]+$/i;
    let validName = regexp.test(profile.uName);
    if (!validName) {
      setValidName(false);
    } else if (validName) {
      setValidName(true);
    }
  }, [profile.uName]);

  useEffect(() => {
    var regexp = /^\+92[0-9]+$/;
    let validMobile = regexp.test(profile.mobile) && profile.mobile.length===13
    if (!validMobile) {
      setValidMobile(false);
    } else if (validMobile) {
      setValidMobile(true);
    }
  }, [profile.mobile]);

  useEffect(() => {
    dispatch(getProfile());
    dispatch(RESET());
  }, [dispatch]);

  const handlePreview = (e) => {
    try {
      console.log("length is", e.target.files.length);
      if (e.target.files.length === 0) {
        setProfilePreview("");
        setImage("");
        setFileExtension("");
        setFileName("");
        return;
      }
      let src = e.target.files[0];
      if (src.size > 26000) {
        toast.error("File size must be 25kb or less");
        return;
      }
      setImage(src);
      setProfilePreview(URL.createObjectURL(e.target.files[0]));
      const fileExt = src?.name.split(".").pop();
      // setFileExtension(fileExt);

      const nameOfFile = src?.name;

      const randomNumber1 = Math.random().toString(36).slice(2);
      const randomNumber2 = Math.random().toString(36).slice(2);
      const randomNumber3 = Math.random().toString(36).slice(2);
      const fileName =
        nameOfFile.toString() +
        randomNumber1 +
        randomNumber2 +
        randomNumber3 +
        "." +
        fileExt;
      setFileName(fileName);
      // console.log(Name is ${fileName} & extension is ${fileExt});
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    if(!validName){
      toast.error("Enter valid name")
      return
    }
    if(!validMobile){
      toast.error("Enter valid mobile")
      return
    }
    setEditProfile(!editProfile);
    try {
      // console.log(image)
      // if (image && (image.type !== "image/jpg" || image?.type !== "image/jpeg")) {
      //   toast.error("Select a file only jpg & jpeg allowed");
      //   toast.error(image.type)
      //   return;
      // }
      // toast.warning(Please wait);
      setLoading(true);
      const imageRef = ref(storage, `images/${fileName}`);
      const upload = uploadBytesResumable(imageRef, image);

      upload.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          if (progress === 100) {
            // make a toast
            toast("update");
          }
        },
        (error) => {
          toast.error("Fail to update, please try again");
          switch (error.code) {
            case "storage/unauthorized":
              break;
            case "storage/canceled":
              break;
            case "storage/unknown":
              break;
            default:
              break;
          }
        },
        () => {
          getDownloadURL(upload.snapshot.ref)
            .then((downloadUrl) => {
              // console.log(downloadUrl);
              setLoading(false);
              const userData = {
                ...profile,
                name: profile.uName,
                photo: image ? downloadUrl : user.photo,
                mobile: profile.mobile,
                bio: profile.bio,
              };
              console.log(userData);
              dispatch(updateProfile(userData));
            })
            .catch((err) => {
              toast.error(err.message);
              setLoading(false);
            });
        }
      );
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    if (user) {
      setProfile({
        uName: user.name,
        email: user.email,
        mobile: user.mobile,
        photo: user.photo,
        bio: user.bio,
        role: user.role,
        isVerified: user.isVerified,
      });
    }
  }, [user, isLoggedIn]);

  function getLocation() {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser.");
    } else {
      navigator.geolocation.getCurrentPosition(showPosition);
    }
  }

  function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    getLocati(lat, lon)
      .then((location) => setLocation(location.display_name))
      .catch((error) => toast.error(error.message));
  }

  useEffect(() => {
    if (user?.bio === "") {
      getLocation();
    }
  }, [user?.bio]);

  async function getLocati(lat, lon) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
  console.log(user&&user)

  return (
    <>
      {/* {loading && <LoadingSpinner />} */}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        !isLoading &&
        user && (
          <div>
            {!profile.isVerified && <Alert />}
            <div className="flex lg:p-20 p-10 gap-8 lg:flex-row flex-col">
              <div className="bg-white lg:w-max w-full flex space-y-4 flex-col items-center justify-center px-16 rounded-md">
                <div className="relative">
                  <img
                    className="size-28  rounded-full"
                    src={profilePreview ? profilePreview : profile.photo}
                    alt="user_img"
                  />
                  {!editProfile && (
                    <label
                      htmlFor="editImg"
                      className="absolute right-2 bottom-0 rounded-full bg-pink-600"
                    >
                      <BiPencil className="text-3xl bg-white rounded-full p-1 hover:text-red-600 transition-all ease-linear duration-300 cursor-pointer ring-1 ring-gray-500" />
                    </label>
                  )}
                </div>
                <div className="hidden">
                  <input
                    type="file"
                    name="profile_img"
                    id="editImg"
                    className=""
                    onChange={handlePreview}
                    accept="image/jpg,image/jpeg"
                    disabled={editProfile}
                  />
                </div>

                <div className=" text-center">
                  <ShowOnlyAdmin>
                    <h1 className=" font-bold my-1">
                      Role:{" "}
                      {profile.role[0].toUpperCase() +
                        profile.role.slice(1, profile.role.length)}
                    </h1>
                  </ShowOnlyAdmin>
                  <ShowOnlyVendor>
                    <h1 className=" font-bold my-1">
                      NTN: {user?.ntn}
                    </h1>
                  </ShowOnlyVendor>

                  <h1 className=" font-bold my-1">{profile.uName}</h1>
                  <h1 className=" text-gray-400 font-semibold">
                    {profile.email}
                  </h1>
                  {/* <h1 className=" text-gray-400 font-semibold">
            Jamshed Town, Jaranwala
                    </h1> */}
                  <h1 className="text-gray-400 font-semibold my-1">
                    Account Status:{" "}
                    <span
                      className={`${
                        profile.isVerified ? "text-green-700" : "text-red-700"
                      }`}
                    >
                      {profile.isVerified ? "Verified" : "Not verified"}
                    </span>
                  </h1>
                </div>
              </div>
              <div className="bg-white w-full rounded-md p-3 align-baseline">
                <div className="bg-white p-3 rounded-t-md ">
                  <div className="mb-2">
                    <label htmlFor="name" className="font-semibold ">
                      Name:
                    </label>
                  </div>
                  <input
                    className={`outline-none max-sm:px-3 px-6 py-3 ring-1 ring-neutral-300 focus:ring-[3px] focus:ring-blue-400 w-full rounded transition-all ease-linear duration-300 ${
                      editProfile && "text-gray-400 bg-neutral-200"
                    }`}
                    type="text"
                    id="name"
                    name="uName"
                    defaultValue={profile.uName}
                    placeholder={profile.uName}
                    disabled={editProfile}
                    onChange={updateState}
                  />{" "}
                </div>
                {!validName &&<div className="text-red-600 text-sm pt-1 px-3">
                Enter valid name
              </div>}
                <hr />
                <div className="bg-white p-3  ">
                  <div className="mb-2">
                    <label htmlFor="email" className="font-semibold">
                      Email:
                    </label>
                  </div>
                  <input
                    className="outline-none max-sm:px-3 px-6 py-3 ring-1 ring-neutral-300 focus:ring-[3px] focus:ring-blue-400 w-full rounded transition-all ease-linear duration-300 text-gray-400 bg-neutral-200"
                    type="email"
                    id="email"
                    value={profile.email}
                    placeholder=" Enter your Email"
                    disabled
                  />{" "}
                </div>
                <hr />
                <div className="bg-white p-3 ">
                  <div className="mb-2">
                    <label htmlFor="tel" className="font-semibold">
                      Mobile:
                    </label>
                  </div>
                  <input
                    className={`outline-none max-sm:px-3 px-6 py-3 ring-1 ring-neutral-300 focus:ring-[3px] focus:ring-blue-400 w-full rounded transition-all ease-linear duration-300 ${
                      editProfile && "text-gray-400 bg-neutral-200"
                    }`}
                    type="tel"
                    id="tel"
                    name="mobile"
                    defaultValue={profile.mobile}
                    placeholder={profile.mobile}
                    pattern="[0-9]*"
                    disabled={editProfile}
                    onChange={updateState}
                  />
                </div>
                {!validMobile &&<div className="text-red-600 text-sm pt-1 px-3">
                Enter valid mobile +92 <br />
                Min 13 digit 
              </div>}
                <hr />
                <div className="bg-white p-3  ">
                  <div className="mb-2">
                    <label htmlFor="address" className="font-semibold">
                      Address:{" "}
                      {user?.bio === "" && (
                        <span className="text-[8px] text-red-600">
                          (if unable to get location, please on location &
                          refresh page.you can change only once)
                        </span>
                      )}
                    </label>
                  </div>
                  <input
                    className={`outline-none max-sm:px-3 px-6 py-3 ring-1 ring-neutral-300 focus:ring-[3px] focus:ring-blue-400 w-full rounded transition-all ease-linear duration-300 ${
                      user?.bio
                        ? "text-gray-400 bg-neutral-200"
                        : editProfile && "text-gray-400 bg-neutral-200"
                    }`}
                    type="text"
                    id="address"
                    name="bio"
                    defaultValue={user?.bio ? user.bio : location}
                    placeholder="Address"
                    disabled={user?.bio ? "true" : editProfile}
                    onChange={updateState}
                  />{" "}
                </div>
                <div className=" my-10 mx-3 text-white flex justify-between items-center">
                  <button
                    className="max-sm:px-4 px-6 py-3 rounded-md bg-red-600 hover:bg-red-800 transition-all ease-linear duration-300 cursor-pointer"
                    onClick={(e) => setEditProfile(!editProfile)}
                  >
                    Edit Profile
                  </button>
                  {!editProfile && (
                    <button
                      className="max-sm:px-4 px-6 py-3 rounded-md bg-blue-600 hover:bg-blue-800 transition-all ease-linear duration-300 cursor-pointer"
                      onClick={handleImageUpload}
                    >
                      Update Profile
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default Profile;