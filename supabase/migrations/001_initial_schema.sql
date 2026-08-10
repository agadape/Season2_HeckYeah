-- Initial Schema for S2 Scholarship Tracking App

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- PROFILES
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    full_name TEXT,
    nationality TEXT,
    degree_level TEXT,
    major TEXT,
    university TEXT,
    expected_graduation TEXT,
    work_experience_years INTEGER,
    target_degree TEXT,
    target_intake TEXT,
    role TEXT DEFAULT 'user',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- COUNTRIES
CREATE TABLE countries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    code TEXT
);

-- UNIVERSITIES
CREATE TABLE universities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    country_id UUID REFERENCES countries(id),
    website TEXT
);

-- SCHOLARSHIPS
CREATE TABLE scholarships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    provider TEXT,
    scholarship_type TEXT,
    description TEXT,
    country_id UUID REFERENCES countries(id),
    degree_level TEXT,
    intake_year TEXT,
    official_website TEXT,
    application_portal TEXT,
    fully_funded BOOLEAN,
    overall_fit_score INTEGER,
    priority TEXT,
    application_status TEXT DEFAULT 'Not Started',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- FUNDING DETAILS
CREATE TABLE funding_details (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    scholarship_id UUID REFERENCES scholarships(id) ON DELETE CASCADE,
    tuition_coverage TEXT,
    living_allowance TEXT,
    monthly_stipend TEXT,
    airfare_covered TEXT,
    accommodation_covered TEXT,
    health_insurance TEXT,
    visa_support TEXT,
    settlement_allowance TEXT,
    other_benefits TEXT,
    funding_duration TEXT,
    estimated_personal_cost TEXT
);

-- ELIGIBILITY REQUIREMENTS
CREATE TABLE eligibility_requirements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    scholarship_id UUID REFERENCES scholarships(id) ON DELETE CASCADE,
    indonesia_eligible TEXT,
    bachelors_required TEXT,
    final_year_eligible TEXT,
    fresh_graduate_eligible TEXT,
    work_experience_status TEXT,
    minimum_work_experience TEXT,
    relevant_field_required TEXT,
    information_systems_fit TEXT,
    minimum_gpa TEXT,
    age_limit TEXT,
    english_required TEXT,
    ielts_minimum TEXT,
    toefl_minimum TEXT,
    gre_required TEXT,
    other_requirements TEXT
);

-- DEADLINES
CREATE TABLE deadlines (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    scholarship_id UUID REFERENCES scholarships(id) ON DELETE CASCADE,
    intake_year TEXT,
    application_open TIMESTAMPTZ,
    application_deadline TIMESTAMPTZ,
    deadline_status TEXT,
    date_type TEXT,
    previous_cycle BOOLEAN,
    selection_date TIMESTAMPTZ,
    study_start TIMESTAMPTZ,
    notes TEXT
);

-- DOCUMENTS (User's Document Repository)
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    document_type TEXT,
    status TEXT,
    file_url TEXT,
    issued_date DATE,
    expiry_date DATE,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- SCHOLARSHIP DOCUMENT REQUIREMENTS (What the scholarship requires globally)
-- Note: 'document_type' is used instead of document_id to allow matching with user's documents
CREATE TABLE scholarship_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    scholarship_id UUID REFERENCES scholarships(id) ON DELETE CASCADE,
    document_type TEXT NOT NULL,
    required BOOLEAN,
    status TEXT,
    notes TEXT
);

-- APPLICATIONS (User's application to a scholarship)
CREATE TABLE applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    scholarship_id UUID REFERENCES scholarships(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'Not Started',
    fit_score INTEGER,
    priority TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, scholarship_id)
);

-- APPLICATION DOCUMENTS (Linking user's document to an application)
CREATE TABLE application_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
    scholarship_document_id UUID REFERENCES scholarship_documents(id) ON DELETE CASCADE,
    document_id UUID REFERENCES documents(id) ON DELETE SET NULL,
    status TEXT,
    notes TEXT
);

-- SOURCES
CREATE TABLE sources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT,
    url TEXT,
    source_type TEXT,
    publisher TEXT,
    published_date DATE,
    accessed_date DATE,
    verification_status TEXT,
    confidence TEXT,
    notes TEXT
);

-- SCHOLARSHIP SOURCES
CREATE TABLE scholarship_sources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    scholarship_id UUID REFERENCES scholarships(id) ON DELETE CASCADE,
    source_id UUID REFERENCES sources(id) ON DELETE CASCADE
);

-- RESEARCH AREAS
CREATE TABLE research_areas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL
);

-- SCHOLARSHIP RESEARCH AREAS
CREATE TABLE scholarship_research_areas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    scholarship_id UUID REFERENCES scholarships(id) ON DELETE CASCADE,
    research_area_id UUID REFERENCES research_areas(id) ON DELETE CASCADE
);

-- NOTES
CREATE TABLE notes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    scholarship_id UUID REFERENCES scholarships(id) ON DELETE CASCADE,
    content TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- APPLICATION EVENTS (Audit trail / history)
CREATE TABLE application_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
    event_type TEXT,
    old_status TEXT,
    new_status TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_scholarships_country ON scholarships(country_id);
CREATE INDEX idx_scholarships_slug ON scholarships(slug);
CREATE INDEX idx_deadlines_scholarship ON deadlines(scholarship_id);
CREATE INDEX idx_deadlines_application_deadline ON deadlines(application_deadline);
CREATE INDEX idx_applications_user ON applications(user_id);
CREATE INDEX idx_documents_user ON documents(user_id);
