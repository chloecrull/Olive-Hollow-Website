-- Database schema for Olive Hollow Properties property management platform.
-- This script creates tables for properties, units, applications, tenants,
-- maintenance requests, payments and leases. You can run this SQL in the
-- Supabase SQL editor after creating your project【390742577623014†L120-L178】.

-- Properties table stores high‑level information about each property.
create table if not exists properties (
  id serial primary key,
  name text,
  address text,
  city text,
  state text,
  postal_code text,
  entity text
);

-- Units table stores individual rental units and references the property.
create table if not exists units (
  id serial primary key,
  property_id integer references properties(id),
  unit_number text,
  bedrooms integer,
  bathrooms integer,
  sqft integer,
  rent integer
);

-- Tour scheduling (1-hour blocks)
create table if not exists tour_bookings (
  id serial primary key,
  property_id integer references properties(id),
  unit_id integer references units(id),
  date date not null,
  time text not null, -- HH:MM in property-local time
  timezone text not null, -- IANA tz, e.g. America/Los_Angeles
  name text not null,
  email text not null,
  phone text,
  status text default 'booked',
  created_at timestamp default timezone('utc', now())
);

-- Optional (recommended) unique index to prevent double-booking:
-- create unique index if not exists tour_unique_slot on tour_bookings(property_id, date, time);

-- Applications table collects applicant information for specific units.
create table if not exists applications (
  id serial primary key,
  unit_id integer references units(id),
  name text,
  email text,
  phone text,
  message text,
  status text default 'submitted',
  created_at timestamp default timezone('utc', now())
);

-- Tenants table links authenticated users to units and tracks lease terms.
create table if not exists tenants (
  id serial primary key,
  unit_id integer references units(id),
  user_id uuid references auth.users(id),
  lease_start date,
  lease_end date,
  rent integer
);

-- Maintenance requests table records issues reported by tenants.
create table if not exists maintenance_requests (
  id serial primary key,
  unit_id integer references units(id),
  description text,
  urgency text,
  status text default 'submitted',
  created_at timestamp default timezone('utc', now())
);

-- Payments table tracks rent payments processed via Stripe.
create table if not exists payments (
  id serial primary key,
  tenant_id integer references tenants(id),
  amount integer,
  status text,
  checkout_session_id text,
  created_at timestamp default timezone('utc', now())
);

-- Leases table stores information about executed leases.
create table if not exists leases (
  id serial primary key,
  unit_id integer references units(id),
  tenant_id integer references tenants(id),
  document_url text,
  signed boolean default false
);