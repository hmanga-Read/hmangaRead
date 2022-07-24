import Link from 'next/link';
import Image from 'next/future/image';
import Router from 'next/router';
import database from '../api/database.js';
import styles from  '../../styles/Search.module.css';

export default function Tags ({tag, hentais, p}) {

  const loadMore = async function () {
    Router.push({
      pathname: encodeURI(tag),
      query: {
        p: p + 40
      }
    }, undefined, { 
      scroll: false 
    });
  };

  return (
    <div className={styles.searchWrap}>
      <div className={styles.tagsWrap}>
        <div className={styles.tags}>
          # {tag}
        </div>
      </div>
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
      {hentais.length == p ? (
        <div className={styles.loadMoreWrap}>
          <button onClick={loadMore} className={styles.loadMore}>Load More</button>
        </div>):(<></>)
      }
    </div>
  )

}

export async function getServerSideProps({ params, query }) {
  let tag = decodeURI(params.tag);
  let p = parseInt(query.p || 40);
  let hentais = await database.collection('hentais').find({tags: tag}).limit(p).toArray();
  return {props: {tag: tag, hentais: hentais, p: p}};
}