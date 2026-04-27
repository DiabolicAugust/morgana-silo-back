import { relations } from 'drizzle-orm';
import { bigint, jsonb, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { cardFiles } from './card-file.schema';

export const file = pgTable('file', {
  id: uuid('id').defaultRandom().primaryKey(),
  key: text('key').notNull().unique(),
  url: text('url').notNull(),
  bucket: text('bucket').notNull(),
  region: text('region').notNull(),
  location: text('location').notNull(),
  originalName: text('original_name').notNull(),
  mimeType: text('mime_type').notNull(),
  size: bigint('size', { mode: 'number' }).notNull(),
  etag: text('etag'),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const fileRelations = relations(file, ({ many }) => ({
  cardFiles: many(cardFiles),
}));
