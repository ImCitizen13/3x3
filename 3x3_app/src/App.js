import { useEffect, useState } from "react";
import './App.css';
import './App.scss';
import { Contract, providers } from "ethers";
import  NFT  from  "./abis/3x3_ABI.json";
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
    updateTime();
  }, []);

  //TODO: 2.Make a countdown
  // Convert the datetime to the accurate datetime

  var week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  var timerID = setInterval(updateTime, 1000);
  // updateTime();

  // useEffect(() => {
  //   updateTime()
  // }, []);

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
      
      // Creat date in the timer format
      //YYYY-MM-DDTHH:mm:ss.sssZ
	  //let dateToReturn = new Date();
      //dateToReturn.setFullYear(year, month, day);
      //dateToReturn.setHour(hours);
      //dateToReturn.setMinutes(minutes);
      //dateToReturn.setSeconds(seconds)
      let dateString = year + "-" + month + "-" + day + " " 
      + hours + ":" + minutes + ":" + seconds;
      const zone = 'America/Mexico_City';
      const dt = DateTime.fromFormat(dateString, 'yyyy-MM-dd HH:mm:ss', { zone });
      const utcTime = dt.setZone('UTC');
      let dateToReturn = utcTime.monthLong + " " +
                     utcTime.day + ", " + 
                     utcTime.year + " " + 
                     utcTime.hours + ":" +
                     utcTime.minutes + ":" +
                     utcTime.seconds;
      // let myDate = DateTime.fromFormat()
      return dateToReturn;
	}

  let mintDate = "11/24 @ 10:30 AM CST";
  let timeInCST = getCSTMintDate(mintDate)
  function updateTime() {
      var cd = new Date();
      var mintDate = "November 24, 2022 01:15:00";
      let clockTime = zeroPadding(cd.getHours(), 2) + ':' + zeroPadding(cd.getMinutes(), 2) + ':' + zeroPadding(cd.getSeconds(), 2);
      let clockDate = zeroPadding(cd.getFullYear(), 4) + '-' + zeroPadding(cd.getMonth()+1, 2) + '-' + zeroPadding(cd.getDate(), 2) + ' ' + week[cd.getDay()];

      setMyTimer({
        time: clockTime,
        date: clockDate
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
                {/* <div style={{ width:200, height:200}}>
                  <CircularProgressbar value={mintInfo.totalSupply} maxValue={mintInfo.maxSupply} text={`${mintInfo.maxSupply - mintInfo.totalSupply}`} />;
                </div> */}
            </div> 
            <div>
              <div id="clock">
                  <p class="date">{ myTimer.date }</p>
                  <p class="time">{myTimer.time }</p>
                  <p class="text">Time for next mint</p>
              </div>
            </div>
          </div>
        </div>
    </div>

  );
}

export default App;
