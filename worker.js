/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run "npm run dev" in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run "npm run deploy" to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */



export default {
    async fetch(request) {
        if (request.method === "POST") {
            const update = await request.json();
            const message = update.message?.text || "אין הודעה";
            const chatId = update.message?.chat?.id;

            if (chatId) {
                const responseText = `קיבלת את ההודעה: ${message}`;
                const TOKEN = "הכנס_כאן_את_הטוקן_שלך";
                const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

                await fetch(TELEGRAM_API, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ chat_id: chatId, text: responseText }),
                });
            }

            return new Response("OK", { status: 200 });
        }

        return new Response("שימוש לא נכון", { status: 405 });
    },
}