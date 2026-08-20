'use client';

import { Bell, ShieldCheck, CreditCard, BadgeCheck } from 'lucide-react';
import ShowcaseCard, { Highlights } from '@/components/ShowcaseCard';

const SITE_URL = 'https://wakeful.dev';

const HIGHLIGHTS = [
    {
        Icon: ShieldCheck,
        title: 'Multi-protocol checks',
        desc: 'HTTP, DNS, and SSL-expiry monitoring, plus heartbeat pings for scheduled jobs.',
    },
    {
        Icon: Bell,
        title: 'Multi-channel alerts',
        desc: 'Email, LINE, Telegram, and outbound webhooks — an incident reaches you where you actually look.',
    },
    {
        Icon: BadgeCheck,
        title: 'Public status pages',
        desc: 'Shareable status pages and embeddable uptime badges for every monitor.',
    },
    {
        Icon: CreditCard,
        title: 'Stripe billing',
        desc: 'Free and paid tiers with different check intervals — real subscriptions, real webhooks.',
    },
];

export default function WakefulShowcase() {
    return (
        <ShowcaseCard
            id="wakeful"
            name="Wakeful"
            status="up"
            meta="wakeful.dev"
            href={SITE_URL}
            hrefLabel="Visit wakeful.dev"
            footnote="Closed-source — built and operated as a real product, not a public repo."
        >
            <p className="mb-4 max-w-2xl text-[14px] leading-relaxed text-body">
                An uptime-monitoring SaaS I built and run in production — HTTP/DNS/SSL checks,
                incident tracking, multi-channel alerts, and public status pages. Real users, real
                billing, real on-call.
            </p>

            <Highlights items={HIGHLIGHTS} />
        </ShowcaseCard>
    );
}
