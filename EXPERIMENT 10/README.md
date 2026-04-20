# EXPERIMENT 10: LibreChat - Real-Time WebSocket Chat Application

[![Java](https://img.shields.io/badge/Java-17-orange)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.5-brightgreen)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-19.2.4-blue)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0.4-646CFF)](https://vitejs.dev/)
[![WebSocket](https://img.shields.io/badge/WebSocket-STOMP-red)](https://stomp.github.io/)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

A modern, full-stack real-time chat application demonstrating WebSocket communication between a Spring Boot backend and a React frontend. Features glassmorphism UI design and instant messaging capabilities.

## 🌟 Features

- **Real-Time Messaging**: Instant two-way communication using WebSocket and STOMP protocol
- **Modern UI**: Glassmorphism design with smooth animations and responsive layout
- **Cross-Platform**: Works on desktop and mobile browsers
- **Fallback Support**: SockJS ensures compatibility with older browsers
- **Scalable Architecture**: Spring Boot backend with STOMP message broker
- **Fast Development**: Vite-powered frontend for rapid development and hot reloading

## 🏗️ Architecture

```
┌─────────────────┐    WebSocket/STOMP    ┌─────────────────┐
│   React Frontend│◄────────────────────►│ Spring Boot Backend │
│   (Port 5173)   │                      │   (Port 8080)     │
└─────────────────┘                      └─────────────────┘
```

### Message Flow
1. Client connects via SockJS to `/ws` endpoint
2. STOMP protocol enables publish/subscribe messaging
3. Messages sent to `/app/chat` are broadcasted to `/topic/messages`
4. All connected clients receive real-time updates

## 🚀 Quick Start

### Prerequisites
- Java 17 or higher
- Node.js 18+ and npm
- Maven 3.6+

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Prince-jangra/SPA.git
   cd SPA/EXPERIMENT\ 10/Websocketdev
   ```

2. **Backend Setup**
   ```bash
   cd Websocketdev
   mvn clean install
   mvn spring-boot:run
   ```
   Backend will start on `http://localhost:8080`

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Frontend will start on `http://localhost:5173`

4. **Access the Application**
   Open `http://localhost:5173` in your browser

## 📁 Project Structure

```
EXPERIMENT 10/
├── Websocketdev/
│   ├── documentation.md          # Detailed technical documentation
│   ├── frontend/                 # React + Vite client
│   │   ├── src/
│   │   │   ├── App.jsx          # Main chat component with WebSocket logic
│   │   │   ├── App.css          # Glassmorphism styling
│   │   │   └── main.jsx         # React entry point
│   │   ├── package.json
│   │   └── vite.config.js
│   └── Websocketdev/             # Spring Boot server
│       ├── pom.xml
│       ├── src/main/java/com/aml3A/Websocketdev/
│       │   ├── WebsocketdevApplication.java
│       │   ├── Message.java                    # Message data model
│       │   ├── config/WebSocketConfig.java     # WebSocket configuration
│       │   └── controller/ChatController.java  # Message handling
│       └── src/main/resources/application.properties
└── README.md                     # This file
```

## 🛠️ Technologies Used

### Backend
- **Spring Boot 3.2.5**: Framework for building the REST API and WebSocket server
- **Spring WebSocket**: WebSocket support with STOMP protocol
- **Maven**: Dependency management and build tool
- **Java 17**: Programming language

### Frontend
- **React 19.2.4**: UI library for building the user interface
- **Vite 8.0.4**: Fast build tool and development server
- **SockJS 1.6.1**: WebSocket fallback for browser compatibility
- **STOMP.js 7.3.0**: STOMP protocol implementation for JavaScript

## 🎨 UI Design

The application features a modern glassmorphism design with:
- Translucent backgrounds with blur effects
- Gradient borders and shadows
- Smooth animations and transitions
- Responsive layout for all screen sizes
- Clean typography and intuitive user experience

## 🔧 Configuration

### Backend Configuration
The WebSocket endpoint is configured in `WebSocketConfig.java`:
- Endpoint: `/ws`
- Allowed origins: `*` (configurable for production)
- Message broker: `/topic` for broadcasts, `/app` for client messages

### Frontend Configuration
WebSocket connection settings in `App.jsx`:
- Server URL: `http://localhost:8080/ws`
- Subscription topic: `/topic/messages`
- Send destination: `/app/chat`

## 📖 API Reference

### WebSocket Endpoints
- `CONNECT /ws` - Establish WebSocket connection
- `SUBSCRIBE /topic/messages` - Receive broadcast messages
- `SEND /app/chat` - Send a message (JSON payload)

### Message Format
```json
{
  "sender": "username",
  "content": "message text"
}
```

## 🐛 Troubleshooting

### Common Issues

1. **Connection Failed**
   - Ensure backend is running on port 8080
   - Check firewall settings
   - Verify WebSocket endpoint configuration

2. **Messages Not Appearing**
   - Check browser console for JavaScript errors
   - Verify STOMP subscription is active
   - Ensure message format matches expected JSON structure

3. **Build Errors**
   - Run `mvn clean install` for backend
   - Run `npm install` for frontend
   - Check Java and Node.js versions

### Development Tips
- Use browser developer tools to inspect WebSocket connections
- Check Spring Boot logs for backend errors
- Enable React DevTools for frontend debugging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📚 Additional Resources

- [Spring WebSocket Documentation](https://docs.spring.io/spring-framework/docs/current/reference/html/web.html#websocket)
- [STOMP Protocol Specification](https://stomp.github.io/stomp-specification-1.2.html)
- [React Documentation](https://reactjs.org/docs/)
- [Vite Documentation](https://vitejs.dev/guide/)

## 📞 Support

For questions or issues, please open an issue on GitHub or refer to the detailed [documentation.md](Websocketdev/documentation.md) for technical implementation details.

---

*Built with ❤️ for learning real-time web technologies*</content>
<parameter name="filePath">c:\Users\princ\OneDrive\Desktop\SPA\EXPERIMENT 10\README.md