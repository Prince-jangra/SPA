import { useState, useEffect, useRef, useCallback } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client/dist/sockjs.min.js';
import './App.css';

const BACKEND_URL = 'http://localhost:8080/ws';

// Convert a Blob to base64 string
const blobToBase64 = (blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result); // "data:audio/webm;base64,..."
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });

function useRecorder() {
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);

  const start = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      chunksRef.current = [];
      mr.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      mr.start();
      mediaRecorderRef.current = mr;
      setRecording(true);
      setSeconds(0);
      timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    } catch {
      alert('Microphone access denied. Please allow microphone access and try again.');
    }
  }, []);

  const stop = useCallback(() =>
    new Promise((resolve) => {
      const mr = mediaRecorderRef.current;
      if (!mr) return resolve(null);
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mr.mimeType || 'audio/webm' });
        mr.stream.getTracks().forEach((t) => t.stop());
        resolve(blob);
      };
      mr.stop();
      clearInterval(timerRef.current);
      setRecording(false);
      setSeconds(0);
    }), []);

  useEffect(() => () => clearInterval(timerRef.current), []);

  return { recording, seconds, start, stop };
}

function formatTime(s) {
  const m = Math.floor(s / 60).toString().padStart(2, '0');
  const sec = (s % 60).toString().padStart(2, '0');
  return `${m}:${sec}`;
}

function VoicePlayer({ audioData, isOwn }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) { el.pause(); } else { el.play(); }
  };

  return (
    <div className={`voice-player ${isOwn ? 'own' : ''}`}>
      <audio
        ref={audioRef}
        src={audioData}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => { setPlaying(false); setProgress(0); }}
        onTimeUpdate={(e) => setProgress(e.target.currentTime / (e.target.duration || 1))}
        onLoadedMetadata={(e) => setDuration(e.target.duration)}
      />
      <button className="play-btn" onClick={toggle} title={playing ? 'Pause' : 'Play'}>
        {playing ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
        )}
      </button>
      <div className="voice-track">
        <div className="voice-bar">
          <div className="voice-fill" style={{ width: `${progress * 100}%` }} />
        </div>
        <span className="voice-duration">
          {audioRef.current && playing
            ? formatTime(Math.floor(audioRef.current.currentTime))
            : formatTime(Math.floor(duration))}
        </span>
      </div>
      <span className="voice-label">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
      </span>
    </div>
  );
}

const avatarColor = (name) => {
  const colors = ['#4f46e5', '#3b82f6', '#0ea5e9', '#14b8a6', '#8b5cf6', '#f43f5e'];
  return colors[name ? name.charCodeAt(0) % colors.length : 0];
};

function App() {
  const [username, setUsername] = useState('');
  const [joined, setJoined] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [theme, setTheme] = useState('dark');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const clientRef = useRef(null);
  const messagesEndRef = useRef(null);
  const { recording, seconds, start: startRec, stop: stopRec } = useRecorder();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(() => { scrollToBottom(); }, [messages]);

  const connect = useCallback(() => {
    setConnecting(true);
    const client = new Client({
      webSocketFactory: () => new SockJS(BACKEND_URL),
      reconnectDelay: 5000,
      onConnect: () => {
        setConnected(true);
        setConnecting(false);
        client.subscribe('/topic/messages', (frame) => {
          const msg = JSON.parse(frame.body);
          const now = new Date();
          setMessages((prev) => [
            ...prev,
            { ...msg, timestamp: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), id: Date.now() + Math.random() },
          ]);
          setOnlineUsers((prev) => prev.includes(msg.sender) ? prev : [...prev, msg.sender]);
        });
      },
      onDisconnect: () => { setConnected(false); setConnecting(false); },
      onStompError: (frame) => { console.error('STOMP error:', frame); setConnecting(false); },
    });
    client.activate();
    clientRef.current = client;
  }, []);

  const disconnect = useCallback(() => {
    clientRef.current?.deactivate();
    setConnected(false); setJoined(false);
    setMessages([]); setUsername(''); setOnlineUsers([]);
  }, []);

  useEffect(() => () => clientRef.current?.deactivate(), []);

  const handleJoin = (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    connect();
    setJoined(true);
    setOnlineUsers([username]);
    setMessages([{
      sender: 'System', content: `${username} joined the chat`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSystem: true, id: 'welcome', type: 'text',
    }]);
  };

  const publishMessage = (payload) => {
    if (!clientRef.current || !connected) return;
    try {
      clientRef.current.publish({ destination: '/app/chat', body: JSON.stringify(payload) });
    } catch (err) {
      console.error('Failed to publish message:', err);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || !connected) return;
    publishMessage({ sender: username, content: input, type: 'text' });
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) handleSend(e);
  };

  const handleMicClick = async () => {
    if (!recording) {
      await startRec();
    } else {
      const blob = await stopRec();
      if (!blob || !connected) return;

      // Guard: empty blob means no mic audio was captured
      if (blob.size < 1000) {
        console.warn('Voice blob is empty or too small — no microphone audio captured.');
        alert('No audio was captured. Make sure your microphone is connected and allowed.');
        return;
      }

      // Guard: base64 of ~1MB audio ≈ 1.33MB payload — warn if too large
      if (blob.size > 750_000) {
        alert('Recording is too long (max ~30 seconds). Please record a shorter message.');
        return;
      }

      const base64 = await blobToBase64(blob);
      console.log(`Sending voice message: ${blob.size} bytes, type=${blob.type}`);
      publishMessage({ sender: username, content: '', type: 'voice', audioData: base64 });
    }
  };

  const groupedMessages = messages.reduce((acc, msg, idx) => {
    const prev = messages[idx - 1];
    const grouped = prev && prev.sender === msg.sender && !msg.isSystem && !prev.isSystem;
    acc.push({ ...msg, grouped });
    return acc;
  }, []);

  if (!joined) {
    return (
      <div className="app join-screen">
        <header className="join-header">
          <div className="brand-minimal">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            <span>LibreChat</span>
          </div>
          <div className="header-features">
            <span>Instant Delivery</span>
            <span>Voice Messages</span>
            <span>Multi-User</span>
          </div>
          <button className="theme-toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} title="Toggle theme">
            {theme === 'dark' ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            )}
          </button>
        </header>

        <main className="join-main">
          <div className="join-card">
            <h2>Welcome back</h2>
            <p className="join-sub">Enter your display name to join the chat room</p>
            <form onSubmit={handleJoin} className="join-form">
              <label htmlFor="username-input">Display Name</label>
              <div className="input-wrapper">
                <span className="input-prefix">@</span>
                <input id="username-input" type="text" placeholder="e.g. Alice, Bob..." value={username}
                  onChange={(e) => setUsername(e.target.value)} autoFocus maxLength={30} />
              </div>
              <button id="join-btn" type="submit" disabled={!username.trim()}>Join Chat Room →</button>
              <p className="hint">Open in multiple tabs to simulate multiple users</p>
            </form>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="app chat-layout">
      {/* ── Sidebar ── */}
      <aside className={`sidebar ${sidebarOpen ? '' : 'collapsed'}`}>
        <div className="sidebar-brand">
          <div className="brand-wrap">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            <span>LibreChat</span>
          </div>
          <button className="sidebar-toggle-inner" onClick={() => setSidebarOpen(false)} title="Hide sidebar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="9" y1="3" x2="9" y2="21"></line>
            </svg>
          </button>
        </div>
        <div className="sidebar-section">
          <div className="sidebar-section-header">
            <div className="sidebar-section-title">WORKSPACES</div>
          </div>
          <div className="channel active">Global Workspace</div>
        </div>
        <div className="sidebar-section">
          <div className="sidebar-section-title">ONLINE — {onlineUsers.length}</div>
          <div className="user-list">
            {onlineUsers.map((u) => (
              <div key={u} className={`user-item ${u === username ? 'is-self' : ''}`}>
                <div className="user-avatar" style={{ background: avatarColor(u) }}>{u[0]?.toUpperCase()}</div>
                <span className="user-name">{u}</span>
                {u === username && <span className="you-tag">you</span>}
              </div>
            ))}
          </div>
        </div>
        <div className="sidebar-footer">
          <div className="self-info">
            <div className="user-avatar sm" style={{ background: avatarColor(username) }}>{username[0]?.toUpperCase()}</div>
            <div className="self-meta">
              <span className="self-name">{username}</span>
              <span className={`self-status ${connected ? 'online' : 'offline'}`}>
                <span className="dot" /> {connecting ? 'Connecting…' : connected ? 'Online' : 'Disconnected'}
              </span>
            </div>
          </div>
          <button id="disconnect-btn" className="leave-btn" onClick={disconnect} title="Leave">⏏</button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="main">
        <header className="topbar">
          <div className={`topbar-left ${!sidebarOpen ? 'full-width' : ''}`}>
            {!sidebarOpen && (
              <button className="sidebar-toggle floating" onClick={() => setSidebarOpen(true)} title="Open sidebar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="9" y1="3" x2="9" y2="21"></line>
                </svg>
              </button>
            )}
            <span className="channel-name">Global Workspace</span>
            <span className="topbar-divider" />
            <span className="topbar-desc">Secure end-to-end communication for teams</span>
          </div>
          <div className="topbar-right">
            <div className={`conn-status ${connected ? 'live' : 'dead'}`}>
              <span className="dot" />{connecting ? 'Connecting…' : connected ? 'Live' : 'Disconnected'}
            </div>
            <div className="msg-count">{messages.filter(m => !m.isSystem).length} messages</div>
            <button className="theme-toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} title="Toggle theme">
              {theme === 'dark' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
              )}
            </button>
          </div>
        </header>

        <main className="messages-pane" id="messages-area">
          <div className="channel-welcome">
            <h3>Welcome to the Global Workspace</h3>
            <p>Collaborate in real-time with your team using secure text and voice messaging.</p>
          </div>

          {groupedMessages.map((msg) => {
            if (msg.isSystem) return (
              <div key={msg.id} className="system-msg"><span>{msg.content}</span></div>
            );
            const isOwn = msg.sender === username;
            return (
              <div key={msg.id} className={`msg-row ${msg.grouped ? 'grouped' : ''}`}>
                {!msg.grouped
                  ? <div className="msg-avatar" style={{ background: avatarColor(msg.sender) }}>{msg.sender[0]?.toUpperCase()}</div>
                  : <div className="msg-avatar-spacer" />
                }
                <div className="msg-body">
                  {!msg.grouped && (
                    <div className="msg-meta">
                      <span className={`msg-sender ${isOwn ? 'is-self' : ''}`}>{isOwn ? `${msg.sender} (you)` : msg.sender}</span>
                      <span className="msg-time">{msg.timestamp}</span>
                    </div>
                  )}
                  {msg.type === 'voice'
                    ? <VoicePlayer audioData={msg.audioData} isOwn={isOwn} />
                    : <div className={`msg-bubble ${isOwn ? 'own' : ''}`}>{msg.content}</div>
                  }
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </main>

        <footer className="input-bar">
          {recording && (
            <div className="recording-banner">
              <span className="rec-dot" />
              <span>Recording… {formatTime(seconds)}</span>
              <span className="rec-hint">Click the mic again to send</span>
            </div>
          )}
          <form onSubmit={handleSend} className="input-form">
            <div className={`input-box ${!connected ? 'disabled' : ''}`}>
              {/* Mic button */}
              <button
                id="mic-btn"
                type="button"
                className={`mic-btn ${recording ? 'recording' : ''}`}
                onClick={handleMicClick}
                disabled={!connected}
                title={recording ? 'Stop & send voice message' : 'Start voice recording'}
              >
                {recording ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.49 6-3.31 6-6.72h-1.7z"/>
                  </svg>
                )}
              </button>

              <input
                id="message-input"
                type="text"
                placeholder={recording ? 'Recording… click mic to send' : connected ? `Message #general as ${username}…` : 'Connecting to server…'}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={!connected || recording}
                maxLength={500}
                autoComplete="off"
              />
              <button id="send-btn" type="submit" disabled={!connected || !input.trim() || recording} className="send-btn">
                Send
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
              </button>
            </div>
            {!connected && !connecting && (
              <p className="conn-warn">⚠ Not connected — make sure Spring Boot is running on port 8080</p>
            )}
          </form>
        </footer>
      </div>
    </div>
  );
}

export default App;
