
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  services TEXT[] NOT NULL DEFAULT '{}',
  owners TEXT NOT NULL DEFAULT '',
  source TEXT NOT NULL DEFAULT 'typeform',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- For now, allow all operations (no auth required for internal tool)
CREATE POLICY "Allow all read access" ON public.leads FOR SELECT USING (true);
CREATE POLICY "Allow all insert access" ON public.leads FOR INSERT WITH CHECK (true);
