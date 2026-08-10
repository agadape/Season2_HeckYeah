-- RLS Policies

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE application_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE application_events ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can view and update their own profile
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Applications: Users can view, insert, update, delete their own applications
CREATE POLICY "Users can manage own applications" ON applications FOR ALL USING (auth.uid() = user_id);

-- Documents: Users can manage their own documents
CREATE POLICY "Users can manage own documents" ON documents FOR ALL USING (auth.uid() = user_id);

-- Application Documents: Users can manage if they own the application
CREATE POLICY "Users can manage own application documents" ON application_documents FOR ALL
USING (EXISTS (SELECT 1 FROM applications a WHERE a.id = application_documents.application_id AND a.user_id = auth.uid()));

-- Notes: Users can manage their own notes
CREATE POLICY "Users can manage own notes" ON notes FOR ALL USING (auth.uid() = user_id);

-- Application Events: Users can manage their own events
CREATE POLICY "Users can manage own application events" ON application_events FOR ALL
USING (EXISTS (SELECT 1 FROM applications a WHERE a.id = application_events.application_id AND a.user_id = auth.uid()));

-- Public readable tables (Scholarship Database)
-- For a real production app, we might restrict insert/update to admins.
ALTER TABLE scholarships ENABLE ROW LEVEL SECURITY;
ALTER TABLE funding_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE eligibility_requirements ENABLE ROW LEVEL SECURITY;
ALTER TABLE deadlines ENABLE ROW LEVEL SECURITY;
ALTER TABLE countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE universities ENABLE ROW LEVEL SECURITY;
ALTER TABLE scholarship_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE scholarship_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE scholarship_research_areas ENABLE ROW LEVEL SECURITY;

-- Allow all authenticated users to read scholarship data
CREATE POLICY "Anyone can view scholarships" ON scholarships FOR SELECT USING (true);
CREATE POLICY "Anyone can view funding" ON funding_details FOR SELECT USING (true);
CREATE POLICY "Anyone can view eligibility" ON eligibility_requirements FOR SELECT USING (true);
CREATE POLICY "Anyone can view deadlines" ON deadlines FOR SELECT USING (true);
CREATE POLICY "Anyone can view countries" ON countries FOR SELECT USING (true);
CREATE POLICY "Anyone can view universities" ON universities FOR SELECT USING (true);
CREATE POLICY "Anyone can view scholarship requirements" ON scholarship_documents FOR SELECT USING (true);
CREATE POLICY "Anyone can view sources" ON sources FOR SELECT USING (true);
CREATE POLICY "Anyone can view scholarship sources" ON scholarship_sources FOR SELECT USING (true);
CREATE POLICY "Anyone can view research areas" ON research_areas FOR SELECT USING (true);
CREATE POLICY "Anyone can view scholarship research areas" ON scholarship_research_areas FOR SELECT USING (true);
