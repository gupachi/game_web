import { Navigate, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { ChangeEvent, FormEvent } from 'react';
// Caller 를 msg.caller 로 지정함 

export const AdInfo = () =>{
  //1. msg.sender를 호출한다. 
  const navigate = useNavigate();
  return (
   <div
       
        onclick={() => navigate("/")}
        css={{
            marginTop: 40,
            padding: "10px 20px",
            backgroundColor: "#00AB59",
            color: "white",

            fontSize: 20,
            fontWeight: 500,
            borderRadius: 8,
            cursor: "pointer",
        }}
    >
        광고건너뛰기
    </div>
    <div
        TokenAdd();
        onClick={() => navigate("/ad")}
        css={{
            marginTop: 40,
            padding: "10px 20px",
            backgroundColor: "#00AB59",
            color: "white",

            fontSize: 20,
            fontWeight: 500,
            borderRadius: 8,
            cursor: "pointer",
        }}
    >
            광고보기
        </div>
    </div>
    );
    }
