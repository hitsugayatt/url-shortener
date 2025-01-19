import { useState, useEffect } from "react";
import axios from "axios";
const TypewriterText = () => {
  const [text, setText] = useState("");
  const fullText = "SHORT LINKS, BIG IMPACT.";
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      const timer = setTimeout(() => {
        setText((prev) => prev + fullText[index]);
        setIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [index]);

  return (
    <div className="text-cyan-400 font-mono text-lg md:text-xl mb-8 animate-pulse">
      {text}
      <span className="inline-block w-2 h-5 ml-1 bg-cyan-400 animate-blink"></span>
    </div>
  );
};

const ParticleBackground = () => {
  return (
    <div className="absolute inset-0">
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="particle absolute w-1 h-1 bg-white rounded-full opacity-50"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${2 + Math.random() * 4}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`
          }}
        />
      ))}
    </div>
  );
};

function App() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState('');
  const handleSubmit = () => {
    axios.post('http://localhost:3000/api/short', {originalUrl})
    .then((res)=>{
      setShortUrl(res.data.url.shortUrl);
      console.log("API response", res.data.url.shortUrl)
    })
    .catch((error)=>console.log(error))
    console.log(originalUrl);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      <style>
        {`
          @keyframes float {
            0% {
              transform: translateY(0) translateX(0);
              opacity: 0;
            }
            50% {
              opacity: 0.5;
            }
            100% {
              transform: translateY(-100vh) translateX(20px);
              opacity: 0;
            }
          }
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
          .particle {
            pointer-events: none;
          }
          .animate-blink {
            animation: blink 1s step-end infinite;
          }
        `}
      </style>
      
      <ParticleBackground />

      <div className="w-full max-w-md p-8 rounded-lg bg-gray-900/80 backdrop-blur-sm border border-cyan-500 shadow-lg shadow-cyan-500/50 relative z-10">
        <div className="text-center">
          <TypewriterText />
        </div>

        <h1 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
          URL_SHORTENER.exe
        </h1>
        
        <div className="space-y-4">
          <div className="relative ">
            <input
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              type="text"
              placeholder="Enter URL to encrypt..."
              className="w-full px-4 py-3 bg-gray-800/90 text-gray-100 rounded border border-gray-700 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-300 outline-none placeholder-gray-500"
            />
          </div>

          <button
            onClick={handleSubmit}
            type="button"
            className="w-full px-6 py-3 bg-black text-cyan-400 rounded font-semibold border border-cyan-500 hover:bg-cyan-500 hover:text-black transition-all duration-300 shadow-lg hover:shadow-cyan-500/50"
          >
            DECRYPT && SHORTEN
          </button>
        </div>
        {
          shortUrl && (
            <div className="mt-6 text-white text-sm text-center">
              <p>Shortened URL: </p>
              <a
              rel="noopener noreferrer"
              className="text-blue-500 mt-2"
              target="_blank" 
              href={`http://localhost:3000/${shortUrl}`}>{shortUrl}</a>
            </div>
          )
        } 

        <div className="mt-6 text-gray-400 text-sm text-center">
          <p>System status: <span className="text-green-500">ONLINE</span></p>
          <p className="mt-1">Encryption protocol: <span className="text-purple-500">ACTIVE</span></p>
        </div>
      </div>
    </div>
  );
}

export default App;