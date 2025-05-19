import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { usePerPeerQuery } from '../contexts/RemoteQuery';

interface Props {
  peerId?: string;
}

const DQLQueryWorkbench: React.FC<Props> = ({ peerId }) => {
  const [query, setQuery] = useState('');
  const [executedQuery, setExecutedQuery] = useState('');
  const { data: queryResult, isLoading, error, refetch } = usePerPeerQuery(peerId, executedQuery);

  const executeQuery = () => {
    if (!query.trim()) return;
    setExecutedQuery(query);
    refetch();
  };

  const handleEditorChange = (value: string | undefined) => {
    setQuery(value || '');
  };

  const handleEditorKeyDown = (event: any) => {
    if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      executeQuery();
    }
  };

  return (
    <section className="bg-gray-50 rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">DQL Query Workbench</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="query" className="block text-sm font-medium text-gray-700 mb-2">
            Enter DQL Query
          </label>
          <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <Editor
              height="200px"
              defaultLanguage="sql"
              theme="vs-light"
              value={query}
              onChange={handleEditorChange}
              onMount={(editor) => {
                editor.onKeyDown(handleEditorKeyDown);
              }}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                roundedSelection: false,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                wordWrap: 'on',
                suggestOnTriggerCharacters: true,
                quickSuggestions: true,
              }}
            />
          </div>
          {peerId && (
            <p className="mt-2 text-sm text-gray-500">
              Query will be executed in context of peer: <span className="font-mono text-gray-700">{peerId}</span>
            </p>
          )}
          <p className="mt-2 text-sm text-gray-500">
            Press Ctrl+Enter or Cmd+Enter to execute the query
          </p>
        </div>
        <div>
          <button
            onClick={executeQuery}
            disabled={isLoading || !query.trim()}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white transition-colors duration-200 ${
              isLoading || !query.trim()
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Executing...
              </>
            ) : (
              'Execute Query'
            )}
          </button>
        </div>
        {error && (
          <div className="rounded-lg bg-red-50 p-4 border border-red-100">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error instanceof Error ? error.message : String(error)}</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {queryResult && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Results:</h3>
            <div className="border border-gray-300 rounded-md overflow-hidden">
              <Editor
                height="300px"
                defaultLanguage="json"
                theme="vs-light"
                value={JSON.stringify(queryResult, null, 2)}
                options={{
                  readOnly: true,
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  roundedSelection: false,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  wordWrap: 'on',
                }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DQLQueryWorkbench; 