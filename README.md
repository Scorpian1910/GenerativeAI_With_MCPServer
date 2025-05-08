# Gemini + MCP Chat: Supercharge your LLMs with Tools! 🚀

[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME/commits/master)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME/issues)

<!-- Replace YOUR_GITHUB_USERNAME and YOUR_REPO_NAME in the badges above! -->

**Gemini + MCP Chat** is a powerful demonstration of how to combine the generative capabilities of Google's Gemini model with the Model Context Protocol (MCP) to create a chat application that can leverage external tools.  Think of it as giving your AI assistant superpowers!

## 🌟 Features

*   **Gemini Integration:** Utilizes the `gemini-2.0-flash` model for fast and contextually relevant responses.
*   **MCP Tooling:** Seamlessly integrates with the Model Context Protocol, allowing the chat application to access and use external tools.  Define tools like "addTwoNumbers" and let Gemini decide when and how to use them.
*   **Dynamic Tool Loading:**  The application dynamically loads available tools from the MCP server at startup, making it easy to add or update tools without code changes.
*   **Real-time Chat Interface:** A user-friendly React-based chat interface allows for natural conversations with the AI.
*   **React Markdown support:** Supports markdown for better formatting of responses in chat UI
*   **SSE Transport:** Uses Server-Sent Events for efficient real-time communication between the MCP server and clients.
*   **Example Tool Included:** Includes a simple "addTwoNumbers" tool for demonstration purposes, showcasing how to define and use tools.

## 🎬 Demo

Provide a link to a demo video or GIF showcasing the application in action.  This is *highly* recommended.

<!-- Replace with your demo video link -->
<!-- ![Demo of Gemini + MCP Chat](link-to-your-demo-video-or-gif) -->
## ⚙️ Tech Stack

*   **Backend:**
    *   Node.js
    *   Express.js
    *   `@google-cloud/aiplatform` (for Gemini)
    *   `@modelcontextprotocol/sdk`
    *   `dotenv`
*   **Frontend:**
    *   React
    *   React Markdown
    *   TextareaAutosize
    *   Tailwind CSS
*   **MCP:**
    *   `@modelcontextprotocol/sdk`

## 🚀 Getting Started

Follow these steps to get the application up and running on your local machine.

### Prerequisites

*   Node.js (v18 or higher)
*   npm or yarn
*   A Google Cloud project with the Gemini API enabled.
*   A Gemini API key.
### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git
    cd YOUR_REPO_NAME
    ```

2.  **Install dependencies:**

    ```bash
    npm install  # or yarn install
    ```

3.  **Configure the backend:**

    *   Create a `.env` file in the `backend/` directory.
    *   Add your Gemini API key to the `.env` file:

        ```
        GEMINI_API_KEY=YOUR_GEMINI_API_KEY
        ```

4.  **Run the MCP Server (server/):**

    ```bash
    cd server/
    npm install
    node index.js # or nodemon index.js for development
    ```

5.  **Run the Backend (backend/):**

    ```bash
    cd backend/
    npm install
    npm run dev  # Or npm start if you don't have nodemon
    ```

6.  **Run the Frontend (client/):**

    ```bash
    cd client/
    npm install
    npm start
    ```

7.  **Access the application:**

    Open your browser and navigate to `http://localhost:3000`.

## 🛠️ Usage

1.  **Start the MCP server, Backend, and Frontend.**
2.  **Type your message in the chat interface.**
3.  **If your message triggers a tool (like "add two numbers"), the application will automatically call the tool and display the result.**

    *   Example: "Add 5 + 3"

## ➕ Adding New Tools

1.  **Define your tool in `server/index.js` using `server.tool()`**.  Ensure that your tool has a clear name, description, input schema, and implementation.  The input schema uses Zod for validation.
2.  **The backend will automatically load the new tool when it connects to the MCP server.**
3.  **Update you prompt in your chat messages**

    *   Example to the model: call addTwoNumbers to add two numbers

## 🤝 Contributing

Contributions are welcome!  Please feel free to submit pull requests or open issues to suggest improvements or report bugs.

## 📜 License

This project is licensed under the MIT License - see the `LICENSE` file for details.

## ⭐️ Show your support

Give a ⭐️ if this project helped you!
