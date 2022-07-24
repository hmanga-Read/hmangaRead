import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/future/image';
import React from 'react';
import database from '../api/database';
import styles from  '../../styles/Hentais.module.css';

export default function Hentai ({hentai, parodies, artists, randoms}) {

  const [hentaiCovers, setHentaiCovers] = React.useState(hentai.pages.slice(0, 16));  

  React.useEffect(function () {
    setHentaiCovers(hentai.pages.slice(0, 16))
  }, hentai.pages)

  const loadMore = function () {
    let p = hentaiCovers.length + 16;
    setHentaiCovers(hentai.pages.slice(0, p));
  };

  const loadAll = function () {
    setHentaiCovers(hentai.pages);
  };

  return (<>
    <Head>
      <meta name='twitter:title' content={hentai.title.english} />
      <meta property='og:url' content={`https://hmangaread.herokuapp.com/hentais/${hentai._id}`} />
      <meta property='og:image' content={`https://api-hmangaread.herokuapp.com/hentais/${hentai._id}`} />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={hentai.title.english} />
      <meta name='twitter:image:src' content={`https://api-hmangaread.herokuapp.com/hentais/${hentai._id}`} />
    </Head>    
    <div className={styles.hentaiWrap}>
      <div className={styles.hentai}>
        <Image className={styles.coverImage} alt='' src={hentai.coverImage} height={500} width={350} layout='raw' />
        <div className={styles.title} style={{fontSize: '2rem'}}>
          <Link href={`/hentais/${hentai._id}`}>
            <a>{hentai.title.english}</a>
          </Link>
        </div>
      </div>
      <div className={styles.entryBody}>
        <div className={styles.const}>
          _id: <span className={styles.tags}>{hentai._id}</span>
        </div>
        <div className={styles.const}>
          Pages: <span className={styles.tags}>{hentai.pages.length}</span>
        </div>
        <div className={styles.const}>
          Tags:
        </div>
        <div className={styles.elongedConst}>
          {hentai.tags.map(function(tag) {
            return (
              <Link href={`/tags/${encodeURI(tag)}`}>
                <a className={`${styles.tags} ${styles.purpleTags}`}># {tag}</a>
              </Link>
            )
          })}
        </div>
        {parodies.length != 0 ? (<>
          <div className={styles.const}>
            Parodies:
          </div>
          <div className={styles.elongedConst}>
            {parodies.map(function(parody) {
              return (
                <Link href={`/parodies/${parody._id}`}>
                  <a className={`${styles.tags} ${styles.purpleTags}`}>
                    @ {parody.name}
                  </a>
                </Link>
              )
            })}
          </div>
        </>):(<></>)}
        <div className={styles.const}>
          Artists:
        </div>
        <div className={styles.elongedConst}>
          {artists.map(function(artist) {
            return (
              <Link href={`/artists/${artist._id}`}>
                <a className={`${styles.tags} ${styles.purpleTags}`}>
                  <Image className={styles.artistImage} alt='' src={artist.image} height={30} width={30} layout='raw' />
                  {artist.name}
                </a>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
    <div className={styles.thumbWrap}>
      <div className={styles.thumbs}>
        {hentaiCovers.map(function(page, i) {
          return (
            <a className={styles.thumb} href={`/read/${hentai._id}#${i}`}>
              <Image className={styles.thumbImage} alt='' src={page} height={245} width={165} layout='raw' />
            </a>
          )
        })}
      </div>
      {hentai.pages.length != hentaiCovers.length ? (
        <div className={styles.loadMoreWrap} id='loadMore'>
          <button onClick={loadMore} className={styles.loadMore}>Load More</button> <button onClick={loadAll} className={styles.loadMore}>Load All</button>
        </div>):(<></>)
      }
    </div>
    <div className={styles.thumbWrap}>
      <div className={styles.const}>
        Have some more! ＼(≧▽≦)／
      </div>
      <div className={styles.entriesWrap}>
        {randoms.map(function(entry) {
          return (
            <div className={styles.entry}>
              <Image className={styles.coverImage} alt='' src={entry.coverImage} height={245} width={165} layout='raw' />
              <div className={styles.title}>
                <Link href={`/hentais/${entry._id}`}>
                  <a>{entry.title.english}</a>
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  </>)

}

export async function getServerSideProps({ params }) {
  let randoms = await database.collection('hentais').aggregate([{ $sample: { size: 14 }}]).toArray();
  let hentai = await database.collection('hentais').findOne({_id: parseInt(params.id)});
  let parodies = [];
  if (hentai.parodiesIds) {
    for (let parodyId of hentai.parodiesIds) {
      let parody = await database.collection('parodies').findOne({_id: parseInt(parodyId)});
      parodies.push(parody);
    }
  }
  let artists = [];
  for (let artistId of hentai.artistsIds) {
    let artist = await database.collection('artists').findOne({_id: parseInt(artistId)});
    artists.push(artist);
  }
  return {props: {hentai: hentai, parodies: parodies, artists: artists, randoms: randoms}};
}