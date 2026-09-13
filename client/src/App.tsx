import { useEffect, useState } from "react";

function App() {
  const [status, setStatus] = useState("Disconnected");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000");

    ws.onopen = () => {
      setStatus("Connected");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessage(data.message);
    };

    ws.onclose = () => {
      setStatus("Disconnected");
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <h1>Carminis</h1>
      <p>Status: {status}</p>
      <p>Server: {message}</p>
    </div>
  );
}

export default App;