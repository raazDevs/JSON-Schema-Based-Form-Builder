"use client"

import React, { useState, useCallback, useEffect } from 'react';
import { JSONEditor } from '../components/JSONEditor';
import { DynamicForm } from '../components/DynamicForm';
import { Moon, Sun } from 'lucide-react';

const placeholderSchema = {
  formTitle: "Enter your JSON schema",
  formDescription: "Use the editor on the left to input your form schema",
  fields: []
};

export default function Home() {
  const [schema, setSchema] = useState<any>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [formSubmissions, setFormSubmissions] = useState<any[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleSchemaChange = useCallback((value: string) => {
    try {
      if (value.trim() === '') {
        setSchema(null);
        setFormSubmissions([]); // Reset form submissions when JSON is cleared
      } else {
        const newSchema = JSON.parse(value);
        setSchema(newSchema);
      }
    } catch (error) {
      console.error('Invalid JSON:', error);
      setSchema(null);
      setFormSubmissions([]); // Reset form submissions on invalid JSON
    }
  }, []);

  const handleSubmit = async (data: any) => {
    console.log('Form submitted:', data);
    setFormSubmissions(prev => [...prev, data]);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSuccessMessage('Form submitted successfully!');
    // Reset success message after 3 seconds
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const copyFormJSON = () => {
    if (schema) {
      navigator.clipboard.writeText(JSON.stringify(schema, null, 2)).then(() => {
        setSuccessMessage('JSON copied to clipboard!');
        setTimeout(() => setSuccessMessage(null), 3000);
      });
    }
  };

  const downloadSubmissions = () => {
    const dataStr = JSON.stringify(formSubmissions, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'form_submissions.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <main className="container mx-auto p-4 relative">
      <button
        onClick={toggleDarkMode}
        className="absolute top-4 left-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700"
        aria-label="Toggle dark mode"
      >
        {isDarkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
      </button>
      <h1 className="text-3xl font-bold mb-6 mt-16">JSON Schema Form Generator</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-bold mb-4">JSON Schema Editor</h2>
          <JSONEditor
            initialValue=""
            onChange={handleSchemaChange}
            isDarkMode={isDarkMode}
          />
          <div className="mt-4 space-x-4">
            <button
              onClick={copyFormJSON}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!schema}
            >
              Copy Form JSON
            </button>
            <button
              onClick={downloadSubmissions}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={formSubmissions.length === 0}
            >
              Download Submissions
            </button>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-bold mb-4">Generated Form</h2>
          {schema ? (
            <DynamicForm schema={schema} onSubmit={handleSubmit} />
          ) : (
            <DynamicForm schema={placeholderSchema} onSubmit={() => {}} />
          )}
          {successMessage && (
            <div className="mt-4 p-2 bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-100 rounded">
              {successMessage}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

