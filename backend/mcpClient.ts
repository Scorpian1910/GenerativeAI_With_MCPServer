// mcpClient.ts
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { SSEClientTransport } from '@modelcontextprotocol/sdk/client/sse.js';

const mcpClient = new Client({ name: 'example-client', version: '1.0.0' });

let connected = false;

export async function connectMCP() {
  if (!connected) {
    await mcpClient.connect(new SSEClientTransport(new URL('http://localhost:3001/sse')));
    connected = true;
  }

  const toolList = await mcpClient.listTools();
  return toolList.tools.map(tool => ({
    name: tool.name,
    description: tool.description,
    parameters: tool.inputSchema ? {
      type: tool.inputSchema.type,
      properties: tool.inputSchema.properties,
      required: tool.inputSchema.required,
    } : {},
  }));
}

export async function callTool(name: string, args: any) {
  if (!connected) {
    throw new Error("MCP client not connected");
  }

  return await mcpClient.callTool({ name, arguments: args });
}





// import { Client } from '@modelcontextprotocol/sdk/client/index.js';
// import { SSEClientTransport } from '@modelcontextprotocol/sdk/client/sse.js';

// const mcpClient = new Client({ name: 'example-client', version: '1.0.0' });

// async function connectMCP() {
//   // Establish connection to MCP
//   await mcpClient.connect(new SSEClientTransport(new URL('http://localhost:3001/sse')));
  
//   // List available tools from MCP
//   const toolList = await mcpClient.listTools();
  
//   // Transform the tool list into Gemini's expected format
//   return toolList.tools.map(tool => ({
//     name: tool.name, // Name of the tool
//     description: tool.description, // Description of the tool
//     parameters: tool.inputSchema ? {
//       type: tool.inputSchema.type, // Type of the input schema
//       properties: tool.inputSchema.properties, // Input properties
//       required: tool.inputSchema.required // Required input properties
//     } : {},
//   }));
// }

// async function callTool(name: string, args: any) {
//   // Call the tool with arguments
//   return await mcpClient.callTool({ name, arguments: args });
// }

// export { connectMCP, callTool };
