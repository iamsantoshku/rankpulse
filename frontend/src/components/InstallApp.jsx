import { useEffect, useState } from "react";

const InstallApp = () => {
  const [prompt, setPrompt] = useState(null);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setPrompt(e);
    });
  }, []);

  const handleInstall = () => {
    if (!prompt) return;

    prompt.prompt();
    prompt.userChoice.then(() => setPrompt(null));
  };

  if (!prompt) return null;

  return (
    <button
      onClick={handleInstall}
      className="fixed bottom-5 right-5 bg-blue-600 text-white px-5 py-3 rounded-full shadow-lg"
    >
      📲 Install App
    </button>
  );
};

export default InstallApp;