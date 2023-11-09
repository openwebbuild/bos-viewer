import Head from 'next/head';

export type Meta = {
  title: string;
  description: string;
  image?: string | null;
  url?: string;
  type?: "website" | "article";
};

export function MetaTags(props: Meta) {
  const title = props.title;
  const desc = props.description;
  const type = props.type ?? "website";
  const url = props.url;

  let card_type = 'summary_large_image';
  if (props.type === 'article' && !props.image) {
    card_type = 'summary';
  }

  const image = props.image || `${process.env.NEXT_PUBLIC_HOSTNAME}/bos-meta.png`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={image} />
      {url && <meta property="og:url" content={url}></meta>}
      <meta property="og:site_name" content="openweb.build" />
      <meta property="twitter:card" content={card_type} />
      <meta property="twitter:site" content="@NEARProtocol" />
      <meta property="twitter:title" content={title}></meta>
      <meta property="twitter:description" content={desc}></meta>
      <meta property="twitter:image" content={image}></meta>
      <meta property="twitter:image:src" content={image}></meta>
    </Head>
  );
}
