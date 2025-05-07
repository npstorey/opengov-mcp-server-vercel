// api/server.ts
import { Server } from "@modelcontextprotocol/sdk/server";
import { HttpServerTransport } from "@modelcontextprotocol/sdk/server/http";
import createMcpServer from "opengov-mcp-server";

// 1) Read your Socrata portal URL from the env
const portal = process.env.DATA_PORTAL_URL;
if (!portal) {
  throw new Error("Please set DATA_PORTAL_URL in your Vercel env");
}

// 2) Build the MCP toolset
const mcp = new Server({ name: "opengov", version: "0.1.0" });
createMcpServer(mcp, { portal });

// 3) Expose it over HTTP on /mcp
export default new HttpServerTransport({
  port: Number(process.env.PORT),
  basePath: "/mcp",
}).connect(mcp);
