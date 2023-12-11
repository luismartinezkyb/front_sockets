import { Manager, Socket } from "socket.io-client";

let socket:Socket;

export const connectToServer = (token:string) => {
  const manager = new Manager("localhost:3000/socket.io/socket.io.js",{
    extraHeaders: {
      authentication: token
    }
  });

  socket?.removeAllListeners()
  socket = manager.socket("/");
  // Esto lo que hace es remover todos los listeners que contienen el socket
  addListeners();
  // manager.socket('/')
  // manager.socket('/')
};
const addListeners = () => {
  const serverStatusLabel = document.querySelector("#status")!;
  const clientUl = document.querySelector("#clients-ul")!;
  const messagesUl = document.querySelector("#messages-ul")!;
  const form = document.querySelector<HTMLFormElement>("#message-form")!;
  const input = document.querySelector<HTMLInputElement>("#input")!;

  // TODO: clients-ul
  socket.on("connect", () => {
    serverStatusLabel.innerHTML = "Connected";
  });
  socket.on("disconnect", () => {
    serverStatusLabel.innerHTML = "Disconnected";
  });

  socket.on("clients-updated", (clients: string[]) => {
    let clientHtml = "";
    clients.map(({isActive, user}) => {
      clientHtml += `<li>${user.fullName} - ${isActive?'Online':'Offline'}</li>`;
    });
    clientUl.innerHTML = clientHtml;
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (input.value.trim().length <= 0) return alert('nothing to send');

    // console.log({ id: "YOOO", message: input.value });
    
    socket.emit('message-frrom-client', { id: "YOOO", message: input.value })

    input.value = '';
  });

  socket.on('messages-from-server', (payload:{fullName: String, message:string})=>{
    const newMessage = `
      <li>
        <strong>${payload.fullName}<strong/>
        <strong>${payload.message}<strong/>
      </li>
    `;
    const li = document.createElement('li')
    li.innerHTML = newMessage;
    messagesUl.append(li);
  })
};
