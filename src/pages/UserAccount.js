import React, { useEffect, useState } from "react";
import { css } from "@emotion/css";
import {
  classTimeUserPairUpdate,
  findUserTimeSlots,
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
import { Helmet } from "react-helmet-async";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";

const CONTAINER_CSS =
  "border-radius: 4px;border: #64748b solid 2px;background-color: rgba(0, 0, 0, 0.473);display: flex;";

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
  const [timeSlot, setTimeSlot] = useState();
  const [gymClassesArray, setGymClassesArray] = useState();
  const [enrolledClassesArray, setEnrolledClassesArray] = useState();
  const [selectedClass, setSelectedClass] = useState();
  const [slot1ClassNames, setSlot1ClassNames] = useState();
  const [slot2ClassNames, setSlot2ClassNames] = useState();
  const [subLimit, setSubLimit] = useState();
  const [instructor, setInstructor] = useState();

  const getUserAsync = async () => {
    try {
      if (profile && profile.email) {
        await getSWUser(profile.email).then((res) => {
          setSWUser(res);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getProductUserPairsAsync = async () => {
    setProductUserPairs(await getProductUserPairs());
  };

  const handleUpdadeInfo = (e) => {
    e.preventDefault();
    setModalHeading("Enter Password to update details.");
    setShowModal(true);
    setIsModalInput(true);
  };

  const updateUserAddressPhoneAsync = async () => {
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

    if (response.response !== "updated") {
      setModalHeading(`Error: ${response.response}`);
      setShowModal(true);
      setIsModalInput(false);
    }
  };

  const changeInput = (e, setter) => {
    setter(e.target.value);
  };

  const getGymClassesAsync = async () => {
    await getGymClasses().then((res) => setGymClassesArray(res));
  };

  const getUserClassesAsync = async (student_id) => {
    await getUserClasses(student_id).then((res) => {
      setEnrolledClassesArray(res.response);
      return res;
    });
  };

  const openModal = (heading, message) => {
    setIsModalInput(false);
    setShowModal(true);
    setModalHeading(heading);
    setModalMessage(message);
  };

  const handleClassesUpdate = async (e) => {
    const option = e.target.innerText === "REMOVE" ? "remove" : "add";
    if (enrolledClassesArray.includes(fitnessClass) && option === "add") {
      openModal(
        "Input error",
        `You are already enrolled in a ${fitnessClass} class`
      );
      return;
    }
    if (
      (fitnessClass &&
        timeSlot &&
        slot1ClassNames.length + slot2ClassNames.length < subLimit) ||
      option === "remove"
    ) {
      await updateGymClass(fitnessClass, "from frontend", swUser?.id, option)
        .then(() => swUser?.id && getUserClassesAsync(swUser?.id))
        .then(() =>
          classTimeUserPairUpdate(fitnessClass, swUser?.id, option, timeSlot)
        );
    } else if (slot1ClassNames.length + slot2ClassNames.length >= subLimit) {
      openModal(
        "Input error",
        `You cannot sign up to anymore classes with ${sub} subscription`
      );
    }
    if ((!fitnessClass || !timeSlot) && option === "add") {
      openModal(
        "Input error",
        "You must select a class and time slot to enroll."
      );
    } else if ((!fitnessClass || !timeSlot) && option === "remove") {
      openModal(
        "Input error",
        "You must select an enrolled class and time slot to remove."
      );
    }
  };

  const getSelectedClassDetails = () => {
    gymClassesArray &&
      gymClassesArray.forEach((item) => {
        if (item.class_name === fitnessClass) {
          setSelectedClass(item);
          fetch(`/api/instructor/detail/${item.instructor}/`)
            .then((res) => res.json())
            .then((res) => setInstructor(res));
        }
      });
  };

  const findUserTimeSlotsAsync = async () => {
    await findUserTimeSlots(swUser?.id).then((res) => {
      setSlot1ClassNames(res.slot_1);
      setSlot2ClassNames(res.slot_2);
    });
  };

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
        setSubLimit(4);
        break;
      case 2:
        setSub("Gold");
        setSubLimit(2);
        break;
      case 3:
        setSub("Silver");
        setSubLimit(1);
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

  useEffect(() => {
    getSelectedClassDetails();
  }, [fitnessClass]);

  useEffect(() => {
    swUser && findUserTimeSlotsAsync();
  }, [swUser, enrolledClassesArray]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Steelworks-account</title>
        <link
          rel="canonical"
          href="https://steelworks-fitness.herokuapp.com/user-account"
        />
        <meta
          name="description"
          content="User account page for Steelworks Fitness gym web site."
        ></meta>
        <meta
          name="keywords"
          content="Steelworks, Fitness, Gym, subscription, class, classes, plans, profile, update"
        ></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Helmet>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        heading={modalHeading}
        message={modalMessage}
        isInput={isModalInput}
        setter={setPassword}
        func={updateUserAddressPhoneAsync}
      />
      <div className="w-full min-h-screen flex justify-center items-center user-account-page overflow-y-scroll">
        <div
          className={`my-24 py-3 flex-col items-center account-details ${css`
            width: 28%;
            min-width: 310px;
            ${CONTAINER_CSS}
          `}`}
        >
          <form
            className={`p-8 mb-4 text-white ${css`
              ${CONTAINER_CSS} background: black;
              border: #3b82f6 solid 2px;
              width: 95%;
            `}`}
            onSubmit={(e) => handleUpdadeInfo(e)}
          >
            <ul>
              <li>
                <b>Username: </b>
                {profile?.username}
              </li>
              <li>
                <b>Email: </b>
                {profile?.email}
              </li>
              <li>
                <b>First Name: </b>
                {profile?.first_name}
              </li>
              <li>
                <b>Last Name: </b> {profile?.last_name}
              </li>
              <li className="mt-4">
                <b>Address: </b> <br />
                <input
                  type="text"
                  value={address1 ? address1 : ""}
                  className="bg-transparent border-t-2 border-x-2 border-slate-500 p-1 rounded-tl rounded-tr outline-none"
                  onChange={(e) => changeInput(e, setAddress1)}
                ></input>
                <br />
                <input
                  type="text"
                  value={address2 ? address2 : ""}
                  className="bg-transparent border-x-2 border-slate-500 p-1 outline-none"
                  onChange={(e) => changeInput(e, setAddress2)}
                ></input>
                <br />
                <input
                  type="text"
                  value={address3 ? address3 : ""}
                  className="bg-transparent border-x-2 border-slate-500 p-1 outline-none"
                  onChange={(e) => changeInput(e, setAddress3)}
                ></input>
                <br />
                <input
                  type="text"
                  value={postcode ? postcode : ""}
                  className="bg-transparent border-b-2 border-x-2 border-slate-500 p-1 rounded-bl rounded-br outline-none"
                  onChange={(e) => changeInput(e, setPostcode)}
                ></input>
                <br />
              </li>
              <li className="mt-4">
                <b>Tel: </b>
                <br />
                <input
                  type="tel"
                  pattern="(^\d{1,10}$)"
                  value={phone ? phone : ""}
                  className="bg-transparent p-1 border-2 border-slate-500 rounded outline-none"
                  onChange={(e) => changeInput(e, setPhone)}
                ></input>
                <br />
              </li>
              <SWButton type="submit" margin={"1rem 0 0 0"}>
                Update
              </SWButton>
            </ul>
          </form>
          <div
            className={`w-4/5 p-8 text-white flex-col ${css`
              ${CONTAINER_CSS} background: black;
              border: #3b82f6 solid 2px;
              width: 95%;
            `}`}
          >
            <p>
              <b>Active Subscription: </b>
              {sub}{" "}
              {sub === "Unlimited" ? (
                <WorkspacePremiumOutlinedIcon fontSize="large" />
              ) : sub === "Gold" ? (
                <MilitaryTechIcon fontSize="large" />
              ) : sub === "Silver" ? (
                <DoneAllOutlinedIcon  />
              ) : null}
              <br />
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
                border: #3b82f6 solid 2px;
                width: 95%;
              `}`}
            >
              <form className="flex flex-col">
                <label htmlFor="classes" className="text-xl">
                  Choose a class
                </label>
                <select
                  id="classes"
                  name="classes"
                  className="text-black mb-4 rounded"
                  onChange={(e) => setFitnessClass(e.target.value)}
                >
                  <option value={undefined}></option>
                  <option value="Zumba">Zumba</option>
                  <option value="HIIT">HIIT</option>
                  <option value="Spin">Spin</option>
                  <option value="CrossFit">CrossFit</option>
                </select>

                <label htmlFor="time-slot" className="text-xl">
                  Choose a time slot
                </label>
                <select
                  id="time-slot"
                  name="time-slot"
                  className="text-black rounded"
                  onChange={(e) => setTimeSlot(e.target.value)}
                >
                  <option value={undefined}></option>
                  <option value="time_slot_1">Wednesdays 7-8pm</option>
                  <option value="time_slot_2">Saturdays 12-1pm</option>
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
              <h3 className="mt-8 text-xl">Enrolled classes</h3>
              <p className="p-2 text-white border-2 border-slate-500 rounded">
                Wed 7-8pm:{" "}
                {slot1ClassNames &&
                  slot1ClassNames.map((item, idx) => {
                    return (
                      <span key={`enrolled-class-slot-1-${idx}`}> {item} </span>
                    );
                  })}
                <br />
                Sat 12-1pm:{" "}
                {slot2ClassNames &&
                  slot2ClassNames.map((item, idx) => {
                    return (
                      <span key={`enrolled-class-slot-2-${idx}`}> {item} </span>
                    );
                  })}
              </p>
              <div
                className={`${
                  selectedClass
                    ? "h-32 p-2 border-2 border-slate-500 rounded"
                    : "h-4"
                } transition-all duration-300 ease-in-out overflow-scroll mt-6`}
              >
                {instructor
                  ? `Class Instructor: ${instructor.first_name} ${instructor.last_name}`
                  : null}
                <br />
                {selectedClass ? selectedClass.class_details : null}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
