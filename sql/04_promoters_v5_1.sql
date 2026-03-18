-- V5.1 Promoteur module migration

create table if not exists pi_promoters (
  id uuid primary key default gen_random_uuid(),
  promoter_code text not null unique,
  legal_name text not null,
  trade_name text,
  ice text,
  rc text,
  tax_id text,
  legal_form text,
  creation_date date,
  group_name text,
  promoter_type text,
  specialization text,
  dominant_city text,
  dominant_zone text,
  dominant_standing text,
  pi_experience_years integer,
  completed_projects_count integer not null default 0,
  ongoing_projects_count integer not null default 0,
  is_bank_client boolean not null default false,
  bank_relationship_years integer,
  watchlist_flag boolean not null default false,
  restructuring_flag boolean not null default false,
  litigation_flag boolean not null default false,
  head_office_address text,
  phone text,
  email text,
  website text,
  main_contact_name text,
  main_contact_role text,
  analyst_comment text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists pi_promoter_shareholders (
  id uuid primary key default gen_random_uuid(),
  promoter_id uuid not null references pi_promoters(id) on delete cascade,
  shareholder_name text not null,
  shareholder_type text,
  ownership_pct numeric(5,2),
  nationality text,
  is_bank_client boolean not null default false,
  bank_relationship_status text,
  incident_flag boolean not null default false,
  watchlist_flag boolean not null default false,
  litigation_flag boolean not null default false,
  comment text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_pi_promoter_shareholders_promoter_id on pi_promoter_shareholders(promoter_id);

create table if not exists pi_promoter_completed_projects (
  id uuid primary key default gen_random_uuid(),
  promoter_id uuid not null references pi_promoters(id) on delete cascade,
  project_name text not null,
  city text,
  zone text,
  standing text,
  project_type text,
  units_count integer,
  project_cost numeric(18,2),
  project_revenue numeric(18,2),
  financed_by_bank boolean not null default false,
  financing_bank_name text,
  financed_by_our_bank boolean not null default false,
  delivery_year integer,
  outcome_status text,
  watchlist_flag boolean not null default false,
  incident_flag boolean not null default false,
  restructuring_flag boolean not null default false,
  litigation_flag boolean not null default false,
  comment text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_pi_promoter_completed_projects_promoter_id on pi_promoter_completed_projects(promoter_id);

create table if not exists pi_promoter_ongoing_projects (
  id uuid primary key default gen_random_uuid(),
  promoter_id uuid not null references pi_promoters(id) on delete cascade,
  project_name text not null,
  city text,
  zone text,
  standing text,
  project_type text,
  units_count integer,
  project_cost numeric(18,2),
  expected_revenue numeric(18,2),
  work_progress_pct numeric(5,2),
  precommercialisation_pct numeric(5,2),
  financed_by_bank boolean not null default false,
  financing_bank_name text,
  financed_by_our_bank boolean not null default false,
  situation_status text,
  watchlist_flag boolean not null default false,
  incident_flag boolean not null default false,
  comment text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_pi_promoter_ongoing_projects_promoter_id on pi_promoter_ongoing_projects(promoter_id);

create table if not exists pi_promoter_bank_events (
  id uuid primary key default gen_random_uuid(),
  promoter_id uuid not null references pi_promoters(id) on delete cascade,
  event_date date not null,
  event_type text not null,
  severity text,
  resolved_flag boolean not null default false,
  comment text,
  created_at timestamptz not null default now()
);
create index if not exists idx_pi_promoter_bank_events_promoter_id on pi_promoter_bank_events(promoter_id);
