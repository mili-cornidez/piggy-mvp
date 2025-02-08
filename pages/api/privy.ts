import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const PRIVY_APP_ID = process.env.PRIVY_APP_ID;

        if (!PRIVY_APP_ID) {
            console.error("❌ Missing Privy App ID");
            return res.status(500).json({ error: "Server misconfiguration: missing Privy App ID." });
        }

        console.log("📡 Sending request to Privy:", req.body);

        const response = await fetch("https://auth.privy.io/api/v1/analytics_events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "privy-app-id": PRIVY_APP_ID, // 🔹 Asegurar que se envía el header
            },
            body: JSON.stringify(req.body),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("❌ Privy API Error:", errorText);
            return res.status(response.status).json({ error: errorText });
        }

        const data = await response.json();
        console.log("✅ Privy API Response:", data);
        return res.status(200).json(data);
    } catch (error) {
        console.error("❌ Error communicating with Privy:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
