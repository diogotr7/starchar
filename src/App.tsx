import { useCallback } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { compress, decompress } from "@cloudpss/zstd/wasm";

function App() {
  const onClick = useCallback(() => {
    const data = "Hello World!";
    const binaryData = new TextEncoder().encode(data);
    const compressed = compress(binaryData);
    //log as hex string
    console.log(
      `compressed: ${compressed.reduce(
        (acc, val) => acc + val.toString(16).padStart(2, "0"),
        ""
      )}`
    );
    const decompressed = decompress(compressed);
    const text = new TextDecoder().decode(decompressed);

    console.log(`decompressed: ${text}`);
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={onClick}>Click me!</button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
