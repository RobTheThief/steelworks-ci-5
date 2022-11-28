import React, { useEffect, useState } from "react";
import { css } from "@emotion/css";
import { getSWUser, updateUserAddressPhone } from "../apirequests/apiBackEndRequests";
import { Button } from "@mui/material";

const CONTAINER_CSS =
  "border-radius: 5px;border: #64748b solid 2px;background-color: rgba(0, 0, 0, 0.473);display: flex;align-items: center;";

export default function UserAccount({ profile }) {
  const [swUser, setSWUser] = useState();

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

  async function handleUpdateUserAddressPhone(){
     let response = await updateUserAddressPhone(
        14,
        'bobo@clown.com',
        'Thereur69!',
        'address_line_1',
        'address_line_2',
        'address_line_3',
        'postcode',
        12345679
      );
      let json = await response.json(); 
      console.log(json.response)
  }

  useEffect(() => {
    getUserAsync();
  }, [profile]);

  useEffect(() => {
    console.log(swUser);
  }, [swUser]);

  return (
    <div className="w-full min-h-screen flex justify-center items-center user-account-page overflow-y-scroll">
      <div
        className={`my-24 py-8 flex-col account-details ${css`
          width: 30%;
          min-width: 295px;
          ${CONTAINER_CSS}
        `}`}
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
              {swUser?.address_line_1} <br />
              {swUser?.address_line_2} <br />
              {swUser?.address_line_3} <br />
              {swUser?.postcode} <br />
            </li>
            <li>Tel: {swUser?.phone}</li>
            <li>ID: {swUser?.id}</li>
          </ul>
        </div>
        <div
          className={`w-4/5 p-4 text-white ${css`
            ${CONTAINER_CSS}
          `}`}
        >
          <p>Active Subscription: <Button onClick={handleUpdateUserAddressPhone}/></p>
        </div>
      </div>
    </div>
  );
}
