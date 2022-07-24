import Image from 'next/future/image';
import Link from 'next/link';
import Router from 'next/router';
import Head from 'next/head';
import React from 'react';
import '../styles/globals.css';

function MyApp ({ Component, pageProps }) {

  React.useEffect(function () {
    let theme = localStorage.getItem('theme');
    if (theme == 'dark') {
      let root = document.documentElement;
      root.classList.add('dark');
    }
    return;
  });

  const toggleTheme = function () {
    let theme = localStorage.getItem('theme');
    if (theme == 'dark') {
      localStorage.setItem('theme', 'light');
    } 
    else {
      localStorage.setItem('theme', 'dark');
    }
    let root = document.documentElement;
    root.classList.toggle('dark');
  };

  const trySearch = function (e) {
    if (e.keyCode != 13) {
      return;
    }
    search();
  };

  const search = function () {
    let query = document.querySelector('#search').value;
    if (!query || query == / +/g) {
      return;
    } 
    Router.push(`/search/${encodeURI(query)}`);
  };
  
  return (<>
    <Head>
      <title>hmangaRead: Freely read hentais without any ads</title>
      <link rel='icon' href='/favicon.ico' />
      <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'></link>
    </Head>
    <div className='navBar'>
      <Link href={`/`}>
        <a><Image alt='' className='navImage'
          src='/rimuru.png' 
          height={60} width={60} 
          layout='raw'
        /></a>
      </Link>
      <div className='searchNav'>
        <input id='search' className='hentaiSearch' onKeyDown={(e) => trySearch(e)} />
        <button className='searchGoGo' onClick={search}><i className='fa fa-search'></i></button>
      </div>
      <Link href={`/hentais`}>
        <a className='tags purpleTags'>
          hentais
        </a>
      </Link>
      <Link href={`/tags`}>
        <a className='tags purpleTags'>
          tags
        </a>
      </Link>
      <Link href={`/parodies`}>
        <a className='tags purpleTags'>
          parodies
        </a>
      </Link>
      <Link href={`/artists`}>
        <a className='tags purpleTags'>
          artists
        </a>
      </Link>
    </div>
    <div className='navWrap'>
    </div>
    <Component {...pageProps} />
    <div className='footerWrap'>
      <div className='footerLinksWrap'>
        <div className='footerGrid'>
          <div className='themeWrap'>
            <a className='theme' onClick={toggleTheme}>
              Theme
            </a>
          </div>
          <div className='footerGridBox'>
            <div className='footerLink'>
              <Link href={`https://github.com/hmangaRead`}>
                <a target='blank'>Star us on Github!</a>
              </Link>
            </div>
            <div className='footerLink'>
              <Link href={`https://discord.com/invite/msZahfY5Km`}>
                <a target='blank'>and Join our discord server!</a>
              </Link>
            </div>
          </div>
        </div>
        <div className='footerNote'>
          We do not store any files on our server.
        </div>
      </div>
    </div>
  </>)
}

export default MyApp; 
