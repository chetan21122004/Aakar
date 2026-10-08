CREATE TABLE public.collection_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  collection_id uuid NOT NULL REFERENCES public.collections(id) ON DELETE CASCADE,
  path text NOT NULL,
  alt text,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_collection_images_collection ON public.collection_images(collection_id, sort_order);

ALTER TABLE public.collection_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY collection_images_public_read ON public.collection_images
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.collections c
      WHERE c.id = collection_id AND (c.is_published = true OR public.is_admin())
    )
  );

CREATE POLICY collection_images_admin_all ON public.collection_images
  FOR ALL USING (public.is_admin());
