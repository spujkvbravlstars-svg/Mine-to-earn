# Mine To Earn WebSocket bridge

1. Deploy this project to Render.
2. The site POST /api/event now broadcasts `{ "type": "event", "event": "creepers" }` to WebSocket clients at `/ws`.
3. The Minecraft add-on must connect to `wss://YOUR-RENDER-DOMAIN/ws` using the experimental `@minecraft/server-net` API.
4. Keep the WebSocket URL configurable in the add-on script.

Important: WebSocket client support is experimental in Bedrock Script API. Test on the exact game build before using it in a live world.
