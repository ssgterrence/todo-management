export const DutyQueries = {
  FIND_ALL: `
    SELECT id, title, created_at, updated_at 
    FROM duties 
    ORDER BY created_at DESC
  `,

  FIND_BY_ID: `
    SELECT id, title, created_at, updated_at 
    FROM duties 
    WHERE id = $1
  `,

  CREATE: `
    INSERT INTO duties (title) 
    VALUES ($1) 
    RETURNING id, title, created_at, updated_at
  `,

  UPDATE: `
    UPDATE duties 
    SET title = $1, updated_at = CURRENT_TIMESTAMP 
    WHERE id = $2 
    RETURNING id, title, created_at, updated_at
  `,

  DELETE: `
    DELETE FROM duties 
    WHERE id = $1
  `,

  CHECK_EXISTS: `
    SELECT EXISTS(
      SELECT 1 FROM duties WHERE id = $1
    ) as exists
  `,
} as const;
