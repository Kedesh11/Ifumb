-- Migration to update certification format from string[] to { name, url }[]

-- 1. Ensure the site-images bucket exists (it should, but just in case)
INSERT INTO storage.buckets (id, name, public)
VALUES ('site-images', 'site-images', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Transform existing data in site_configs
-- This converts ["Cert Name"] to [{"name": "Cert Name"}] for each founder
UPDATE site_configs
SET data = (
  SELECT jsonb_set(
    data,
    '{founders}',
    (
      SELECT jsonb_agg(
        founder || jsonb_build_object(
          'certifications',
          COALESCE(
            (
              SELECT jsonb_agg(
                CASE 
                  WHEN jsonb_typeof(cert) = 'string' THEN jsonb_build_object('name', cert, 'url', NULL)
                  ELSE cert
                END
              )
              FROM jsonb_array_elements(founder->'certifications') AS cert
            ),
            '[]'::jsonb
          )
        )
      )
      FROM jsonb_array_elements(data->'founders') AS founder
    )
  )
)
WHERE data->'founders' IS NOT NULL;

-- 3. Note: The storage policies in 20240227_initial_schema.sql already allow any file type 
-- in the 'site-images' bucket, so no changes are needed for PDF uploads.
