'use client';

import { Turnstile } from '@marsidev/react-turnstile';

/**
 * Cloudflare Turnstile wrapper.
 * Passes the verified token to `onVerify(token)`.
 * Calls `onExpire()` when the token expires (optional).
 */
export default function TurnstileWidget({ onVerify, onExpire, className }) {
  return (
    <Turnstile
      siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
      onSuccess={onVerify}
      onExpire={onExpire}
      className={className}
      options={{ theme: 'auto' }}
    />
  );
}
