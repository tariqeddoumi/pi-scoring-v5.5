-- V5.1 demo seed for promoters module

insert into pi_promoters (
  promoter_code, legal_name, trade_name, ice, rc, legal_form, group_name,
  promoter_type, specialization, dominant_city, dominant_zone, dominant_standing,
  pi_experience_years, completed_projects_count, ongoing_projects_count,
  is_bank_client, bank_relationship_years, watchlist_flag, restructuring_flag,
  litigation_flag, main_contact_name, main_contact_role, analyst_comment
)
values
('PROM-001', 'Atlas Promotion SA', 'Atlas Promotion', '001122334455667', 'RC12345', 'SA', 'Groupe Atlas',
 'Promoteur intégré', 'Résidentiel & mixte', 'Casablanca', 'CFC / Bouskoura', 'Moyen / Haut Standing',
 14, 9, 3, true, 10, false, false, false, 'K. El Mansouri', 'DG', 'Relation saine, bon track record sur les projets livrés.'),
('PROM-002', 'Rivage Habitat SARL', 'Rivage Habitat', '009988776655443', 'RC99881', 'SARL', null,
 'Promoteur indépendant', 'Moyen standing', 'Rabat', 'Hay Riad / Témara', 'Moyen Standing',
 7, 4, 2, true, 4, true, false, false, 'S. Bensalem', 'Gérant', 'Un projet watchlisté pour tension commerciale.'),
('PROM-003', 'Urbanis Développement', 'Urbanis', '003344556677889', 'RC55442', 'SA', 'Urbanis Group',
 'SPV / Filiale', 'Mixte', 'Marrakech', 'Route de l’Ourika', 'Standing mixte',
 5, 2, 2, false, null, false, false, false, 'A. Kettani', 'Directeur projets', 'Nouveau prospect à documenter.' )
on conflict (promoter_code) do nothing;

with p as (
  select id, promoter_code from pi_promoters
)
insert into pi_promoter_shareholders (
  promoter_id, shareholder_name, shareholder_type, ownership_pct, nationality,
  is_bank_client, bank_relationship_status, incident_flag, watchlist_flag, litigation_flag, comment
)
values
((select id from p where promoter_code = 'PROM-001'), 'Holding Atlas Invest', 'Morale', 72.50, 'MA', true, 'Saine', false, false, false, 'Maison mère du groupe'),
((select id from p where promoter_code = 'PROM-001'), 'Famille El Mansouri', 'Physique', 27.50, 'MA', true, 'Saine', false, false, false, null),
((select id from p where promoter_code = 'PROM-002'), 'Sami Bensalem', 'Physique', 60.00, 'MA', true, 'Sous surveillance', true, true, false, 'Quelques incidents sur lignes CT'),
((select id from p where promoter_code = 'PROM-002'), 'Rivage Partners', 'Morale', 40.00, 'MA', false, 'NC', false, false, false, null)
on conflict do nothing;

with p as (
  select id, promoter_code from pi_promoters
)
insert into pi_promoter_completed_projects (
  promoter_id, project_name, city, zone, standing, project_type, units_count,
  project_cost, project_revenue, financed_by_bank, financing_bank_name,
  financed_by_our_bank, delivery_year, outcome_status, watchlist_flag,
  incident_flag, restructuring_flag, litigation_flag, comment
)
values
((select id from p where promoter_code = 'PROM-001'), 'Résidence Palm Garden', 'Casablanca', 'Bouskoura', 'Haut Standing', 'Résidentiel', 84, 185000000, 245000000, true, 'Notre banque', true, 2022, 'Réussi', false, false, false, false, 'Projet livré dans de bonnes conditions'),
((select id from p where promoter_code = 'PROM-001'), 'Atlas Offices', 'Casablanca', 'CFC', 'Premium', 'Bureaux', 36, 220000000, 301000000, true, 'Notre banque', true, 2021, 'Réussi', false, false, false, false, 'Très bonne tenue commerciale'),
((select id from p where promoter_code = 'PROM-002'), 'Rivage Temara', 'Témara', 'Harhoura', 'Moyen Standing', 'Résidentiel', 56, 96000000, 118000000, true, 'Notre banque', true, 2023, 'Sous tension', true, true, false, false, 'Décalage commercial, mise en watchlist en fin de cycle')
on conflict do nothing;

with p as (
  select id, promoter_code from pi_promoters
)
insert into pi_promoter_ongoing_projects (
  promoter_id, project_name, city, zone, standing, project_type, units_count,
  project_cost, expected_revenue, work_progress_pct, precommercialisation_pct,
  financed_by_bank, financing_bank_name, financed_by_our_bank, situation_status,
  watchlist_flag, incident_flag, comment
)
values
((select id from p where promoter_code = 'PROM-001'), 'Atlas Living CFC', 'Casablanca', 'CFC', 'Haut Standing', 'Résidentiel', 112, 310000000, 398000000, 54.00, 61.00, true, 'Notre banque', true, 'Normale', false, false, 'Bonne dynamique commerciale'),
((select id from p where promoter_code = 'PROM-001'), 'Bouskoura Hills 2', 'Casablanca', 'Bouskoura', 'Moyen / Haut Standing', 'Résidentiel', 90, 245000000, 310000000, 31.00, 44.00, true, 'Autre banque', false, 'Normale', false, false, null),
((select id from p where promoter_code = 'PROM-002'), 'Rivage Hay Riad', 'Rabat', 'Hay Riad', 'Moyen Standing', 'Mixte', 64, 148000000, 182000000, 26.00, 19.00, true, 'Notre banque', true, 'Sous tension', true, true, 'Précommercialisation faible, surveillance renforcée')
on conflict do nothing;

with p as (
  select id, promoter_code from pi_promoters
)
insert into pi_promoter_bank_events (
  promoter_id, event_date, event_type, severity, resolved_flag, comment
)
values
((select id from p where promoter_code = 'PROM-001'), '2022-09-15', 'Retard documentaire', 'Faible', true, 'Régularisé sous 2 semaines'),
((select id from p where promoter_code = 'PROM-002'), '2024-03-20', 'Watchlist commerciale', 'Moyenne', false, 'Préventes inférieures au business plan'),
((select id from p where promoter_code = 'PROM-002'), '2024-11-02', 'Incident de paiement', 'Élevée', true, 'Incident ponctuel régularisé')
on conflict do nothing;
