import React, { useState } from "react";
import {
  FaExclamationCircle,
  FaInfoCircle,
  FaComments,
  FaMicrophone,
  FaFileAudio,
  FaLanguage,
  FaListAlt,
} from "react-icons/fa";
import "../index.css";

const AgentConversationalResponse = () => {
  const [showResponse, setShowResponse] = useState(true);
  const [showError, setShowError] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // In a real app, you would show a toast or notification here
  };

  return (
    <div className="docs-page">
      <div className="docs-page-header">
        <h1 className="docs-page-title">Generate Conversational Response</h1>
        <p className="docs-page-description">
          This endpoint accepts a text query or an audio file, retrieves
          relevant context from your knowledge base, and generates a
          sales-oriented, conversational response in Italian using advanced
          language models like Groq and OpenAI.
        </p>
      </div>

      <div className="docs-section">
        <div className="docs-endpoint">
          <div className="docs-endpoint-header">
            <span className="docs-endpoint-method post">POST</span>
            <code className="docs-endpoint-url">/api/generate-response/</code>
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
            (which are transcribed using OpenAI Whisper). The system retrieves
            relevant product information from the specified domain, and then
            generates a natural, sales-oriented response in Italian using
            advanced language models (Groq/OpenAI).
          </p>

          <div className="docs-alert docs-alert-info">
            <FaInfoCircle className="docs-alert-icon" />
            <div className="docs-alert-content">
              <div className="docs-alert-title">Multilingual Support</div>
              <p className="docs-alert-message">
                While the system is optimized for Italian responses, it can
                understand queries in other languages and translate them
                internally. However, the responses will always be generated in
                Italian to maintain consistency for your Italian-speaking
                customer base.
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
                  <td>Domain/category for retrieval (e.g., "cosmetici")</td>
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
                  <td>Customer's question/query (in Italian)</td>
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
                  <td>Audio file for speech-to-text (WAV, etc.)</td>
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
                        copyToClipboard(`curl -X POST \\
  https://api.example.com/api/generate-response/ \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "domain": "cosmetici",
    "text_query": "Ho bisogno di una crema per pelle secca"
  }'`)
                      }
                    >
                      Copy
                    </button>
                  </div>
                  <pre>
                    {`curl -X POST \\
  https://api.example.com/api/generate-response/ \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "domain": "cosmetici",
    "text_query": "Ho bisogno di una crema per pelle secca"
  }'`}
                  </pre>
                </div>

                <h4 className="docs-response-title">Audio File Example</h4>
                <div className="docs-code">
                  <div className="docs-code-header">
                    <span>Audio File Request</span>
                    <button
                      className="docs-code-copy"
                      onClick={() =>
                        copyToClipboard(`curl -X POST \\
  https://api.example.com/api/generate-response/ \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "domain=cosmetici" \\
  -F "audio_file=@/path/to/your/audio.wav"`)
                      }
                    >
                      Copy
                    </button>
                  </div>
                  <pre>
                    {`curl -X POST \\
  https://api.example.com/api/generate-response/ \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "domain=cosmetici" \\
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
                          <td>AI-generated, conversational answer (Italian)</td>
                        </tr>
                        <tr>
                          <td>metadata</td>
                          <td>
                            <code>object</code>
                          </td>
                          <td>Metadata about the interaction</td>
                        </tr>
                        <tr>
                          <td>documents</td>
                          <td>
                            <code>array</code>
                          </td>
                          <td>List of relevant product documents (parsed)</td>
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
                      <div className="docs-alert-title">400: Bad Request</div>
                      <p className="docs-alert-message">
                        Neither text_query nor audio_file provided
                      </p>
                    </div>
                  </div>

                  <div className="docs-alert docs-alert-error">
                    <FaExclamationCircle className="docs-alert-icon" />
                    <div className="docs-alert-content">
                      <div className="docs-alert-title">400: Bad Request</div>
                      <p className="docs-alert-message">
                        Audio transcription failed
                      </p>
                    </div>
                  </div>

                  <div className="docs-alert docs-alert-error">
                    <FaExclamationCircle className="docs-alert-icon" />
                    <div className="docs-alert-content">
                      <div className="docs-alert-title">500: Server Error</div>
                      <p className="docs-alert-message">
                        Unexpected server error
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
  const url = 'https://api.example.com/api/generate-response/';
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': \`Bearer \${apiKey}\`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        domain: domain,
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
  const url = 'https://api.example.com/api/generate-response/';
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': \`Bearer \${apiKey}\`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        domain: domain,
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
  const url = 'https://api.example.com/api/generate-response/';
  
  const formData = new FormData();
  formData.append('domain', domain);
  formData.append('audio_file', audioFile);
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': \`Bearer \${apiKey}\`
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
  const url = 'https://api.example.com/api/generate-response/';
  
  const formData = new FormData();
  formData.append('domain', domain);
  formData.append('audio_file', audioFile);
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': \`Bearer \${apiKey}\`
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
            <FaListAlt /> Best Practices
          </div>
          <div className="docs-card-content">
            <ul className="docs-list">
              <li>
                <strong>Domain Selection:</strong> Choose the most relevant
                domain for your query to ensure the best product recommendations
              </li>
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
