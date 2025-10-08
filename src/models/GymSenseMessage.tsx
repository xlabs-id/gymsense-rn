export interface GymSenseMessage {
    source: 'gymsense';
    type: 'LOG' | 'RESULT';
    payload?: string | GymSenseResult;
}

export interface GymSenseResult {
    start: number; // timestamp in seconds
    end: number;   // timestamp in seconds
    duration: number; // duration in seconds
    activity: string; // e.g., "jumping_jacks"
    type: string; // e.g., "repetition" or "duration"
    count: number; // number of repetitions or duration in seconds
    accuracy?: number; // accuracy percentage (0-100)
}