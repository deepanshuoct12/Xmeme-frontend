import React, { Component } from "react";
import axios from 'axios'


export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {author: '',url:'',caption:'',memes:[]};

    this.handleChangeAuthor = this.handleChangeAuthor.bind(this);
    this.handleChangeURL = this.handleChangeURL.bind(this);
    this.handleChangeCaption = this.handleChangeCaption.bind(this);

    this.handleSubmit= this.handleSubmit.bind(this);
  }
  componentDidMount(){
    axios.get('https://xmeme-backend12.herokuapp.com/memes').then((res)=>{
      console.log(res.data)
      this.setState({
        memes:res.data
      })
    })
  }

  handleChangeAuthor(event) {
    this.setState({author: event.target.value});
  }

  handleChangeURL(event) {
    this.setState({url: event.target.value});
  }
  handleChangeCaption(event) {
    this.setState({caption: event.target.value});
  }

  handleSubmit(event) {
    var config = {
        headers: {'Access-Control-Allow-Origin': '*',"Content-Type": "application/json"}
    };
    var meme = {
            name:this.state.author,
            url:this.state.url,
            caption:this.state.caption
    }
    axios.post('https://xmeme-backend12.herokuapp.com/memes',{
        meme
    } ,config).then(()=>{
      axios.get('https://xmeme-backend12.herokuapp.com/memes').then((res)=>{
        console.log(res.data)
        this.setState({
          memes:res.data
        })
      })
    })
      .catch(function (err) {
        console.log(err);
      });
    
    event.preventDefault();
  }

  render() {
    return (
      <div className="p-5">
        <h1 className="mb-5">Dank Memer</h1>
        <div style={{width:'40%'}}>
        <div className="form-group mb-3">
          <label>Memer</label>
            <input
              type="text"
              className="form-control"
              value={this.state.author} onChange={this.handleChangeAuthor}
            />
          </div>
          <div className="form-group mb-3">
          <label>Caption</label>
            <input
              type="text"
              className="form-control"
              value={this.state.caption} onChange={this.handleChangeCaption}
            />
          </div>
          <div className="form-group mb-3">
          <label>Meme Image URL</label>
            <input
              type="text"
              className="form-control"
              value={this.state.url} onChange={this.handleChangeURL}
            />
          </div>
          <button className="btn btn-warning" onClick={this.handleSubmit}>Submit</button>
        </div>
        <h1 className="my-5">Memes</h1>
        <div className="row">
       {/* LOOP OVER MEMES */}
       {this.state.memes.map((meme)=>{
         return <div className="card" style={{width: '18rem'}}>
           <img src={meme.url} className="card-img-top" alt="..." style={{height:200}} />
          <div className="card-body">
  <h5 className="card-title">{meme.caption}</h5>
  <p className="card-text">{meme.name}</p>
</div>

        </div>
        })}
        </div>
      </div>
    );
  }
}