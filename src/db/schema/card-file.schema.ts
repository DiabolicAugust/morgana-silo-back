import { relations } from 'drizzle-orm';
import { pgTable, timestamp, unique, uuid } from 'drizzle-orm/pg-core';
import { cards } from './card.schema';
import { file } from './file.schema';

export const cardFiles = pgTable(
  'card_file',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    cardId: uuid('card_id')
      .notNull()
      .references(() => cards.id, { onDelete: 'cascade' }),
    fileId: uuid('file_id')
      .notNull()
      .references(() => file.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    uniqueCard: unique('card_file_card_id_unique').on(table.cardId),
  }),
);

export const cardFilesRelations = relations(cardFiles, ({ one }) => ({
  card: one(cards, {
    fields: [cardFiles.cardId],
    references: [cards.id],
  }),
  file: one(file, {
    fields: [cardFiles.fileId],
    references: [file.id],
  }),
}));
