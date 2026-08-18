-- Seed products, variants, images, collection links, blog, FAQs

DO $$
DECLARE
  pid uuid;
  cid uuid;
BEGIN
  SELECT id INTO cid FROM categories WHERE slug = 'consoles';
  INSERT INTO products (slug,name,short_description,long_description,category_id,materials,dimensions_label,specs,production_time_label,lead_time_days_min,lead_time_days_max)
  VALUES ('fluted-console','Hampi Rift Console','A grounded console composed from divided monolithic volumes.','Our most celebrated piece.',cid,ARRAY['Solid Indian Walnut'], 'W 150 × D 40 × H 75 cm',ARRAY['Vertical fluting'], '4–6 weeks',28,42)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name RETURNING id INTO pid;
  DELETE FROM product_variants WHERE product_id = pid;
  INSERT INTO product_variants (product_id,sku,options,price_paise,stock_qty,is_default) VALUES
    (pid,'AKR-01-1','{"finish":"Natural Oil"}',12500000,5,true),
    (pid,'AKR-01-2','{"finish":"Matte Lacquer"}',12650000,2,false),
    (pid,'AKR-01-3','{"finish":"Dark Stain"}',12700000,0,false);
  DELETE FROM product_images WHERE product_id = pid;
  INSERT INTO product_images (product_id,path,alt,sort_order) VALUES (pid,'/catalog/hampi-rift-console.webp','Hampi Rift Console',0);

  SELECT id INTO cid FROM categories WHERE slug = 'dining-tables';
  INSERT INTO products (slug,name,short_description,long_description,category_id,materials,dimensions_label,production_time_label,lead_time_days_min,lead_time_days_max)
  VALUES ('signature-dining-table','Still Mandu Dining Table','Repeated arch forms create a quiet rhythm beneath an oval top.','A signature dining table built from solid Indian walnut.',cid,ARRAY['Solid Indian Walnut'],'Customizable','4–6 weeks',28,42)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name RETURNING id INTO pid;
  DELETE FROM product_variants WHERE product_id = pid;
  INSERT INTO product_variants (product_id,sku,options,price_paise,stock_qty,is_default) VALUES
    (pid,'AKR-02-1','{"finish":"Natural Oil"}',28500000,7,true),
    (pid,'AKR-02-2','{"finish":"Matte Lacquer"}',28650000,3,false),
    (pid,'AKR-02-3','{"finish":"Dark Stain"}',28700000,0,false);
  DELETE FROM product_images WHERE product_id = pid;
  INSERT INTO product_images (product_id,path,alt,sort_order) VALUES (pid,'/catalog/still-mandu-dining-table.webp','Still Mandu Dining Table',0);

  SELECT id INTO cid FROM categories WHERE slug = 'coffee-tables';
  INSERT INTO products (slug,name,short_description,long_description,category_id,materials,production_time_label,lead_time_days_min,lead_time_days_max)
  VALUES ('coffee-table','Mandu Oval Coffee Table','A low oval centrepiece shaped by repetition, openness and stillness.','Designed as a quiet centrepiece for living rooms.',cid,ARRAY['Solid Indian Walnut'],'4–6 weeks',28,42)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name RETURNING id INTO pid;
  DELETE FROM product_variants WHERE product_id = pid;
  INSERT INTO product_variants (product_id,sku,options,price_paise,stock_qty,is_default) VALUES
    (pid,'AKR-03-1','{"finish":"Natural Oil"}',7500000,9,true),
    (pid,'AKR-03-2','{"finish":"Matte Lacquer"}',7650000,1,false),
    (pid,'AKR-03-3','{"finish":"Dark Stain"}',7700000,0,false);
  DELETE FROM product_images WHERE product_id = pid;
  INSERT INTO product_images (product_id,path,alt,sort_order) VALUES (pid,'/catalog/still-mandu-coffee-table.webp','Mandu Oval Coffee Table',0);

  SELECT id INTO cid FROM categories WHERE slug = 'chairs';
  INSERT INTO products (slug,name,short_description,long_description,category_id,materials,production_time_label,lead_time_days_min,lead_time_days_max)
  VALUES ('dining-chair','Mandu Arch Lounge Chair','An enveloping lounge chair framed by Mandu''s repeated arches.','An ergonomic dining chair with a subtle curved backrest.',cid,ARRAY['Solid Indian Walnut'],'4–6 weeks',28,42)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name RETURNING id INTO pid;
  DELETE FROM product_variants WHERE product_id = pid;
  INSERT INTO product_variants (product_id,sku,options,price_paise,stock_qty,is_default) VALUES
    (pid,'AKR-04-1','{"finish":"Natural Oil"}',4200000,6,true),
    (pid,'AKR-04-2','{"finish":"Matte Lacquer"}',4350000,2,false),
    (pid,'AKR-04-3','{"finish":"Dark Stain"}',4400000,0,false);
  DELETE FROM product_images WHERE product_id = pid;
  INSERT INTO product_images (product_id,path,alt,sort_order) VALUES (pid,'/catalog/still-mandu-lounge-chair.webp','Mandu Arch Lounge Chair',0);

  SELECT id INTO cid FROM categories WHERE slug = 'consoles';
  INSERT INTO products (slug,name,short_description,long_description,category_id,materials,dimensions_label,production_time_label,lead_time_days_min,lead_time_days_max)
  VALUES ('rounded-edge-console','Hampi Rift Media Unit','A long media unit built from separated stone-like volumes.','A minimalist console with soft, tactile rounded edges.',cid,ARRAY['Solid Indian Walnut'],'W 120 × D 35 × H 70 cm','4–6 weeks',28,42)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name RETURNING id INTO pid;
  DELETE FROM product_variants WHERE product_id = pid;
  INSERT INTO product_variants (product_id,sku,options,price_paise,stock_qty,is_default) VALUES
    (pid,'AKR-05-1','{"finish":"Natural Oil"}',9800000,8,true),
    (pid,'AKR-05-2','{"finish":"Matte Lacquer"}',9950000,0,false);
  DELETE FROM product_images WHERE product_id = pid;
  INSERT INTO product_images (product_id,path,alt,sort_order) VALUES (pid,'/catalog/hampi-rift-media-unit.webp','Hampi Rift Media Unit',0);

  INSERT INTO products (slug,name,short_description,long_description,category_id,materials,dimensions_label,production_time_label,lead_time_days_min,lead_time_days_max)
  VALUES ('heritage-console','Bishnupur Story Console','Narrative terracotta reliefs translated into carved timber panels.','Where subtle traditional joinery meets modern proportions.',cid,ARRAY['Solid Indian Walnut'],'W 180 × D 45 × H 75 cm','4–6 weeks',28,42)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name RETURNING id INTO pid;
  DELETE FROM product_variants WHERE product_id = pid;
  INSERT INTO product_variants (product_id,sku,options,price_paise,stock_qty,is_default) VALUES
    (pid,'AKR-06-1','{"finish":"Natural Oil"}',14000000,5,true),
    (pid,'AKR-06-2','{"finish":"Dark Stain"}',14200000,0,false);
  DELETE FROM product_images WHERE product_id = pid;
  INSERT INTO product_images (product_id,path,alt,sort_order) VALUES (pid,'/catalog/bishnupur-console.webp','Bishnupur Story Console',0);

  SELECT id INTO cid FROM categories WHERE slug = 'beds';
  INSERT INTO products (slug,name,short_description,long_description,category_id,materials,dimensions_label,production_time_label,lead_time_days_min,lead_time_days_max)
  VALUES ('teak-platform-bed','Bishnupur Story Bed','A carved bed where temple stories become texture and material.','A low platform bed in solid wood with clean lines.',cid,ARRAY['Solid Teak'],'Queen / King (customizable)','5–7 weeks',35,49)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name RETURNING id INTO pid;
  DELETE FROM product_variants WHERE product_id = pid;
  INSERT INTO product_variants (product_id,sku,options,price_paise,stock_qty,is_default) VALUES
    (pid,'AKR-07-1','{"finish":"Natural Oil"}',16500000,7,true),
    (pid,'AKR-07-2','{"finish":"Matte Lacquer"}',16650000,2,false),
    (pid,'AKR-07-3','{"finish":"Dark Stain"}',16700000,0,false);
  DELETE FROM product_images WHERE product_id = pid;
  INSERT INTO product_images (product_id,path,alt,sort_order) VALUES (pid,'/catalog/bishnupur-bed.webp','Bishnupur Story Bed',0);

  SELECT id INTO cid FROM categories WHERE slug = 'sofas';
  INSERT INTO products (slug,name,short_description,long_description,category_id,materials,dimensions_label,production_time_label,lead_time_days_min,lead_time_days_max)
  VALUES ('lounge-sofa','Fatehpur Sikri Sofa','Ceremonial arches and carved surfaces balanced with everyday comfort.','A lounge sofa built on a solid wood frame.',cid,ARRAY['Solid Indian Walnut','Upholstery fabric'],'W 210 × D 95 × H 80 cm','5–7 weeks',35,49)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name RETURNING id INTO pid;
  DELETE FROM product_variants WHERE product_id = pid;
  INSERT INTO product_variants (product_id,sku,options,price_paise,stock_qty,is_default) VALUES
    (pid,'AKR-08-1','{"finish":"Natural Oil"}',18500000,6,true),
    (pid,'AKR-08-2','{"finish":"Matte Lacquer"}',18650000,0,false);
  DELETE FROM product_images WHERE product_id = pid;
  INSERT INTO product_images (product_id,path,alt,sort_order) VALUES (pid,'/catalog/fatehpur-sikri-sofa.webp','Fatehpur Sikri Sofa',0);

  SELECT id INTO cid FROM categories WHERE slug = 'wardrobes';
  INSERT INTO products (slug,name,short_description,long_description,category_id,materials,production_time_label,lead_time_days_min,lead_time_days_max)
  VALUES ('linear-wardrobe','Fatehpur Sikri Media Unit','An architectural media unit exploring beauty that remains functional.','A linear wardrobe with solid wood fronts.',cid,ARRAY['Solid Indian Walnut'],'6–8 weeks',42,56)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name RETURNING id INTO pid;
  DELETE FROM product_variants WHERE product_id = pid;
  INSERT INTO product_variants (product_id,sku,options,price_paise,stock_qty,is_default) VALUES
    (pid,'AKR-09-1','{"finish":"Natural Oil"}',22000000,5,true),
    (pid,'AKR-09-2','{"finish":"Matte Lacquer"}',22150000,2,false),
    (pid,'AKR-09-3','{"finish":"Dark Stain"}',22200000,0,false);
  DELETE FROM product_images WHERE product_id = pid;
  INSERT INTO product_images (product_id,path,alt,sort_order) VALUES (pid,'/catalog/fatehpur-sikri-media-unit.webp','Fatehpur Sikri Media Unit',0);

  SELECT id INTO cid FROM categories WHERE slug = 'cabinets';
  INSERT INTO products (slug,name,short_description,long_description,category_id,materials,dimensions_label,production_time_label,lead_time_days_min,lead_time_days_max)
  VALUES ('storage-cabinet','Bishnupur Story Cabinet','A storage cabinet with carved panels inspired by terracotta storytelling.','A versatile storage cabinet for living rooms.',cid,ARRAY['Solid Indian Walnut','Brushed brass hardware'],'W 100 × D 40 × H 120 cm','4–6 weeks',28,42)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name RETURNING id INTO pid;
  DELETE FROM product_variants WHERE product_id = pid;
  INSERT INTO product_variants (product_id,sku,options,price_paise,stock_qty,is_default) VALUES
    (pid,'AKR-10-1','{"finish":"Natural Oil"}',11000000,8,true),
    (pid,'AKR-10-2','{"finish":"Matte Lacquer"}',11150000,1,false),
    (pid,'AKR-10-3','{"finish":"Dark Stain"}',11200000,0,false);
  DELETE FROM product_images WHERE product_id = pid;
  INSERT INTO product_images (product_id,path,alt,sort_order) VALUES (pid,'/catalog/bishnupur-console.webp','Bishnupur Story Cabinet',0);
END $$;

INSERT INTO public.collection_products (collection_id, product_id, sort_order)
SELECT col.id, p.id, v.sort_order
FROM (VALUES
  ('still-mandu','signature-dining-table',0),('still-mandu','coffee-table',1),('still-mandu','dining-chair',2),
  ('hampi-rift','fluted-console',0),('hampi-rift','rounded-edge-console',1),
  ('fatehpur-sikri','lounge-sofa',0),('fatehpur-sikri','linear-wardrobe',1),
  ('bishnupur-temples','heritage-console',0),('bishnupur-temples','teak-platform-bed',1),('bishnupur-temples','storage-cabinet',2)
) AS v(col_slug, prod_slug, sort_order)
JOIN public.collections col ON col.slug = v.col_slug
JOIN public.products p ON p.slug = v.prod_slug
ON CONFLICT DO NOTHING;

INSERT INTO public.faqs (question, answer, sort_order) VALUES
('How long does production take?', 'Each piece is made to order. Production begins after final approval. Most pieces require 4–6 weeks.', 0),
('Do you ship across India?', 'Yes. Pan-India white-glove delivery is included.', 1),
('Can dimensions be customized?', 'All pieces can be customized within the design framework to suit your space.', 2),
('What finish options are available?', 'Natural Oil, Matte Lacquer, and Dark Stain.', 3),
('How do I care for solid wood furniture?', 'Wipe with a soft dry cloth. Apply wood conditioner every 6 months.', 4),
('Do you work with architects and designers?', 'Yes. We collaborate with architects and interior designers on residential and hospitality projects.', 5),
('Is there a warranty?', 'Yes. Every piece is backed by a 2-year structural warranty.', 6),
('Can I visit your workshop?', 'Yes. Workshop visits are available by appointment.', 7);

INSERT INTO public.blog_posts (slug, title, category, excerpt, image_path) VALUES
('how-to-choose-solid-wood-furniture-for-your-home', 'How to Choose Solid Wood Furniture for Your Home', 'Buying Guide', 'A practical guide to spotting genuine solid wood.', '/catalog/still-mandu-bed.webp'),
('dining-table-size-guide-for-indian-homes', 'Dining Table Size Guide for Indian Homes', 'Furniture Guide', 'How to pick the right dining table dimensions.', '/catalog/bishnupur-dining-table.webp'),
('custom-furniture-vs-ready-made-furniture', 'Custom Furniture vs Ready-Made Furniture', 'Custom Furniture', 'Weighing off-the-shelf convenience vs made-to-order.', '/catalog/hampi-rift-sofa.webp'),
('how-to-match-wood-furniture-with-modern-interiors', 'How to Match Wood Furniture with Modern Interiors', 'Interior Design', 'Pairing solid wood with contemporary styling.', '/catalog/fatehpur-sikri-sofa.webp')
ON CONFLICT (slug) DO NOTHING;
