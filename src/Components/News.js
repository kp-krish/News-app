import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';



export class news extends Component {
      static defaultProps = {
        country: 'in',
        pageSize: '6',
        category: 'genaral'
      }
      static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
      }
      articles=[];
    capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase()+ string.slice(1);
    }
    constructor(props){
      super(props);
      console.log("Hello I am a constructor from News component");
      this.state = {
          articles: this.articles,
          loading: false,
          page: 1,
          totalResults: 0
      }
      document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsKing`;
    } 
    async updateNews(){
      this.props.setProgress(20); 
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=994e1c5fa8da4377a3b2f68413836e67&page=${this.state.page}&pageSize=${this.props.pageSize}`
      this.setState({loading:true});
      let data=await fetch(url);
      let parsedData= await data.json();
      console.log(parsedData);
      this.setState({articles: parsedData.articles,
        totalResults:parsedData.totalResults,
        loading:false,
      page:1})
      this.props.setProgress(100);
    }
    async componentDidMount(){
      this.updateNews();
    }
    fetchMoreData = async () => {
      // console.log(this.state.page);
      
      const url = await `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=994e1c5fa8da4377a3b2f68413836e67&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
      
      let data = await fetch(url);
      let parsedData = await data.json()
      this.setState({
          articles: this.state.articles.concat(parsedData.articles),
          totalResults: parsedData.totalResults,
          loading: false,
          page: this.state.page+1
      })
  };
    // handlePrevClick = async ()=>{
    //   await this.setState({page: this.state.page-1});
    //   this.updateNews();
    // }
    // handleNextClick = async ()=>{
    //   await this.setState({page: this.state.page+1});
    //   this.updateNews();
    // }
  render() {
    return (
      <>
        <h1 className='text-center'>NewsKing - Top Headlines from {this.capitalizeFirstLetter(this.props.category)}</h1>
        {/* {this.state.loading && <Spinner/>} */}
        
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.totalResults}
          loader={<Spinner/>}
          >

        <div className="container">
        <div className="row">
        {this.state.articles.map((element)=>{
          return <div className="col md-4 mt-4"  key={element.url}>
              <NewsItems title={element.title?element.title.slice(0,40)+"...":"\n\n"} description={element.description?element.description.slice(0,60)+"...":""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
        })}
        {/* <div className="container d-flex justify-content-between mt-4">
          <button type='button' className='btn btn-dark' disabled={this.state.page<=1} onClick={this.handlePrevClick}>&larr; Previous</button>
          <button type='button' className='btn btn-dark' disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
        </div>
        </div>
        </InfiniteScroll>
      </>
    )
  }
}

export default news