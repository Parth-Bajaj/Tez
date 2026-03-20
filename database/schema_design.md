# Database Schema Design

Tez can be implemented with either a document database or relational models.

## Collections / Tables

### `users`

- `id`
- `name`
- `email`
- `password_hash`
- `role`
- `created_at`

### `news`

- `id`
- `title`
- `summary`
- `content`
- `category`
- `source`
- `author`
- `prediction`
- `confidence`
- `credibility_score`
- `story_hash`
- `tx_hash`
- `published_at`

### `reports`

- `id`
- `news_id`
- `reason`
- `notes`
- `status`
- `created_at`

### `bookmarks`

- `id`
- `user_id`
- `news_id`
- `created_at`

## Suggested indexes

- `users.email`
- `news.published_at`
- `news.story_hash`
- `reports.status`
