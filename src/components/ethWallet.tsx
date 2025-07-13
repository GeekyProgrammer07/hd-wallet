import { mnemonicToSeedSync, validateMnemonic } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";
import { Fragment, useEffect, useState } from "react";

type Props = {
    mnemonics: string;
};

export const EthWallet = ({ mnemonics }: Props) => {
    const [ethAccCounter, setEthAccCounter] = useState(0);
    const [ethAccounts, setEthAccounts] = useState<string[]>([]);

    useEffect(() => {
        setEthAccCounter(0);
        setEthAccounts([]);
    }, [mnemonics]);

    if (!validateMnemonic(mnemonics)) {
        alert("Invalid Mnemonics");
        return null;
    }

    const seed = mnemonicToSeedSync(mnemonics);

    const handledAccount = () => {
        const path = `m/44'/60'/${ethAccCounter}'/0/0`;
        const hdNode = HDNodeWallet.fromSeed(seed);
        const child = hdNode.derivePath(path);
        const wallet = new Wallet(child.privateKey);

        const newAccount = `ETH-Account-${ethAccCounter + 1}: ${wallet.address}`;
        setEthAccounts((prev) => [...prev, newAccount]);
        setEthAccCounter((prev) => prev + 1)
    }

    const clearAccounts = () => {
        setEthAccCounter(0);
        setEthAccounts([]);
    }

    return (
        <Fragment>
            <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
                <button onClick={handledAccount}>Add Eth Accounts: {ethAccCounter}</button>
                <button onClick={clearAccounts}>Clear ETH</button>
            </div>
            <div>
                <h3>Generated Accounts:</h3>
                {ethAccounts.map((addr, index) => (
                    <p key={index}>{addr}</p>
                ))}
            </div>
        </Fragment>
    );
};
