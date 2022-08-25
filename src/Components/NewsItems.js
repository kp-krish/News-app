import React, { Component } from 'react'
import ina from './ina.png'

export class NewsItems extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    return (
      <div>
        <div className="card" style={{ width: '18rem', marginLeft: '30px' }}>
          <img src={imageUrl ? imageUrl : ina} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">
              {source}
              </span>
              <p className="card-text">{description}</p>
              <p className="card-text"><small className="text-muted">By {author ? author : "Unknown"}</small><br />
                <small className="text-muted">On {new Date(date).toGMTString()}</small></p>
              <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItems