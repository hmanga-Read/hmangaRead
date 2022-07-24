import Link from 'next/link';
import Image from 'next/future/image';
import Router from 'next/router';
import database from '../api/database.js';
import styles from  '../../styles/Search.module.css';

export default function Artists ({artists, p}) {
  
  const loadMore = async function () {
    Router.push({
      query: {
        p: p + 40
      }
    }, undefined, { 
      scroll: false 
    });
  };

  return (
    <div className={styles.searchWrap}>
      <div className={styles.tagsWrap} style={{paddingBottom: '10px'}}>
        <div className={styles.tags} style={{backgroundColor: 'rgb(var(--color-accent))'}}>
          artists
        </div>
      </div>
      {artists.map(function(entry) {
        return (
          <Link href={`/artists/${entry._id}`}>
            <a className={`${styles.tags} ${styles.purpleTags}`}>
              <Image className={styles.artistImage} alt='' src={entry.image} height={30} width={30} layout='raw'/>
              {entry.name}
            </a>
          </Link>
        )
      })}
      {artists.length == p ? (
        <div className={styles.loadMoreWrap}>
          <button onClick={loadMore} className={styles.loadMore}>Load More</button>
        </div>):(<></>)
      }
    </div>
  )

}

export async function getServerSideProps({ query }) {
  let p = parseInt(query.p || 40);
  let artists = await database.collection('artists').find().sort({name: 1}).collation({locale: 'en', caseLevel: true}).limit(p).toArray();
  return {props: {artists: artists, p: p}};
}