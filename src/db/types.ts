import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import {
  achievements,
  cardFiles,
  cards,
  file,
  userAchievements,
  users,
} from './schema';

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;

export type Achievement = InferSelectModel<typeof achievements>;
export type NewAchievement = InferInsertModel<typeof achievements>;

export type UserAchievement = InferSelectModel<typeof userAchievements>;
export type NewUserAchievement = InferInsertModel<typeof userAchievements>;

export type FileRecord = InferSelectModel<typeof file>;
export type NewFileRecord = InferInsertModel<typeof file>;

export type Card = InferSelectModel<typeof cards>;
export type NewCard = InferInsertModel<typeof cards>;

export type CardFile = InferSelectModel<typeof cardFiles>;
export type NewCardFile = InferInsertModel<typeof cardFiles>;
