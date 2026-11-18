-- Personal checklist / task tracker (one row per "thing I must not forget")
-- Data is private per user: RLS restricts every row to its owner.

CREATE TABLE IF NOT EXISTS tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL CHECK (char_length(title) BETWEEN 1 AND 300),
    notes TEXT,
    category TEXT NOT NULL DEFAULT 'Lainnya',
    priority TEXT NOT NULL DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high')),
    due_date DATE,
    done BOOLEAN NOT NULL DEFAULT FALSE,
    done_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tasks_user_open ON tasks(user_id, done, due_date);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage own tasks" ON tasks;
CREATE POLICY "Users can manage own tasks" ON tasks FOR ALL TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Keep updated_at fresh
CREATE OR REPLACE FUNCTION set_updated_at() RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tasks_set_updated_at ON tasks;
CREATE TRIGGER tasks_set_updated_at BEFORE UPDATE ON tasks
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Scholarships previously had only a SELECT policy, so "Add Program" always failed.
-- Allow signed-in users to add/edit programmes (anonymous visitors stay read-only).
DROP POLICY IF EXISTS "Authenticated can insert scholarships" ON scholarships;
CREATE POLICY "Authenticated can insert scholarships" ON scholarships FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "Authenticated can update scholarships" ON scholarships;
CREATE POLICY "Authenticated can update scholarships" ON scholarships FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
