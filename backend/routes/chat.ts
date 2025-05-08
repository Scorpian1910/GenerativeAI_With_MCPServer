import express from 'express';
import { Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { callTool, connectMCP } from '../mcpClient';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

let toolsCache: any[] = [];

// Wait for MCP to connect at startup
(async () => {
  try {
    toolsCache = await connectMCP();
    console.log("✅ MCP Connected and tools loaded.");
  } catch (err) {
    console.error("❌ Failed to connect to MCP:", err);
  }
})();

router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { history } = req.body;

    if (toolsCache.length === 0) {
      return res.status(500).json({ error: 'Tools not loaded yet' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const result = await model.generateContent({
      contents: history,
      tools: [{ functionDeclarations: toolsCache }],
    });

    const parts = result.response?.candidates?.[0]?.content?.parts;
    const funcCall = parts?.[0]?.functionCall;

    if (funcCall) {
      const toolResult = await callTool(funcCall.name, funcCall.args);
      const toolText = toolResult?.content?.[0]?.text ?? 'No tool output';
      return res.json({ content: `Tool result: ${toolText}` });
    }

    const text = parts?.[0]?.text ?? 'No response';
    res.json({ content: text });
  } catch (err) {
    console.error("❌ Chat error:", err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;



// import express from 'express';
// import { Request, Response } from 'express';
// import { GoogleGenerativeAI, GenerateContentRequest } from '@google/generative-ai';
// import { connectMCP, callTool } from '../mcpClient';
// import dotenv from 'dotenv';

// const router = express.Router();
// dotenv.config();
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);


// let toolsCache: any[] = [];
// connectMCP().then(tools => (toolsCache = tools));

// router.post('/', async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { history } = req.body;

//     const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

//     const result = await model.generateContent({
//       contents: history,
//       tools: [{ functionDeclarations: toolsCache }],
//     });

//     const parts = result.response?.candidates?.[0]?.content?.parts;
//     const funcCall = parts?.[0]?.functionCall;

//     if (funcCall) {
//       const toolResult = await callTool(funcCall.name, funcCall.args);
//       const toolText = (toolResult as any)?.content?.[0]?.text ?? 'No tool output';
//       res.json({ content: `Tool result: ${toolText}` });
//       return;
//     }

//     const text = parts?.[0]?.text ?? 'No response';
//     res.json({ content: text });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// export default router;
