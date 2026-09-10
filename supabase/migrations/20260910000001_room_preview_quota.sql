CREATE TABLE public.room_preview_daily_usage (
  user_id uuid NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  usage_date date NOT NULL,
  count integer NOT NULL DEFAULT 0 CHECK (count >= 0),
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, usage_date)
);

ALTER TABLE public.room_preview_daily_usage ENABLE ROW LEVEL SECURITY;

CREATE POLICY room_preview_daily_usage_select_own
  ON public.room_preview_daily_usage
  FOR SELECT
  USING (auth.uid() = user_id OR public.is_admin());

CREATE OR REPLACE FUNCTION public.room_preview_usage_today()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  today date := (timezone('Asia/Kolkata', now()))::date;
  used integer;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'not_authenticated';
  END IF;

  SELECT count INTO used
  FROM public.room_preview_daily_usage
  WHERE user_id = auth.uid() AND usage_date = today;

  RETURN coalesce(used, 0);
END;
$$;

CREATE OR REPLACE FUNCTION public.consume_room_preview()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  today date := (timezone('Asia/Kolkata', now()))::date;
  new_count integer;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'not_authenticated';
  END IF;

  INSERT INTO public.room_preview_daily_usage (user_id, usage_date, count)
  VALUES (auth.uid(), today, 1)
  ON CONFLICT (user_id, usage_date)
  DO UPDATE SET
    count = public.room_preview_daily_usage.count + 1,
    updated_at = now()
  WHERE public.room_preview_daily_usage.count < 5
  RETURNING count INTO new_count;

  IF new_count IS NULL THEN
    RETURN -1;
  END IF;

  RETURN new_count;
END;
$$;

CREATE OR REPLACE FUNCTION public.refund_room_preview()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  today date := (timezone('Asia/Kolkata', now()))::date;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'not_authenticated';
  END IF;

  UPDATE public.room_preview_daily_usage
  SET count = count - 1, updated_at = now()
  WHERE user_id = auth.uid()
    AND usage_date = today
    AND count > 0;
END;
$$;

GRANT EXECUTE ON FUNCTION public.room_preview_usage_today() TO authenticated;
GRANT EXECUTE ON FUNCTION public.consume_room_preview() TO authenticated;
GRANT EXECUTE ON FUNCTION public.refund_room_preview() TO authenticated;
