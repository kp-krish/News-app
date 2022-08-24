import React, { Component } from 'react'
import NewsItems from './NewsItems'

export class news extends Component {
      articles = []
    constructor(){
      super();
      console.log("Hello I am a constructor from News component");
      this.state = {
          articles: this.articles,
          loading: false
      }
    } 
    async componentDidMount(){
      let url="https://newsapi.org/v2/top-headlines?country=in&apiKey=994e1c5fa8da4377a3b2f68413836e67"
      let data=await fetch(url);
      let parsedData= await data.json();
      console.log(parsedData);
      this.setState({articles: parsedData.articles})
    }
  render() {

    return (
      <div className='container my-3'>
        <h2>NewsKing - Top Headlines</h2>
        <div className="row">
        {this.state.articles.map((element)=>{
          return <div className="col md-4 mt-4"  key={element.url}>
              <NewsItems title={element.title?element.title.slice(0,40)+"...":"\n\n"} description={element.description?element.description.slice(0,60)+"...":""} imageUrl={element.urlToImage} newsUrl={element.url}/>
            </div>
        })}
        </div>
      </div>
    )
  }
}

export default news
