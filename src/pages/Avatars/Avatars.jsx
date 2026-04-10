import React, { useState, useRef, useEffect, useCallback } from "react";
import { LiveAvatarSession, SessionEvent } from "@heygen/liveavatar-web-sdk";
import "./AvatarsPage.css";
import { AVATAR_IDS, backendURL } from "../../config/constants";
import AuthModal from "../../components/HomePage/AuthModal/AuthModal";
import WhiteLogo from "../../../src/assets/logo todo 1.png";
import { Link } from "react-router-dom";
import { FaMicrophone } from "react-icons/fa";
import { useAuth } from "../../providers/AuthContext";

const LANGUAGE_CODE_MAP = {
  eng: "en",
  ita: "it",
  it: "it",
  fra: "fr",
  fr: "fr",
  spa: "es",
  es: "es",
  deu: "de",
  de: "de",
  por: "pt",
  pt: "pt",
  zho: "zh",
  zh: "zh",
  jpn: "ja",
  ja: "ja",
  kor: "ko",
  ko: "ko",
  ara: "ar",
  ar: "ar",
  rus: "ru",
  ru: "ru",
  hin: "hi",
  hi: "hi",
  pol: "pl",
  pl: "pl",
  nld: "nl",
  nl: "nl",
  tur: "tr",
  tr: "tr",
  swe: "sv",
  sv: "sv",
  nor: "no",
  no: "no",
  dan: "da",
  da: "da",
  fin: "fi",
  fi: "fi",
  hun: "hu",
  hu: "hu",
  ces: "cs",
  cs: "cs",
  ron: "ro",
  ro: "ro",
  ukr: "uk",
  uk: "uk",
  vie: "vi",
  vi: "vi",
  tha: "th",
  th: "th",
  ind: "id",
  id: "id",
  msa: "ms",
  ms: "ms",
};

const toIso2 = (code) => LANGUAGE_CODE_MAP[code] || code;

const Avatars = () => {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const [selectedGender, setSelectedGender] = useState("male");
  const [selectedEthnicity, setSelectedEthnicity] = useState("asian");
  const [selectedAge, setSelectedAge] = useState("Young");

  const availableAvatars =
    AVATAR_IDS[0][selectedGender]?.[selectedEthnicity]?.filter(
      (av) =>
        !selectedAge || av.age.toLowerCase() === selectedAge.toLowerCase(),
    ) || [];

  const [selectedAvatar, setSelectedAvatar] = useState(
    availableAvatars.length > 0 ? availableAvatars[0].id : "",
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
  const [showAccessErrorPopup, setShowAccessErrorPopup] = useState(false);
  const [accessErrorMessage, setAccessErrorMessage] = useState("");
  const [remainingRequests, setRemainingRequests] = useState(null);

  const [userApiKeys, setUserApiKeys] = useState({
    apiKey: null,
    secretKey: null,
  });
  const [showKeyMissingPopup, setShowKeyMissingPopup] = useState(false);

  const { getAccessToken, logout } = useAuth();

  const videoRef = useRef(null);
  const avatarRef = useRef(null);
  const formRef = useRef(null);
  const transcriptRef = useRef("");
  const popupTimerRef = useRef(null);

  // ─────────────────────────────────────────────
  // Fetch user API keys
  // ─────────────────────────────────────────────
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
          setUserApiKeys({ apiKey: data.api_key, secretKey: data.secret_key });
          setShowKeyMissingPopup(false);
          if (popupTimerRef.current) clearTimeout(popupTimerRef.current);
        } else {
          setShowKeyMissingPopup(true);
          popupTimerRef.current = setTimeout(
            () => setShowKeyMissingPopup(false),
            10000,
          );
        }
      }
    } catch (error) {
      console.error("Error fetching user API keys:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) fetchUserApiKeys();
  }, [isAuthenticated]);

  useEffect(() => {
    if (selectedEthnicity === "african_american") {
      setSelectedGender("male");
    }
  }, [selectedEthnicity]);

  // ─────────────────────────────────────────────
  // Fetch supported languages
  // ─────────────────────────────────────────────
  const fetchSupportedLanguages = async () => {
    try {
      setIsLanguagesLoading(true);
      const response = await fetch(`${backendURL}/agents/supported-languages/`);
      const data = await response.json();

      if (!response.ok)
        throw new Error(data.error || "Failed to fetch languages");

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

  // ─────────────────────────────────────────────
  // Sync selected avatar when filters change
  // ─────────────────────────────────────────────
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

  // ─────────────────────────────────────────────
  // Check auth on mount
  // ─────────────────────────────────────────────
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsAuthenticated(true);
      setUserToken(token);
    }
  }, []);

  const handleAuthSuccess = (token) => {
    setIsAuthenticated(true);
    setUserToken(token);
    setShowAuthModal(false);
    fetchUserApiKeys();
  };

  // ─────────────────────────────────────────────
  // HMAC Signature
  // ─────────────────────────────────────────────
  const generateSignature = async (payload, apiKey) => {
    const secretKey = userApiKeys.secretKey;

    const enc = new TextEncoder();
    const keyData = enc.encode(secretKey);
    const payloadData = enc.encode(payload);

    const cryptoKey = await window.crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"],
    );

    const signatureBuffer = await window.crypto.subtle.sign(
      "HMAC",
      cryptoKey,
      payloadData,
    );

    return Array.from(new Uint8Array(signatureBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  };

  // ─────────────────────────────────────────────
  // Handle stream disconnection
  // ─────────────────────────────────────────────
  const handleStreamDisconnected = () => {
    console.log("🔌 Stream disconnected");
    if (videoRef.current) videoRef.current.srcObject = null;
    avatarRef.current = null;
    setIsSessionActive(false);
    setStreamReady(false);
    setConnectionStatus("disconnected");
  };

  // ─────────────────────────────────────────────
  // Validate form fields
  // ─────────────────────────────────────────────
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

  // ─────────────────────────────────────────────
  // Initialize avatar session
  // ─────────────────────────────────────────────
  const initializeAvatarSession = async () => {
    try {
      if (!validateFields()) return;

      if (!isAuthenticated) {
        setShowAuthModal(true);
        return;
      }

      if (!userApiKeys.apiKey || !userApiKeys.secretKey) {
        setShowKeyMissingPopup(true);
        popupTimerRef.current = setTimeout(
          () => setShowKeyMissingPopup(false),
          10000,
        );
        return;
      }

      setIsLoading(true);
      setConnectionStatus("connecting");
      setStreamReady(false);

      // STEP 1 — Check quota BEFORE starting session
      const quotaSignature = await generateSignature("", userApiKeys.apiKey);
      const planRes = await fetch(
        `${backendURL}/agents/generate-response/access`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
            "X-API-KEY": userApiKeys.apiKey,
            "X-SIGNATURE": quotaSignature,
          },
        },
      );

      let planData;
      try {
        planData = await planRes.json();
      } catch {
        planData = {};
      }

      if (!planRes.ok) {
        const errorMsg =
          planData?.error ||
          planData?.message ||
          planData?.detail ||
          "Your usage limit has been reached. Please upgrade your plan.";
        setAccessErrorMessage(errorMsg);
        setShowAccessErrorPopup(true);
        popupTimerRef.current = setTimeout(
          () => setShowAccessErrorPopup(false),
          10000,
        );
        setIsLoading(false);
        return;
      }

      console.log("🚀 Starting avatar session...");

      // STEP 2 — Get voice_id from selected avatar
      const selectedAvatarData = availableAvatars.find(
        (av) => av.id === selectedAvatar,
      );
      const voiceId = selectedAvatarData?.voice_id || "";

      // STEP 3 — Convert language code to ISO 639-1 (2-letter)
      // LiveAvatar API requires "en" not "eng", "it" not "ita", etc.
      const isoLanguage = toIso2(selectedLanguage);
      console.log(
        `🌐 Language: ${selectedLanguage} → ${isoLanguage} (sent to LiveAvatar)`,
      );

      // STEP 4 — Get session token from backend
      const sessionSignature = await generateSignature("", userApiKeys.apiKey);
      const sessionRes = await fetch(
        `${backendURL}/agents/generate-heygen-session/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": userApiKeys.apiKey,
            "X-Signature": sessionSignature,
          },
          body: JSON.stringify({
            mode: "FULL",
            avatar_id: selectedAvatar,
            avatar_persona: {
              voice_id: voiceId,
              language: isoLanguage, // ✅ ISO 639-1: "en" not "eng"
            },
          }),
        },
      );

      let sessionData;
      try {
        sessionData = await sessionRes.json();
      } catch {
        sessionData = {};
      }

      if (!sessionRes.ok) {
        throw new Error(
          sessionData?.error ||
            sessionData?.message ||
            `Session creation failed (${sessionRes.status})`,
        );
      }

      console.log("✅ Session data received:", sessionData);

      // Extract token — handle different response shapes
      const token =
        sessionData?.session_token ||
        sessionData?.token ||
        sessionData?.data?.token ||
        sessionData?.data?.session_token ||
        sessionData?.data?.livekit_client_token;

      if (!token) {
        throw new Error(
          "No session token in backend response: " +
            JSON.stringify(sessionData),
        );
      }

      console.log("🎫 Session token received");

      // STEP 5 — Initialize LiveAvatarSession and start
      avatarRef.current = new LiveAvatarSession(token);

      avatarRef.current.on(SessionEvent.SESSION_STREAM_READY, () => {
        console.log("🎥 Stream ready — attaching to video element");
        if (videoRef.current) {
          avatarRef.current.attach(videoRef.current);
          // ✅ Force unmute + volume after attach
          videoRef.current.muted = false;
          videoRef.current.volume = 1.0;

          videoRef.current.play().catch((err) => {
            console.warn("Autoplay blocked:", err);
          });
        }
        setStreamReady(true);
        setConnectionStatus("connected");
      });

      avatarRef.current.on(SessionEvent.SESSION_END, () => {
        console.log("🔌 Session ended by server");
        handleStreamDisconnected();
      });
      setIsSessionActive(true);
      await avatarRef.current.start();
      console.log("✅ Avatar session started successfully");
      setIsSessionActive(true);
    } catch (error) {
      console.error("❌ Error initializing avatar session:", error);
      setConnectionStatus("error");
      alert(`Failed to start avatar session: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // ─────────────────────────────────────────────
  // Terminate avatar session
  // ─────────────────────────────────────────────
  const terminateAvatarSession = async () => {
    try {
      setIsLoading(true);

      if (avatarRef.current) {
        await avatarRef.current.stop();
        console.log("🛑 Session stopped");
      }

      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }

      avatarRef.current = null;
      setIsSessionActive(false);
      setStreamReady(false);
      setConnectionStatus("disconnected");
    } catch (error) {
      console.error("Error terminating avatar session:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // ─────────────────────────────────────────────
  // Speech recognition
  // ─────────────────────────────────────────────
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (
      !("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
    ) {
      console.error("Speech Recognition not supported in this browser.");
    }
  }, []);

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
    recognition.continuous = true;
    recognition.interimResults = true;

    recognitionRef.current = recognition;
    transcriptRef.current = "";
    setUserInput("");
    setIsListening(true);
    recognition.start();

    recognition.onresult = (event) => {
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript + " ";
        }
      }
      transcriptRef.current = finalTranscript.trim();
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
        await handleSubmit({ preventDefault: () => {} });
      }
    };
  };

  // ─────────────────────────────────────────────
  // Handle submit — send to backend & avatar.repeat()
  // ─────────────────────────────────────────────
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
      formData.append("lang", selectedLanguage); // backend uses its own lang codes

      const apiKey = userApiKeys.apiKey;
      const signature = await generateSignature(selectedOption, apiKey);

      const response = await fetch(`${backendURL}/agents/generate-response/`, {
        method: "POST",
        headers: {
          "X-API-KEY": apiKey,
          "X-SIGNATURE": signature,
        },
        body: formData,
      });

      let data;
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        const message =
          data?.error ||
          data?.message ||
          `Request failed with status ${response.status}`;
        alert(message);
        console.error("❌ API Error:", message);
        return;
      }

      console.log("✅ API Response:", data);

      if (!avatarRef.current) {
        console.error("Avatar reference is null");
        return;
      }

      if (!data.response) {
        console.error("No response in API data");
        return;
      }

      console.log("🗣 Making avatar speak:", data.response);
      await avatarRef.current.repeat(data.response);

      setUserInput("");
      transcriptRef.current = "";
    } catch (error) {
      console.error("❌ Error sending message:", error);
      alert("Something went wrong. Check console for details.");
    } finally {
      setIsSpeaking(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // ─────────────────────────────────────────────
  // Cleanup on unmount
  // ─────────────────────────────────────────────
  useEffect(() => {
    return () => {
      if (avatarRef.current) {
        avatarRef.current.stop().catch(() => {});
      }
      if (popupTimerRef.current) clearTimeout(popupTimerRef.current);
    };
  }, []);

  // ─────────────────────────────────────────────
  // Active subscription
  // ─────────────────────────────────────────────
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
        },
      );

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

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

  // ─────────────────────────────────────────────
  // Status helpers
  // ─────────────────────────────────────────────
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

        {/* Access Error Popup */}
        {showAccessErrorPopup && (
          <div className="api-key-popup-overlay">
            <div className="api-key-popup">
              <div className="popup-header">
                <h3>Access Error</h3>
                <button
                  className="popup-close"
                  onClick={() => setShowAccessErrorPopup(false)}
                >
                  ×
                </button>
              </div>
              <div className="popup-content">
                <p>{accessErrorMessage}</p>
              </div>
              <div className="popup-footer">
                <button
                  className="popup-button"
                  onClick={() => setShowAccessErrorPopup(false)}
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
                {/* Category */}
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
                      const allowed = activeSubscription?.plan?.allowed_domains
                        ?.split(",")
                        ?.map((d) => d.trim()) || ["beauty"];

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

                {/* Gender + Ethnicity */}
                <div className="form-alignment">
                  <div className="input-group">
                    <label htmlFor="gender-select" className="input-label">
                      Select Gender
                    </label>
                    {/* <select
                      id="gender-select"
                      value={selectedGender}
                      onChange={(e) => setSelectedGender(e.target.value)}
                      className="avatar-select"
                      disabled={isLoading}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select> */}
                    <select
                      id="gender-select"
                      value={selectedGender}
                      onChange={(e) => setSelectedGender(e.target.value)}
                      className="avatar-select"
                      disabled={isLoading}
                    >
                      <option value="male">Male</option>
                      <option
                        value="female"
                        disabled={selectedEthnicity === "african_american"}
                      >
                        Female{" "}
                        {selectedEthnicity === "african_american" ? "🔒" : ""}
                      </option>
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

                {/* Language + Age */}
                <div className="form-alignment">
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
                          ]?.map((av) => av.age),
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

                {/* Avatar */}
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
                    {errors.avatar && (
                      <p className="error-text">{errors.avatar}</p>
                    )}
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

  // ─────────────────────────────────────────────
  // RENDER — Active Session
  // ─────────────────────────────────────────────
  return (
    <div className="avatars-page active-session">
      <div className="fullscreen-video-container">
        <video
          ref={videoRef}
          className="fullscreen-avatar-video"
          autoPlay
          playsInline
        />

        {!streamReady && (
          <div className="loading-overlay">
            <div className="loading-content">
              {/* <span className="loading-spinner large"></span> */}
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
                {/* <div> */}
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
                <button
                  onClick={terminateAvatarSession}
                  disabled={isLoading}
                  className="end-session-btn"
                >
                  {isLoading ? "Ending..." : "End Session"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Avatars;
