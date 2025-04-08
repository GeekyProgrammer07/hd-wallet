function countWords(str) {
    return str.trim().split(/\s+/).length;
}

async function generateSeedPhrase() {
    const inputElement = document.getElementById("mnemonics");
    const mnemonics = inputElement.value.trim();

    if (mnemonics === "" || countWords(mnemonics) != 12) {
        const response = await fetch("http://localhost:3000/seedphrase");
        const finalResponse = await response.text();
        document.getElementById("finalMnemonics").innerHTML = finalResponse;
    } else {
        document.getElementById("finalMnemonics").innerHTML = mnemonics;
    }
}

async function generateEthAddress() {
    try {
        // Step 1: Get the mnemonics text from the div and clean it
        const rawMnemonics = document.getElementById("finalMnemonics").textContent;
        const cleanedMnemonics = rawMnemonics
            .trim()
            .split(/\s+/)   // split by any whitespace
            .join(' ');     // join back with single space

        console.log("Sending cleaned mnemonics:", cleanedMnemonics);

        // Step 2: Send the POST request with cleaned mnemonics as a header
        const response = await fetch("http://localhost:3000/ethKeys", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "mnemonics": cleanedMnemonics
            },
            body: JSON.stringify({})
        });

        if (!response.ok) {
            throw new Error('Failed to fetch Ethereum address');
        }

        // Step 3: Get the address (plain text)
        const ethAddress = await response.text();

        // Step 4: Add the new ETH address to the table
        const tableBody = document.getElementById('walletTableBody');

        const newRow = document.createElement('tr');

        const ethAddressCell = document.createElement('td');
        ethAddressCell.textContent = ethAddress;

        const ethBalanceCell = document.createElement('td');
        ethBalanceCell.textContent = ''; // You can update this later

        const solAddressCell = document.createElement('td');
        solAddressCell.textContent = ''; // Solana side empty

        const solBalanceCell = document.createElement('td');
        solBalanceCell.textContent = '';

        newRow.appendChild(ethAddressCell);
        newRow.appendChild(ethBalanceCell);
        newRow.appendChild(solAddressCell);
        newRow.appendChild(solBalanceCell);

        tableBody.appendChild(newRow);
    } catch (error) {
        console.error('Error generating Ethereum address:', error);
    }
}





// async function generateSolAddress()(params) {
    
// }

