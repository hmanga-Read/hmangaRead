import Link from 'next/link';
import Router from 'next/router';
import database from '../api/database.js';
import styles from  '../../styles/Search.module.css';

export default function Parodies ({parodies, p}) {

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
          parodies
        </div>
      </div>
      {parodies.map(function(entry) {
        return (
          <Link href={`/parodies/${entry._id}`}>
            <a className={`${styles.tags} ${styles.purpleTags}`}>
              @ {entry.name}
            </a>
          </Link>
        )
      })}
      {parodies.length == p ? (
        <div className={styles.loadMoreWrap}>
          <button onClick={loadMore} className={styles.loadMore}>Load More</button>
        </div>):(<></>)
      }
    </div>
  )

}

export async function getServerSideProps({ query }) {
  let p = parseInt(query.p || 40);
  let parodies = await database.collection('parodies').find().sort({name: 1}).collation({locale: 'en', caseLevel: true}).limit(p).toArray();
  return {props: {parodies: parodies, p: p}};
}