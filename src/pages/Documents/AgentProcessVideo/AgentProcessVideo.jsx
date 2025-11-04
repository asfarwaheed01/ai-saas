import React, { useState } from "react";
import {
  FaVideo,
  FaExclamationCircle,
  FaInfoCircle,
  FaImage,
  FaRobot,
  FaCog,
} from "react-icons/fa";
import "../index.css";

const AgentProcessVideo = () => {
  const [showResponse, setShowResponse] = useState(true);
  const [showError, setShowError] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // In a real app, you would show a toast or notification here
  };

  return (
    <div className="docs-page">
      <div className="docs-page-header">
        <h1 className="docs-page-title">Process Video</h1>
        <p className="docs-page-description">
          Analyze video content for face detection, skin analysis, and generate
          personalized recommendations.
        </p>
      </div>

      <div className="docs-section">
        <div className="docs-endpoint">
          <div className="docs-endpoint-header">
            <span className="docs-endpoint-method post">POST</span>
            <code className="docs-endpoint-url">
              /api/agents/process-video/
            </code>
          </div>

          <div className="docs-endpoint-meta">
            <span className="docs-endpoint-auth">
              <FaInfoCircle /> Authentication Required
            </span>
          </div>

          <h3 className="docs-subsection-title">Description</h3>
          <p className="docs-endpoint-description">
            This endpoint allows you to upload a video file for analysis. The
            API processes the video to extract the highest quality frame,
            analyzes it using an AI-based visual analysis engine, and returns
            both a quality score for the selected frame and an AI-powered
            analysis of its content.
          </p>

          <div className="docs-alert docs-alert-info">
            <FaInfoCircle className="docs-alert-icon" />
            <div className="docs-alert-content">
              <div className="docs-alert-title">
                AI-based Visual Analysis Engine
              </div>
              <p className="docs-alert-message">
                This endpoint leverages advanced AI models to analyze the
                extracted frame, providing insights that can be used for content
                categorization, object detection, and scene understanding.
              </p>
            </div>
          </div>

          <h3 className="docs-subsection-title">Request</h3>
          <p>
            This endpoint accepts <code>multipart/form-data</code> content type
            for file uploads.
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
                  <td> Your organization's domain identifier </td>
                </tr>
                <tr>
                  <td>lang</td>
                  <td>
                    <code>string</code>
                  </td>
                  <td>
                    <span className="docs-badge">Not Required</span>
                  </td>
                  <td>Language code (eng, it, fr). Default: eng</td>
                </tr>
                <tr>
                  <td>video_file</td>
                  <td>
                    <code>file</code>
                  </td>
                  <td>
                    <span className="docs-badge docs-badge-required">
                      Required
                    </span>
                  </td>
                  <td>Video file for analysis (webm, mp4, etc.)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h4 className="docs-response-title">Validation Rules</h4>
          <ul className="docs-list">
            <li>
              File must not exceed the configured maximum upload size of 50 MB
            </li>
            <li>
              File type must be one of the allowed video types: 'video/webm',
              'video/mp4', 'video/quicktime'
            </li>
          </ul>

          <div className="docs-code">
            <div className="docs-code-header">
              <span>Example Requests</span>
              <button
                className="docs-code-copy"
                //               onClick={() =>
                //                 copyToClipboard(`curl -X POST \\
                // https://api.example.com/api/agents/process-video/ \\
                // -H "Authorization: Bearer YOUR_API_KEY" \\
                // -F "video_file=@/path/to/your/video.mp4"`)
                //               }
                onClick={() =>
                  copyToClipboard(`curl -X POST https://saas.todopharma.com/api/agents/process-video/ 
  -H "X-API-Key: pk_abc123def456" 
  -H "X-Signature: $SIGNATURE" 
  -F "domain=beauty" 
  -F "lang=eng" 
  -F "video_file=@/path/to/video.webm"`)
                }
              >
                Copy
              </button>
            </div>
            <pre>
              {/* {`curl -X POST \\
  https://api.example.com/api/agents/process-video/ \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "video_file=@/path/to/your/video.mp4"`} */}
              {`curl -X POST https://saas.todopharma.com/api/agents/process-video/ 
  -H "X-API-Key: pk_abc123def456" 
  -H "X-Signature: $SIGNATURE" 
  -F "domain=beauty" 
  -F "lang=eng" 
  -F "video_file=@/path/to/video.webm"`}
            </pre>
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
                          <td>analysis.status</td>
                          <td>
                            <code>string</code>
                          </td>
                          <td>Processing status (success/failure)</td>
                        </tr>
                        <tr>
                          <td>analysis.analysis</td>
                          <td>
                            <code>string</code>
                          </td>
                          <td>AI-generated analysis of face/skin</td>
                        </tr>
                        <tr>
                          <td>analysis.skin_analysis</td>
                          <td>
                            <code>string</code>
                          </td>
                          <td>Detailed skin analysis results</td>
                        </tr>
                        <tr>
                          <td>analysis.rag_query</td>
                          <td>
                            <code>string</code>
                          </td>
                          <td>Context from knowledge base</td>
                        </tr>
                        <tr>
                          <td>analysis.timestamp</td>
                          <td>
                            <code>string</code>
                          </td>
                          <td>ISO 8601 timestamp</td>
                        </tr>
                        <tr>
                          <td>video_info.fps</td>
                          <td>
                            <code>float</code>
                          </td>
                          <td>Frames per second</td>
                        </tr>
                        <tr>
                          <td>video_info.frame_count</td>
                          <td>
                            <code>integer</code>
                          </td>
                          <td>Total frames in video</td>
                        </tr>
                        <tr>
                          <td>video_info.width</td>
                          <td>
                            <code>integer</code>
                          </td>
                          <td>Video width in pixels</td>
                        </tr>
                        <tr>
                          <td>video_info.height</td>
                          <td>
                            <code>integer</code>
                          </td>
                          <td>Video height in pixels</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* <h4 className="docs-response-title">video_info Object</h4>
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
                          <td>fps</td>
                          <td>
                            <code>float</code>
                          </td>
                          <td>Frames per second</td>
                        </tr>
                        <tr>
                          <td>frame_count</td>
                          <td>
                            <code>int</code>
                          </td>
                          <td>Total number of frames</td>
                        </tr>
                        <tr>
                          <td>width</td>
                          <td>
                            <code>int</code>
                          </td>
                          <td>Frame width (pixels)</td>
                        </tr>
                        <tr>
                          <td>height</td>
                          <td>
                            <code>int</code>
                          </td>
                          <td>Frame height (pixels)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div> */}

                  <div className="docs-code">
                    <div className="docs-code-header">
                      <span>Example Response</span>
                      <button
                        className="docs-code-copy"
                        onClick={() =>
                          //                           copyToClipboard(`{
                          //   "quality_score": 123.45,
                          //   "analysis": {
                          //     "skin_analysis": "...",
                          //     "rag_query": "..."
                          //   },
                          //   "video_info": {
                          //     "fps": 30.0,
                          //     "frame_count": 450,
                          //     "width": 1920,
                          //     "height": 1080
                          //   }
                          // }`)
                          copyToClipboard(`{
  "analysis": {
    "status": "success",
    "analysis": "Based on the video analysis, your skin appears to be combination type with slight dryness in the T-zone. We recommend using a gentle moisturizer and staying hydrated.",
    "skin_analysis": "Detailed skin analysis results including texture, tone, and specific concerns identified.",
    "rag_query": "Additional context retrieved from knowledge base",
    "timestamp": "2024-10-24T10:35:00Z"
  },
  "video_info": {
    "fps": 30.0,
    "frame_count": 450,
    "width": 1280,
    "height": 720
  },
  "domain": "beauty",
  "user_id": 123
}`)
                        }
                      >
                        Copy
                      </button>
                    </div>
                    <pre>
                      {/* {`{
  "quality_score": 123.45,
  "analysis": {
    "skin_analysis": "...",
    "rag_query": "..."
  },
  "video_info": {
    "fps": 30.0,
    "frame_count": 450,
    "width": 1920,
    "height": 1080
  }
}`} */}
                      {`{
  "analysis": {
    "status": "success",
    "analysis": "Based on the video analysis, your skin appears to be combination type with slight dryness in the T-zone. We recommend using a gentle moisturizer and staying hydrated.",
    "skin_analysis": "Detailed skin analysis results including texture, tone, and specific concerns identified.",
    "rag_query": "Additional context retrieved from knowledge base",
    "timestamp": "2024-10-24T10:35:00Z"
  },
  "video_info": {
    "fps": 30.0,
    "frame_count": 450,
    "width": 1280,
    "height": 720
  },
  "domain": "beauty",
  "user_id": 123
}`}
                    </pre>
                  </div>

                  <div className="docs-alert docs-alert-info">
                    <FaInfoCircle className="docs-alert-icon" />
                    <div className="docs-alert-content">
                      <div className="docs-alert-title">Analysis Content</div>
                      <p className="docs-alert-message">
                        The content of the <code>analysis</code> object will
                        vary depending on the specific AI-based visual analysis
                        engine used and the content of the video frame. It
                        typically includes descriptive text about what was
                        detected in the frame.
                      </p>
                    </div>
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
                        400: Domain is required
                      </div>
                      <p className="docs-alert-message">
                        Missing domain parameter
                      </p>
                    </div>
                  </div>

                  <div className="docs-alert docs-alert-error">
                    <FaExclamationCircle className="docs-alert-icon" />
                    <div className="docs-alert-content">
                      <div className="docs-alert-title">
                        400: Invalid Language Parameter
                      </div>
                      <p className="docs-alert-message">
                        Language must be eng, it or fr
                      </p>
                    </div>
                  </div>

                  <div className="docs-alert docs-alert-error">
                    <FaExclamationCircle className="docs-alert-icon" />
                    <div className="docs-alert-content">
                      <div className="docs-alert-title">
                        400: Invalid Video file
                      </div>
                      <p className="docs-alert-message">
                        Video format not supported or corrupted
                      </p>
                    </div>
                  </div>

                  <div className="docs-alert docs-alert-error">
                    <FaExclamationCircle className="docs-alert-icon" />
                    <div className="docs-alert-content">
                      <div className="docs-alert-title">
                        400: Couldnot open Video File
                      </div>
                      <p className="docs-alert-message">
                        Video cannot be processed
                      </p>
                    </div>
                  </div>
                  <div className="docs-alert docs-alert-error">
                    <FaExclamationCircle className="docs-alert-icon" />
                    <div className="docs-alert-content">
                      <div className="docs-alert-title">
                        401: Authentication failed
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
                        Server-side processing error
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
  "message": "File type not supported. Allowed types: video/webm, video/mp4, video/quicktime",
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
  "message": "File type not supported. Allowed types: video/webm, video/mp4, video/quicktime",
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
          <FaVideo /> Implementation Examples
        </h2>

        <div className="docs-card">
          <div className="docs-card-title">
            <FaRobot /> JavaScript Example
          </div>
          <div className="docs-card-content">
            <p>
              Here's an example of how to upload and process a video using
              JavaScript:
            </p>

            <div className="docs-code">
              <div className="docs-code-header">
                <span>JavaScript Upload Example</span>
                <button
                  className="docs-code-copy"
                  onClick={() =>
                    copyToClipboard(`// Assuming you have a file input element with id="videoFileInput"
const videoFileInput = document.getElementById('videoFileInput');
const apiKey = 'YOUR_API_KEY';

// Create a FormData object to hold the file data
const formData = new FormData();
formData.append('video_file', videoFileInput.files[0]);

// Display a loading indicator
const resultDiv = document.getElementById('result');
resultDiv.innerHTML = 'Processing video, please wait...';

// Make the API request
fetch('https://api.example.com/api/agents/process-video/', {
  method: 'POST',
  headers: {
    'Authorization': \`Bearer \${apiKey}\`
    // Note: Do not set Content-Type header for FormData
  },
  body: formData
})
.then(response => {
  if (!response.ok) {
    return response.json().then(err => {
      throw new Error(err.message || 'Failed to process video');
    });
  }
  return response.json();
})
.then(data => {
  console.log('Success:', data);
  
  // Display the results
  resultDiv.innerHTML = \`
    <h3>Video Processing Results</h3>
    <p>Quality Score: \${data.quality_score}</p>
    <p>Video Dimensions: \${data.video_info.width}x\${data.video_info.height}</p>
    <p>Frame Rate: \${data.video_info.fps} fps</p>
    <p>Total Frames: \${data.video_info.frame_count}</p>
    <h4>Analysis Results:</h4>
    <pre>\${JSON.stringify(data.analysis, null, 2)}</pre>
  \`;
})
.catch(error => {
  console.error('Error:', error);
  resultDiv.innerHTML = \`<p class="error">Error: \${error.message}</p>\`;
});`)
                  }
                >
                  Copy
                </button>
              </div>
              <pre>
                {`// Assuming you have a file input element with id="videoFileInput"
const videoFileInput = document.getElementById('videoFileInput');
const apiKey = 'YOUR_API_KEY';

// Create a FormData object to hold the file data
const formData = new FormData();
formData.append('video_file', videoFileInput.files[0]);

// Display a loading indicator
const resultDiv = document.getElementById('result');
resultDiv.innerHTML = 'Processing video, please wait...';

// Make the API request
fetch('https://api.example.com/api/agents/process-video/', {
  method: 'POST',
  headers: {
    'Authorization': \`Bearer \${apiKey}\`
    // Note: Do not set Content-Type header for FormData
  },
  body: formData
})
.then(response => {
  if (!response.ok) {
    return response.json().then(err => {
      throw new Error(err.message || 'Failed to process video');
    });
  }
  return response.json();
})
.then(data => {
  console.log('Success:', data);
  
  // Display the results
  resultDiv.innerHTML = \`
    <h3>Video Processing Results</h3>
    <p>Quality Score: \${data.quality_score}</p>
    <p>Video Dimensions: \${data.video_info.width}x\${data.video_info.height}</p>
    <p>Frame Rate: \${data.video_info.fps} fps</p>
    <p>Total Frames: \${data.video_info.frame_count}</p>
    <h4>Analysis Results:</h4>
    <pre>\${JSON.stringify(data.analysis, null, 2)}</pre>
  \`;
})
.catch(error => {
  console.error('Error:', error);
  resultDiv.innerHTML = \`<p class="error">Error: \${error.message}</p>\`;
});`}
              </pre>
            </div>
          </div>
        </div>

        <div className="docs-card">
          <div className="docs-card-title">
            <FaCog /> Best Practices
          </div>
          <div className="docs-card-content">
            <ul className="docs-list">
              <li>
                <strong>File Size:</strong> While the API supports files up to
                50 MB, smaller files will upload and process faster
              </li>
              <li>
                <strong>Video Quality:</strong> Higher quality videos generally
                result in better frame extraction and analysis
              </li>
              <li>
                <strong>Error Handling:</strong> Implement robust error handling
                for both client-side validation and API response errors
              </li>
              <li>
                <strong>Content Types:</strong> The API works best with videos
                that have clear, well-lit frames and minimal motion blur
              </li>
              <li>
                <strong>Processing Time:</strong> Be aware that processing time
                increases with video file size and complexity
              </li>
            </ul>
          </div>
        </div>

        <div className="docs-card">
          <div className="docs-card-title">
            <FaImage /> Understanding Quality Score
          </div>
          <div className="docs-card-content">
            <p>
              The <code>quality_score</code> in the response is a numeric value
              that represents the assessed quality of the best frame extracted
              from the video. Higher scores generally indicate:
            </p>
            <ul className="docs-list">
              <li>Better resolution and clarity</li>
              <li>Lower compression artifacts</li>
              <li>Better lighting conditions</li>
              <li>Less motion blur</li>
              <li>Better focus</li>
            </ul>
            <p>
              This score can be used to compare different frames or videos, or
              to establish a baseline for acceptable quality in your
              application.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentProcessVideo;
