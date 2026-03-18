
-- =========================================================
-- PI V5.5 - SIGNALÉTIQUE PROJET PREMIUM
-- Migration additive à exécuter sur la base existante
-- =========================================================

alter table if exists pi_projects
  add column if not exists project_trade_name text,
  add column if not exists promoter_id uuid,
  add column if not exists spv_name text,
  add column if not exists file_type text,
  add column if not exists project_status text,
  add column if not exists country text default 'Maroc',
  add column if not exists region text,
  add column if not exists district text,
  add column if not exists sub_zone text,
  add column if not exists address text,
  add column if not exists latitude numeric(12,8),
  add column if not exists longitude numeric(12,8),
  add column if not exists promotion_mode text,
  add column if not exists target_clientele text,
  add column if not exists land_area numeric(18,2),
  add column if not exists built_area numeric(18,2),
  add column if not exists saleable_area numeric(18,2),
  add column if not exists units_count integer,
  add column if not exists blocks_count integer,
  add column if not exists parking_count integer,
  add column if not exists dominant_typology text,
  add column if not exists project_summary text,
  add column if not exists analyst_comment text;

do $$
begin
  if exists (
    select 1 from information_schema.tables
    where table_schema='public' and table_name='pi_promoters'
  ) then
    begin
      alter table pi_projects
        add constraint fk_pi_projects_promoter
        foreign key (promoter_id) references pi_promoters(id) on delete set null;
    exception when duplicate_object then null;
    end;
  end if;
end$$;

create index if not exists idx_pi_projects_promoter_id on pi_projects(promoter_id);
create index if not exists idx_pi_projects_city_zone on pi_projects(city, zone);
create index if not exists idx_pi_projects_lat_lon on pi_projects(latitude, longitude);

create table if not exists pi_project_financed_scopes (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid not null references pi_projects(id) on delete cascade,
  scope_type text not null,
  scope_code text,
  scope_label text not null,
  scope_project_type text,
  scope_units_count integer,
  scope_area numeric(18,2),
  scope_cost numeric(18,2),
  scope_revenue numeric(18,2),
  scope_financing_amount numeric(18,2),
  scope_equity_amount numeric(18,2),
  scope_progress_pct numeric(10,2),
  scope_legal_status text,
  scope_share_of_project_pct numeric(10,2),
  scope_comment text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_pi_project_financed_scopes_project_id on pi_project_financed_scopes(project_id);

create table if not exists pi_project_market_refs (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid not null references pi_projects(id) on delete cascade,
  ref_project_name text not null,
  ref_promoter_name text,
  ref_city text,
  ref_zone text,
  ref_standing text,
  ref_project_type text,
  ref_price_min numeric(18,2),
  ref_price_max numeric(18,2),
  ref_financed_by_bank boolean default false,
  ref_financed_by_our_bank boolean default false,
  ref_success_flag boolean default false,
  ref_watchlist_flag boolean default false,
  ref_issue_status text,
  ref_comment text,
  created_at timestamptz not null default now()
);
create index if not exists idx_pi_project_market_refs_project_id on pi_project_market_refs(project_id);
create index if not exists idx_pi_project_market_refs_city_zone_standing on pi_project_market_refs(ref_city, ref_zone, ref_standing);

create table if not exists pi_project_location_points (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid not null references pi_projects(id) on delete cascade,
  point_type text not null,
  label text not null,
  city text,
  zone text,
  latitude numeric(12,8),
  longitude numeric(12,8),
  standing text,
  issue_status text,
  created_at timestamptz not null default now()
);
create index if not exists idx_pi_project_location_points_project_id on pi_project_location_points(project_id);

-- Seed demo léger
insert into pi_project_financed_scopes (
  project_id, scope_type, scope_code, scope_label, scope_project_type,
  scope_units_count, scope_area, scope_cost, scope_revenue,
  scope_financing_amount, scope_equity_amount, scope_progress_pct,
  scope_legal_status, scope_share_of_project_pct, scope_comment
)
select
  p.id,
  'tranche',
  'TR-01',
  'Tranche financée pilote',
  coalesce(p.type, 'Résidentiel'),
  48,
  6200,
  78000000,
  104000000,
  52000000,
  26000000,
  18,
  'En montage',
  42,
  'Scope de démonstration pour signalétique projet premium'
from pi_projects p
where not exists (
  select 1 from pi_project_financed_scopes s where s.project_id = p.id
)
limit 8;

insert into pi_project_market_refs (
  project_id, ref_project_name, ref_promoter_name, ref_city, ref_zone, ref_standing,
  ref_project_type, ref_price_min, ref_price_max, ref_financed_by_bank,
  ref_financed_by_our_bank, ref_success_flag, ref_watchlist_flag, ref_issue_status, ref_comment
)
select
  p.id,
  'Résidence Benchmark Zone Premium',
  'Promoteur Référence',
  coalesce(p.city, 'Casablanca'),
  coalesce(p.zone, 'CFC'),
  coalesce(p.segment, 'Moyen / Haut Standing'),
  coalesce(p.type, 'Résidentiel'),
  18000,
  24000,
  true,
  true,
  true,
  false,
  'Réussi',
  'Projet comparable financé par la banque avec issue saine'
from pi_projects p
where not exists (
  select 1 from pi_project_market_refs r where r.project_id = p.id and r.ref_project_name='Résidence Benchmark Zone Premium'
)
limit 8;

insert into pi_project_market_refs (
  project_id, ref_project_name, ref_promoter_name, ref_city, ref_zone, ref_standing,
  ref_project_type, ref_price_min, ref_price_max, ref_financed_by_bank,
  ref_financed_by_our_bank, ref_success_flag, ref_watchlist_flag, ref_issue_status, ref_comment
)
select
  p.id,
  'Résidence Benchmark Sous Tension',
  'Promoteur Sensible',
  coalesce(p.city, 'Casablanca'),
  coalesce(p.zone, 'CFC'),
  coalesce(p.segment, 'Moyen Standing'),
  coalesce(p.type, 'Résidentiel'),
  16500,
  21000,
  true,
  true,
  false,
  true,
  'Watchlist',
  'Cas comparable ayant connu des tensions commerciales / exécution'
from pi_projects p
where not exists (
  select 1 from pi_project_market_refs r where r.project_id = p.id and r.ref_project_name='Résidence Benchmark Sous Tension'
)
limit 8;

insert into pi_project_location_points (
  project_id, point_type, label, city, zone, latitude, longitude, standing, issue_status
)
select
  p.id,
  'project',
  coalesce(p.name, 'Projet'),
  coalesce(p.city, 'Casablanca'),
  coalesce(p.zone, 'CFC'),
  coalesce(p.latitude, 33.5731),
  coalesce(p.longitude, -7.5898),
  coalesce(p.segment, 'Moyen Standing'),
  coalesce(p.project_status, 'En étude')
from pi_projects p
where not exists (
  select 1 from pi_project_location_points lp where lp.project_id = p.id and lp.point_type='project'
)
limit 8;
