-- Migration pour le projet IFUMB

-- 1. Table pour la configuration du site
CREATE TABLE IF NOT EXISTS site_configs (
    id TEXT PRIMARY KEY DEFAULT 'main-config',
    data JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS pour site_configs (Lecture publique, écriture restreinte)
ALTER TABLE site_configs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on site_configs"
ON site_configs FOR SELECT
USING (true);

CREATE POLICY "Allow authenticated update on site_configs"
ON site_configs FOR UPDATE
TO anon, authenticated
USING (true);

CREATE POLICY "Allow authenticated insert on site_configs"
ON site_configs FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- 2. Table pour les messages de contact
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS pour contact_messages (Insertion publique, lecture/suppression restreinte)
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert on contact_messages"
ON contact_messages FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Allow authenticated select on contact_messages"
ON contact_messages FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Allow authenticated delete on contact_messages"
ON contact_messages FOR DELETE
TO anon, authenticated
USING (true);

-- 3. Configuration du Storage (Bucket pour les images)

-- Création du bucket s'il n'existe pas
INSERT INTO storage.buckets (id, name, public)
VALUES ('site-images', 'site-images', true)
ON CONFLICT (id) DO NOTHING;

-- Politiques pour les objets du bucket 'site-images'
-- Note: On vérifie si les politiques existent avant de les créer (ou on les remplace)

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'objects' AND policyname = 'Public Access on site-images'
    ) THEN
        CREATE POLICY "Public Access on site-images"
        ON storage.objects FOR SELECT
        USING ( bucket_id = 'site-images' );
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'objects' AND policyname = 'Public Upload on site-images'
    ) THEN
        CREATE POLICY "Public Upload on site-images"
        ON storage.objects FOR INSERT
        TO anon, authenticated
        WITH CHECK ( bucket_id = 'site-images' );
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'objects' AND policyname = 'Public Delete on site-images'
    ) THEN
        CREATE POLICY "Public Delete on site-images"
        ON storage.objects FOR DELETE
        TO anon, authenticated
        USING ( bucket_id = 'site-images' );
    END IF;
END
$$;
