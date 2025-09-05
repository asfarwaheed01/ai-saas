// import React, { useState, useRef, useEffect } from "react";
// import StreamingAvatar, {
//   AvatarQuality,
//   StreamingEvents,
//   TaskType,
// } from "@heygen/streaming-avatar";
// import "./AvatarsPage.css";
// import { AVATAR_IDS } from "../../config/constants";

// const Avatars = () => {
//   const [isSessionActive, setIsSessionActive] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [userInput, setUserInput] = useState("");
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [connectionStatus, setConnectionStatus] = useState("disconnected");
//   const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_IDS[0].id);
//   const [streamReady, setStreamReady] = useState(false);

//   const videoRef = useRef(null);
//   const avatarRef = useRef(null);
//   const sessionDataRef = useRef(null);
//   const streamRef = useRef(null);

//   let apiKey = process.env.REACT_APP_HEYGEN_API_KEY;

//   // Helper function to fetch access token
//   const fetchAccessToken = async () => {
//     try {
//       if (!apiKey) {
//         throw new Error(
//           "HeyGen API key not found. Please set REACT_APP_HEYGEN_API_KEY in your environment variables."
//         );
//       }

//       const response = await fetch(
//         "https://api.heygen.com/v1/streaming.create_token",
//         {
//           method: "POST",
//           headers: {
//             "x-api-key": apiKey,
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`Failed to fetch token: ${response.statusText}`);
//       }

//       const { data } = await response.json();
//       return data.token;
//     } catch (error) {
//       console.error("Error fetching access token:", error);
//       throw error;
//     }
//   };

//   // Apply stream to video when both are ready
//   useEffect(() => {
//     if (streamRef.current && videoRef.current && isSessionActive) {
//       console.log("🎬 Applying stream to video element");
//       videoRef.current.srcObject = streamRef.current;
//       videoRef.current.onloadedmetadata = () => {
//         console.log("📺 Video metadata loaded, starting playback");
//         videoRef.current.play().catch((error) => {
//           console.error("❌ Video play error:", error);
//         });
//       };
//       setConnectionStatus("connected");
//       setStreamReady(true);
//     }
//   }, [streamRef.current, isSessionActive]);

//   // Handle when avatar stream is ready
//   const handleStreamReady = (event) => {
//     console.log("🎥 Stream ready event received");
//     console.log("Stream detail:", event.detail);

//     if (event.detail) {
//       console.log("✅ Storing stream reference");
//       streamRef.current = event.detail;
//     } else {
//       console.error("❌ No stream in event.detail");
//       setConnectionStatus("error");
//     }
//   };

//   // Handle stream disconnection
//   const handleStreamDisconnected = () => {
//     console.log("🔌 Stream disconnected");
//     if (videoRef.current) {
//       videoRef.current.srcObject = null;
//     }
//     streamRef.current = null;
//     setIsSessionActive(false);
//     setStreamReady(false);
//     setConnectionStatus("disconnected");
//   };

//   // Initialize streaming avatar session
//   const initializeAvatarSession = async () => {
//     try {
//       setIsLoading(true);
//       setConnectionStatus("connecting");
//       setStreamReady(false);

//       console.log("🚀 Starting avatar session...");

//       const token = await fetchAccessToken();
//       console.log("🎫 Token received");

//       avatarRef.current = new StreamingAvatar({ token });
//       console.log("🤖 Avatar instance created");

//       // Set up event listeners
//       avatarRef.current.on(StreamingEvents.STREAM_READY, handleStreamReady);
//       avatarRef.current.on(
//         StreamingEvents.STREAM_DISCONNECTED,
//         handleStreamDisconnected
//       );

//       console.log("📡 Event listeners set up");

//       // Create avatar session
//       sessionDataRef.current = await avatarRef.current.createStartAvatar({
//         quality: AvatarQuality.High,
//         avatarName: selectedAvatar,
//       });

//       console.log("✅ Avatar session created:", sessionDataRef.current);
//       setIsSessionActive(true);
//     } catch (error) {
//       console.error("❌ Error initializing avatar session:", error);
//       setConnectionStatus("error");
//       alert(`Failed to start avatar session: ${error.message}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // End the avatar session
//   const terminateAvatarSession = async () => {
//     try {
//       setIsLoading(true);

//       if (avatarRef.current && sessionDataRef.current) {
//         await avatarRef.current.stopAvatar();
//       }

//       if (videoRef.current) {
//         videoRef.current.srcObject = null;
//       }

//       avatarRef.current = null;
//       sessionDataRef.current = null;
//       streamRef.current = null;
//       setIsSessionActive(false);
//       setStreamReady(false);
//       setConnectionStatus("disconnected");
//     } catch (error) {
//       console.error("Error terminating avatar session:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Handle speaking event
//   const handleSpeak = async () => {
//     if (!avatarRef.current || !userInput.trim()) return;

//     try {
//       setIsSpeaking(true);

//       await avatarRef.current.speak({
//         text: userInput.trim(),
//       });

//       setUserInput(""); // Clear input after speaking
//     } catch (error) {
//       console.error("Error making avatar speak:", error);
//       alert(`Failed to make avatar speak: ${error.message}`);
//     } finally {
//       setIsSpeaking(false);
//     }
//   };

//   // Handle Enter key press in input
//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSpeak();
//     }
//   };

//   // Cleanup on component unmount
//   useEffect(() => {
//     return () => {
//       if (avatarRef.current && sessionDataRef.current) {
//         terminateAvatarSession();
//       }
//     };
//   }, []);

//   const getStatusColor = () => {
//     switch (connectionStatus) {
//       case "connected":
//         return "#10b981";
//       case "connecting":
//         return "#f59e0b";
//       case "error":
//         return "#ef4444";
//       default:
//         return "#6b7280";
//     }
//   };

//   const getStatusText = () => {
//     switch (connectionStatus) {
//       case "connected":
//         return "Connected";
//       case "connecting":
//         return "Connecting...";
//       case "error":
//         return "Connection Error";
//       default:
//         return "Disconnected";
//     }
//   };

//   const getSelectedAvatarName = () => {
//     const avatar = AVATAR_IDS.find((a) => a.id === selectedAvatar);
//     return avatar ? avatar.name : "Unknown Avatar";
//   };

//   if (!isSessionActive) {
//     // Initial form view
//     return (
//       <div className="avatars-page">
//         <div className="container-medium">
//           <div className="start-form-container">
//             <div className="start-form">
//               <div className="form-header">
//                 <h1 className="form-title">Interactive AI Avatar</h1>
//                 <p className="form-subtitle">
//                   Choose an avatar and start your conversation
//                 </p>
//                 <div className="status-indicator">
//                   <div
//                     className="status-dot"
//                     style={{ backgroundColor: getStatusColor() }}
//                   />
//                   <span className="status-text">{getStatusText()}</span>
//                 </div>
//               </div>

//               <div className="form-content">
//                 <div className="input-group">
//                   <label htmlFor="avatar-select" className="input-label">
//                     Select Avatar
//                   </label>
//                   <select
//                     id="avatar-select"
//                     value={selectedAvatar}
//                     onChange={(e) => setSelectedAvatar(e.target.value)}
//                     className="avatar-select"
//                     disabled={isLoading}
//                   >
//                     {AVATAR_IDS.map((avatar) => (
//                       <option key={avatar.id} value={avatar.id}>
//                         {avatar.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <button
//                   onClick={initializeAvatarSession}
//                   disabled={isLoading}
//                   className={`start-session-btn ${isLoading ? "loading" : ""}`}
//                 >
//                   {isLoading ? (
//                     <>
//                       <span className="loading-spinner"></span>
//                       Starting Session...
//                     </>
//                   ) : (
//                     <>
//                       <span className="start-icon">🚀</span>
//                       Start Avatar Session
//                     </>
//                   )}
//                 </button>
//               </div>

//               <div className="form-footer">
//                 <div className="feature-list">
//                   <div className="feature-item">
//                     <span className="feature-icon">🎯</span>
//                     <span>High Quality Streaming</span>
//                   </div>
//                   <div className="feature-item">
//                     <span className="feature-icon">💬</span>
//                     <span>Real-time Conversation</span>
//                   </div>
//                   <div className="feature-item">
//                     <span className="feature-icon">🎨</span>
//                     <span>Multiple Avatar Options</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Active session view with fullscreen video
//   return (
//     <div className="avatars-page active-session">
//       <div className="fullscreen-video-container">
//         <video
//           ref={videoRef}
//           className="fullscreen-avatar-video"
//           autoPlay
//           playsInline
//           muted={false}
//         />

//         {!streamReady && (
//           <div className="loading-overlay">
//             <div className="loading-content">
//               <span className="loading-spinner large"></span>
//               <h3>Connecting to Avatar...</h3>
//               <p>Please wait while we establish the connection</p>
//             </div>
//           </div>
//         )}

//         <div className="session-info">
//           <div className="avatar-info">
//             <span className="avatar-name">{getSelectedAvatarName()}</span>
//             <div className="status-indicator">
//               <div
//                 className="status-dot"
//                 style={{ backgroundColor: getStatusColor() }}
//               />
//               <span className="status-text">{getStatusText()}</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="bottom-controls">
//         <div className="container-medium">
//           <div className="chat-section">
//             <div className="input-container">
//               <textarea
//                 value={userInput}
//                 onChange={(e) => setUserInput(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 placeholder="Type what you want the avatar to say..."
//                 className="fullscreen-chat-input"
//                 disabled={!streamReady}
//                 rows={2}
//               />
//               <button
//                 onClick={handleSpeak}
//                 disabled={!streamReady || !userInput.trim() || isSpeaking}
//                 className={`fullscreen-speak-btn ${
//                   !streamReady || !userInput.trim() ? "disabled" : ""
//                 }`}
//               >
//                 {isSpeaking ? (
//                   <>
//                     <span className="loading-spinner"></span>
//                     Speaking...
//                   </>
//                 ) : (
//                   <>
//                     <span className="speak-icon">🎤</span>
//                     Speak
//                   </>
//                 )}
//               </button>
//             </div>

//             <button
//               onClick={terminateAvatarSession}
//               disabled={isLoading}
//               className="end-session-btn"
//             >
//               {isLoading ? "Ending..." : "End Session"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Avatars;

import React, { useState, useRef, useEffect } from "react";
import StreamingAvatar, {
  AvatarQuality,
  StreamingEvents,
  TaskType,
} from "@heygen/streaming-avatar";
import "./AvatarsPage.css";
import { AVATAR_IDS, backendURL } from "../../config/constants";
import AuthModal from "../../components/HomePage/AuthModal/AuthModal";

const Avatars = () => {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_IDS[0].id);
  const [streamReady, setStreamReady] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");

  const videoRef = useRef(null);
  const avatarRef = useRef(null);
  const sessionDataRef = useRef(null);
  const streamRef = useRef(null);
  const formRef = useRef(null);

  let apiKey = process.env.REACT_APP_HEYGEN_API_KEY;
  console.log(apiKey, "API KEY");

  // Check authentication status on component mount
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsAuthenticated(true);
      setUserToken(token);
    }
  }, []);

  // Handle authentication success
  const handleAuthSuccess = (token) => {
    setIsAuthenticated(true);
    setUserToken(token);
    setShowAuthModal(false);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setIsAuthenticated(false);
    setUserToken(null);

    // If session is active, terminate it
    if (isSessionActive) {
      terminateAvatarSession();
    }
  };

  // Helper function to fetch access token
  const fetchAccessToken = async () => {
    try {
      if (!apiKey) {
        throw new Error(
          "HeyGen API key not found. Please set REACT_APP_HEYGEN_API_KEY in your environment variables."
        );
      }

      const response = await fetch(
        "https://api.heygen.com/v1/streaming.create_token",
        {
          method: "POST",
          headers: {
            "x-api-key": apiKey,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch token: ${response.statusText}`);
      }

      const { data } = await response.json();
      return data.token;
    } catch (error) {
      console.error("Error fetching access token:", error);
      throw error;
    }
  };

  // Apply stream to video when both are ready
  useEffect(() => {
    if (streamRef.current && videoRef.current && isSessionActive) {
      console.log("🎬 Applying stream to video element");
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.onloadedmetadata = () => {
        console.log("📺 Video metadata loaded, starting playback");
        videoRef.current.play().catch((error) => {
          console.error("❌ Video play error:", error);
        });
      };
      setConnectionStatus("connected");
      setStreamReady(true);
    }
  }, [streamRef.current, isSessionActive]);

  // Handle when avatar stream is ready
  const handleStreamReady = (event) => {
    console.log("🎥 Stream ready event received");
    console.log("Stream detail:", event.detail);

    if (event.detail) {
      console.log("✅ Storing stream reference");
      streamRef.current = event.detail;
    } else {
      console.error("❌ No stream in event.detail");
      setConnectionStatus("error");
    }
  };

  // Handle stream disconnection
  const handleStreamDisconnected = () => {
    console.log("🔌 Stream disconnected");
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    streamRef.current = null;
    setIsSessionActive(false);
    setStreamReady(false);
    setConnectionStatus("disconnected");
  };

  // Initialize streaming avatar session
  const initializeAvatarSession = async () => {
    try {
      if (!isAuthenticated) {
        setShowAuthModal(true);
        return;
      }
      setIsLoading(true);
      setConnectionStatus("connecting");
      setStreamReady(false);

      console.log("🚀 Starting avatar session...");

      const token = await fetchAccessToken();
      console.log("🎫 Token received");

      avatarRef.current = new StreamingAvatar({ token });
      console.log("🤖 Avatar instance created");

      // Set up event listeners
      avatarRef.current.on(StreamingEvents.STREAM_READY, handleStreamReady);
      avatarRef.current.on(
        StreamingEvents.STREAM_DISCONNECTED,
        handleStreamDisconnected
      );

      console.log("📡 Event listeners set up");

      // Create avatar session
      sessionDataRef.current = await avatarRef.current.createStartAvatar({
        quality: AvatarQuality.High,
        avatarName: selectedAvatar,
      });

      console.log("✅ Avatar session created:", sessionDataRef.current);
      setIsSessionActive(true);
    } catch (error) {
      console.error("❌ Error initializing avatar session:", error);
      setConnectionStatus("error");
      alert(`Failed to start avatar session: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // End the avatar session
  const terminateAvatarSession = async () => {
    try {
      setIsLoading(true);

      if (avatarRef.current && sessionDataRef.current) {
        await avatarRef.current.stopAvatar();
      }

      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }

      avatarRef.current = null;
      sessionDataRef.current = null;
      streamRef.current = null;
      setIsSessionActive(false);
      setStreamReady(false);
      setConnectionStatus("disconnected");
    } catch (error) {
      console.error("Error terminating avatar session:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle speaking event
  // const handleSpeak = async () => {
  //   if (!avatarRef.current || !userInput.trim()) return;

  //   try {
  //     setIsSpeaking(true);

  //     await avatarRef.current.speak({
  //       text: userInput.trim(),
  //     });

  //     setUserInput(""); // Clear input after speaking
  //   } catch (error) {
  //     console.error("Error making avatar speak:", error);
  //     alert(`Failed to make avatar speak: ${error.message}`);
  //   } finally {
  //     setIsSpeaking(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim() || !selectedOption) {
      alert("Please enter a message and select a domain.");
      return;
    }

    try {
      setIsSpeaking(true);

      const formData = new FormData(formRef.current);
      formData.append("domain", selectedOption);
      formData.append("text_query", userInput);
      const response = await fetch(
        // `http://16.171.93.127:8001/api/agents/generate-response/`,
        // `http://51.21.148.115:8001/api/agents/generate-response`,
        `${backendURL}/agents/generate-response/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${userToken}`,
            "X-API-Key": "pk_669c5a085c8241a7b8b718c319a083fe",
            "X-SIGNATURE":
              "f5f5b384c39d8e7cb4ac6e1e065ada9b1435584e403d9003b78c8d668ca94429",
          },

          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      console.log("✅ API Response:", data);
      if (!avatarRef.current) {
        console.error("Avatar reference is null");
        return;
      }

      if (!data.response) {
        console.error("No response in API data");
        return;
      }

      // Agar tum chahte ho ke avatar bolay, to:
      if (avatarRef.current && data.response) {
        console.log("Making avatar speak:", data.response);
        await avatarRef.current.speak({
          text: data.response,
          // taskType: TaskType.TALK,
          task_type: TaskType.REPEAT,
        });
      }

      setUserInput("");
      setSelectedOption("");
    } catch (error) {
      console.error("❌ Error sending message:", error);
      alert("Failed to send message. Check console for details.");
    } finally {
      setIsSpeaking(false);
    }
  };

  // Handle Enter key press in input
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      // handleSpeak();
      // handleSend();
    }
  };

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (avatarRef.current && sessionDataRef.current) {
        terminateAvatarSession();
      }
    };
  }, []);

  const getStatusColor = () => {
    switch (connectionStatus) {
      case "connected":
        return "#10b981";
      case "connecting":
        return "#f59e0b";
      case "error":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case "connected":
        return "Connected";
      case "connecting":
        return "Connecting...";
      case "error":
        return "Connection Error";
      default:
        return "Disconnected";
    }
  };

  const getSelectedAvatarName = () => {
    const avatar = AVATAR_IDS.find((a) => a.id === selectedAvatar);
    return avatar ? avatar.name : "Unknown Avatar";
  };

  if (!isSessionActive) {
    // Initial form view
    return (
      <div className="avatars-page">
        <div className="container-medium">
          <div className="start-form-container">
            <div className="start-form">
              <div className="form-header">
                <h1 className="form-title">Interactive AI Avatar</h1>
                <p className="form-subtitle">
                  Choose an avatar and start your conversation
                </p>
                <div className="status-indicator">
                  <div
                    className="status-dot"
                    style={{ backgroundColor: getStatusColor() }}
                  />
                  <span className="status-text">{getStatusText()}</span>
                </div>

                {isAuthenticated && (
                  <div className="user-info">
                    <span className="auth-status">✅ Authenticated</span>
                    <button onClick={handleLogout} className="logout-btn">
                      Logout
                    </button>
                  </div>
                )}
              </div>

              <div className="form-content">
                <div className="input-group">
                  <label htmlFor="avatar-select" className="input-label">
                    Select Avatar
                  </label>
                  <select
                    id="avatar-select"
                    value={selectedAvatar}
                    onChange={(e) => setSelectedAvatar(e.target.value)}
                    className="avatar-select"
                    disabled={isLoading}
                  >
                    {AVATAR_IDS.map((avatar) => (
                      <option key={avatar.id} value={avatar.id}>
                        {avatar.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-alignment">
                  <div className="input-group">
                    <label htmlFor="avatar-select" className="input-label">
                      Choose Category
                    </label>
                    <select
                      id="avatar-select"
                      value={selectedAvatar}
                      onChange={(e) => setSelectedAvatar(e.target.value)}
                      className="avatar-select"
                      disabled={isLoading}
                    >
                      {AVATAR_IDS.map((avatar) => (
                        <option key={avatar.id} value={avatar.id}>
                          {avatar.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="input-group">
                    <label htmlFor="avatar-select" className="input-label">
                      Ethnicity
                    </label>
                    <select
                      id="avatar-select"
                      value={selectedAvatar}
                      onChange={(e) => setSelectedAvatar(e.target.value)}
                      className="avatar-select"
                      disabled={isLoading}
                    >
                      {AVATAR_IDS.map((avatar) => (
                        <option key={avatar.id} value={avatar.id}>
                          {avatar.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-alignment">
                  <div className="input-group">
                    <label htmlFor="avatar-select" className="input-label">
                      Select Gender
                    </label>
                    <select
                      id="avatar-select"
                      value={selectedAvatar}
                      onChange={(e) => setSelectedAvatar(e.target.value)}
                      className="avatar-select"
                      disabled={isLoading}
                    >
                      {AVATAR_IDS.map((avatar) => (
                        <option key={avatar.id} value={avatar.id}>
                          {avatar.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="input-group">
                    <label htmlFor="avatar-select" className="input-label">
                      Select Age
                    </label>
                    <select
                      id="avatar-select"
                      value={selectedAvatar}
                      onChange={(e) => setSelectedAvatar(e.target.value)}
                      className="avatar-select"
                      disabled={isLoading}
                    >
                      {AVATAR_IDS.map((avatar) => (
                        <option key={avatar.id} value={avatar.id}>
                          {avatar.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  onClick={initializeAvatarSession}
                  disabled={isLoading}
                  className={`start-session-btn ${isLoading ? "loading" : ""}`}
                >
                  {isLoading ? (
                    <>
                      <span className="loading-spinner"></span>
                      Starting Session...
                    </>
                  ) : !isAuthenticated ? (
                    <>
                      <span className="start-icon">🔐</span>
                      Login to Start Session
                    </>
                  ) : (
                    <>
                      <span className="start-icon">🚀</span>
                      Start Avatar Session
                    </>
                  )}
                </button>
              </div>

              <div className="form-footer">
                <div className="feature-list">
                  <div className="feature-item">
                    <span className="feature-icon">🎯</span>
                    <span>High Quality Streaming</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">💬</span>
                    <span>Real-time Conversation</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">🎨</span>
                    <span>Multiple Avatar Options</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Authentication Modal */}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onAuthSuccess={handleAuthSuccess}
        />
      </div>
    );
  }

  // Active session view with fullscreen video
  return (
    <div className="avatars-page active-session">
      <div className="fullscreen-video-container">
        <video
          ref={videoRef}
          className="fullscreen-avatar-video"
          autoPlay
          playsInline
          muted={false}
        />

        {!streamReady && (
          <div className="loading-overlay">
            <div className="loading-content">
              <span className="loading-spinner large"></span>
              <h3>Connecting to Avatar...</h3>
              <p>Please wait while we establish the connection</p>
            </div>
          </div>
        )}

        <div className="session-info">
          <div className="avatar-info">
            <span className="avatar-name">{getSelectedAvatarName()}</span>
            <div className="status-indicator">
              <div
                className="status-dot"
                style={{ backgroundColor: getStatusColor() }}
              />
              <span className="status-text">{getStatusText()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bottom-controls">
        <div className="container-medium">
          <div className="chat-section">
            <form onSubmit={handleSubmit} ref={formRef}>
              <div className="input-container">
                <textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type what you want the avatar to say..."
                  className="fullscreen-chat-input"
                  disabled={!streamReady}
                  rows={2}
                />
                <select
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  className="fullscreen-select"
                  disabled={!streamReady}
                >
                  <option value="">Select option</option>
                  <option value="therapy">Therapy</option>
                  <option value="beauty">Beauty</option>
                  <option value="consultation">Consultation</option>
                  <option value="medical">Medical</option>
                </select>
                <button
                  // onClick={handleSend}
                  // disabled={!streamReady || !userInput.trim() || isSpeaking}
                  className="fullscreen-speak-btn"
                >
                  Send
                </button>

                {/* <button
                onClick={handleSpeak}
                disabled={!streamReady || !userInput.trim() || isSpeaking}
                className={`fullscreen-speak-btn ${
                  !streamReady || !userInput.trim() ? "disabled" : ""
                }`}
              >
                {isSpeaking ? (
                  <>
                    <span className="loading-spinner"></span>
                    Speaking...
                  </>
                ) : (
                  <>
                    <span className="speak-icon">🎤</span>
                    Speak
                  </>
                )}
              </button> */}
              </div>
            </form>

            <button
              onClick={terminateAvatarSession}
              disabled={isLoading}
              className="end-session-btn"
            >
              {isLoading ? "Ending..." : "End Session"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Avatars;
