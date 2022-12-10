import React, { useEffect, useState } from "react";
import { css } from "@emotion/css";
import {
  getGymClasses,
  getProductUserPairs,
  getSWUser,
  getUserClasses,
  updateGymClass,
  updateUserAddressPhone,
} from "../apirequests/apiBackEndRequests";
import SWButton from "../components/SWButton";
import Modal from "../components/Modal";
import { HashLink } from "react-router-hash-link";

const CONTAINER_CSS =
  "border-radius: 5px;border: #64748b solid 2px;background-color: rgba(0, 0, 0, 0.473);display: flex;";

export default function UserAccount({ profile }) {
  const [swUser, setSWUser] = useState();
  const [address1, setAddress1] = useState();
  const [address2, setAddress2] = useState();
  const [address3, setAddress3] = useState();
  const [postcode, setPostcode] = useState();
  const [phone, setPhone] = useState(0);
  const [password, setPassword] = useState();
  const [showModal, setShowModal] = useState(false);
  const [modalHeading, setModalHeading] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [isModalInput, setIsModalInput] = useState(false);
  const [productUserPairs, setProductUserPairs] = useState();
  const [sub, setSub] = useState();
  const [subID, setSubID] = useState();
  const [fitnessClass, setFitnessClass] = useState();
  const [instructor, setInstructor] = useState();
  const [gymClassesString, setGymClassesString] = useState();
  const [gymClassesArray, setGymClassesArray] = useState();
  const [enrolledClassesArray, setEnrolledClassesArray] = useState();
  const [enrolledClassesDetails, setEnrolledClassesDetails] = useState();
  const [detailsExpandArray, setDetailsExpandArray] = useState([
    "h-6",
    "h-6",
    "h-6",
    "h-6",
  ]);

  async function getUserAsync() {
    try {
      if (profile && profile.email) {
        await getSWUser(profile.email)
          .then((res) => res.json())
          .then((res) => {
            setSWUser(res);
          });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getProductUserPairsAsync() {
    setProductUserPairs(await getProductUserPairs());
  }

  function handleUpdadeInfo(e) {
    e.preventDefault();
    setModalHeading("Enter Password to update details.");
    setShowModal(true);
    setIsModalInput(true);
  }

  async function updateUserAddressPhoneAsync() {
    let response = await updateUserAddressPhone(
      swUser?.id,
      profile?.email,
      password,
      address1,
      address2,
      address3,
      postcode,
      phone
    );
    let json = await response.json();
    if (json.response !== "updated") {
      setModalHeading(`Error: ${json.response}`);
      setShowModal(true);
      setIsModalInput(false);
    }
  }

  function changeInput(e, setter) {
    setter(e.target.value);
  }

  const getGymClassesAsync = async () => {
    await getGymClasses().then((res) => setGymClassesArray(res));
  };

  const getUserClassesAsync = async (student_id) => {
    await getUserClasses(student_id)
      .then((res) => {
        setEnrolledClassesArray(res.response);
        return res;
      })
      .then((res) => setGymClassesString(res.response.join(", ")));
  };

  const handleClassesUpdate = async (e) => {
    const option = e.target.innerText;
    (instructor || option === "REMOVE") &&
      fitnessClass &&
      (await updateGymClass(
        fitnessClass,
        "from frontend",
        instructor,
        swUser?.id,
        option === "REMOVE" ? "remove" : "add"
      ).then(() => swUser?.id && getUserClassesAsync(swUser?.id)));
  };

  const handleDetailsExpand = (e) => {
    const reset = ["h-6", "h-6", "h-6", "h-6"];
    setDetailsExpandArray([...reset]);
    let detailsExpandArrayTemp = [...reset];
    detailsExpandArrayTemp[e.target.id] =
      detailsExpandArray[e.target.id] === "h-6"
        ? "h-32 overflow-scroll border-2 border-blue-500 rounded px-2"
        : "h-6";
    setDetailsExpandArray(detailsExpandArrayTemp);
  };

  useEffect(() => {
    const enrolledClassesDetailsTemp = [];
    gymClassesArray &&
      enrolledClassesArray &&
      gymClassesArray.forEach((gClass) => {
        enrolledClassesArray.forEach((enrolled) => {
          if (gClass.class_name === enrolled) {
            enrolledClassesDetailsTemp.push(gClass);
          }
        });
      });
    setEnrolledClassesDetails(enrolledClassesDetailsTemp);
  }, [gymClassesArray, enrolledClassesArray]);

  useEffect(() => {
    getUserAsync();
  }, [profile]);

  useEffect(() => {
    productUserPairs &&
      productUserPairs.forEach((item) => {
        item.subscribed_users.forEach((userID) => {
          if (userID == swUser?.id) {
            setSubID(item.product[0]);
          }
        });
      });
  }, [productUserPairs]);

  useEffect(() => {
    switch (subID) {
      case 1:
        setSub("Unlimited");
        break;
      case 2:
        setSub("Gold");
        break;
      case 3:
        setSub("Silver");
        break;
      default:
        setSub("None");
        break;
    }
  }, [subID]);

  useEffect(() => {
    setAddress1(swUser?.address_line_1);
    setAddress2(swUser?.address_line_2);
    setAddress3(swUser?.address_line_3);
    setPostcode(swUser?.postcode);
    setPhone(swUser?.phone);
    getProductUserPairsAsync();
  }, [swUser]);

  useEffect(() => {
    swUser?.id && getUserClassesAsync(swUser?.id);
    getGymClassesAsync();
  }, [swUser]);

  return (
    <>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        heading={modalHeading}
        message={modalMessage}
        isInput={isModalInput}
        setter={setPassword}
        func={updateUserAddressPhoneAsync}
      />
      <div className="w-full min-h-screen max-h-screen flex justify-center items-center user-account-page overflow-y-scroll">
        <div
          className={`my-24 py-8 flex-col items-center account-details ${css`
            width: 30%;
            min-width: 310px;
            ${CONTAINER_CSS}
          `}`}
        >
          <form
            className={`p-8 mb-4 text-white ${css`
              ${CONTAINER_CSS} background: black;
              width: 90%;
            `}`}
            onSubmit={(e) => handleUpdadeInfo(e)}
          >
            <ul>
              <li>Username: {profile?.username}</li>
              <li>Email: {profile?.email}</li>
              <li>First Name: {profile?.first_name}</li>
              <li>Last Name: {profile?.last_name}</li>
              <li>
                Address: <br />
                <input
                  type="text"
                  value={address1 ? address1 : ""}
                  className="bg-transparent border-t-2 border-x-2 border-blue-500 p-1 rounded-tl rounded-tr outline-none"
                  onChange={(e) => changeInput(e, setAddress1)}
                ></input>
                <br />
                <input
                  type="text"
                  value={address2 ? address2 : ""}
                  className="bg-transparent border-x-2 border-blue-500 p-1 outline-none"
                  onChange={(e) => changeInput(e, setAddress2)}
                ></input>
                <br />
                <input
                  type="text"
                  value={address3 ? address3 : ""}
                  className="bg-transparent border-x-2 border-blue-500 p-1 outline-none"
                  onChange={(e) => changeInput(e, setAddress3)}
                ></input>
                <br />
                <input
                  type="text"
                  value={postcode ? postcode : ""}
                  className="bg-transparent border-b-2 border-x-2 border-blue-500 p-1 rounded-bl rounded-br outline-none"
                  onChange={(e) => changeInput(e, setPostcode)}
                ></input>
                <br />
              </li>
              <li>
                Tel:
                <br />
                <input
                  type="tel"
                  pattern="(^\d{1,10}$)"
                  value={phone ? phone : ""}
                  className="bg-transparent p-1 border-2 border-blue-500 rounded outline-none"
                  onChange={(e) => changeInput(e, setPhone)}
                ></input>
                <br />
              </li>
              <li>ID: {swUser?.id}</li>
              <SWButton type="submit" margin={"1rem 0 0 0"}>
                Update
              </SWButton>
            </ul>
          </form>
          <div
            className={`w-4/5 p-8 text-white flex-col ${css`
              ${CONTAINER_CSS} background: black;
              width: 90%;
            `}`}
          >
            <p>
              Active Subscription: {sub}.<br />
              {sub === "None" && (
                <span>
                  Sign up to enroll in classes and access the facilities.
                </span>
              )}
            </p>
            <SWButton
              margin="1rem 0 0 0"
              width="6.75rem"
              component={HashLink}
              link="/#price-plans"
            >
              Upgrade
            </SWButton>
          </div>
          {sub !== "None" && (
            <section
              id="update-classes"
              className={`w-4/5 p-8 mt-4 text-white flex-col ${css`
                ${CONTAINER_CSS} background: black;
                width: 90%;
              `}`}
            >
              <h2 className="text-white">
                Enrolled classes: {gymClassesString}{" "}
              </h2>
              {enrolledClassesDetails &&
                enrolledClassesDetails.map((item, idx) => {
                  return (
                    <p
                      key={`class-details-${idx}`}
                      className={`${detailsExpandArray[idx]} cursor-pointer transition-all duration-300 ease-in-out overflow-hidden`}
                      onClick={(e) => handleDetailsExpand(e)}
                      id={idx}
                    >
                      <b>{item.class_name}:</b> {item.class_details}
                    </p>
                  );
                })}

              <form className="flex flex-col">
                <label htmlFor="classes">Choose a class:</label>
                <select
                  id="classes"
                  name="classes"
                  className="text-black mb-4"
                  onChange={(e) => setFitnessClass(e.target.value)}
                >
                  <option>Choose class</option>
                  <option value="Zumba">Zumba</option>
                  <option value="HIIT">HIIT</option>
                  <option value="Spin">Spin</option>
                  <option value="CrossFit">CrossFit</option>
                </select>

                <label htmlFor="instructor">Choose an instructor:</label>
                <select
                  id="instructor"
                  name="instructor"
                  className="text-black"
                  onChange={(e) => setInstructor(e.target.value)}
                >
                  <option>Choose instructor</option>
                  <option value="morleyj@steelworks.com">John Morley</option>
                  <option value="mclennanc@steelworks.com">
                    Conor McLennan
                  </option>
                  <option value="mcshanem@steelworks.com">
                    Margaret McShane
                  </option>
                  <option value="hambletonsa@steelworks.com">
                    Suzan Áurea Hambleton
                  </option>
                </select>
                <div>
                  <SWButton
                    handleOnClick={(e) => handleClassesUpdate(e)}
                    margin="1rem 1rem 0 0"
                    width="6.75rem"
                  >
                    ENROLL
                  </SWButton>
                  <SWButton
                    handleOnClick={(e) => handleClassesUpdate(e)}
                    margin="1rem 0 0 0"
                    width="6.75rem"
                  >
                    REMOVE
                  </SWButton>
                </div>
              </form>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
