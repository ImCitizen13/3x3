import { useEffect, useState, useRef} from "react";
import CountDownTimer from './CountDownTimer'
import './App.css';
import './App.scss';
import { Contract, providers } from "ethers";
import  NFT  from  "./abis/3x3_ABI.json";
import mintTime from "./timing.json";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
// import Confetti from "react-confetti";\
const { DateTime } = require("luxon");


const NFT_CONTRACT_ADDRESS = "0x4B533b07209334e18C73776bC2d4baDcE15BBfED";

function App() {
  //TODO: 1.Connect to the contract
  // NFT contract state variable
  const [NFTContract, setNFTContract] = useState(null);
  const [mintTotalSupply, setMintTotalSupply] = useState(null);
  const [myTimer, setMyTimer] = useState({
    time: "",
    date: ""
  });
  const [mintInfo, setMintInfo] = useState({
    totalSupply: "",
    maxSupply: ""
  });

    

  // Initializing NFT Contract  
  
  const initContract = async () => {
    const provider = new providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    // setNFTContract(new Contract(NFT_CONTRACT_ADDRESS, NFT, signer));
    const contract = new Contract(NFT_CONTRACT_ADDRESS, NFT, signer);
    const tempTotalSupply = await contract.totalSupply();
    const tempMaxSupply = await contract.maxSupply();
    // Store on use states
    setNFTContract(contract);
    setMintInfo({
      totalSupply: tempTotalSupply.toString(),
      maxSupply: tempMaxSupply.toString()
    });
    setMintTotalSupply(tempTotalSupply.toString());
  }
  
  useEffect(() => {
    initContract();

  }, []);

  //TODO: 2.Make a countdown
  // Convert the datetime to the accurate datetime


  //TODO: change from CST to local
  function getMintDateFromJsonFile(){
    let mintDate = mintTime.time;
    let minutesToMint = mintTime.minutesToMint;
    let timeInCST = getCSTMintDate(mintDate)
    return { 'minutesToMint': minutesToMint,
             'dateAndTime': timeInCST
           };
  }

  function getCSTMintDate(dateTimeString) {
    let year = 2022;
    let month = dateTimeString.substr(0,2);
    let day = dateTimeString.substr(3,2);
    let hours = dateTimeString.substr(8,2);
    let minutes = dateTimeString.substr(11,2);
    let seconds = '00';
    let dayTime = dateTimeString.substr(14,2);
    let timeZone = dateTimeString.substr(17,3);
    if (timeZone == 'CST') {
      
    }
    if (dayTime == 'PM') {
        hours = parseInt(hours) + 12
    }
    
    
    // Create date in the timer format

    let dateString = year + "-" + month + "-" + day + " " 
    + hours + ":" + minutes + ":" + seconds;
    const zone = 'America/Mexico_City';
    const dt = DateTime.fromFormat(dateString, 'yyyy-MM-dd HH:mm:ss', { zone });
    const utcTime = dt.setZone('UTC');
    let dateToReturn = utcTime;
    // console.log('DateTime');
    // console.log(dateToReturn);
    // console.log('DateTime string');
    // console.log(dateToReturn.toString());
    // console.log('Date');
    // console.log(dateToReturn.toJSDate());
    return dateToReturn;
	}

  const  mintTimes = getMintDateFromJsonFile();

  //TODO: 3.Add wallet connection

  //TODO: 4.Mint Function 

  return (
    <div className="App" > 
        <div class='wrapper'>
          <div class='content'>
            <div class='mintStats itemPadding'>
                <h1 class="thicker"> ____ NFT mint</h1>
                <h1 class="thicker"> {mintInfo.totalSupply} / {mintInfo.maxSupply} </h1>
                {/* <div style={{ width:200, height:200}}>
                  <CircularProgressbar value={mintInfo.totalSupply} maxValue={mintInfo.maxSupply} text={`${mintInfo.maxSupply - mintInfo.totalSupply}`} />;
                </div> */}
            </div> 

            <CountDownTimer class="itemPadding" targetDate={mintTimes} />

          </div>
        </div>
    </div>

  );
}

export default App;
