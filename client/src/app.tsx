import "normalize.css";
import "./app.css";
import SettingsPanel from "./components/SettingsPanel/SettingsPanel";
import { useEffect, useState } from "react";
import { Settings } from "./types/settingsInterface";
import PostsLayout from "./components/PostsLayout/PostsLayout";

function App() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const updateSettings = async () => {
    try {
      const req = await fetch(
        "https://mirror-app-frontend-demo-server.vercel.app/settings"
      );
      const data = await req.json();
      setSettings(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    updateSettings();
  }, []);

  if (!settings) return null;
  return (
    <main className="main">
      <SettingsPanel settingsForPanel={settings} update={updateSettings} />
      <PostsLayout propLayoutSettings={settings} />
    </main>
  );
}

export default App;
