import { useEffect, useState } from "react";
import './App.css';
import { Contract, providers } from "ethers";
import  NFT  from  "./abis/3x3_ABI.json";



const NFT_CONTRACT_ADDRESS = "0x4B533b07209334e18C73776bC2d4baDcE15BBfED";

function App() {
  //TODO: 1.Connect to the contract
  // NFT contract state variable
  const [NFTContract, setNFTContract] = useState(null);
  const [totalSupply, setTotalSupply] = useState('0000');
  // Initializing NFT Contract  
  useEffect(()=>{
    function initNFTContract() {
      const provider = new providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
 
      setNFTContract(new Contract(NFT_CONTRACT_ADDRESS, NFT, signer));
    }
    initNFTContract(); 
    getTotalSupplyValue();
  }); 

  async function getTotalSupplyValue() {
    let tempTotalSupply;
    try {
      tempTotalSupply = await NFTContract.totalSupply();
    } catch (e) {
      console.log(e);
    } finally {
      if (tempTotalSupply != null){
        setTotalSupply(tempTotalSupply.toString());
      }
    }
  }

  //TODO: 2.Make a countdown

  //TODO: 3.Add wallet connection

  //TODO: 4.Mint Function 

  return (
    <div className="App" > 
        <div class='wrapper'>
          <div class='content'>
            <div>
                <h1 class="thicker"> Horoscope NFT mint</h1>
                <h1 class="thicker"> Total Supply is: {totalSupply}</h1>
            </div> 
          </div>
        </div>
    </div>

  );
}

export default App;
