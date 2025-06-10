"use client";

import { useEffect, useState } from "react";

export default function AgentPage() {
  const [config, setConfig] = useState<any>({});
  const [provider, setProvider] = useState("");
  const [model, setModel] = useState("");
  const [language, setLanguage] = useState("");

  useEffect(() => {
    fetch("/stt.json")
      .then((res) => res.json())
      .then(setConfig);
  }, []);

  const providerOptions = Object.keys(config);
  const modelOptions = provider ? Object.keys(config[provider]?.models || {}) : [];
  const languageOptions = model
    ? Object.keys(config[provider]?.models[model]?.languages || {})
    : [];

  const selectedModelValue = provider && model
    ? config[provider].models[model].value
    : "";
  const selectedLanguageValue = provider && model && language
    ? config[provider].models[model].languages[language]
    : "";

  return (
    <div className="space-y-6 max-w-lg">
      <h2 className="text-2xl font-bold">Agent Configuration</h2>

      {/* Dropdowns */}
      <div className="space-y-4">
        <div>
          <label className="block mb-1">Provider</label>
          <select
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            value={provider}
            onChange={(e) => {
              setProvider(e.target.value);
              setModel("");
              setLanguage("");
            }}
          >
            <option value="">Select Provider</option>
            {providerOptions.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Model</label>
          <select
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            value={model}
            onChange={(e) => {
              setModel(e.target.value);
              setLanguage("");
            }}
            disabled={!provider}
          >
            <option value="">Select Model</option>
            {modelOptions.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Language</label>
          <select
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            disabled={!model}
          >
            <option value="">Select Language</option>
            {languageOptions.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Summary Card */}
      {provider && model && language && (
        <div className="mt-6 border p-4 rounded bg-indigo-50 dark:bg-gray-800">
          <h3 className="text-lg font-semibold mb-2">Summary</h3>
          <p><strong>Provider:</strong> {provider} (<code>{provider.toLowerCase()}</code>)</p>
          <p><strong>Model:</strong> {model} (<code>{selectedModelValue}</code>)</p>
          <p><strong>Language:</strong> {language} (<code>{selectedLanguageValue}</code>)</p>
        </div>
      )}
    </div>
  );
}
