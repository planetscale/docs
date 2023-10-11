---
title: 'Account password security'
subtitle: 'Securing your PlanetScale.com account password'
date: '2022-08-01'
---

In addition to best practices like [multi-factor authentication](/docs/concepts/mfa), PlanetScale securely stores your account passwords and validates passwords against known security breaches.

## Password storage

PlanetScale uses [Argon2](https://en.wikipedia.org/wiki/Argon2) as the password hashing function. We use the `Argon2id` variant, which provides protection against side channel attacks and GPU-based cracking attacks.

A password hashing function is a one-way function which means that your password cannot be reversed or decrypted from the stored value in the database.

## Leaked passwords

PlanetScale checks passwords when a user sets them during sign-up or when changing the password. The first check is that the password needs to have enough entropy. Entropy is a measure for the amount of randomness a password contains. Read more about how we use entropy for [user-friendly strong passwords in the PlanetScale blog](/blog/using-entropy-for-user-friendly-strong-passwords).

PlanetScale also checks the password against [Have I been pwned](https://haveibeenpwned.com). _Have I been pwned_ is a large database containing passwords seen in security breaches.

PlanetScale does **not** send the password you enter to _Have I been pwned_. The _Have I been pwned_ API provides anonymity through [the Cloudflare k-anonymity implementation](https://blog.cloudflare.com/validating-leaked-passwords-with-k-anonymity/). This ensures that no other provider can identify the password that you have entered.

The password is also not associated in any way with the email address you use to sign up. This information is not shared with _Have I been pwned_, nor is this information needed for the leaked passwords API they provide.
