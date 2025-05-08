// api/server.ts
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { HttpServerTransport } from "@modelcontextprotocol/sdk/server/http/index.js";
import createMcpServer from "opengov-mcp-server";

// 1) Pull in your Socrata portal URL
const portal = process.env.DATA_PORTAL_URL;
if (!portal) {
  throw new Error("Please set DATA_PORTAL_URL in your Vercel Environment Variables");
}

// 2) Build the MCP server
const mcp = new Server({ name: "opengov", version: "0.1.0" });

// 3) Register the Socrata tools
createMcpServer(mcp, { portal });

// 4) Expose it on HTTP at /mcp
export default new HttpServerTransport({
  port: Number(process.env.PORT),
  basePath: "/mcp",
}).connect(mcp);
