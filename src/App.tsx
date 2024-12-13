import { useCallback, useState, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState<number>(8);
  const [numAllowed, setnumAllowed] = useState<boolean>(false);
  const [charAllowed, setcharAllowed] = useState<boolean>(false);
  const [upperCaseAllowed, setUpperCaseAllowed] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

  // useRef
  const passwordRef = useRef<HTMLInputElement>(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_.+{}[]";
    if(upperCaseAllowed) str += "ABCDEFGHJKLMNOPQRSTUVWXYZ"

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numAllowed, charAllowed,upperCaseAllowed]);

  const copyPass = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed,upperCaseAllowed, passwordGenerator]);

  return (
    <div
      className="h-screen w-screen flex justify-center items-center"
      style={{
        background: "linear-gradient(to right, #3B917B 50%, #EC825B 50%)",
      }}
    >
      <div>
        <div className="flex justify-center items-center min-h-96 max-w-md mx-5 shadow-2xl rounded-lg text-center px-4 my-8 backdrop-blur">
          <div>

            <h1 className="font-semibold text-3xl text-center pt-4 text-white">
              Password Generator App
            </h1>
            <div className="flex shadow rounded-lg overflow-hidden mb-4 mt-8">
              <input
                type="text"
                value={password}
                className="outline-none w-full py-1 px-3 bg-transparent text-white"
                placeholder="Password"
                readOnly
                ref={passwordRef}
              />
              <button
                onClick={copyPass}
                className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-blue-800 transition duration-300"
              >
                Copy
              </button>
            </div>

            <div className="flex flex-col text-sm gap-y-4">
              <div className="flex items-center gap-x-1">
                <input
                  type="range"
                  min={6}
                  max={30}
                  value={length}
                  className="cursor-pointer w-full"
                  onChange={(e) => setLength(Number(e.target.value))}
                />
              </div>
                <label className="ml-2 text-lg font-semibold text-start">Length: {length}</label>
             
             {/* Number checkbox */}
              <div className="checkbox-wrapper-39 flex">
                <label>
                <input
                  type="checkbox"
                  checked={numAllowed}
                  onChange={(e) => setnumAllowed(e.target.checked)}
                />
                  <span className="checkbox"></span>
                   </label>
                  <span className="pl-4 text-lg font-semibold">Numbers</span>
              </div>


                {/* Character checkbox */}
              <div className="checkbox-wrapper-39 flex">
                <label>
                  <input
                    type="checkbox"
                    checked={charAllowed}
                    onChange={(e) => setcharAllowed(e.target.checked)}
                  />
                  <span className="checkbox"></span>
                   </label>
                  <span className="pl-4 text-lg font-semibold">Characters</span>
              </div>

              {/* UpperCase checkbox */}
              <div className="checkbox-wrapper-39 flex">
                <label>
                  <input
                    type="checkbox"
                    checked={upperCaseAllowed}
                    onChange={(e) => setUpperCaseAllowed(e.target.checked)}
                  />
                  <span className="checkbox"></span>
                   </label>
                  <span className="pl-4 text-lg font-semibold">Uppercase</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
