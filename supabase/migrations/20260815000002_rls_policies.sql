-- Row Level Security

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_option_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_option_values ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collection_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_post_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

-- Profiles
CREATE POLICY profiles_select_own ON public.profiles FOR SELECT USING (auth.uid() = id OR public.is_admin());
CREATE POLICY profiles_update_own ON public.profiles FOR UPDATE USING (auth.uid() = id OR public.is_admin());

-- Catalog (public read)
CREATE POLICY categories_public_read ON public.categories FOR SELECT USING (is_published = true OR public.is_admin());
CREATE POLICY collections_public_read ON public.collections FOR SELECT USING (is_published = true OR public.is_admin());
CREATE POLICY products_public_read ON public.products FOR SELECT USING (is_published = true OR public.is_admin());
CREATE POLICY product_images_public_read ON public.product_images FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.products p WHERE p.id = product_id AND (p.is_published = true OR public.is_admin()))
);
CREATE POLICY product_option_types_public_read ON public.product_option_types FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.products p WHERE p.id = product_id AND (p.is_published = true OR public.is_admin()))
);
CREATE POLICY product_option_values_public_read ON public.product_option_values FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.product_option_types pot
    JOIN public.products p ON p.id = pot.product_id
    WHERE pot.id = option_type_id AND (p.is_published = true OR public.is_admin())
  )
);
CREATE POLICY product_variants_public_read ON public.product_variants FOR SELECT USING (
  is_active = true AND EXISTS (
    SELECT 1 FROM public.products p WHERE p.id = product_id AND (p.is_published = true OR public.is_admin())
  )
);
CREATE POLICY collection_products_public_read ON public.collection_products FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.collections c WHERE c.id = collection_id AND (c.is_published = true OR public.is_admin()))
);

-- Addresses
CREATE POLICY addresses_select_own ON public.addresses FOR SELECT USING (auth.uid() = user_id OR public.is_admin());
CREATE POLICY addresses_insert_own ON public.addresses FOR INSERT WITH CHECK (auth.uid() = user_id OR public.is_admin());
CREATE POLICY addresses_update_own ON public.addresses FOR UPDATE USING (auth.uid() = user_id OR public.is_admin());
CREATE POLICY addresses_delete_own ON public.addresses FOR DELETE USING (auth.uid() = user_id OR public.is_admin());

-- Carts (authenticated users only via client; guests use service role API)
CREATE POLICY carts_select_own ON public.carts FOR SELECT USING (auth.uid() = user_id OR public.is_admin());
CREATE POLICY carts_insert_own ON public.carts FOR INSERT WITH CHECK (auth.uid() = user_id OR public.is_admin());
CREATE POLICY carts_update_own ON public.carts FOR UPDATE USING (auth.uid() = user_id OR public.is_admin());
CREATE POLICY carts_delete_own ON public.carts FOR DELETE USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY cart_items_select_own ON public.cart_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.carts c WHERE c.id = cart_id AND (c.user_id = auth.uid() OR public.is_admin()))
);
CREATE POLICY cart_items_insert_own ON public.cart_items FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.carts c WHERE c.id = cart_id AND (c.user_id = auth.uid() OR public.is_admin()))
);
CREATE POLICY cart_items_update_own ON public.cart_items FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.carts c WHERE c.id = cart_id AND (c.user_id = auth.uid() OR public.is_admin()))
);
CREATE POLICY cart_items_delete_own ON public.cart_items FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.carts c WHERE c.id = cart_id AND (c.user_id = auth.uid() OR public.is_admin()))
);

-- Wishlists
CREATE POLICY wishlists_select_own ON public.wishlists FOR SELECT USING (auth.uid() = user_id OR public.is_admin());
CREATE POLICY wishlists_insert_own ON public.wishlists FOR INSERT WITH CHECK (auth.uid() = user_id OR public.is_admin());
CREATE POLICY wishlists_update_own ON public.wishlists FOR UPDATE USING (auth.uid() = user_id OR public.is_admin());
CREATE POLICY wishlists_delete_own ON public.wishlists FOR DELETE USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY wishlist_items_select_own ON public.wishlist_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.wishlists w WHERE w.id = wishlist_id AND (w.user_id = auth.uid() OR public.is_admin()))
);
CREATE POLICY wishlist_items_insert_own ON public.wishlist_items FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.wishlists w WHERE w.id = wishlist_id AND (w.user_id = auth.uid() OR public.is_admin()))
);
CREATE POLICY wishlist_items_delete_own ON public.wishlist_items FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.wishlists w WHERE w.id = wishlist_id AND (w.user_id = auth.uid() OR public.is_admin()))
);

-- Orders (customers read own; writes via service role)
CREATE POLICY orders_select_own ON public.orders FOR SELECT USING (auth.uid() = user_id OR public.is_admin());
CREATE POLICY order_items_select_own ON public.order_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.orders o WHERE o.id = order_id AND (o.user_id = auth.uid() OR public.is_admin()))
);
CREATE POLICY order_events_select_own ON public.order_events FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.orders o WHERE o.id = order_id AND (o.user_id = auth.uid() OR public.is_admin()))
);

-- Enquiries
CREATE POLICY enquiries_select_own ON public.enquiries FOR SELECT USING (auth.uid() = user_id OR public.is_admin());

-- Blog & FAQ
CREATE POLICY blog_posts_public_read ON public.blog_posts FOR SELECT USING (is_published = true OR public.is_admin());
CREATE POLICY blog_post_sections_public_read ON public.blog_post_sections FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.blog_posts bp WHERE bp.id = post_id AND (bp.is_published = true OR public.is_admin()))
);
CREATE POLICY faqs_public_read ON public.faqs FOR SELECT USING (is_published = true OR public.is_admin());

-- Admin full access policies
CREATE POLICY categories_admin_all ON public.categories FOR ALL USING (public.is_admin());
CREATE POLICY collections_admin_all ON public.collections FOR ALL USING (public.is_admin());
CREATE POLICY products_admin_all ON public.products FOR ALL USING (public.is_admin());
CREATE POLICY product_images_admin_all ON public.product_images FOR ALL USING (public.is_admin());
CREATE POLICY product_option_types_admin_all ON public.product_option_types FOR ALL USING (public.is_admin());
CREATE POLICY product_option_values_admin_all ON public.product_option_values FOR ALL USING (public.is_admin());
CREATE POLICY product_variants_admin_all ON public.product_variants FOR ALL USING (public.is_admin());
CREATE POLICY collection_products_admin_all ON public.collection_products FOR ALL USING (public.is_admin());
CREATE POLICY enquiries_admin_all ON public.enquiries FOR ALL USING (public.is_admin());
CREATE POLICY blog_posts_admin_all ON public.blog_posts FOR ALL USING (public.is_admin());
CREATE POLICY blog_post_sections_admin_all ON public.blog_post_sections FOR ALL USING (public.is_admin());
CREATE POLICY faqs_admin_all ON public.faqs FOR ALL USING (public.is_admin());
CREATE POLICY orders_admin_all ON public.orders FOR ALL USING (public.is_admin());
CREATE POLICY order_items_admin_all ON public.order_items FOR ALL USING (public.is_admin());
CREATE POLICY order_events_admin_all ON public.order_events FOR ALL USING (public.is_admin());
CREATE POLICY payments_admin_all ON public.payments FOR ALL USING (public.is_admin());
