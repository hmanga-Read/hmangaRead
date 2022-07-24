import Link from 'next/link';
import Router from 'next/router';
import database from '../api/database.js';
import styles from  '../../styles/Search.module.css';

export default function Artists ({tags, p}) {

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
          tags
        </div>
      </div>
      {tags.map(function(entry) {
        return (
          <Link href={`/tags/${entry.name}`}>
            <a className={`${styles.tags} ${styles.purpleTags}`}>
              # {entry.name}
            </a>
          </Link>
        )
      })}
      {tags.length == p ? (
        <div className={styles.loadMoreWrap}>
          <button onClick={loadMore} className={styles.loadMore}>Load More</button>
        </div>):(<></>)
      }
    </div>
  )

}

export async function getServerSideProps({ query }) {
  let p = parseInt(query.p || 40);
  let tags = await database.collection('tags').find().sort({name: 1}).collation({locale: 'en', caseLevel: true}).limit(p).toArray();
  return {props: {tags: tags, p: p}};
}