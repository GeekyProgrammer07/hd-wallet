import { Keypair } from "@solana/web3.js";
import { mnemonicToSeedSync, validateMnemonic } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Fragment, useEffect, useState } from "react";

type Props = {
  mnemonics: string;
};

export const SolanaWallet = ({ mnemonics }: Props) => {
  const [solAccCounter, setSolAccCounter] = useState(0);
  const [solAccounts, setSolAccounts] = useState<string[]>([]);

  useEffect(() => {
    setSolAccCounter(0);
    setSolAccounts([]);
  }, [mnemonics]);

  if (!validateMnemonic(mnemonics)) {
    alert("Invalid Mnemonics");
    return null;
  }

  const seed = mnemonicToSeedSync(mnemonics);

  const handleAddAccount = () => {
    const path = `m/44'/501'/${solAccCounter}'/0'`;
    const { key } = derivePath(path, seed.toString("hex"));
    const keypair = Keypair.fromSeed(key);

    const newAccount = `SOL-Account-${solAccCounter + 1}: ${keypair.publicKey.toBase58()}`;
    setSolAccounts((prev) => [...prev, newAccount]);
    setSolAccCounter((prev) => prev + 1);
  };

  const clearAccounts = () => {
    setSolAccCounter(0);
    setSolAccounts([]);
  };

  return (
    <Fragment>
      <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
        <button onClick={handleAddAccount}>Add SOL Account: {solAccCounter}</button>
        <button onClick={clearAccounts}>Clear SOL</button>
      </div>

      <div>
        <h3>Generated Accounts:</h3>
        {solAccounts.map((addr, index) => (
          <p key={index}>{addr}</p>
        ))}
      </div>
    </Fragment>
  );
};
