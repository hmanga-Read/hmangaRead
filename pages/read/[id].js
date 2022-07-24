import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/future/image';
import React from 'react';
import database from '../api/database';
import styles from  '../../styles/Read.module.css';

export default function Read ({hentai}) {

  return (<>
    <Head>
      <meta name='twitter:title' content={hentai.title.english} />
      <meta property='og:url' content={`https://hmangaread.herokuapp.com/hentais/${hentai._id}`} />
      <meta property='og:image' content={`https://api-hmangaread.herokuapp.com/hentais/${hentai._id}`} />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={hentai.title.english} />
      <meta name='twitter:image:src' content={`https://api-hmangaread.herokuapp.com/hentais/${hentai._id}`} />
    </Head>
    <div className={styles.readWrap}>
      <div className={styles.read}>
        {hentai.pages.map(function(page, i) {
          return (
            <div className={styles.readImageWrap}>
              <Image className={styles.readImage} id={i} alt='' src={page} height={1800} width={1280} layout='raw' />
            </div>
          )
        })}
      </div>
    </div>
    <Link href={`/hentais/${hentai._id}`}>
      <a className={styles.goBack}><i class='fa fa-arrow-left'></i></a>
    </Link>
  </>)

}

export async function getServerSideProps({ params }) {
  let hentai = await database.collection('hentais').findOne({_id: parseInt(params.id)});
  return {props: {hentai: hentai}};
}