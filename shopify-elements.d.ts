import type React from 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'shopify-store': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'store-domain'?: string;
          country?: string;
          language?: string;
        },
        HTMLElement
      >;
    }
  }
}

export {};
