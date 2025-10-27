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
                  <td>video_file</td>
                  <td>
                    <code>file</code>
                  </td>
                  <td>
                    <span className="docs-badge docs-badge-required">
                      Required
                    </span>
                  </td>
                  <td>Video file (formats allowed by system config)</td>
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
              <span>Example Request</span>
              <button
                className="docs-code-copy"
                onClick={() =>
                  copyToClipboard(`curl -X POST \\
  https://api.example.com/api/agents/process-video/ \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "video_file=@/path/to/your/video.mp4"`)
                }
              >
                Copy
              </button>
            </div>
            <pre>
              {`curl -X POST \\
  https://api.example.com/api/agents/process-video/ \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "video_file=@/path/to/your/video.mp4"`}
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
                          <td>quality_score</td>
                          <td>
                            <code>float</code>
                          </td>
                          <td>Quality score of the best frame</td>
                        </tr>
                        <tr>
                          <td>analysis</td>
                          <td>
                            <code>object</code>
                          </td>
                          <td>Output from the advanced AI model</td>
                        </tr>
                        <tr>
                          <td>video_info</td>
                          <td>
                            <code>object</code>
                          </td>
                          <td>
                            Video metadata (fps, frame count, width, height)
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h4 className="docs-response-title">video_info Object</h4>
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
                  </div>

                  <div className="docs-code">
                    <div className="docs-code-header">
                      <span>Example Response</span>
                      <button
                        className="docs-code-copy"
                        onClick={() =>
                          copyToClipboard(`{
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
}`)
                        }
                      >
                        Copy
                      </button>
                    </div>
                    <pre>
                      {`{
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
                      <div className="docs-alert-title">400: Bad Request</div>
                      <p className="docs-alert-message">
                        No video file provided, file too large, or unsupported
                        file type
                      </p>
                    </div>
                  </div>

                  <div className="docs-alert docs-alert-error">
                    <FaExclamationCircle className="docs-alert-icon" />
                    <div className="docs-alert-content">
                      <div className="docs-alert-title">400: Bad Request</div>
                      <p className="docs-alert-message">
                        Could not open or process video
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
