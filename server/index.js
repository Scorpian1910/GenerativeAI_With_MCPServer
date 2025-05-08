import express from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
// import { createPost } from "./mcp.tool.js";
import { z } from "zod";




const server = new McpServer({
    name: "example-server",
    version: "1.0.0"
});

// ... set up server resources, tools, and prompts ...

const app = express();
app.use('/api', express.json()); // only for API routes, like /api/chat


server.tool(
    "addTwoNumbers",
    "Add two numbers",
    {
        a: z.number(),
        b: z.number()
    },
    async (arg) => {
        const { a, b } = arg;
        return {
            content: [
                {
                    type: "text",
                    text: `The sum of ${a} and ${b} is ${a + b}`
                }
            ]
        }
    }
)

// server.tool(
//     "createPost",
//     "Create a post on X formally known as Twitter ", {
//     status: z.string()
// }, async (arg) => {
//     const { status } = arg;
//     return createPost(status);
// })


// to support multiple simultaneous connections we have a lookup object from
// sessionId to transport
const transports = {};

app.post("/messages", async (req, res) => {
    const sessionId = req.query.sessionId;
    const transport = transports[ sessionId ];
    if (transport) {
        await transport.handlePostMessage(req, res);
    } else {
        res.status(400).send('No transport found for sessionId');
    }
});

app.get("/sse", async (req, res) => {
    const transport = new SSEServerTransport('/messages',  res);
    transports[ transport.sessionId ] = transport;
    res.on("close", () => {
        delete transports[ transport.sessionId ];
    });
    await server.connect(transport);
});



app.post('/api/chat', express.json(), async (req, res) => {
    const userMessage = req.body.message;

    // A simple tool call based on your `addTwoNumbers` tool
    if (userMessage.toLowerCase().includes("add")) {
        // mock parsing for demo
        const match = userMessage.match(/(\d+)\s*\+\s*(\d+)/);
        if (match) {
            const a = parseInt(match[1]);
            const b = parseInt(match[2]);
            const result = a + b;
            return res.json({ response: `The sum of ${a} and ${b} is ${result}` });
        }
    }

    // Default fallback
    return res.json({ response: `You said: ${userMessage}` });
});



app.listen(3001, () => {
    console.log("Server is running on http://localhost:3001");
});