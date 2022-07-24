import Link from 'next/link';
import Image from 'next/future/image';
import Router from 'next/router';
import database from './api/database.js';
import styles from  '../styles/Landing.module.css';

export default function Landing ({hentais, randoms}) {

  const loadMore = async function () {
    Router.push('/hentais');
  };

  return (
    <div className={styles.landingWrap}>
      <div className={styles.const}>Have some! ＼(≧▽≦)／</div>
      <div className={styles.entriesWrap} style={{paddingBottom: '20px'}}>
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
      <div className={styles.const}>What's New</div>
      <div className={styles.entriesWrap}>
        {hentais.map(function(entry) {
          return (
            <div className={styles.entry}>
              <Image className={styles.coverImage} alt='' src={entry.coverImage} height={245} width={165} layout='raw'/>
              <div className={styles.title}>
                <Link href={`/hentais/${entry._id}`}>
                  <a>{entry.title.english}</a>
                </Link>
              </div>
            </div>
          )
        })}
      </div>
      <div className={styles.loadMoreWrap}>
        <button onClick={loadMore} className={styles.loadMore}>All hentais</button>
      </div>
    </div>
  )

}

export async function getServerSideProps() {
  let hentais = await database.collection('hentais').find().sort({_id:-1}).limit(40).toArray(); 
  let randoms = await database.collection('hentais').aggregate([{ $sample: { size: 14 }}]).toArray();
  return {props: {hentais: hentais, randoms: randoms}};
}
