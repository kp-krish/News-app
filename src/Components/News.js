import React, { useEffect, useState } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


const News = (props) => {
  const [articles, setArticles] = useState([])
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  // document.title = `${capitalizeFirstLetter(props.category)} - NewsKing`;
  const updateNews = async () => {
    props.setProgress(20);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=e4aa01e7ca594d9e8c7c6dc01fc9d975&page=${page}&pageSize=${props.pageSize}`
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    props.setProgress(100);
  }
  useEffect(() => {
    updateNews();
  }, [])

  const fetchMoreData = async () => {
    // console.log(page);

    const url = await `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=e4aa01e7ca594d9e8c7c6dc01fc9d975&page=${page + 1}&pageSize=${props.pageSize}`;

    let data = await fetch(url);
    let parsedData = await data.json()
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setPage(page + 1)
  };
  // handlePrevClick = async ()=>{
  //   await setState({page: page-1});
  //   updateNews();
  // }
  // handleNextClick = async ()=>{
  //   await setState({page: page+1});
  //   updateNews();
  // }

  return (
    <>
      <h1 className='text-center' style={{ marginTop: '59px' }}>NewsKing - Top Headlines from {capitalizeFirstLetter(props.category)}</h1>
      {/* {loading && <Spinner/>} */}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >

        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return <div className="col md-4 mt-4" key={element.url}>
                <NewsItems title={element.title ? element.title.slice(0, 40) + "..." : "\n\n"} description={element.description ? element.description.slice(0, 60) + "..." : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
              </div>
            })}
            {/* <div className="container d-flex justify-content-between mt-4">
          <button type='button' className='btn btn-dark' disabled={page<=1} onClick={handlePrevClick}>&larr; Previous</button>
          <button type='button' className='btn btn-dark' disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} onClick={handleNextClick}>Next &rarr;</button>
        </div> */}
          </div>
        </div>
      </InfiniteScroll>
    </>
  )

}

export default News
News.defaultProps = {
  country: 'in',
  pageSize: '6',
  category: 'genaral'
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}