import React, { useEffect, useState } from "react";
import { css } from "@emotion/css";
import {
  getProductUserPairs,
  getSWUser,
  updateUserAddressPhone,
} from "../apirequests/apiBackEndRequests";
import SWButton from "../components/SWButton";
import Modal from "../components/Modal";

const CONTAINER_CSS =
  "border-radius: 5px;border: #64748b solid 2px;background-color: rgba(0, 0, 0, 0.473);display: flex;align-items: center;";

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
      <div className="w-full min-h-screen flex justify-center items-center user-account-page overflow-y-scroll">
        <form
          className={`my-24 py-8 flex-col account-details ${css`
            width: 30%;
            min-width: 295px;
            ${CONTAINER_CSS}
          `}`}
          onSubmit={(e) => handleUpdadeInfo(e)}
        >
          <div
            className={`w-4/5 p-4 mb-4 text-white ${css`
              ${CONTAINER_CSS}
            `}`}
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
          </div>
          <div
            className={`w-4/5 p-4 text-white ${css`
              ${CONTAINER_CSS}
            `}`}
          >
            <p>Active Subscription: {sub}</p>
          </div>
        </form>
      </div>
    </>
  );
}
