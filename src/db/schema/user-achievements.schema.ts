import { relations } from 'drizzle-orm';
import { primaryKey, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';
import { achievements } from './achievements.schema';
import { users } from './users.schema';

export const userAchievements = pgTable(
  'user_achievements',
  {
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    achievementId: uuid('achievement_id')
      .notNull()
      .references(() => achievements.id, { onDelete: 'cascade' }),
    earnedAt: timestamp('earned_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.achievementId] }),
  }),
);

export const userAchievementsRelations = relations(
  userAchievements,
  ({ one }) => ({
    user: one(users, {
      fields: [userAchievements.userId],
      references: [users.id],
    }),
    achievement: one(achievements, {
      fields: [userAchievements.achievementId],
      references: [achievements.id],
    }),
  }),
);
