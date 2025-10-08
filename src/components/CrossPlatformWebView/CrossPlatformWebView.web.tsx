/// <reference lib="dom" />

import { useEffect } from "react";
import type { GymSenseResult, GymSenseMessage } from "../../models/GymSenseMessage";

type Props = {
    uri: string;
    onLog?: (message: string) => void;
    onResult?: (result: GymSenseResult) => void;
};

export default function CrossPlatformWebView(props: Props) {
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.origin !== new URL(props.uri).origin) return;

            try {
                const data = event.data as GymSenseMessage;
                if (data?.type === "LOG" && typeof data.payload === "string") {
                    props.onLog?.(data.payload);
                }

                if (data?.type === "RESULT" && data.payload) {
                    props.onResult?.(data.payload as GymSenseResult);
                }
            } catch (error) {
                console.error("Failed to process message from GymSense WebView:", error);
            }

        };

        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, [props]);

    return (
        <iframe
            src={props.uri}
            style={{
                width: "100%",
                height: "100%",
                border: "none",
            }}
            allow="camera"
        />
    );
}
