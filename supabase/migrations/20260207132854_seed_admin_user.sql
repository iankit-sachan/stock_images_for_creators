/*
  # Seed initial admin user

  1. New Data
    - Creates an admin user in auth.users with email admin@pumaai.in
    - Creates corresponding profile with role 'admin'
    - Creates identity record for email provider

  2. Important Notes
    - Password: admin123456 (should be changed after first login)
    - The user is created with email confirmed so they can log in immediately
    - The trigger will create a 'user' profile, then we upgrade to 'admin'
*/

DO $$
DECLARE
  new_user_id uuid := gen_random_uuid();
BEGIN
  INSERT INTO auth.users (
    id,
    instance_id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    recovery_token
  ) VALUES (
    new_user_id,
    '00000000-0000-0000-0000-000000000000',
    'authenticated',
    'authenticated',
    'admin@pumaai.in',
    crypt('admin123456', gen_salt('bf')),
    now(),
    '{"provider": "email", "providers": ["email"]}'::jsonb,
    '{"full_name": "Admin"}'::jsonb,
    now(),
    now(),
    '',
    ''
  );

  INSERT INTO auth.identities (
    id,
    user_id,
    provider_id,
    provider,
    identity_data,
    last_sign_in_at,
    created_at,
    updated_at
  ) VALUES (
    gen_random_uuid(),
    new_user_id,
    new_user_id::text,
    'email',
    jsonb_build_object('sub', new_user_id::text, 'email', 'admin@pumaai.in'),
    now(),
    now(),
    now()
  );

  INSERT INTO public.profiles (id, role)
  VALUES (new_user_id, 'admin')
  ON CONFLICT (id) DO UPDATE SET role = 'admin';
END $$;
