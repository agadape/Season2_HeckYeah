-- Seed Data

-- Insert Countries
INSERT INTO countries (id, name, code) VALUES
('c1000000-0000-0000-0000-000000000001', 'Saudi Arabia', 'SA'),
('c2000000-0000-0000-0000-000000000002', 'Japan', 'JP'),
('c3000000-0000-0000-0000-000000000003', 'Indonesia', 'ID'),
('c4000000-0000-0000-0000-000000000004', 'South Korea', 'KR');

-- Insert Universities
INSERT INTO universities (id, name, country_id) VALUES
('u1000000-0000-0000-0000-000000000001', 'King Abdullah University of Science and Technology (KAUST)', 'c1000000-0000-0000-0000-000000000001'),
('u2000000-0000-0000-0000-000000000002', 'Ritsumeikan Asia Pacific University (APU)', 'c2000000-0000-0000-0000-000000000002');

-- Insert KAUST Scholarship
INSERT INTO scholarships (id, name, slug, provider, scholarship_type, description, country_id, degree_level, intake_year, official_website, fully_funded, priority)
VALUES ('s1000000-0000-0000-0000-000000000001', 'KAUST Fellowship', 'kaust-fellowship', 'KAUST', 'University', 'Fully funded fellowship for Master''s and PhD', 'c1000000-0000-0000-0000-000000000001', 'Master''s', '2027', 'https://admissions.kaust.edu.sa/', true, 'S');

-- Insert KAUST Funding Details
INSERT INTO funding_details (scholarship_id, tuition_coverage, living_allowance, monthly_stipend, airfare_covered, accommodation_covered, health_insurance)
VALUES ('s1000000-0000-0000-0000-000000000001', 'Fully Covered', 'Covered', '$20,000 - $30,000 annually', 'Covered', 'Covered', 'Covered');

-- Insert KAUST Eligibility
INSERT INTO eligibility_requirements (scholarship_id, indonesia_eligible, bachelors_required, final_year_eligible, fresh_graduate_eligible, work_experience_status, information_systems_fit)
VALUES ('s1000000-0000-0000-0000-000000000001', 'Yes', 'Yes', 'Yes', 'Yes', 'Not Required', 'Direct Fit (Computer Science)');

-- Insert KAUST Deadlines
INSERT INTO deadlines (scholarship_id, intake_year, deadline_status, date_type)
VALUES ('s1000000-0000-0000-0000-000000000001', '2027', 'NOT_ANNOUNCED', 'Fall Intake');
