/** @jsxImportSource @emotion/react */
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { ChangeEvent, FormEvent } from 'react';

export const Main = () => {
  const [url, setUrl] = useState("");
  const navigate = useNavigate();
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleSubmit = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    // URL로 리다이렉트
    navigate(`${url}`);
  };

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "60px 0px",
      }}
      >
      #Form 생성하기   
      <div onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="URL을 입력하세요"
            value={url}
            onChange={handleInputChange}
          />
          <button type="submit">이동</button>
        </div>
      <h1>게임 이름 </h1>
      <div css={{ fontSize: 18 }}>
        <p>게임설명</p>
        <p>
          web2 & web3 
        </p>
      </div>
      <div
        onClick={() => navigate("/game")}
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
        start
      </div>
    </div>
    );
}