import React, { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const passwordInputRef = useRef(null);

  const passGenerator = useCallback(() => {
    let pass = "";
    let str = "abckdrkeojJDIEJALkkdiioorewdwes";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "~!@#$%^&*()_+~=";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);

  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    passGenerator();
  }, [passGenerator]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
    // Automatically select the password input field
    if (passwordInputRef.current) {
      passwordInputRef.current.select();
    }
  };

  return (
    <>
      <div className='bg-black h-screen w-full flex flex-col items-center justify-center'>
        <div className='rounded-lg px-4 text-white bg-gray-800 pt-4 pb-4 w-full max-w-md'>
          <h2 className='text-center mb-4'>Password Generator</h2>
          <div className='mb-4 relative'>
            <input 
              type="text"
              value={password}
              className='w-full p-2 rounded text-white bg-gray-700'
              readOnly
              placeholder='Password'
              // style={{ backgroundColor:'' }}
              ref={passwordInputRef}
              onMouseUp={(e) => e.preventDefault()} // Prevents selection on mouseup
            />
            {isCopied && (
              <div className="absolute inset-0 bg-transparent pointer-events-none" style={{ mixBlendMode: 'difference' }}></div>
            )}
          </div>
          <button 
            className='w-full p-2 bg-blue-600 rounded text-white mb-4'
            onClick={passGenerator}
          >
            Generate Password
          </button>
          <button 
            className='w-full p-2 bg-green-600 rounded text-white mb-4'
            onClick={copyToClipboard}
          >
            Copy Password
          </button>
          <div className='mb-4'>
            <label className='block mb-2'>Length: {length}</label>
            <input 
              type="range"
              min={6}
              max={22}
              value={length}
              className='w-full'
              onChange={(e) => setLength(Number(e.target.value))}
            />
          </div>
          <div className='mb-4 flex items-center'>
            <input
              type="checkbox"
              checked={numberAllowed}
              id='numberInput'
              onChange={() => setNumberAllowed((prev) => !prev)}
              className='mr-2'
            />
            <label htmlFor='numberInput'>Include Numbers</label>
          </div>
          <div className='flex items-center'>
            <input
              type="checkbox"
              checked={charAllowed}
              id='charInput'
              onChange={() => setCharAllowed((prev) => !prev)}
              className='mr-2'
            />
            <label htmlFor='charInput'>Include Special Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
