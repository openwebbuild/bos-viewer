import '@/styles/theme.css';
import '@/styles/globals.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@near-wallet-selector/modal-ui/styles.css';

import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Script from 'next/script';
import { useEffect } from 'react';
import { Toaster } from 'sonner';

import { useComponentRedirectMapInitializer } from '@/hooks/useComponentRedirectMapInitializer';
import { init as initializeSegment } from '@/utils/analytics';
import type { NextPageWithLayout } from '@/utils/types';

const VmInitializer = dynamic(() => import('../components/client/VmInitializer'), {
  ssr: false,
});

const meta = {
  title: 'NEAR',
  description: "Let's build decentralized experiences.",
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  useComponentRedirectMapInitializer();

  useEffect(() => {
    initializeSegment();
  }, []);

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta property="og:title" content={meta.title} />
        <meta name="description" content={meta.description} />
        <meta property="og:description" content={meta.description} />
      </Head>

      <Script id="phosphor-icons" src="https://unpkg.com/@phosphor-icons/web@2.0.3" async />

      <Script
        src="https://static.zdassets.com/ekr/snippet.js?key=1736c8d0-1d86-4080-b622-12accfdb74ca"
        id="ze-snippet"
        async
      />

      <Script id="zendesk-config">
        {`
          window.zESettings = {
            webWidget: {
              color: { theme: '#2b2f31' },
              offset: {
                horizontal: '10px',
                vertical: '10px',
                mobile: { horizontal: '2px', vertical: '65px', from: 'right' },
              },
              contactForm: {
                attachments: true,
                title: { '*': 'Feedback and Support' },
                fields: [
                  {
                    id: 13149356989591,
                    prefill: { '*': localStorage.getItem('accountId') },
                  },
                ],
              },
              launcher: {
                label: { '*': ' ' },
              },
            },
          };
        `}
      </Script>

      <Script id="bootstrap" src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" />

      <VmInitializer />

      {getLayout(<Component {...pageProps} />)}

      <Toaster position="bottom-center" richColors />
    </>
  );
}