import { Fragment } from 'react/jsx-runtime';
import { useState } from 'react';
import './App.css';
import { generateMnemonic } from 'bip39';
import { SolanaWallet } from './components/solanaWallet';
import { EthWallet } from './components/ethWallet';

function App() {
  const [mnemonics, setMnemonics] = useState("");
  const [userInput, setUserInput] = useState("");

  const generatedMnemonics = () => {
    const mnemonics = generateMnemonic(128);
    setMnemonics(mnemonics);
  };

  const userMnemonics = () => {
    if (userInput.trim()) {
      setMnemonics(userInput.trim());
    }
  };

  return (
    <Fragment>
      <div style={{ display: "flex", gap: "8px" }}>
        <input
          type="text"
          placeholder="Enter Mnemonics"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button onClick={userMnemonics}>Use Mnemonics</button>
        <button onClick={generatedMnemonics}>Generate Seed Phrase</button>
        <p>{mnemonics}</p>
      </div>

      {mnemonics.trim() && (
        <div>
          <SolanaWallet mnemonics={mnemonics} />
          <EthWallet mnemonics={mnemonics} />
        </div>
      )}
    </Fragment>
  );
}

export default App;
