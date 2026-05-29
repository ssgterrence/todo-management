export const DutyQueries = {
  FIND_ALL: `
    SELECT id, name, created_at, updated_at 
    FROM duties 
    ORDER BY created_at DESC
  `,

  FIND_BY_ID: `
    SELECT id, name, created_at, updated_at 
    FROM duties 
    WHERE id = $1
  `,

  CREATE: `
    INSERT INTO duties (name) 
    VALUES ($1) 
    RETURNING id, name, created_at, updated_at
  `,

  UPDATE: `
    UPDATE duties 
    SET name = $1, updated_at = CURRENT_TIMESTAMP 
    WHERE id = $2 
    RETURNING id, name, created_at, updated_at
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
