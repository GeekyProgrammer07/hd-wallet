const express = require("express");
const bip = require("bip39");
const ethWallet = require("ethereumjs-wallet");
const hdkey = ethWallet.hdkey;
const solWallet = require("@solana/web3.js");
const elip = require("ed25519-hd-key")

var ethAccCounter = 0;
var solAccCounter = 0;

const app = express()
app.use(express.json());

app.get("/seedphrase", (req, res) => {
    const mnemonics = bip.generateMnemonic(128);
    res.send(mnemonics);
})

app.post("/ethKeys", (req, res) => {
    const seed = bip.mnemonicToSeedSync(req.body.mnemonics); //Buffer
    const hdwallet = hdkey.fromMasterSeed(seed); //An HD wallet root node, which contains: 128-bit chain code 256-bit private key
    const path = `m/44'/60'/${ethAccCounter}'/0/0`; // Ethereum derivation path
    const hdWalletNode = hdwallet.derivePath(path);
    const account = hdWalletNode.getWallet().getAddressString();
    ethAccCounter++; 
    res.json({
        publicKey: account
    })   
})

app.post("/solKeys", (req, res) => {
    const seed = bip.mnemonicToSeedSync(req.body.mnemonics); //Buffer
    const privRootKey = elip.derivePath(`m/44'/501'/${solAccCounter}'/0'`, seed.toString("hex"));
    solAccCounter++;
    const keypair = solWallet.Keypair.fromSeed(new Uint8Array(privRootKey.key)); //publicKey
    res.send(keypair.publicKey.toBase58());
})

app.listen(3000);