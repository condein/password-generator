import "bootstrap/dist/css/bootstrap.min.css";
// import { useState } from "react";
import { useCallback, useState, useEffect, useRef } from "react";

const App = () => {
  let [length, setLength] = useState(8);
  let [Password, setPassword] = useState("");
  let [numberAllowed, setNumberAllowed] = useState(false);
  let [charAllowed, setCharAllowed] = useState(false);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "qwertyuiopQWERTYUIASDFGHJKLMNBVCXZ";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "@#$&";

    for (let i = 1; i <= length; i++) {
      let chr = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(chr);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);
  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator, numberAllowed, charAllowed, length]);

  // ref

  const val = useRef();
  const handleOnClick = useCallback(() => {
    val.current?.select();
    window.navigator.clipboard.writeText(Password);
  }, [Password]);

  return (
    <>
      <div className="outer">
        <div className="inner">
          <h1 className="h1">Password Generator App</h1>
          <div className="input">
            <div className="input-group mb-3  custom-input">
              <input
                type="text"
                readOnly
                ref={val}
                value={Password}
                className="form-control sys"
                aria-label="Example text with button addon"
                aria-describedby="button-addon1"
              />
              <button
                onClick={handleOnClick}
                className="btn btn-warning"
                type="button"
                id="button-addon1"
              >
                Copy
              </button>
            </div>
          </div>
          <div className="range">
            <div className="container text-center">
              <div className="row">
                <div className="col-7">
                  <input
                    onChange={(e) => setLength(e.target.value)}
                    type="range"
                    min={0}
                    max={100}
                    id="rang"
                  />
                </div>
                <div className="col-5">
                  <h3>Length : {length}</h3>
                </div>
              </div>
            </div>
          </div>
          {/* //////////////////// checkbox////////////// */}
          <div className="container text-center one">
            <div className="row">
              <div className="col-6">
                <div className="input-group mb-3  custom-checkbox">
                  <div className="input-group-text cus-checkbox cus">
                    <input
                      className="form-check-input mt-0"
                      type="checkbox"
                      defaultChecked={numberAllowed}
                      onChange={() => {
                        setNumberAllowed((prev) => !prev);
                      }}
                      value={numberAllowed}
                      id="num"
                      aria-label="Checkbox for following text input"
                    />
                    <h4>
                      <label className="oneSon" htmlFor="num">
                        Number
                      </label>
                    </h4>
                  </div>
                </div>
              </div>

              <div className="col-6">
                <div className="input-group mb-3 custom-checkbox">
                  <div className="input-group-text cus cus-checkbox">
                    <input
                      className="form-check-input mt-0"
                      type="checkbox"
                      value={charAllowed}
                      defaultChecked={charAllowed}
                      onChange={() => {
                        setCharAllowed((prev) => !prev);
                      }}
                      id="char"
                      aria-label="Checkbox for following text input"
                    />
                    <h4>
                      <label className="oneSon" htmlFor="char">
                        Character
                      </label>
                    </h4>

                    {/* <h4>Character</h4> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default App;
