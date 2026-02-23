# Olive Hollow Properties AI Property Management Platform

This repository contains a **Next.js** application that serves as a fully autonomous property management platform for **Olive Hollow Properties**.  
The system is designed to manage residential rentals across multiple LLC entities and to operate with minimal owner intervention.  
It includes a public leasing website, applicant workflows, tenant and owner portals, automated lease generation and signing, maintenance coordination, rent collection, financial reporting and compliance tracking.

## Architecture Overview

- **Frontend** – Built with **Next.js** and React.  It contains pages for public property listings, unit detail pages with application forms, a tenant portal and an owner dashboard.
- **Backend** – Data is stored in **Supabase**, which provides a Postgres database with row‑level security, authentication, storage and realtime APIs.  Supabase uses a Postgres database and supports row‑level security to ensure users can only access their own information【390742577623014†L104-L114】.
- **Payments** – **Stripe** is used to accept rent via ACH and card payments.  Stripe Payments enables businesses to accept more than **100 payment methods**, including ACH Direct Debit and credit cards【120047348330141†L570-L575】.
- **Communication** – **Twilio**’s Programmable Messaging API adds SMS capabilities to the application; requests are authenticated via API keys【29060598208859†L217-L279】.
- **Email** – **Twilio SendGrid** provides a **trusted email API for reliable delivery at scale**【881420989107031†L557-L562】.  SendGrid can be integrated in minutes using RESTful APIs and SMTP【881420989107031†L610-L612】.
- **Document Signing** – **DocuSign eSignature** automates agreement workflows and provides a document workflow automation system that reduces the time spent chasing signatures【678963661032952†L350-L354】.

## Getting Started

### 1. Supabase Project Setup

1. **Create a new project** in the Supabase dashboard and note the project URL and anonymous API key【390742577623014†L120-L178】.  
2. Copy the contents of `schema.sql` into the Supabase SQL editor and run it to create the required tables (`properties`, `units`, `applications`, `tenants`, `maintenance_requests`, `payments` and `leases`).
3. In **Authentication** settings, enable **email/password sign‑in** and configure **Row Level Security** as needed.
4. Obtain your project’s **anon** and **service_role** keys from the API Keys section of the settings【390742577623014†L170-L184】.

### 2. Environment Configuration

Create a `.env.local` file in the root of the project and add the following variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

STRIPE_SECRET_KEY=your_stripe_secret_key
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
SENDGRID_API_KEY=your_sendgrid_api_key
DOCUSIGN_ACCOUNT_ID=your_docusign_account_id
DOCUSIGN_BASE_URL=https://demo.docusign.net/restapi
DOCUSIGN_INTEGRATOR_KEY=your_docusign_integrator_key
DOCUSIGN_ACCESS_TOKEN=your_docusign_oauth_token
```

- **Twilio** – Create an API key and secret in the Twilio Console.  Twilio’s API uses HTTP basic authentication with your API key as the username and the key secret as the password【29060598208859†L217-L279】.
- **SendGrid** – Generate a SendGrid API key.  SendGrid’s email API is trusted for reliable delivery at scale【881420989107031†L557-L562】 and can be integrated quickly【881420989107031†L610-L612】.
- **Stripe** – Obtain a secret key from your Stripe dashboard.  Stripe Payments supports 100+ payment methods including ACH【120047348330141†L570-L575】.
- **DocuSign** – Sign up for a developer account.  Obtain your integrator key (client ID), account ID, base URL, and OAuth access token.  DocuSign eSignature automates document workflows【678963661032952†L350-L354】.

### 3. Installing Dependencies

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

### 4. Deploying

1. Push the repository to your Git provider (e.g. GitHub).
2. Create a new project on **Vercel** and import the repository.
3. In the Vercel dashboard, set the environment variables listed above.
4. Deploy your application.  Vercel will build and host both the public website and the owner/tenant portals.

## Usage

### Public Website

Visitors can browse available properties and units.  Each unit page displays details and includes an **application form**.  When an applicant submits a form, the information is stored in the `applications` table and can trigger notifications via email or SMS.

### Applicant Workflow

The `/apply/[unitId]` page collects applicant data and writes it to the database.  You can extend this workflow to perform pre‑screening or background checks and to automatically send lease documents.

### Tenant Portal

After signing a lease, tenants can log in via Supabase authentication.  In the `/tenant` portal, they can:

- **Pay rent** – A request is sent to the `/api/create-checkout-session` API route, which uses Stripe to create a Checkout session and redirect the tenant to the payment page.
- **Submit maintenance requests** – Requests are saved in the `maintenance_requests` table and can trigger automated dispatch to vendors via Twilio.

### Owner Dashboard

The `/admin` page is the owner portal.  It lists all applications and maintenance requests.  In a full implementation you can add buttons to approve or deny applications, send DocuSign envelopes for leases, view payments, and update compliance deadlines.

## Adding New Properties and Units

1. Insert a row into the **`properties`** table with the property name, address and associated LLC (`entity` column).
2. Insert rows into the **`units`** table referencing the property ID.  Include the unit number, bedroom/bathroom count and monthly rent.
3. Once added, the new units automatically appear on the public website and applicants can apply.

## Adding Vendors

To manage vendors such as plumbers or electricians, create a `vendors` table in Supabase with fields like `id`, `name`, `service_type`, `phone`, and `email`.  Extend the maintenance dispatcher (for example by creating a `/api/dispatch-vendor` route) to select vendors based on service type and notify them via Twilio.

## Managing Tenants

Tenants are linked to authenticated users in Supabase via the `tenants` table.  Update their lease start and end dates, rent amount and unit association.  The `payments` table records rent payments processed via Stripe.  You can use Stripe webhooks to update payment statuses in real time.

## Compliance Tracking

For license renewals and inspections, create a `compliance_events` table with fields such as `property_id`, `type`, `due_date` and `status`.  Implement scheduled functions (Supabase Edge Functions or Vercel Cron jobs) to send reminders when deadlines approach.  This helps ensure adherence to Maryland and California rental requirements.

## Extending the System

This project provides a skeleton upon which a fully autonomous property management platform can be built.  Suggested enhancements include:

- **Applicant screening** – Incorporate credit checks and rental history evaluations.
- **Dynamic lease generation** – Use a template engine to generate leases based on unit details and send them via DocuSign automatically.
- **Listing syndication** – Integrate with services like Zillow or Apartments.com to publish vacancies across multiple listing platforms.
- **AI assistance** – Build agents that respond to tenant inquiries, triage maintenance requests and handle compliance tasks using OpenAI’s API.

By combining these components, Olive Hollow Properties can manage properties remotely with a professional presence and minimal manual work.