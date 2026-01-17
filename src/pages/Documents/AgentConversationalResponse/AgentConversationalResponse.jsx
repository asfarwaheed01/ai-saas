import React, { useEffect, useState } from "react";
import {
  FaExclamationCircle,
  FaInfoCircle,
  FaComments,
  FaMicrophone,
  FaFileAudio,
  FaLanguage,
  FaListAlt,
  FaKey,
} from "react-icons/fa";
import "../index.css";
import { backendURL } from "../../../config/constants";

const AgentConversationalResponse = () => {
  const [showResponse, setShowResponse] = useState(true);
  const [showError, setShowError] = useState(false);
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // In a real app, you would show a toast or notification here
  };

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${backendURL}/agents/supported-languages/`);
        // "https://saas.todopharma.com/api/agents/supported-languages/"
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
        const data = await res.json();

        // Expected format: { details: [{ code: "eng", name: "English" }, ...] }
        if (Array.isArray(data.details)) {
          setLanguages(data.details);
        } else {
          setLanguages([]);
        }
      } catch (err) {
        console.error("Error fetching languages:", err);
        setError("Failed to load supported languages.");
      } finally {
        setLoading(false);
      }
    };

    fetchLanguages();
  }, []);

  return (
    <div className="docs-page">
      <div className="docs-page-header">
        <h1 className="docs-page-title">Generate Conversational Response</h1>
        <p className="docs-page-description">
          This endpoint accepts a text query or an audio file, language,
          retrieves relevant context from your knowledge base, and generates a
          sales-oriented, conversational response in Italian using advanced
          language models like Groq and OpenAI.
        </p>
      </div>

      <div className="docs-section">
        <div className="docs-endpoint">
          <div className="docs-endpoint-header">
            <span className="docs-endpoint-method post">POST</span>
            <code className="docs-endpoint-url">
              /api/agents/generate-response/
            </code>
          </div>

          <div className="docs-endpoint-meta">
            <span className="docs-endpoint-auth">
              <FaInfoCircle /> Authentication Required
            </span>
          </div>

          <h3 className="docs-subsection-title">Description</h3>
          <p className="docs-endpoint-description">
            This endpoint provides AI-generated conversational responses to
            customer inquiries. It can accept either text input or audio files
            with language parameter. The system retrieves relevant product
            information from the specified domain, and then generates a natural,
            sales-oriented response in Italian using advanced language models.
          </p>

          <div className="docs-alert docs-alert-info">
            <FaInfoCircle className="docs-alert-icon" />
            <div className="docs-alert-content">
              <div className="docs-alert-title">Multilingual Support</div>
              <p className="docs-alert-message">
                While the system is optimized for{" "}
                <span className="supported-lang">
                  {loading ? (
                    <span>Loading...</span>
                  ) : error ? (
                    <span className="error-text">{error}</span>
                  ) : languages.length > 0 ? (
                    languages.map((lang, index) => (
                      <span key={lang.code}>
                        {lang.name}
                        {index < languages.length - 1 && ", "}
                      </span>
                    ))
                  ) : (
                    <span>
                      English, Italian, French, Spanish, German, Portuguese,
                      Arabic, Chinese (Simplified), Polish
                    </span>
                  )}
                </span>
                responses, it can understand queries in other languages and
                translate them internally. However, the responses will always be
                generated in the detected or preferred language to maintain
                consistency for your multilingual customer base.
              </p>

              <p>
                <strong className="supported-color">Domains Allowed:</strong>{" "}
                Therapy, Beauty, Consultation, Medical
              </p>
            </div>
          </div>

          <h3 className="docs-subsection-title">Request</h3>
          <p>
            This endpoint accepts both JSON data and multipart form data (when
            uploading audio files).
          </p>

          <div className="docs-table">
            <h4 className="docs-response-title">Input Parameters</h4>
            <table>
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Type</th>
                  <th>Required</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>domain</td>
                  <td>
                    <code>string</code>
                  </td>
                  <td>
                    <span className="docs-badge docs-badge-required">
                      Required
                    </span>
                  </td>
                  <td>included therapy, beauty, consultation and medical</td>
                </tr>
                <tr>
                  <td>lang</td>
                  <td>
                    <code>string</code>
                  </td>
                  <td>
                    <span className="docs-badge docs-badge-optional">
                      Optional*
                    </span>
                  </td>
                  <td>
                    {loading ? (
                      <span>Loading...</span>
                    ) : error ? (
                      <span className="error-text">{error}</span>
                    ) : languages.length > 0 ? (
                      languages.map((lang, index) => (
                        <span key={lang.code}>
                          {lang.name}
                          {index < languages.length - 1 && ", "}
                        </span>
                      ))
                    ) : (
                      <span>
                        English, Italian, French, Spanish, German, Portuguese,
                        Arabic, Chinese (Simplified), Polish
                      </span>
                    )}{" "}
                    (Default English)
                  </td>
                </tr>
                <tr>
                  <td>text_query</td>
                  <td>
                    <code>string</code>
                  </td>
                  <td>
                    <span className="docs-badge docs-badge-optional">
                      Optional*
                    </span>
                  </td>
                  <td>Text query from user</td>
                </tr>
                <tr>
                  <td>audio_file</td>
                  <td>
                    <code>file</code>
                  </td>
                  <td>
                    <span className="docs-badge docs-badge-optional">
                      Optional*
                    </span>
                  </td>
                  <td>Audio file containing user query</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="docs-alert docs-alert-warning">
            <FaExclamationCircle className="docs-alert-icon" />
            <div className="docs-alert-content">
              <div className="docs-alert-title">Required Input</div>
              <p className="docs-alert-message">
                At least one of <code>text_query</code> or{" "}
                <code>audio_file</code> is required. If both are provided,{" "}
                <code>text_query</code> takes precedence.
              </p>
            </div>
          </div>

          <div className="docs-tabs">
            <div className="docs-tabs-header">
              <button className="docs-tab-button active">
                Example Requests
              </button>
            </div>

            <div className="docs-tabs-content">
              <div className="docs-tab-pane active">
                <h4 className="docs-response-title">Text Query Example</h4>
                <div className="docs-code">
                  <div className="docs-code-header">
                    <span>Text Query Request</span>
                    <button
                      className="docs-code-copy"
                      onClick={() =>
                        //                       copyToClipboard(`curl -X POST \\
                        // https://api.example.com/api/agents/generate-response/ \\
                        // -H "Authorization: Bearer YOUR_API_KEY" \\
                        // -H "Content-Type: application/json" \\
                        // -d '{
                        //   "domain": "cosmetici",
                        //   "text_query": "Ho bisogno di una crema per pelle secca"
                        // }'`)
                        copyToClipboard(`curl -X POST https://saas.todoai.com/api/agents/generate-response/ 
  -H "X-API-Key: pk_abc123def456" 
  -H "X-Signature: $SIGNATURE" 
  -F "domain=beauty" 
  -F "lang=eng" 
  -F "text_query=What beauty treatments do you offer?"`)
                      }
                    >
                      Copy
                    </button>
                  </div>
                  <pre>
                    {/* {`curl -X POST \\
  https://api.example.com/api/agents/generate-response/ \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "domain": "cosmetici",
    "text_query": "Ho bisogno di una crema per pelle secca"
  }'`} */}
                    {`curl -X POST https://saas.todoai.com/api/agents/generate-response/ 
  -H "X-API-Key: pk_abc123def456" 
  -H "X-Signature: $SIGNATURE" 
  -F "domain=beauty" 
  -F "lang=eng" 
  -F "text_query=What beauty treatments do you offer?"`}
                  </pre>
                </div>

                <h4 className="docs-response-title">Audio File Example</h4>
                <div className="docs-code">
                  <div className="docs-code-header">
                    <span>Audio File Request</span>
                    <button
                      className="docs-code-copy"
                      onClick={() =>
                        copyToClipboard(`curl -X POST 
  https://api.example.com/api/agents/generate-response/ 
  -H "Authorization: Bearer YOUR_API_KEY" 
  -H "X-Signature: $SIGNATURE" 
  -F "domain=cosmetici" 
  -F "lang=eng"
  -F "audio_file=@/path/to/your/audio.wav"`)
                      }
                    >
                      Copy
                    </button>
                  </div>
                  <pre>
                    {`curl -X POST 
  https://api.example.com/api/agents/generate-response/ 
  -H "Authorization: Bearer YOUR_API_KEY"
  -H "X-Signature: $SIGNATURE"  
  -F "domain=cosmetici" 
  -F "lang=eng"
  -F "audio_file=@/path/to/your/audio.wav"`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <h3 className="docs-subsection-title">Response</h3>

          <div className="docs-tabs">
            <div className="docs-tabs-header">
              <button
                className={`docs-tab-button ${showResponse ? "active" : ""}`}
                onClick={() => {
                  setShowResponse(true);
                  setShowError(false);
                }}
              >
                Success Response
              </button>
              <button
                className={`docs-tab-button ${showError ? "active" : ""}`}
                onClick={() => {
                  setShowResponse(false);
                  setShowError(true);
                }}
              >
                Error Response
              </button>
            </div>

            <div className="docs-tabs-content">
              {showResponse && (
                <div className="docs-tab-pane active">
                  <h4 className="docs-response-title">Response Fields</h4>
                  <div className="docs-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Field</th>
                          <th>Type</th>
                          <th>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>response</td>
                          <td>
                            <code>string</code>
                          </td>
                          <td>AI-generated response text</td>
                        </tr>
                        <tr>
                          <td>metadata.query</td>
                          <td>
                            <code>string</code>
                          </td>
                          <td>Original user query</td>
                        </tr>
                        <tr>
                          <td>metadata.documents_used</td>
                          <td>
                            <code>integer</code>
                          </td>
                          <td>Number of knowledge base documents referenced</td>
                        </tr>
                        <tr>
                          <td>metadata.context_length</td>
                          <td>
                            <code>integer</code>
                          </td>
                          <td>Total context length used</td>
                        </tr>
                        <tr>
                          <td>metadata.domain</td>
                          <td>
                            <code>string</code>
                          </td>
                          <td>Domain identifier</td>
                        </tr>
                        <tr>
                          <td>metadata.user_id</td>
                          <td>
                            <code>integer</code>
                          </td>
                          <td>User ID</td>
                        </tr>
                        <tr>
                          <td>metadata.interaction_timestamp</td>
                          <td>
                            <code>string</code>
                          </td>
                          <td>ISO 8601 timestamp</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h4 className="docs-response-title">metadata Object</h4>
                  <div className="docs-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Field</th>
                          <th>Type</th>
                          <th>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>query</td>
                          <td>
                            <code>string</code>
                          </td>
                          <td>Final query used</td>
                        </tr>
                        <tr>
                          <td>lang</td>
                          <td>
                            <code>string</code>
                          </td>
                          <td>Languages are eng, it and fr</td>
                        </tr>
                        <tr>
                          <td>documents_used</td>
                          <td>
                            <code>int</code>
                          </td>
                          <td>Number of docs retrieved</td>
                        </tr>
                        <tr>
                          <td>domain</td>
                          <td>
                            <code>string</code>
                          </td>
                          <td>Domain/category</td>
                        </tr>
                        <tr>
                          <td>user_id</td>
                          <td>
                            <code>int</code>
                          </td>
                          <td>User ID</td>
                        </tr>
                        <tr>
                          <td>interaction_timestamp</td>
                          <td>
                            <code>string</code>
                          </td>
                          <td>ISO timestamp</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h4 className="docs-response-title">documents Array</h4>
                  <p>
                    Each item in the documents array contains parsed product
                    information. The structure can vary depending on the
                    product, but typically includes fields such as name,
                    specifications, and other product-specific details.
                  </p>

                  <div className="docs-code">
                    <div className="docs-code-header">
                      <span>Example Response</span>
                      <button
                        className="docs-code-copy"
                        onClick={() =>
                          copyToClipboard(`{
  "response": "Certo! Il nostro prodotto è ideale per le tue esigenze...",
  "metadata": {
    "query": "Ho bisogno di una crema per pelle secca",
    "documents_used": 2,
    "domain": "cosmetici",
    "user_id": 123,
    "interaction_timestamp": "2025-05-01T15:00:00.000Z"
  },
  "documents": [
    {
      "Nome": "Crema Idratante",
      "Specifiche": {
        "ingredienti": ["acido ialuronico", "vitamina E"],
        "formato": "50ml"
      }
    }
  ]
}`)
                        }
                      >
                        Copy
                      </button>
                    </div>
                    <pre>
                      {`{
  "response": "Certo! Il nostro prodotto è ideale per le tue esigenze...",
  "metadata": {
    "query": "Ho bisogno di una crema per pelle secca",
    "documents_used": 2,
    "domain": "cosmetici",
    "user_id": 123,
    "interaction_timestamp": "2025-05-01T15:00:00.000Z"
  },
  "documents": [
    {
      "Nome": "Crema Idratante",
      "Specifiche": {
        "ingredienti": ["acido ialuronico", "vitamina E"],
        "formato": "50ml"
      }
    }
  ]
}`}
                    </pre>
                  </div>
                </div>
              )}

              {showError && (
                <div className="docs-tab-pane active">
                  <h4 className="docs-response-title">Error Responses</h4>

                  <div className="docs-alert docs-alert-error">
                    <FaExclamationCircle className="docs-alert-icon" />
                    <div className="docs-alert-content">
                      <div className="docs-alert-title">
                        400: Invalid language parameter
                      </div>
                      <p className="docs-alert-message">
                        Language must be eng, it and fr
                      </p>
                    </div>
                  </div>

                  <div className="docs-alert docs-alert-error">
                    <FaExclamationCircle className="docs-alert-icon" />
                    <div className="docs-alert-content">
                      <div className="docs-alert-title">400: Missing Input</div>
                      <p className="docs-alert-message">
                        Must provide either text query or audio_file
                      </p>
                    </div>
                  </div>

                  <div className="docs-alert docs-alert-error">
                    <FaExclamationCircle className="docs-alert-icon" />
                    <div className="docs-alert-content">
                      <div className="docs-alert-title">
                        400: Both Input provided
                      </div>
                      <p className="docs-alert-message">
                        Cannot provide both text_query and audio_file
                      </p>
                    </div>
                  </div>

                  <div className="docs-alert docs-alert-error">
                    <FaExclamationCircle className="docs-alert-icon" />
                    <div className="docs-alert-content">
                      <div className="docs-alert-title">
                        400: unable to transcript audio
                      </div>
                      <p className="docs-alert-message">
                        Audio file could not be processed
                      </p>
                    </div>
                  </div>

                  <div className="docs-alert docs-alert-error">
                    <FaExclamationCircle className="docs-alert-icon" />
                    <div className="docs-alert-content">
                      <div className="docs-alert-title">
                        401: Authentication Failed
                      </div>
                      <p className="docs-alert-message">
                        Invalid API key or signature
                      </p>
                    </div>
                  </div>

                  <div className="docs-alert docs-alert-error">
                    <FaExclamationCircle className="docs-alert-icon" />
                    <div className="docs-alert-content">
                      <div className="docs-alert-title">
                        500: Internal server error
                      </div>
                      <p className="docs-alert-message">
                        Server Side processing error
                      </p>
                    </div>
                  </div>

                  <div className="docs-code">
                    <div className="docs-code-header">
                      <span>Error Response Example</span>
                      <button
                        className="docs-code-copy"
                        onClick={() =>
                          copyToClipboard(`{
  "error": "Bad Request",
  "message": "Either text_query or audio_file must be provided",
  "status": 400
}`)
                        }
                      >
                        Copy
                      </button>
                    </div>
                    <pre>
                      {`{
  "error": "Bad Request",
  "message": "Either text_query or audio_file must be provided",
  "status": 400
}`}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="docs-section">
        <h2 className="docs-section-title">
          <FaComments /> Implementation Examples
        </h2>

        <div className="docs-card">
          <div className="docs-card-title">
            <FaLanguage /> Text Query Example
          </div>
          <div className="docs-card-content">
            <p>
              Here's an example of how to send a text query and display the
              response using JavaScript:
            </p>

            <div className="docs-code">
              <div className="docs-code-header">
                <span>JavaScript Text Query Example</span>
                <button
                  className="docs-code-copy"
                  onClick={() =>
                    copyToClipboard(`// Function to send a text query and process the response
async function generateResponse(domain, textQuery) {
  const apiKey = 'YOUR_API_KEY';
  const url = 'https://api.example.com/api/agents/generate-response/';
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': \`Bearer \${apiKey}\`,
         -H "X-Signature: $SIGNATURE" 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        domain: domain,
        lang: language,
        text_query: textQuery
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to generate response');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error generating response:', error);
    throw error;
  }
}

// Example usage
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', async () => {
  const query = userInput.value.trim();
  if (!query) return;
  
  // Add user message to chat
  chatBox.innerHTML += \`<div class="user-message">\${query}</div>\`;
  userInput.value = '';
  
  // Show loading indicator
  chatBox.innerHTML += \`<div class="ai-message loading">Generando risposta...</div>\`;
  
  try {
    const result = await generateResponse('cosmetici', query);
    
    // Replace loading message with actual response
    const loadingMsg = chatBox.querySelector('.loading');
    loadingMsg.classList.remove('loading');
    loadingMsg.innerHTML = result.response;
    
    // Optionally display product information
    if (result.documents && result.documents.length > 0) {
      let productInfo = '<div class="product-info"><h4>Prodotti suggeriti:</h4><ul>';
      
      result.documents.forEach(doc => {
        productInfo += \`<li>\${doc.Nome}</li>\`;
      });
      
      productInfo += '</ul></div>';
      chatBox.innerHTML += productInfo;
    }
  } catch (error) {
    // Replace loading with error message
    const loadingMsg = chatBox.querySelector('.loading');
    loadingMsg.classList.remove('loading');
    loadingMsg.classList.add('error');
    loadingMsg.innerHTML = \`Errore: \${error.message}\`;
  }
});`)
                  }
                >
                  Copy
                </button>
              </div>
              <pre>
                {`// Function to send a text query and process the response
async function generateResponse(domain, textQuery) {
  const apiKey = 'YOUR_API_KEY';
  const url = 'https://api.example.com/api/agents/generate-response/';
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': \`Bearer \${apiKey}\`,
        -H "X-Signature: $SIGNATURE"
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        domain: domain,
        lang: language,
        text_query: textQuery
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to generate response');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error generating response:', error);
    throw error;
  }
}

// Example usage
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', async () => {
  const query = userInput.value.trim();
  if (!query) return;
  
  // Add user message to chat
  chatBox.innerHTML += \`<div class="user-message">\${query}</div>\`;
  userInput.value = '';
  
  // Show loading indicator
  chatBox.innerHTML += \`<div class="ai-message loading">Generando risposta...</div>\`;
  
  try {
    const result = await generateResponse('cosmetici', query);
    
    // Replace loading message with actual response
    const loadingMsg = chatBox.querySelector('.loading');
    loadingMsg.classList.remove('loading');
    loadingMsg.innerHTML = result.response;
    
    // Optionally display product information
    if (result.documents && result.documents.length > 0) {
      let productInfo = '<div class="product-info"><h4>Prodotti suggeriti:</h4><ul>';
      
      result.documents.forEach(doc => {
        productInfo += \`<li>\${doc.Nome}</li>\`;
      });
      
      productInfo += '</ul></div>';
      chatBox.innerHTML += productInfo;
    }
  } catch (error) {
    // Replace loading with error message
    const loadingMsg = chatBox.querySelector('.loading');
    loadingMsg.classList.remove('loading');
    loadingMsg.classList.add('error');
    loadingMsg.innerHTML = \`Errore: \${error.message}\`;
  }
});`}
              </pre>
            </div>
          </div>
        </div>

        <div className="docs-card">
          <div className="docs-card-title">
            <FaFileAudio /> Audio File Example
          </div>
          <div className="docs-card-content">
            <p>
              Here's an example of how to upload an audio file and process the
              response:
            </p>

            <div className="docs-code">
              <div className="docs-code-header">
                <span>JavaScript Audio Upload Example</span>
                <button
                  className="docs-code-copy"
                  onClick={() =>
                    copyToClipboard(`// Function to upload audio and get response
async function uploadAudioAndGetResponse(domain, audioFile) {
  const apiKey = 'YOUR_API_KEY';
  const url = 'https://api.example.com/api/agents/generate-response/';
  
  const formData = new FormData();
  formData.append('domain', domain);
  formData.append('lang', lang);
  formData.append('audio_file', audioFile);
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': \`Bearer \${apiKey}\`
        -H "X-Signature: $SIGNATURE" 
        // Note: Do not set Content-Type header for FormData
      },
      body: formData
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to process audio');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error processing audio:', error);
    throw error;
  }
}

// Example implementation with audio recording
const recordButton = document.getElementById('record-button');
const stopButton = document.getElementById('stop-button');
const chatBox = document.getElementById('chat-box');
let mediaRecorder;
let audioChunks = [];

// Set up audio recording
recordButton.addEventListener('click', async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    
    mediaRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data);
    };
    
    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
      audioChunks = [];
      
      // Show loading indicator
      chatBox.innerHTML += \`<div class="ai-message loading">Elaborazione audio...</div>\`;
      
      try {
        const result = await uploadAudioAndGetResponse('cosmetici', audioBlob);
        
        // Display transcribed query and response
        const loadingMsg = chatBox.querySelector('.loading');
        loadingMsg.classList.remove('loading');
        loadingMsg.innerHTML = \`
          <div class="transcription"><em>Trascrizione: "\${result.metadata.query}"</em></div>
          <div class="response">\${result.response}</div>
        \`;
      } catch (error) {
        const loadingMsg = chatBox.querySelector('.loading');
        loadingMsg.classList.remove('loading');
        loadingMsg.classList.add('error');
        loadingMsg.innerHTML = \`Errore: \${error.message}\`;
      }
    };
    
    // Start recording
    mediaRecorder.start();
    recordButton.disabled = true;
    stopButton.disabled = false;
  } catch (error) {
    console.error('Error starting recording:', error);
    alert('Could not access microphone. Please check permissions.');
  }
});

stopButton.addEventListener('click', () => {
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop();
    recordButton.disabled = false;
    stopButton.disabled = true;
  }
});`)
                  }
                >
                  Copy
                </button>
              </div>
              <pre>
                {`// Function to upload audio and get response
async function uploadAudioAndGetResponse(domain, audioFile) {
  const apiKey = 'YOUR_API_KEY';
  const url = 'https://api.example.com/api/agents/generate-response/';
  
  const formData = new FormData();
  formData.append('domain', domain);
  formData.append('audio_file', audioFile);
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': \`Bearer \${apiKey}\`
        -H "X-Signature: $SIGNATURE" 
        // Note: Do not set Content-Type header for FormData
      },
      body: formData
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to process audio');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error processing audio:', error);
    throw error;
  }
}

// Example implementation with audio recording
const recordButton = document.getElementById('record-button');
const stopButton = document.getElementById('stop-button');
const chatBox = document.getElementById('chat-box');
let mediaRecorder;
let audioChunks = [];

// Set up audio recording
recordButton.addEventListener('click', async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    
    mediaRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data);
    };
    
    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
      audioChunks = [];
      
      // Show loading indicator
      chatBox.innerHTML += \`<div class="ai-message loading">Elaborazione audio...</div>\`;
      
      try {
        const result = await uploadAudioAndGetResponse('cosmetici', audioBlob);
        
        // Display transcribed query and response
        const loadingMsg = chatBox.querySelector('.loading');
        loadingMsg.classList.remove('loading');
        loadingMsg.innerHTML = \`
          <div class="transcription"><em>Trascrizione: "\${result.metadata.query}"</em></div>
          <div class="response">\${result.response}</div>
        \`;
      } catch (error) {
        const loadingMsg = chatBox.querySelector('.loading');
        loadingMsg.classList.remove('loading');
        loadingMsg.classList.add('error');
        loadingMsg.innerHTML = \`Errore: \${error.message}\`;
      }
    };
    
    // Start recording
    mediaRecorder.start();
    recordButton.disabled = true;
    stopButton.disabled = false;
  } catch (error) {
    console.error('Error starting recording:', error);
    alert('Could not access microphone. Please check permissions.');
  }
});

stopButton.addEventListener('click', () => {
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop();
    recordButton.disabled = false;
    stopButton.disabled = true;
  }
});`}
              </pre>
            </div>
          </div>
        </div>

        <div className="docs-card">
          <div className="docs-card-title">
            <FaKey /> Generate Signature Example
          </div>
          <div className="docs-card-content">
            <p>Here's an example of how to make signature key:</p>

            <div className="docs-code">
              <div className="docs-code-header">
                <span>JavaScript Signature Creation Example</span>
                <button
                  className="docs-code-copy"
                  onClick={() =>
                    copyToClipboard(`import crypto from "crypto";
import fetch from "node-fetch"; // install via npm install node-fetch

// 🔐 Your API credentials
const API_KEY = "YOUR_API_KEY";
const SECRET_KEY = "YOUR_SECRET_KEY";

// 🧠 The API endpoint
const API_URL = "https://api.aicustomerservice.io/v1/chat";

// 📨 The request payload
const body = {
  question: "Where is my order?",
  language: "it", // Italian
};

// 🔑 1. Convert body to JSON
const bodyString = JSON.stringify(body);

// 🔒 2. Create HMAC-SHA256 signature
const signature = crypto
  .createHmac("sha256", SECRET_KEY)
  .update(bodyString)
  .digest("hex");

// 🌐 3. Send POST request with both Authorization and Signature headers
async function sendRequest() {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: Bearer <API_KEY>,
        Signature: signature,
        "Content-Type": "application/json",
      },
      body: bodyString,
    });

    const data = await response.json();
    console.log("✅ AI Response:", data.response);
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

sendRequest();
`)
                  }
                >
                  Copy
                </button>
              </div>
              <pre>
                {`import crypto from "crypto";
import fetch from "node-fetch"; // install via npm install node-fetch

// 🔐 Your API credentials
const API_KEY = "YOUR_API_KEY";
const SECRET_KEY = "YOUR_SECRET_KEY";

// 🧠 The API endpoint
const API_URL = "https://api.aicustomerservice.io/v1/chat";

// 📨 The request payload
const body = {
  question: "Where is my order?",
  language: "it", // Italian
};

// 🔑 1. Convert body to JSON
const bodyString = JSON.stringify(body);

// 🔒 2. Create HMAC-SHA256 signature
const signature = crypto
  .createHmac("sha256", SECRET_KEY)
  .update(bodyString)
  .digest("hex");

// 🌐 3. Send POST request with both Authorization and Signature headers
async function sendRequest() {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: Bearer <API_KEY>,
        Signature: signature,
        "Content-Type": "application/json",
      },
      body: bodyString,
    });

    const data = await response.json();
    console.log("✅ AI Response:", data.response);
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

sendRequest();`}
              </pre>
            </div>
          </div>
        </div>

        <div className="docs-card">
          <div className="docs-card-title">
            <FaListAlt /> Best Practices
          </div>
          <div className="docs-card-content">
            <ul className="docs-list">
              <li>
                <strong>Query Clarity:</strong> For text queries, be as specific
                as possible to get the most relevant responses
              </li>
              <li>
                <strong>Audio Quality:</strong> For audio files, ensure clear
                recording with minimal background noise for best transcription
                results
              </li>
              <li>
                <strong>Error Handling:</strong> Implement robust error handling
                for both client-side validation and API response errors
              </li>
              <li>
                <strong>Response Caching:</strong> Consider caching common
                queries to improve performance for frequently asked questions
              </li>
              <li>
                <strong>User Interface:</strong> Display both the AI response
                and suggested products in a user-friendly manner
              </li>
            </ul>
          </div>
        </div>

        <div className="docs-alert docs-alert-info">
          <FaMicrophone className="docs-alert-icon" />
          <div className="docs-alert-content">
            <div className="docs-alert-title">Audio File Support</div>
            <p className="docs-alert-message">
              The API supports most common audio formats, but WAV files
              typically provide the best transcription results. For optimal
              performance, ensure audio files are clear, have minimal background
              noise, and do not exceed a few minutes in length.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentConversationalResponse;
