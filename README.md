# letsdrawtogether

## An Exploration in Web Sockets
  
### Building a Real-Time Multi-Player Game with Web Sockets and Other Networking Considerations

https://letsdrawtogether.net

Source code:
https://github.com/rich-java-dev/letsdrawtogether

CS5283 - Computer Networking
Richard White

**What are Web Sockets and how do they work?**

**RFC 6455:** [https://datatracker.ietf.org/doc/html/rfc6455](https://datatracker.ietf.org/doc/html/rfc6455) (71 pages !)

December 2011

Abstract:


>“The WebSocket Protocol enables two-way communication between a client running untrusted code in a controlled environment to a remote host that has opted-in to communications from that code.  The security
model used for this is the origin-based security model commonly used
by web browsers.  The protocol consists of an opening handshake
followed by basic message framing, layered over TCP.  The goal of this technology is to provide a mechanism for browser-based applications that need two-way communication with servers that does not rely on opening multiple HTTP connections (e.g., using XMLHttpRequest or iframes and long polling).”

Moreover, web sockets are a protocol/solution set out to create a low-overhead, 2-way communication channel between client and server that was meant to be more efficient than the solutions of the time around 2011/2012. It was also imperative that the solution work well in the existing web landscape, being able to benefit from HTTP architecture.

Prior solutions included having clients continuously send AJAX requests to check the server for updates.

This technique is known as long-polling and was expensive due to creating new HTTP connections for each. This is also limited as the client always has to initiate all interactions via requests.

Web socket protocol is independent/different from HTTP, though meant to be fully compatible and does similarly run over ports 80 and 433.

# Use Cases:

Web sockets provide a near real-time mechanism to send data to and from clients and servers and low over-head.

Examples may include real-time gaming applications, chat applications, stock exchange updates, live news feeds, and even in IoT (MQTT over Web Sockets).

Web Sockets have become ubiquitous in modern web-applications due their high compatibility with HTTP, and robust benefits offered.

Audio/Video over IP.

# Chief Benefits:

- Bidirectional communication – Unlike traditional HTTP Request/Response model, web socket communication can be initiated by either client or server, (not limited to client having to initiate request).

- Persistent Connection – Web Socket protocol defines keeping the TCP connection active/open (by a ‘ping pong’ process of server checking clients). Keeping these connections open and re-using these duplexed channels reduces overhead/waste of provisioning/tear down connections.

- Speed - These factors help attribute to lower latency/faster response times.  
- Extensibility – designed to be fully compatible and integrate well with 40+ other protocols

- Secure – WSS (Websocket Secure) uses connections tunneled over TLS on port 433, provided encryption/security on same order as HTTPS.

# How Web Sockets Work:

HTTP Request uses the UPGRADE header to take the existing TCP connection established for the original HTTP Request, and re-purposes this connection to provide 2-way communication in which clients and servers can both push to one another.

Hand Shake Example:

Client Request:
  GET /chat HTTP/1.1

Host: server.example.com
Upgrade: websocket
Connection: Upgrade

Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13
Origin: http://example.com

Server response:
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: HSmrc0sMlYUkAGmm5OPpG2HaGWk=
Sec-WebSocket-Protocol: chat


# Letsdrawtogether.net

To have fun and put my personal spin on this project, I needed a good use-case.
I went with a real-time, multi-user ‘shared’ drawing/canvas application.
This felt like an ideal use-case for the technology given all the above benefits.

First Iteration/Proto-type (Proof of Concept).

- Client – Build a light weight/small React App front-end. (will run in Web Browser)
	- react
	- material-ui
	- webpack
	
- Server – NodeJS/Express as a web-server
- Nginx – reverse proxy to provide secure connections/forward HTTP traffic to node web server.
- Certbot – provide free/auto renewals for HTTPS certificates
- Running on Linux
- PM2 - process manager for node/express apps

Connecting Server and Client:
Server:
- Instantiate a web socket server, which piggy-backs off of existing HTTP server, specified at a given end-point.

# Data Model
```
{
type: Types.CIRCLE/Enum, - Shape/classification to  be drawn to the canvas.
color: string, - color of the object to draw
radius: int, - radius/size of shape
posX: int, - x coordinate (from top left corner of canvas)
posY: int, - y coordinate (relative to top left corner of canvas
}
```
# Pub Sub communication
- client visits either the main page (registered topic /), or goes to a specifc room
- When a client clicks on the canvas, a new data point is created and sent to the server.
- The server adds this datapoint to the appropriate topic (room_id, or default/home)
- The Server broadcasts the datapoint out to all connections registered to the given topic.
- Clients take the received payload/state/JSON and uses as instructions on where to mark/draw on the canvas.
- 

# Multi-Topic/room support:
- create a room dynamically by visiting:
- https://letsdrawtogether.net/room/your_room_id_here


# Future Changes: 
UI/UX:
Potentially looking into building/integrating with RSOCKET- Reactive Sockets. Rsocket: [https://rsocket.io/](https://rsocket.io/)
Rsocket is a binary protocol which add reactive stream API semantics to TCP and/or web socket connections.
