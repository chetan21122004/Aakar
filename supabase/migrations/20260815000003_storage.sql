-- Storage buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  ('product-media', 'product-media', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']),
  ('enquiry-uploads', 'enquiry-uploads', false, 20971520, ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf'])
ON CONFLICT (id) DO NOTHING;

-- product-media: public read
CREATE POLICY product_media_public_read ON storage.objects
  FOR SELECT USING (bucket_id = 'product-media');

CREATE POLICY product_media_admin_write ON storage.objects
  FOR ALL USING (bucket_id = 'product-media' AND public.is_admin());

-- enquiry-uploads: admin only
CREATE POLICY enquiry_uploads_admin ON storage.objects
  FOR ALL USING (bucket_id = 'enquiry-uploads' AND public.is_admin());
