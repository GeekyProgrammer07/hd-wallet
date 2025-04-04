const express = require("express");
const bip = require("bip39");

const app = express()
app.use(express.json());

app.get("/seedphrase", (req, res) => {
    const mnemonics = bip.generateMnemonic(128);
    console.log(mnemonics);
    const seed = bip.mnemonicToSeedSync(mnemonics);
    res.send(mnemonics);
})

app.listen(3000);