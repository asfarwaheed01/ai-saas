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

//current code which is running
// import React, { useState, useRef, useEffect } from "react";
// import StreamingAvatar, {
//   AvatarQuality,
//   StreamingEvents,
//   TaskType,
// } from "@heygen/streaming-avatar";
// import "./AvatarsPage.css";
// import { AVATAR_IDS, backendURL } from "../../config/constants";
// import AuthModal from "../../components/HomePage/AuthModal/AuthModal";

// const Avatars = () => {
//   const [isSessionActive, setIsSessionActive] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [userInput, setUserInput] = useState("");
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [connectionStatus, setConnectionStatus] = useState("disconnected");
//   const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_IDS[0].id);
//   const [streamReady, setStreamReady] = useState(false);
//   const [showAuthModal, setShowAuthModal] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userToken, setUserToken] = useState(null);
//   const [selectedOption, setSelectedOption] = useState("");

//   const videoRef = useRef(null);
//   const avatarRef = useRef(null);
//   const sessionDataRef = useRef(null);
//   const streamRef = useRef(null);
//   const formRef = useRef(null);

//   let apiKey = process.env.REACT_APP_HEYGEN_API_KEY;
//   console.log(apiKey, "API KEY");

//   // Check authentication status on component mount
//   useEffect(() => {
//     const token = localStorage.getItem("access_token");
//     if (token) {
//       setIsAuthenticated(true);
//       setUserToken(token);
//     }
//   }, []);

//   // Handle authentication success
//   const handleAuthSuccess = (token) => {
//     setIsAuthenticated(true);
//     setUserToken(token);
//     setShowAuthModal(false);
//   };

//   // Handle logout
//   const handleLogout = () => {
//     localStorage.removeItem("access_token");
//     setIsAuthenticated(false);
//     setUserToken(null);

//     // If session is active, terminate it
//     if (isSessionActive) {
//       terminateAvatarSession();
//     }
//   };

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
//       if (!isAuthenticated) {
//         setShowAuthModal(true);
//         return;
//       }
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
//   // const handleSpeak = async () => {
//   //   if (!avatarRef.current || !userInput.trim()) return;

//   //   try {
//   //     setIsSpeaking(true);

//   //     await avatarRef.current.speak({
//   //       text: userInput.trim(),
//   //     });

//   //     setUserInput(""); // Clear input after speaking
//   //   } catch (error) {
//   //     console.error("Error making avatar speak:", error);
//   //     alert(`Failed to make avatar speak: ${error.message}`);
//   //   } finally {
//   //     setIsSpeaking(false);
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!userInput.trim() || !selectedOption) {
//       alert("Please enter a message and select a domain.");
//       return;
//     }

//     try {
//       setIsSpeaking(true);

//       const formData = new FormData(formRef.current);
//       formData.append("domain", selectedOption);
//       formData.append("text_query", userInput);
//       const response = await fetch(
//         // `http://16.171.93.127:8001/api/agents/generate-response/`,
//         // `http://51.21.148.115:8001/api/agents/generate-response`,
//         `${backendURL}/agents/generate-response/`,
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${userToken}`,
//             "X-API-Key": "pk_669c5a085c8241a7b8b718c319a083fe",
//             "X-SIGNATURE":
//               "f5f5b384c39d8e7cb4ac6e1e065ada9b1435584e403d9003b78c8d668ca94429",
//           },

//           body: formData,
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`API error: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log("✅ API Response:", data);
//       if (!avatarRef.current) {
//         console.error("Avatar reference is null");
//         return;
//       }

//       if (!data.response) {
//         console.error("No response in API data");
//         return;
//       }

//       // Agar tum chahte ho ke avatar bolay, to:
//       if (avatarRef.current && data.response) {
//         console.log("Making avatar speak:", data.response);
//         await avatarRef.current.speak({
//           text: data.response,
//           // taskType: TaskType.TALK,
//           task_type: TaskType.REPEAT,
//         });
//       }

//       setUserInput("");
//       setSelectedOption("");
//     } catch (error) {
//       console.error("❌ Error sending message:", error);
//       alert("Failed to send message. Check console for details.");
//     } finally {
//       setIsSpeaking(false);
//     }
//   };

//   // Handle Enter key press in input
//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       // handleSpeak();
//       // handleSend();
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
//                 <h1 className="form-title">Virtual AI Avatars</h1>
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

//                 {isAuthenticated && (
//                   <div className="user-info">
//                     <span className="auth-status">✅ Authenticated</span>
//                     <button onClick={handleLogout} className="logout-btn">
//                       Logout
//                     </button>
//                   </div>
//                 )}
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

//                 <div className="form-alignment">
//                   <div className="input-group">
//                     <label htmlFor="avatar-select" className="input-label">
//                       Choose Category
//                     </label>
//                     <select
//                       id="avatar-select"
//                       value={selectedAvatar}
//                       onChange={(e) => setSelectedAvatar(e.target.value)}
//                       className="avatar-select"
//                       disabled={isLoading}
//                     >
//                       {AVATAR_IDS.map((avatar) => (
//                         <option key={avatar.id} value={avatar.id}>
//                           {avatar.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div className="input-group">
//                     <label htmlFor="avatar-select" className="input-label">
//                       Ethnicity
//                     </label>
//                     <select
//                       id="avatar-select"
//                       value={selectedAvatar}
//                       onChange={(e) => setSelectedAvatar(e.target.value)}
//                       className="avatar-select"
//                       disabled={isLoading}
//                     >
//                       {AVATAR_IDS.map((avatar) => (
//                         <option key={avatar.id} value={avatar.id}>
//                           {avatar.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>

//                 <div className="form-alignment">
//                   <div className="input-group">
//                     <label htmlFor="avatar-select" className="input-label">
//                       Select Gender
//                     </label>
//                     <select
//                       id="avatar-select"
//                       value={selectedAvatar}
//                       onChange={(e) => setSelectedAvatar(e.target.value)}
//                       className="avatar-select"
//                       disabled={isLoading}
//                     >
//                       {AVATAR_IDS.map((avatar) => (
//                         <option key={avatar.id} value={avatar.id}>
//                           {avatar.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div className="input-group">
//                     <label htmlFor="avatar-select" className="input-label">
//                       Select Age
//                     </label>
//                     <select
//                       id="avatar-select"
//                       value={selectedAvatar}
//                       onChange={(e) => setSelectedAvatar(e.target.value)}
//                       className="avatar-select"
//                       disabled={isLoading}
//                     >
//                       {AVATAR_IDS.map((avatar) => (
//                         <option key={avatar.id} value={avatar.id}>
//                           {avatar.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
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
//                   ) : !isAuthenticated ? (
//                     <>
//                       <span className="start-icon">🔐</span>
//                       Login to Start Session
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

//         {/* Authentication Modal */}
//         <AuthModal
//           isOpen={showAuthModal}
//           onClose={() => setShowAuthModal(false)}
//           onAuthSuccess={handleAuthSuccess}
//         />
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
//             <form onSubmit={handleSubmit} ref={formRef}>
//               <div className="input-container">
//                 <textarea
//                   value={userInput}
//                   onChange={(e) => setUserInput(e.target.value)}
//                   onKeyPress={handleKeyPress}
//                   placeholder="Type what you want the avatar to say..."
//                   className="fullscreen-chat-input"
//                   disabled={!streamReady}
//                   rows={2}
//                 />
//                 <select
//                   value={selectedOption}
//                   onChange={(e) => setSelectedOption(e.target.value)}
//                   className="fullscreen-select"
//                   disabled={!streamReady}
//                 >
//                   <option value="">Select option</option>
//                   <option value="therapy">Therapy</option>
//                   <option value="beauty">Beauty</option>
//                   <option value="consultation">Consultation</option>
//                   <option value="medical">Medical</option>
//                 </select>
//                 <button
//                   // onClick={handleSend}
//                   // disabled={!streamReady || !userInput.trim() || isSpeaking}
//                   className="fullscreen-speak-btn"
//                 >
//                   Send
//                 </button>

//                 {/* <button
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
//               </button> */}
//               </div>
//             </form>

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

// import React, { useState, useRef, useEffect } from "react";
// import StreamingAvatar, {
//   AvatarQuality,
//   StreamingEvents,
//   TaskType,
// } from "@heygen/streaming-avatar";
// import "./AvatarsPage.css";
// import { AVATAR_IDS, backendURL } from "../../config/constants";
// import AuthModal from "../../components/HomePage/AuthModal/AuthModal";
// import WhiteLogo from "../../../src/assets/logo todo 1.png";
// import { Link } from "react-router-dom";

// const Avatars = () => {
//   const [isSessionActive, setIsSessionActive] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [userInput, setUserInput] = useState("");
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [connectionStatus, setConnectionStatus] = useState("disconnected");
//   const [selectedGender, setSelectedGender] = useState("male");
//   const [selectedEthnicity, setSelectedEthnicity] = useState("asian");
//   const [selectedAge, setSelectedAge] = useState("Young");
//   const availableAvatars =
//     AVATAR_IDS[0][selectedGender]?.[selectedEthnicity]?.filter(
//       (av) => !selectedAge || av.age.toLowerCase() === selectedAge.toLowerCase()
//     ) || [];

//   const [selectedAvatar, setSelectedAvatar] = useState(
//     availableAvatars.length > 0 ? availableAvatars[0].id : ""
//   );
//   const [streamReady, setStreamReady] = useState(false);
//   const [showAuthModal, setShowAuthModal] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userToken, setUserToken] = useState(null);
//   const [selectedOption, setSelectedOption] = useState("");
//   const [selectedLanguage, setSelectedLanguage] = useState("eng");
//   const [errors, setErrors] = useState({});

//   const videoRef = useRef(null);
//   const avatarRef = useRef(null);
//   const sessionDataRef = useRef(null);
//   const streamRef = useRef(null);
//   const formRef = useRef(null);

//   let apiKey = process.env.REACT_APP_HEYGEN_API_KEY;
//   console.log(apiKey, "API KEY");

//   const LANGUAGE_LABELS = {
//     eng: "English",
//     it: "Italian",
//   };
//   useEffect(() => {
//     if (
//       availableAvatars.length > 0 &&
//       !availableAvatars.some((av) => av.id === selectedAvatar)
//     ) {
//       setSelectedAvatar(availableAvatars[0].id);
//     }
//   }, [
//     selectedGender,
//     selectedEthnicity,
//     availableAvatars,
//     selectedAvatar,
//     selectedAge,
//   ]);

//   // Check authentication status on component mount
//   useEffect(() => {
//     const token = localStorage.getItem("access_token");
//     if (token) {
//       setIsAuthenticated(true);
//       setUserToken(token);
//     }
//   }, []);

//   // Handle authentication success
//   const handleAuthSuccess = (token) => {
//     setIsAuthenticated(true);
//     setUserToken(token);
//     setShowAuthModal(false);
//   };

//   // Handle logout
//   // const handleLogout = () => {
//   //   localStorage.removeItem("access_token");
//   //   setIsAuthenticated(false);
//   //   setUserToken(null);

//   //   // If session is active, terminate it
//   //   if (isSessionActive) {
//   //     terminateAvatarSession();
//   //   }
//   // };

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

//   const validateFields = () => {
//     const newErrors = {};

//     if (!selectedOption) newErrors.category = "Category is required.";
//     if (!selectedGender) newErrors.gender = "Gender is required.";
//     if (!selectedEthnicity) newErrors.ethnicity = "Ethnicity is required.";
//     if (!selectedAvatar) newErrors.avatar = "Avatar is required.";
//     if (!selectedAge) newErrors.age = "Age is required.";

//     setErrors(newErrors);

//     // return false if any errors exist
//     return Object.keys(newErrors).length === 0;
//   };

//   // Initialize streaming avatar session
//   const initializeAvatarSession = async () => {
//     try {
//       if (!validateFields()) return;
//       if (!isAuthenticated) {
//         setShowAuthModal(true);
//         // handleLoginRedirect();
//         return;
//       }
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
//   // const handleSpeak = async () => {
//   //   if (!avatarRef.current || !userInput.trim()) return;

//   //   try {
//   //     setIsSpeaking(true);

//   //     await avatarRef.current.speak({
//   //       text: userInput.trim(),
//   //     });

//   //     setUserInput(""); // Clear input after speaking
//   //   } catch (error) {
//   //     console.error("Error making avatar speak:", error);
//   //     alert(`Failed to make avatar speak: ${error.message}`);
//   //   } finally {
//   //     setIsSpeaking(false);
//   //   }
//   // };

//   const [isListening, setIsListening] = useState(false);

//   useEffect(() => {
//     if (
//       !("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
//     ) {
//       console.error("Speech Recognition not supported in this browser.");
//     }
//   }, []);

//   const recognitionRef = useRef(null);

//   const startListening = () => {
//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;

//     if (!SpeechRecognition) {
//       alert("Speech recognition not supported in this browser.");
//       return;
//     }

//     // If already listening → stop and submit
//     if (isListening && recognitionRef.current) {
//       recognitionRef.current.stop();
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     // recognition.lang = "en-US";
//     recognition.continuous = false;
//     recognition.interimResults = false;

//     recognitionRef.current = recognition;
//     setIsListening(true);
//     recognition.start();

//     recognition.onresult = (event) => {
//       const transcript = event.results[0][0].transcript;
//       console.log("🎙️ Transcript:", transcript);
//       setUserInput(transcript);
//       recognition.finalTranscript = transcript;
//     };

//     recognition.onerror = (event) => {
//       console.error("Speech recognition error:", event.error);
//       setIsListening(false);
//     };

//     recognition.onend = async () => {
//       console.log("Speech recognition ended.");
//       setIsListening(false);
//       recognitionRef.current = null;

//       const transcript = recognition.finalTranscript || userInput;
//       if (transcript.trim()) {
//         await handleSubmit({ preventDefault: () => {} });
//       }
//     };
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!userInput.trim() || !selectedOption) {
//       alert("Please enter a message and select a domain.");
//       return;
//     }

//     try {
//       setIsSpeaking(true);

//       const formData = new FormData(formRef.current);
//       formData.append("domain", selectedOption);
//       formData.append("text_query", userInput);
//       formData.append("lang", selectedLanguage);
//       const response = await fetch(`${backendURL}/agents/generate-response/`, {
//         method: "POST",
//         headers: {
//           // Authorization: `Bearer ${userToken}`,
//           "X-API-Key": "pk_669c5a085c8241a7b8b718c319a083fe",
//           "X-SIGNATURE":
//             "f5f5b384c39d8e7cb4ac6e1e065ada9b1435584e403d9003b78c8d668ca94429",
//         },

//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error(`API error: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log("✅ API Response:", data);
//       if (!avatarRef.current) {
//         console.error("Avatar reference is null");
//         return;
//       }

//       if (!data.response) {
//         console.error("No response in API data");
//         return;
//       }

//       // Agar tum chahte ho ke avatar bolay, to:
//       if (avatarRef.current && data.response) {
//         console.log("Making avatar speak:", data.response);
//         await avatarRef.current.speak({
//           text: data.response,
//           // taskType: TaskType.TALK,
//           task_type: TaskType.REPEAT,
//         });
//       }

//       setUserInput("");
//       // setSelectedOption("");
//     } catch (error) {
//       console.error("❌ Error sending message:", error);
//       alert("Failed to send message. Check console for details.");
//     } finally {
//       setIsSpeaking(false);
//     }
//   };

//   // Handle Enter key press in input
//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       // handleSpeak();
//       // handleSend();
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

//   // const getSelectedAvatarName = () => {
//   //   const avatar = availableAvatars.find((av) => av.id === selectedAvatar);
//   //   return avatar ? avatar.name : "Unknown Avatar";
//   // };

//   // const filteredAvatars = availableAvatars.filter((av) => {
//   //   return (
//   //     (!selectedAge || av.age === selectedAge) &&
//   //     (!selectedLanguage || av.languages.includes(selectedLanguage))
//   //   );
//   // });

//   if (!isSessionActive) {
//     // Initial form view
//     return (
//       <div className="avatars-page">
//         <div className="floating-shapes">
//           <div className="floating-shape"></div>
//           <div className="floating-shape"></div>
//           <div className="floating-shape"></div>
//           <div className="floating-shape"></div>
//           <div className="floating-shape"></div>
//         </div>

//         {/* Add this for grid pattern */}
//         <div className="grid-pattern"></div>
//         <Link to="/">
//           <img
//             src={WhiteLogo}
//             alt="TODO PHARMA AI"
//             height={30}
//             width={100}
//             className="avatar-logo"
//           />
//         </Link>
//         <div className="container-medium">
//           <div className="start-form-container">
//             <div className="start-form">
//               <div className="form-header">
//                 <h1 className="form-title">Virtual AI Avatars</h1>
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

//                 {/* {isAuthenticated && (
//                   <div className="user-info">
//                     <span className="auth-status">✅ Authenticated</span>
//                     <button onClick={handleLogout} className="logout-btn">
//                       Logout
//                     </button>
//                   </div>
//                 )} */}
//               </div>

//               <div className="form-content">
//                 <div className="input-group">
//                   <label htmlFor="category-select" className="input-label">
//                     Choose Category
//                   </label>
//                   <select
//                     // id="avatar-select"
//                     id="category-select"
//                     // value={selectedAvatar}
//                     value={selectedOption}
//                     // onChange={(e) => setSelectedAvatar(e.target.value)}
//                     onChange={(e) => setSelectedOption(e.target.value)}
//                     className="avatar-select"
//                     disabled={isLoading}
//                     required
//                   >
//                     <option value="">Select Category</option>
//                     <option value="therapy">
//                       Meantal health coaching/therapry counseling
//                     </option>
//                     <option value="beauty">Beauty consulting</option>
//                     <option value="consultation">
//                       Pharmaceutical consultancy
//                     </option>
//                     <option value="medical">Medical consultation</option>
//                     {/* {AVATAR_IDS.map((avatar) => (
//                       <option key={avatar.id} value={avatar.id}>
//                         {avatar.name}
//                       </option>
//                     ))} */}
//                   </select>
//                   {errors.category && (
//                     <p className="error-text">{errors.category}</p>
//                   )}
//                 </div>

//                 <div className="form-alignment">
//                   <div className="input-group">
//                     <label htmlFor="gender-select" className="input-label">
//                       Select Gender
//                     </label>
//                     <select
//                       // id="avatar-select"
//                       // value={selectedAvatar}
//                       // onChange={(e) => setSelectedAvatar(e.target.value)}
//                       id="gender-select"
//                       value={selectedGender}
//                       onChange={(e) => setSelectedGender(e.target.value)}
//                       className="avatar-select"
//                       disabled={isLoading}
//                     >
//                       <option value="male">Male</option>
//                       <option value="female">Female</option>
//                       {/* {AVATAR_IDS.map((avatar) => (
//                         <option key={avatar.id} value={avatar.id}>
//                           {avatar.name}
//                         </option>
//                       ))} */}
//                     </select>
//                   </div>
//                   <div className="input-group">
//                     <label htmlFor="ethnicity-select" className="input-label">
//                       Ethnicity
//                     </label>
//                     <select
//                       // id="avatar-select"
//                       // value={selectedAvatar}
//                       // onChange={(e) => setSelectedAvatar(e.target.value)}
//                       id="ethnicity-select"
//                       value={selectedEthnicity}
//                       onChange={(e) => setSelectedEthnicity(e.target.value)}
//                       className="avatar-select"
//                       disabled={isLoading}
//                     >
//                       <option value="asian">Asian</option>
//                       <option value="hispanic">Hispanic</option>
//                       <option value="african_american">African American</option>
//                       {/* {AVATAR_IDS.map((avatar) => (
//                         <option key={avatar.id} value={avatar.id}>
//                           {avatar.name}
//                         </option>
//                       ))} */}
//                     </select>
//                   </div>
//                 </div>
//                 <div className="form-alignment">
//                   <div className="input-group">
//                     <label htmlFor="language-select" className="input-label">
//                       Language
//                     </label>
//                     <select
//                       id="language-select"
//                       value={selectedLanguage}
//                       onChange={(e) => setSelectedLanguage(e.target.value)}
//                       className="avatar-select"
//                       disabled={isLoading}
//                     >
//                       <option value="">Select Language</option>
//                       {availableAvatars
//                         .find((av) => av.id === selectedAvatar)
//                         ?.languages.map((lang) => (
//                           <option key={lang} value={lang}>
//                             {LANGUAGE_LABELS[lang] || lang.toUpperCase()}
//                           </option>
//                         ))}
//                     </select>
//                     {errors.lang && <p className="error-text">{errors.lang}</p>}
//                   </div>

//                   <div className="input-group">
//                     <label htmlFor="language-select" className="input-label">
//                       Age
//                     </label>
//                     <select
//                       id="age-select"
//                       value={selectedAge}
//                       onChange={(e) => setSelectedAge(e.target.value)}
//                       className="avatar-select"
//                       disabled={isLoading}
//                     >
//                       <option value="">Select Age</option>
//                       {/* {availableAvatars.map((avatar) => (
//                         <option key={avatar.id} value={avatar.age}>
//                           {avatar.age}
//                         </option>
//                       ))} */}
//                       {[
//                         ...new Set(
//                           AVATAR_IDS[0][selectedGender]?.[
//                             selectedEthnicity
//                           ]?.map((av) => av.age)
//                         ),
//                       ].map((age) => (
//                         <option key={age} value={age}>
//                           {age}
//                         </option>
//                       ))}
//                     </select>

//                     {errors.age && <p className="error-text">{errors.age}</p>}
//                   </div>
//                 </div>

//                 <div className="form-alignment">
//                   <div className="input-group">
//                     <label htmlFor="avatar-select" className="input-label">
//                       Select Avatar
//                     </label>
//                     <select
//                       id="avatar-select"
//                       value={selectedAvatar}
//                       onChange={(e) => setSelectedAvatar(e.target.value)}
//                       className="avatar-select"
//                       disabled={isLoading || availableAvatars.length === 0}
//                     >
//                       {availableAvatars.map((avatar) => (
//                         <option key={avatar.id} value={avatar.id}>
//                           {avatar.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
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
//                   ) : !isAuthenticated ? (
//                     <>
//                       <span className="start-icon">🔐</span>
//                       Login to Start Session
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

//         {/* Authentication Modal */}
//         <AuthModal
//           isOpen={showAuthModal}
//           onClose={() => setShowAuthModal(false)}
//           onAuthSuccess={handleAuthSuccess}
//         />
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

//         {/* <div className="session-info">
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
//         </div> */}
//       </div>

//       <div className="bottom-controls">
//         <div className="container-medium">
//           <div className="chat-section">
//             <form onSubmit={handleSubmit} ref={formRef}>
//               <div className="input-container">
//                 <textarea
//                   value={userInput}
//                   onChange={(e) => setUserInput(e.target.value)}
//                   onKeyPress={handleKeyPress}
//                   placeholder="Type what you want the avatar to say..."
//                   className="fullscreen-chat-input"
//                   disabled={!streamReady}
//                   rows={2}
//                 />
//                 {/* <button
//                   type="button"
//                   onClick={startListening}
//                   className={`fullscreen-speak-btn ${
//                     isListening ? "recording" : ""
//                   }`}
//                   disabled={!streamReady || isListening}
//                 >
//                   {isListening ? (
//                     <>
//                       <span className="loading-spinner"></span> Listening...
//                     </>
//                   ) : (
//                     <>
//                       <span className="speak-icon">🎙️</span>
//                     </>
//                   )}
//                 </button> */}
//                 <button
//                   type="button"
//                   onClick={startListening}
//                   className={`fullscreen-speak-btn ${
//                     isListening ? "recording" : ""
//                   }`}
//                   disabled={!streamReady}
//                 >
//                   {!isListening ? (
//                     <span className="speak-icon">🎙️</span>
//                   ) : (
//                     <div className="voice-wave-container">
//                       <div className="voice-wave"></div>
//                       <div className="voice-wave"></div>
//                       <div className="voice-wave"></div>
//                       <div className="voice-wave"></div>
//                       <div className="voice-wave"></div>
//                     </div>
//                   )}
//                 </button>

//                 <button
//                   // onClick={handleSend}
//                   // disabled={!streamReady || !userInput.trim() || isSpeaking}
//                   className="fullscreen-speak-btn"
//                 >
//                   Send
//                 </button>

//                 {/* <button
//                   // onClick={handleSpeak}
//                   disabled={!streamReady || !userInput.trim() || isSpeaking}
//                   className={`fullscreen-speak-btn ${
//                     !streamReady || !userInput.trim() ? "disabled" : ""
//                   }`}
//                 >
//                   {isSpeaking ? (
//                     <>
//                       <span className="loading-spinner"></span>
//                       Speaking...
//                     </>
//                   ) : (
//                     <>
//                       <span className="speak-icon">🎤</span>
//                       Speak
//                     </>
//                   )}
//                 </button> */}
//               </div>
//             </form>

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

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import StreamingAvatar, {
  AvatarQuality,
  StreamingEvents,
  TaskType,
} from "@heygen/streaming-avatar";
import "./AvatarsPage.css";
import { AVATAR_IDS, backendURL } from "../../config/constants";
import AuthModal from "../../components/HomePage/AuthModal/AuthModal";
import WhiteLogo from "../../../src/assets/logo todo 1.png";
import { Link } from "react-router-dom";
import { FaMicrophone } from "react-icons/fa";
import { useAuth } from "../../providers/AuthContext";

const Avatars = () => {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const [selectedGender, setSelectedGender] = useState("male");
  const [selectedEthnicity, setSelectedEthnicity] = useState("asian");
  const [selectedAge, setSelectedAge] = useState("Intermediate");
  const availableAvatars =
    AVATAR_IDS[0][selectedGender]?.[selectedEthnicity]?.filter(
      (av) => !selectedAge || av.age.toLowerCase() === selectedAge.toLowerCase()
    ) || [];

  const [selectedAvatar, setSelectedAvatar] = useState(
    availableAvatars.length > 0 ? availableAvatars[0].id : ""
  );
  const [streamReady, setStreamReady] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("eng");
  const [errors, setErrors] = useState({});
  const [activeSubscription, setActiveSubscription] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [isLanguagesLoading, setIsLanguagesLoading] = useState(false);

  const [userPlan, setUserPlan] = useState(null);
  const [isPlanLoading, setIsPlanLoading] = useState(false);
  const [remainingRequests, setRemainingRequests] = useState(null);

  const [userApiKeys, setUserApiKeys] = useState({
    apiKey: null,
    secretKey: null,
  });
  // Add state for API key missing popup
  const [showKeyMissingPopup, setShowKeyMissingPopup] = useState(false);

  const { getAccessToken, logout } = useAuth();

  const videoRef = useRef(null);
  const avatarRef = useRef(null);
  const sessionDataRef = useRef(null);
  const streamRef = useRef(null);
  const formRef = useRef(null);
  const transcriptRef = useRef(""); // To store the transcript
  const popupTimerRef = useRef(null); // Ref for popup timer

  let apiKey = process.env.REACT_APP_HEYGEN_API_KEY;
  console.log(apiKey, "API KEY");

  // // Fetch user API keys
  // const fetchUserApiKeys = async () => {
  //   try {
  //     const token = getAccessToken();
  //     if (!token) return;

  //     const response = await fetch(`${backendURL}/users/api-keys/`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log("User API Keys:", data);

  //       if (data.has_api_key && data.api_key && data.secret_key) {
  //         setUserApiKeys({
  //           apiKey: data.api_key,
  //           secretKey: data.secret_key,
  //         });
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error fetching user API keys:", error);
  //   }
  // };
  // Fetch user API keys
  const fetchUserApiKeys = async () => {
    try {
      const token = getAccessToken();
      if (!token) return;

      const response = await fetch(`${backendURL}/users/api-keys/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User API Keys:", data);

        if (data.has_api_key && data.api_key && data.secret_key) {
          setUserApiKeys({
            apiKey: data.api_key,
            secretKey: data.secret_key,
          });
          // Hide popup if it was showing
          setShowKeyMissingPopup(false);
          // Clear any existing timer
          if (popupTimerRef.current) {
            clearTimeout(popupTimerRef.current);
          }
        } else {
          // Show popup if no API keys
          setShowKeyMissingPopup(true);
          // Auto-hide after 10 seconds
          popupTimerRef.current = setTimeout(() => {
            setShowKeyMissingPopup(false);
          }, 10000);
        }
      }
    } catch (error) {
      console.error("Error fetching user API keys:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserApiKeys();
    }
  }, [isAuthenticated]);

  const fetchSupportedLanguages = async () => {
    try {
      setIsLanguagesLoading(true);
      const response = await fetch(`${backendURL}/agents/supported-languages/`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch languages");
      }

      if (Array.isArray(data.details)) {
        setLanguages(data.details);
      } else {
        console.warn("Unexpected response format:", data);
        setLanguages([]);
      }
    } catch (error) {
      console.error("Error fetching supported languages:", error);
      setLanguages([]);
    } finally {
      setIsLanguagesLoading(false);
    }
  };

  useEffect(() => {
    fetchSupportedLanguages();
  }, []);

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
    fetchSupportedLanguages(); // refresh list when language changes
  };

  // const LANGUAGE_LABELS = {
  //   eng: "English",
  //   it: "Italian",
  //   fr: "French",
  // };
  // const languages = useMemo(() => {
  //   const avatar = availableAvatars.find((av) => av.id === selectedAvatar);
  //   return avatar?.languages || [];
  // }, [selectedAvatar]);

  useEffect(() => {
    if (
      availableAvatars.length > 0 &&
      !availableAvatars.some((av) => av.id === selectedAvatar)
    ) {
      setSelectedAvatar(availableAvatars[0].id);
    }
  }, [
    selectedGender,
    selectedEthnicity,
    availableAvatars,
    selectedAvatar,
    selectedAge,
  ]);

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
    // Fetch API keys after successful authentication
    fetchUserApiKeys();
  };

  const fetchUserPlan = async () => {
    try {
      setIsPlanLoading(true);
      if (!userApiKeys.apiKey) {
        console.error("User API key not available");
        return;
      }
      const apiKey = userApiKeys.apiKey;
      // const apiKey = "pk_16c7ab4cb3564aa4811dda3180bbcb41";
      // empty payload for signature
      const payload = "";
      const signature = await generateSignature(payload, apiKey);

      const response = await fetch(
        `${backendURL}/agents/generate-response/access`,
        {
          method: "GET",
          headers: {
            "X-API-KEY": apiKey,
            "X-SIGNATURE": signature,
          },
        }
      );

      let data;
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        const message =
          data?.error || `Request failed with status ${response.status}`;
        console.error("❌ API Error:", message);
        return;
      }

      console.log("✅ User Plan Response:", data);
      setUserPlan(data); // store user plan/credits
      setRemainingRequests(data.remaining_api_requests ?? 0); // store remaining requests
    } catch (err) {
      console.error("❌ Error fetching user plan:", err);
    } finally {
      setIsPlanLoading(false);
    }
  };

  useEffect(() => {
    fetchUserPlan();
  }, []);

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

  const validateFields = () => {
    const newErrors = {};

    if (!selectedOption) newErrors.category = "Category is required.";
    if (!selectedGender) newErrors.gender = "Gender is required.";
    if (!selectedEthnicity) newErrors.ethnicity = "Ethnicity is required.";
    if (!selectedAvatar) newErrors.avatar = "Avatar is required.";
    if (!selectedAge) newErrors.age = "Age is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Initialize streaming avatar session
  const initializeAvatarSession = async () => {
    try {
      if (!validateFields()) return;
      if (!isAuthenticated) {
        setShowAuthModal(true);
        return;
      }
      // Check if user has API keys
      if (!userApiKeys.apiKey || !userApiKeys.secretKey) {
        setShowKeyMissingPopup(true);
        // Auto-hide after 10 seconds
        popupTimerRef.current = setTimeout(() => {
          setShowKeyMissingPopup(false);
        }, 10000);
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

      avatarRef.current.on(StreamingEvents.STREAM_READY, handleStreamReady);
      avatarRef.current.on(
        StreamingEvents.STREAM_DISCONNECTED,
        handleStreamDisconnected
      );

      console.log("📡 Event listeners set up");

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

  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (
      !("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
    ) {
      console.error("Speech Recognition not supported in this browser.");
    }
  }, []);

  const recognitionRef = useRef(null);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      return;
    }

    const recognition = new SpeechRecognition();
    // recognition.lang = selectedLanguage === "eng" ? "en-US" : "it-IT"; // Adjust based on selectedLanguage
    recognition.continuous = true; // Allow continuous speech
    recognition.interimResults = true; // Show interim results for real-time feedback

    recognitionRef.current = recognition;
    transcriptRef.current = ""; // Reset transcript
    setUserInput(""); // Clear input
    setIsListening(true);
    recognition.start();

    recognition.onresult = (event) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript + " ";
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      transcriptRef.current = finalTranscript.trim();
      // setUserInput(finalTranscript + interimTranscript);
      // console.log("🎙️ Transcript:", finalTranscript + interimTranscript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
      recognitionRef.current = null;
    };

    recognition.onend = async () => {
      console.log("Speech recognition ended.");
      setIsListening(false);
      recognitionRef.current = null;

      const transcript = transcriptRef.current;
      if (transcript) {
        // setUserInput(transcript);
        await handleSubmit({ preventDefault: () => {} });
      }
    };
  };

  const generateSignature = async (domain, apiKey) => {
    // const secretKey = "a4687fee-afdd-407a-a8c0-493b0c6972fc";
    const secretKey = userApiKeys.secretKey;
    const payload = domain; // correct format

    const enc = new TextEncoder();
    const keyData = enc.encode(secretKey);
    const payloadData = enc.encode(payload);

    const cryptoKey = await window.crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const signatureBuffer = await window.crypto.subtle.sign(
      "HMAC",
      cryptoKey,
      payloadData
    );

    return Array.from(new Uint8Array(signatureBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputToSend = userInput.trim() || transcriptRef.current;

    if (!inputToSend || !selectedOption) {
      alert("Please enter a message and select a domain.");
      return;
    }

    try {
      setIsSpeaking(true);

      const formData = new FormData(formRef.current);
      formData.append("domain", selectedOption);
      formData.append("text_query", inputToSend);
      formData.append("lang", selectedLanguage);

      // const payload = `artificizen:todopharma_avatars:${selectedOption}:1.0.0`;
      // const signature = await generatePluginSignature(payload);

      // const response = await fetch(`${backendURL}/agents/generate-response/`, {
      //   method: "POST",
      //   headers: {
      //     // "X-API-Key": "pk_16c7ab4cb3564aa4811dda3180bbcb41",
      //     "X-API-Key": "pk_b2cfcca7353942b58dc479dfb0a90014",
      //     "X-SIGNATURE": signature,
      //     // "290825050c59759b465c778334f5bcfcdff4fde8f9824dda72417b3d931fe203",
      //     "X-Plugin_ID": payload,
      //   },
      //   body: formData,
      // });
      // const apiKey = "pk_16c7ab4cb3564aa4811dda3180bbcb41";
      // const apiKey = "pk_16c7ab4cb3564aa4811dda3180bbcb41";
      // Use user's API key and secret key from API response
      const apiKey = userApiKeys.apiKey;

      const domain = selectedOption;

      const signature = await generateSignature(domain, apiKey);

      const response = await fetch(`${backendURL}/agents/generate-response/`, {
        method: "POST",
        headers: {
          "X-API-KEY": apiKey,
          "X-SIGNATURE": signature,
        },
        body: formData,
      });

      //organizational context wala krna ha ab bas

      // Always parse JSON — even on error
      let data;
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      // Handle API errors (like 402)
      if (!response.ok) {
        const message =
          data?.error ||
          data?.message ||
          `Request failed with status ${response.status}`;
        alert(message);
        console.error("❌ API Error:", message);
        return; // Stop here
      }

      // Success flow
      console.log("✅ API Response:", data);

      if (!avatarRef.current) {
        console.error("Avatar reference is null");
        return;
      }

      if (!data.response) {
        console.error("No response in API data");
        return;
      }

      // await avatarRef.current.speak({
      //   text: data.response,
      //   task_type: TaskType.REPEAT,
      // });
      if (avatarRef.current && data.response) {
        console.log("Making avatar speak:", data.response);
        await avatarRef.current.speak({
          text: data.response,
          task_type: TaskType.REPEAT,
        });
      }

      setUserInput("");
      transcriptRef.current = "";
    } catch (error) {
      console.error("❌ Error sending message:", error);
      alert("Something went wrong. Check console for details.");
    } finally {
      setIsSpeaking(false);
    }
  };

  // Handle Enter key press in input
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
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

  const handleUnauthorized = useCallback(() => {
    logout();
  }, [logout]);

  const fetchActiveSubscription = useCallback(async () => {
    try {
      const response = await fetch(
        `${backendURL}/payments/active-subscription`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessToken()}`,
          },
        }
      );

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Active Subscription:", data);
      setActiveSubscription(data);
    } catch (err) {
      console.error("Error fetching active subscription:", err);
    }
  }, [getAccessToken, handleUnauthorized]);

  useEffect(() => {
    fetchActiveSubscription();
  }, [fetchActiveSubscription]);

  useEffect(() => {
    if (selectedGender === "binary") {
      setSelectedEthnicity("african_american");
      setSelectedAge("Young");

      // Find Marcus in availableAvatars and auto-select him
      const marcusAvatar = availableAvatars.find(
        (av) => av.name.toLowerCase() === "marcus"
      );

      if (marcusAvatar) {
        setSelectedAvatar(marcusAvatar.id);
      }
    }
  }, [selectedGender, availableAvatars]);

  if (!isSessionActive) {
    return (
      <div className="avatars-page">
        <div className="floating-shapes">
          <div className="floating-shape"></div>
          <div className="floating-shape"></div>
          <div className="floating-shape"></div>
          <div className="floating-shape"></div>
          <div className="floating-shape"></div>
        </div>

        <div className="grid-pattern"></div>
        {/* API Key Missing Popup */}
        {showKeyMissingPopup && (
          <div className="api-key-popup-overlay">
            <div className="api-key-popup">
              <div className="popup-header">
                <h3>API Key Required</h3>
                <button
                  className="popup-close"
                  onClick={() => setShowKeyMissingPopup(false)}
                >
                  ×
                </button>
              </div>
              <div className="popup-content">
                <p>
                  You have no API key and secret key. Please generate keys from
                  the <strong>Create API Key</strong> option in the user's
                  account dropdown.
                </p>
              </div>
              <div className="popup-footer">
                <button
                  className="popup-button"
                  onClick={() => setShowKeyMissingPopup(false)}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}
        <Link to="/">
          <img
            src={WhiteLogo}
            alt="TODO PHARMA AI"
            height={30}
            width={100}
            className="avatar-logo"
          />
        </Link>
        <div className="container-medium">
          <div className="start-form-container">
            <div className="start-form">
              <div className="form-header">
                <h1 className="form-title">Virtual AI Avatars</h1>
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
              </div>

              <div className="form-content">
                <div className="input-group">
                  <label htmlFor="category-select" className="input-label">
                    Choose Category
                  </label>
                  <select
                    id="category-select"
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    className="avatar-select"
                    disabled={isLoading}
                    required
                  >
                    <option value="">Select Category</option>

                    {(() => {
                      // 🔹 If no plan is active → default to free plan (beauty only)
                      const allowed = activeSubscription?.plan?.allowed_domains
                        ?.split(",")
                        ?.map((d) => d.trim()) || ["beauty"]; // Default free plan access

                      const categories = [
                        {
                          value: "therapy",
                          label: "Mental health coaching/therapy counseling",
                        },
                        { value: "beauty", label: "Beauty consulting" },
                        {
                          value: "consultation",
                          label: "Pharmaceutical consultancy",
                        },
                        { value: "medical", label: "Medical consultation" },
                      ];

                      return categories.map((cat) => {
                        const isAllowed = allowed.includes(cat.value);
                        return (
                          <option
                            key={cat.value}
                            value={cat.value}
                            disabled={!isAllowed}
                          >
                            {cat.label} {!isAllowed ? "🔒" : ""}
                          </option>
                        );
                      });
                    })()}
                  </select>

                  {errors.category && (
                    <p className="error-text">{errors.category}</p>
                  )}
                </div>

                <div className="form-alignment">
                  <div className="input-group">
                    <label htmlFor="gender-select" className="input-label">
                      Select Gender
                    </label>
                    <select
                      id="gender-select"
                      value={selectedGender}
                      onChange={(e) => setSelectedGender(e.target.value)}
                      className="avatar-select"
                      disabled={isLoading}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="binary">Non-binary</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label htmlFor="ethnicity-select" className="input-label">
                      Ethnicity
                    </label>
                    <select
                      id="ethnicity-select"
                      value={selectedEthnicity}
                      onChange={(e) => setSelectedEthnicity(e.target.value)}
                      className="avatar-select"
                      disabled={isLoading}
                    >
                      <option value="asian">Asian</option>
                      <option value="hispanic">Hispanic</option>
                      <option value="african_american">African American</option>
                    </select>
                  </div>
                </div>
                <div className="form-alignment">
                  {/* <div className="input-group">
                    <label htmlFor="language-select" className="input-label">
                      Language
                    </label>
                    <select
                      id="language-select"
                      value={selectedLanguage}
                      onChange={(e) => setSelectedLanguage(e.target.value)}
                      className="avatar-select"
                      disabled={isLoading}
                    >
                      <option value="">Select Language</option>
                     
                      {languages.map((lang) => (
                        <option key={lang} value={lang}>
                          {LANGUAGE_LABELS[lang] || lang.toUpperCase()}
                        </option>
                      ))}
                    </select>
                    {errors.lang && <p className="error-text">{errors.lang}</p>}
                  </div> */}

                  <div className="input-group">
                    <label htmlFor="language-select" className="input-label">
                      Language
                    </label>
                    <select
                      id="language-select"
                      value={selectedLanguage}
                      onChange={(e) => setSelectedLanguage(e.target.value)}
                      className="avatar-select"
                      disabled={isLoading || isLanguagesLoading}
                    >
                      <option value="">Select Language</option>
                      {isLanguagesLoading ? (
                        <option disabled>Loading...</option>
                      ) : (
                        languages.map((lang) => (
                          <option key={lang.code} value={lang.code}>
                            {lang.name}
                          </option>
                        ))
                      )}
                    </select>

                    {errors.lang && <p className="error-text">{errors.lang}</p>}
                  </div>

                  <div className="input-group">
                    <label htmlFor="age-select" className="input-label">
                      Age
                    </label>
                    <select
                      id="age-select"
                      value={selectedAge}
                      onChange={(e) => setSelectedAge(e.target.value)}
                      className="avatar-select"
                      disabled={isLoading}
                    >
                      <option value="">Select Age</option>
                      {[
                        ...new Set(
                          AVATAR_IDS[0][selectedGender]?.[
                            selectedEthnicity
                          ]?.map((av) => av.age)
                        ),
                      ].map((age) => (
                        <option key={age} value={age}>
                          {age}
                        </option>
                      ))}
                    </select>
                    {errors.age && <p className="error-text">{errors.age}</p>}
                  </div>
                </div>

                <div className="form-alignment">
                  <div className="input-group">
                    <label htmlFor="avatar-select" className="input-label">
                      Select Avatar
                    </label>
                    <select
                      id="avatar-select"
                      value={selectedAvatar}
                      onChange={(e) => setSelectedAvatar(e.target.value)}
                      className="avatar-select"
                      disabled={isLoading || availableAvatars.length === 0}
                    >
                      {availableAvatars.map((avatar) => (
                        <option key={avatar.id} value={avatar.id}>
                          {avatar.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {remainingRequests === 0 && (
                  <p className="credits-warning">
                    ⚠️ Your API credits are finished. Please upgrade your plan
                    to continue.
                  </p>
                )}

                <button
                  onClick={initializeAvatarSession}
                  // disabled={isLoading}
                  disabled={isLoading || remainingRequests === 0}
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

        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onAuthSuccess={handleAuthSuccess}
        />
      </div>
    );
  }

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
      </div>

      <div className="bottom-controls">
        <div className="container-medium">
          <div className="chat-section">
            <form onSubmit={handleSubmit} ref={formRef}>
              <div className="input-container">
                {/* <div className="textarea-wrapper"> */}
                <textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type what you want the avatar to say..."
                  className="fullscreen-chat-input"
                  disabled={!streamReady || isListening}
                  rows={2}
                />
                {isListening && (
                  <div className="voice-wave-overlay">
                    <div className="voice-wave-container">
                      <div className="voice-wave"></div>
                      <div className="voice-wave"></div>
                      <div className="voice-wave"></div>
                      <div className="voice-wave"></div>
                      <div className="voice-wave"></div>
                    </div>
                  </div>
                )}
                {/* </div> */}

                <button
                  type="button"
                  onClick={startListening}
                  className="mic-btn"
                  disabled={!streamReady}
                >
                  <span className="speak-icon">
                    <FaMicrophone color="#05b1bd" />
                  </span>
                </button>

                <button
                  type="submit"
                  className="fullscreen-speak-btn"
                  disabled={!streamReady || !userInput.trim() || isSpeaking}
                >
                  Send
                </button>
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
