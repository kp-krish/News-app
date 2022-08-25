import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


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
    constructor(){
      super();
      console.log("Hello I am a constructor from News component");
      this.state = {
          articles: this.articles,
          loading: false,
          page: 1
      }
    } 
    async updateNews(){
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e4aa01e7ca594d9e8c7c6dc01fc9d975&page=${this.state.page}&pageSize=${this.props.pageSize}`
      this.setState({loading:true});
      let data=await fetch(url);
      let parsedData= await data.json();
      console.log(parsedData);
      this.setState({articles: parsedData.articles,
        totalResults:parsedData.totalResults,
        loading:false})
    }
    async componentDidMount(){
      this.updateNews();
    }
    handlePrevClick = async ()=>{
      await this.setState({page: this.state.page-1});
      this.updateNews();
    }
    handleNextClick = async ()=>{
      await this.setState({page: this.state.page+1});
      this.updateNews();
    }
  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center'>NewsKing - Top Headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
        {!this.state.loading && this.state.articles.map((element)=>{
          return <div className="col md-4 mt-4"  key={element.url}>
              <NewsItems title={element.title?element.title.slice(0,40)+"...":"\n\n"} description={element.description?element.description.slice(0,60)+"...":""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
        })}
        <div className="container d-flex justify-content-between mt-4">
          <button type='button' className='btn btn-dark' disabled={this.state.page<=1} onClick={this.handlePrevClick}>&larr; Previous</button>
          <button type='button' className='btn btn-dark' disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
        </div>
      </div>
    )
  }
}

export default news
