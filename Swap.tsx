
/** @jsxImportSource @emotion/react */
import { constants } from "../constants";
import { ethers, Contract, utils } from "ethers";
import HogwartsCardFactoryABI from "../abi/HogwartsCardFactory.json";
import { SetStateAction, useState } from "react";
import { css } from "@emotion/react";
import { useDisconnect } from "wagmi";
import { useNavigate } from "react-router-dom";

const abi = HogwartsCardFactoryABI.abi; // ABI는 스마트 컨트랙트의 ABI(Application Binary Interface) 정보를 가져온다.

export const Swap = () => {
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
  

  const SubTitle = css`
    padding: 14px 0px;
    font-size: 16px;
    font-weight: 600;
  `;
  const StyledInput = css`
    width: 700px;
    padding: 14px 12px;
    font-size: 18px;
    display: relative;
    margin-bottom: 16px;
    border-radius: 10px;
    border: 1px dashed rgba(0, 0, 0, 0.4);
  `;

  const Title = css `
  font-size: 50px;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 1000;
  position:relative ;
  float : left;

  `
  const title = css `
  font-size: 50px;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 0;
  position:relative;
  float : left;
  left: -50%,
  
  `
  return (
    <div
      css={{
        margin: "30px 100px",
        position: "relative",
        left: "50%",
        transform: "translate(-60%)",
         display: "flex",
         justifyContent: "space-between"
        }}>
    
      <div css={Title}>Swap</div>
      <div css={title}>스왑 설명</div>
      <div
        css={{
          display: "relative",
          flexDirection: "column",
        }}
      >
        <div css={SubTitle}>TokenA</div>
        <input
          css={StyledInput}
          type="text"
          placeholder="TokenA"
          value={tokenA}
          onChange={(e) => setTokenA(e.target.value)}
          required
        />
        <div css={SubTitle}>TokenB</div>
        <input
          css={StyledInput}
          type="text"
          placeholder="TokenB"
          value={tokenB}
          onChange={(e) => setTokenB(e.target.value)}
          required
        />
       
         
      
      <div
        onClick={() => mintCard()}
        onChange = {() =>navigate('/ad')}
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
      Swap
      </div>
    </div>
    </div>
  );
};
