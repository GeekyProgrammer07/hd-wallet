const express = require("express");
const bip = require("bip39");
const ethWallet = require("ethereumjs-wallet");
const hdkey = ethWallet.hdkey;
const solWallet = require("@solana/web3.js");
const elip = require("ed25519-hd-key")
const derivePath = elip.derivePath;

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

// app.post("/solKeys", (req, res) => {
//     const seed = Buffer.from(req.body.seed, 'hex');
//     const path = `m/44'/501'/${solAccCounter}'/0'`;
//     const derivedSeed = solWallet.derivePath(path, seed.toString('hex')).key; //from ed25519-hd-key

//     // 3. Generate Keypair
//     const keypair = Keypair.fromSeed(derivedSeed); // 32-byte seed

//     4. Display address and private key
//     console.log("Public Key:", keypair.publicKey.toBase58());
//     console.log("Private Key:", Buffer.from(keypair.secretKey).toString('hex'));
//     res.send("Hello");
// })


app.listen(3000);