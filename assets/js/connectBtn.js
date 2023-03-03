
import MetaMaskOnboarding from '@metamask/onboarding';


const onboarding = new MetaMaskOnboarding();
const btn = document.getElementById('connectBtn');
const statusText = document.querySelector('h3');
const statusDesc = document.querySelector('.desc');


const isMetaMaskInstalled = () => {
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
}

let connected = (accounts) => {
    statusText.innerHTML = 'Connected!'
    statusText.setAttribute('id', 'connectedId');
    statusDesc.setAttribute('id', 'status')
    statusDesc.innerHTML = accounts[0]
    btn.style.display = 'none';
   
    // player.play();
    statusDesc.classList.add('account');
}

async function connectWallet() {
    return await ethereum.request({ method: 'eth_accounts' });
}

const onClickInstallMetaMask = () => {
    onboarding.startOnboarding();

}

btn.addEventListener('click', async () => {
    btn.style.backgroundColor = '#cccccc';


    try {
        const accounts = await ethereum.request({method: 'eth_requestAccounts'})
        connected(accounts)
    } catch (error) {
        console.error(error);
    }
})

const MetaMaskClientCheck = () => {
    if (!isMetaMaskInstalled()) {
        statusText.innerText = 'You need to Install a Wallet';
        statusDesc.innerText = 'We recommend the MetaMask wallet.';
        btn.innerText = 'Install MetaMask'
        btn.onclick = onClickInstallMetaMask;
    } else {
 
        connectWallet().then((accounts) => {
            if (accounts && accounts[0] > 0) {
                connected(accounts)
            } 
        })
    }
}

MetaMaskClientCheck()