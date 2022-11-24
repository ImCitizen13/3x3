import { useEffect, useState } from "react";
import './App.css';
import './my-sass.scss';
import { Contract, providers } from "ethers";
import  NFT  from  "./abis/3x3_ABI.json";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
// import Confetti from "react-confetti";



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

  var week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  var timerID = setInterval(updateTime, 1000);
  // updateTime();
  function updateTime() {
      var cd = new Date();

      let clockTime = zeroPadding(cd.getHours(), 2) + ':' + zeroPadding(cd.getMinutes(), 2) + ':' + zeroPadding(cd.getSeconds(), 2);
      let clockDate = zeroPadding(cd.getFullYear(), 4) + '-' + zeroPadding(cd.getMonth()+1, 2) + '-' + zeroPadding(cd.getDate(), 2) + ' ' + week[cd.getDay()];

      setMyTimer({
        clockTime,
        clockDate
        });
  };

  function zeroPadding(num, digit) {
      var zero = '';
      for(var i = 0; i < digit; i++) {
          zero += '0';
      }
      return (zero + num).slice(-digit);
  }
  //TODO: 3.Add wallet connection

  //TODO: 4.Mint Function 

  return (
    <div className="App" > 
        <div class='wrapper'>
          <div class='content'>
            <div>
                <h1 class="thicker"> ____ NFT mint</h1>
                <h1 class="thicker"> {mintInfo.totalSupply} / {mintInfo.maxSupply} </h1>
                <div style={{ width:200, height:200}}>
                  <CircularProgressbar value={mintInfo.totalSupply} maxValue={mintInfo.maxSupply} text={`${mintInfo.maxSupply - mintInfo.totalSupply}`} />;
                </div>
            </div> 
            <div>
            {/* <div id="clock">
                <p class="date">{ myTimer.date }</p>
                <p class="time">{myTimer.time }</p>
                <p class="text">DIGITAL CLOCK with Vue.js</p>
            </div> */}
            </div>
          </div>
        </div>
    </div>

  );
}

export default App;
