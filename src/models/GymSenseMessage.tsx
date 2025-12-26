export interface GymSenseMessage {
  source: 'gymsense';
  type: 'LOG' | 'SESSION_COMPLETE' | 'EXERCISE_CREATED';
  payload?: string | SessionCompletePayload | ExerciseCreatedPayload;
}

export interface SessionCompletePayload {
  start: number; // Unix timestamp in seconds (session start)
  end: number; // Unix timestamp in seconds (session end)
  duration: number; // Duration in seconds
  exerciseId: number; // Exercise ID number
  exerciseName: string; // Name of the exercise
  type: 'repetition' | 'hold'; // Exercise type
  count: number; // For repetition: totalReps, for hold: totalValidSeconds
  accuracy: number; // Average score (0-100)
  rom?: number; // Range of Motion (only for repetition exercises)
  stability?: number; // Stability score (only for hold exercises)
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
