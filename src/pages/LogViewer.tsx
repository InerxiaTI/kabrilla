// src/components/LogViewer.tsx
import { useState } from 'react'
import { invoke } from '@tauri-apps/api/core';

export function LogViewer() {
  const allowedNamespaces = ['marketplace-habitat-dev']
  const [selectedNamespace, setSelectedNamespace] = useState<string | null>(null)
  const [pods, setPods] = useState<string[]>([])
  const [logs, setLogs] = useState<string>('')

  const loadPods = async (namespace: string) => {
    try {
        console.log("Find: "+namespace);
        
      const result = await invoke<string[]>('get_pods', { namespace })
      setPods(result)
    } catch (err) {
      console.error('Error fetching pods:', err)
      setPods([])
    }
  }

  const showLogs = async (namespace: string, pod: string) => {
    setLogs('Loading logs 2...')
    try {
      const logText = await invoke<string>('get_logs', { namespace, pod })
      console.log("logs: "+logText.length);
      
      setLogs(logText)
    } catch (err) {
      setLogs('Error loading logs.')
      console.error(err)
    }
  }

  return (
    <div className="flex h-full">
      <div className="w-64 p-4 border-r border-gray-300">
        <h3 className="font-bold mb-2">Namespaces</h3>
        <ul>
          {allowedNamespaces.map(ns => (
            <li key={ns}>
              <button
                className="text-blue-600 hover:underline"
                onClick={() => {
                  setSelectedNamespace(ns)
                  loadPods(ns)
                  setLogs('')
                }}
              >
                {ns}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1 p-4 overflow-auto">
        <h3 className="font-bold mb-2">Pods en: {selectedNamespace}</h3>
        <ul className="mb-4">
          {pods.map(pod => (
            <li key={pod}>
              <button
                className="text-green-600 hover:underline"
                onClick={() => showLogs(selectedNamespace!, pod)}
              >
                {pod}
              </button>
            </li>
          ))}
        </ul>
        <div className="bg-black text-green-400 p-2 rounded h-96 overflow-y-auto">
          <pre>{logs}</pre>
        </div>
      </div>
    </div>
  )
}
