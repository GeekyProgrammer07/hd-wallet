const express = require("express");
const bip = require("bip39");
const ethWallet = require("ethereumjs-wallet");
const hdkey = ethWallet.hdkey;

var ethAccCounter = 0;

const app = express()
app.use(express.json());

app.get("/seedphrase", (req, res) => {
    const mnemonics = bip.generateMnemonic(128);
    console.log(mnemonics);
    const seed = bip.mnemonicToSeedSync(mnemonics);
    res.send(mnemonics);
})

app.post("/ethKeys", (req, res) => {
    const seed = Buffer.from(req.body.seed, 'hex');
    const hdwallet = hdkey.fromMasterSeed(seed); //An HD wallet root node, which contains: 128-bit chain code 256-bit private key
    const path = `m/44'/60'/${ethAccCounter}'/0/0`; // Ethereum derivation path
    const hdWalletNode = hdwallet.derivePath(path);
    const account = hdWalletNode.getWallet().getAddressString();
    ethAccCounter++; 
    res.json({
        publicKey: account
    })   
})

app.listen(3000);