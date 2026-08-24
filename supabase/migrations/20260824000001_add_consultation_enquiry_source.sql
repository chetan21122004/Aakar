-- Distinguish home consultations from furniture / product enquiries.
ALTER TYPE public.enquiry_source ADD VALUE IF NOT EXISTS 'consultation';
