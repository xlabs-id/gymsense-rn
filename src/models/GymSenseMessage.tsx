export interface GymSenseMessage {
  source: 'gymsense';
  type:
    | 'LOG'
    | 'SESSION_COMPLETE'
    | 'SESSION_CANCELED'
    | 'SET_COMPLETE'
    | 'EXERCISE_CREATED'
    | 'TTS_SPEAK'
    | 'TTS_STOP';
  payload?:
    | string
    | SessionCompletePayload
    | SetCompletePayload
    | ExerciseCreatedPayload
    | TTSSpeakPayload
    | Record<string, never>;
}

export interface TTSSpeakPayload {
  text: string;
  lang?: string;
  rate?: number;
  pitch?: number;
  volume?: number;
}

export interface SetCompletePayload {
  setNumber: number;
  count: number; // Reps completed or seconds held
  accuracy: number; // Score (0-100)
  rom?: number; // Range of Motion (if exerciseType is 'repetition')
  stability?: number; // Stability score (if exerciseType is 'hold')
  duration: number; // Duration of the set in seconds
  target: number; // The target count for this set
}

export interface SessionCompletePayload {
  start: number; // Start timestamp (Unix seconds)
  end: number; // End timestamp (Unix seconds)
  duration: number; // Total session duration in seconds
  exerciseId: number; // ID of the exercise
  exerciseName: string; // Name of the exercise
  type: 'repetition' | 'hold';
  totalSets: number; // Total number of sets configured
  sets: SetCompletePayload[]; // Array of data for each completed set
  count: number; // Total reps/seconds across all sets
  accuracy: number; // Average accuracy across all sets
  rom?: number; // Average ROM (if applicable)
  stability?: number; // Average Stability (if applicable)
  calories?: number; // Estimated calories burned during the session (if applicable)
}

export interface ExerciseCreatedPayload {
  exerciseId: number; // Database ID of the newly created exercise
  exerciseName: string; // Name of the exercise
  exerciseType: 'repetition' | 'hold'; // Exercise type
  authorId: string; // ID of the author/trainer
  authorName: string; // Name of the author/trainer
  videoUrl: string; // URL to the reference video
  createdAt: string; // ISO timestamp of creation
}
