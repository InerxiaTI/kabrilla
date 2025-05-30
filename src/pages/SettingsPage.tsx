import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import PageContainer from "../ui/components/PageContainer";

function SettingsPage() {
  const [awsInput, setAwsInput] = useState("");
  const [statusMsg, setStatusMsg] = useState("");

  function extractCredentials(text: string) {
    const accessKey = /AWS_ACCESS_KEY_ID\s*=\s*["']?([\w\d]+)/.exec(text)?.[1] ?? "";
    const secretKey = /AWS_SECRET_ACCESS_KEY\s*=\s*["']?([\w\d/+=]+)/.exec(text)?.[1] ?? "";
    const sessionToken = /AWS_SESSION_TOKEN\s*=\s*["']?([\w\d/+=]+)/.exec(text)?.[1] ?? "";

    if (!accessKey || !secretKey || !sessionToken) {
      throw new Error("No se pudieron extraer todas las credenciales.");
    }

    return { accessKey, secretKey, sessionToken };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const { accessKey, secretKey, sessionToken } = extractCredentials(awsInput);
      console.log("ak: "+accessKey);
      console.log("ak: "+secretKey);
      console.log("ak: "+sessionToken);

      
      await invoke("save_aws_credentials", {
        accessKey,
        secretKey,
        sessionToken,
      });
      setStatusMsg("Credenciales guardadas con éxito.");
    } catch (err: any) {
      setStatusMsg("Error: " + err.message);
    }
  }

  return (
    <PageContainer>
      <h1>Settings</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="awsCreds">Pega aquí tus credenciales de AWS:</label>
        <textarea
          id="awsCreds"
          style={{ 
            width: "100%", 
            height: "200px", 
            marginTop: "10px", 
            resize: "none"
          }}
          placeholder={`$Env:AWS_ACCESS_KEY_ID="..." \n$Env:AWS_SECRET_ACCESS_KEY="..." \n$Env:AWS_SESSION_TOKEN="..."`}
          onChange={(e) => setAwsInput(e.currentTarget.value)}
        ></textarea>
        <button type="submit">Guardar credenciales</button>
      </form>
      <p style={{ color: "white" }}>{statusMsg}</p>
    </PageContainer>
  );
}

export default SettingsPage;
