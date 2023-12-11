import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter'
import { connectToServer } from './socket-client'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Websockets</h1>
    <input id="jwt" placeholder="JSON WEBTOKEN"/>
    <button id="btnConnect">Connect</button>
    <br/>
    <hr/>
    <span id="status">offline</span>

    <ul id="clients-ul">

    </ul>

    <form id="message-form">
      <input placeholder="message" id="input"/>
    </form>

    <h3>Messages</h3>
    <ul id="messages-ul">

    </ul>
  </div>
`

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
// connectToServer();

const jwtToken = document.querySelector<HTMLInputElement>('#jwt')!;
const btnConnect = document.querySelector<HTMLButtonElement>('#btnConnect')!;

btnConnect.addEventListener('click', () =>{
  if(jwtToken.value.trim().length<=0) return;
  
  
  connectToServer(jwtToken.value)
})