/*
# Create enquiries table

1. New Tables
- `enquiries`
  - `id` (uuid, primary key, auto-generated)
  - `name` (text, not null) — the enquirer's full name
  - `email` (text, not null) — contact email
  - `phone` (text, nullable) — optional phone number
  - `service` (text, not null) — which service they're interested in (e.g. "Private Consultation", "Corporate & Speaking")
  - `message` (text, nullable) — optional message from the enquirer
  - `created_at` (timestamptz, default now()) — submission timestamp

2. Security
- Enable RLS on `enquiries`.
- Allow anyone (anon + authenticated) to INSERT — the public enquiry form needs to submit without sign-in.
- No SELECT/UPDATE/DELETE for anon or authenticated — only the service role (server-side) can read or manage enquiries, protecting visitor data.

3. Important Notes
- This is a no-auth public-facing website. The enquiry form is submitted by anonymous visitors.
- Only INSERT is granted to public roles; reading/managing enquiries is restricted to the service role key (used server-side only).
- No medical or crisis data is collected — the form explicitly excludes health details per the client's requirements.
*/

CREATE TABLE IF NOT EXISTS enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  service text NOT NULL,
  message text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_enquiries" ON enquiries;
CREATE POLICY "anon_insert_enquiries" ON enquiries FOR INSERT
TO anon, authenticated WITH CHECK (true);
