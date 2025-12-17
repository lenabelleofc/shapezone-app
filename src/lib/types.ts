// Types do SHAPEZONE

export type Goal = 
  | 'muscle_gain' 
  | 'weight_loss' 
  | 'obesity_treatment'
  | 'cellulite_reduction'
  | 'toning'
  | 'definition';

export type BodyType = 'athletic' | 'lean' | 'muscular' | 'toned';

export type TrainingLocation = 'gym' | 'home' | 'outdoor' | 'hybrid';

export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';

export type Modality = 'weightlifting' | 'pilates' | 'yoga' | 'cardio' | 'hiit' | 'functional';

export interface UserProfile {
  // Dados básicos
  name: string;
  age: number;
  weight: number;
  height: number;
  gender: 'male' | 'female' | 'other';
  
  // Objetivos
  goal: Goal;
  targetBodyType: BodyType;
  
  // Treino
  experienceLevel: ExperienceLevel;
  trainingLocation: TrainingLocation;
  availableTimePerDay: number; // minutos
  preferredModalities: Modality[];
  
  // Dieta
  dietaryRestrictions: string[];
  
  // Saúde
  medications: string[];
  usesWeightLossMeds: boolean; // Ozempic, Mounjaro, etc
  
  // Calculados
  bmi: number;
  idealWeight: number;
}

export interface WorkoutPlan {
  id: string;
  name: string;
  duration: number; // dias
  workouts: Workout[];
}

export interface Workout {
  id: string;
  day: number;
  name: string;
  type: Modality;
  duration: number; // minutos
  exercises: Exercise[];
  warmup: Exercise[];
  cooldown: Exercise[];
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  rest: number; // segundos
  videoUrl?: string;
  breathingTip: string;
  formTips: string[];
  toFailure?: boolean; // última série até a falha
}

export interface DietPlan {
  id: string;
  dailyCalories: number;
  macros: {
    protein: number;
    carbs: number;
    fats: number;
  };
  meals: Meal[];
  waterIntake: number; // ml
}

export interface Meal {
  id: string;
  name: string;
  time: string;
  foods: Food[];
  calories: number;
}

export interface Food {
  name: string;
  quantity: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface DailyProgress {
  date: string;
  weight?: number;
  workoutCompleted: boolean;
  mealsCompleted: number;
  waterIntake: number;
  notes: string;
  photos?: string[];
}

export interface CommunityPost {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  images: string[];
  likes: number;
  comments: Comment[];
  createdAt: Date;
  region?: string;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: Date;
}

export interface Streak {
  current: number;
  longest: number;
  lastWorkout: Date;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
}

// B2B Types
export interface CompanyAccount {
  id: string;
  name: string;
  type: 'gym' | 'clinic' | 'medical' | 'corporate';
  monthlyFee: number; // R$ 197
  commissionRate: number; // 65%
  clients: string[]; // user IDs
  kirvanoId: string;
}

export interface Commission {
  id: string;
  companyId: string;
  userId: string;
  amount: number;
  status: 'pending' | 'paid';
  date: Date;
}
