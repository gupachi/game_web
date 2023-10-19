
/** @jsxImportSource @emotion/react */
import { constants } from "../constants";
import { ethers, Contract, utils } from "ethers";
import HogwartsCardFactoryABI from "../abi/HogwartsCardFactory.json";
import { SetStateAction, useState } from "react";
import { css } from "@emotion/react";
import { useDisconnect } from "wagmi";
import { useNavigate } from "react-router-dom";

const abi = HogwartsCardFactoryABI.abi; // ABI는 스마트 컨트랙트의 ABI(Application Binary Interface) 정보를 가져온다.

export const Mint = () => {
  const navigate = useNavigate();
  const { disconnect } = useDisconnect();
   
  // Info data
 

  const [tokenA, setTokenA] = useState("");
  const [tokenB, setTokenB] = useState("");
 
  
  //ethers.js 라이브러리를 사용하여 이더리움과 연결
  //// signer는 거래에 서명할 수 있는 객체
  //// provider는 이더리움 노드에 연결하는 객체
  //// Factory는 스마트 컨트랙트와 상호작용할 수 있는 객체


  const signer = new ethers.providers.Web3Provider(window.ethereum).getSigner();
  const provider = new ethers.providers.JsonRpcProvider(
    constants.SeopoliaRPCUrl
  );
  let HogwartsCardFactory = new Contract(
    constants.ContractAddress,
    abi,
    provider
  );
  HogwartsCardFactory = HogwartsCardFactory.connect(signer);

  // 함수를 정의하여 스마트 컨트랙트와 상호작용
  const mintCard = async () => {
    const tx = await HogwartsCardFactory.mintHogwartsCard(
      tokenA,
      tokenB
   
    );
    const txReceipt = await tx.wait();
    const tokenId = await HogwartsCardFactory.getTokenId();
    console.log(txReceipt);
    console.log(tokenId);
  };
  const showImage = (dormitory: string) => {
    let imgUrl = "";
    switch (dormitory) {
      case "":
        imgUrl = constants.HogwartsImage;
        break;
      case "Gryffindor":
        imgUrl = constants.GryffindorImage;
        break;
      case "Ravenclaw":
        imgUrl = constants.RavenclawImage;
        break;
      case "Hufflepuff":
        imgUrl = constants.HufflepuffImage;
        break;
      case "Slytherin":
        imgUrl = constants.SlytherinImage;
        break;
    }
    return imgUrl;
  };

  const SubTitle = css`
    padding: 14px 0px;
    font-size: 16px;
    font-weight: 600;
  `;
  const StyledInput = css`
    width: 700px;
    padding: 14px 12px;
    font-size: 18px;
    margin-bottom: 16px;
    border-radius: 10px;
    border: 1px dashed rgba(0, 0, 0, 0.4);
  `;
  const StyledTextArea = css`
    width: 700px;
    height: 150px;
    padding: 14px 12px;
    font-size: 18px;
    font-family: "Noto Sans KR", sans-serif;
    font-weight: 400;
    margin-bottom: 16px;
    border-radius: 6px;
    border: 1px dashed rgba(0, 0, 0, 0.4);
  `;

  return (
    <div
      css={{
        margin: "30px 0px",
        position: "absolute",
        left: "50%",
        transform: "translate(-50%)",
         display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
    
      <h1>SWAP</h1>
  
      <div
        css={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div css={SubTitle}>TokenA</div>
        <input
          css={StyledInput}
          type="text"
          placeholder="Name your Character NFT"
          value={tokenA}
          onChange={(e) => setTokenA(e.target.value)}
          required
        />
        <div css={SubTitle}>TokenB</div>
        <input
          css={StyledInput}
          type="text"
          placeholder="Age"
          value={tokenB}
          onChange={(e) => setTokenB(e.target.value)}
          required
        />
       
         
      
      <div
        onClick={() => mintCard()}
        css={{
          width: "100%",
          padding: "10px 20px",
          textAlign: "center",
          fontSize: 18,
          fontWeight: 500,
          backgroundColor: "#00AB59",
          color: "white",
          borderRadius: 10,
          cursor: "pointer",
          margin: "30px 0px 60px",
        }}
      >
        Mint
      </div>
    </div>
    </div>
  );
};
/*
    input example :
    "Jiwoo Yun",
    "22",
    "래번클로의 반장",
    "INTJ",
    "독서, 영화보기, 마법주문 적용해보기",
    "1",
    "혼혈(Half)",
    "래번클로(Ravenclaw)"
*/
