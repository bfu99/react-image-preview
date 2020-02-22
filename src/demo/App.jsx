import React, { Component } from "react";
import "./App.scss";

import ImagePreview, { ImagePreviewContainer, setTargetPreviewAttribe } from "../index.jsx"; // eslint-disable-line

class ContentBox extends Component {
  constructor(p){
    super(p)
  }

  componentDidUpdate(){
    console.log('ContentBox componentDidUpdate')
  }

  render(){
    const  { htmlContent } = this.props
    return(
      <div
          className="content"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
    )
  }
}


class Main extends Component {
  constructor(p) {
    super(p);
    this.state = {
      list: [
        "http://a2.att.hudong.com/36/48/19300001357258133412489354717.jpg",
        "http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg"
      ],
      htmlContent: `
      <ul>
        <li class="list" ><img src="http://a0.att.hudong.com/16/12/01300535031999137270128786964.jpg"  ></li>
        <li class="list" ><img src="http://a2.att.hudong.com/08/72/01300000165476121273722687045.jpg"  ></li>
      </ul>
      `
    };
  }

  componentDidMount() {
    setTargetPreviewAttribe(this.el, ".content")
  }
  componentDidUpdate(){
    console.log('main componentDidUpdate')
    setTargetPreviewAttribe(this.el, ".content")
  }
  changeContent=()=>{
    this.setState({
      htmlContent:`
      <ul>
      <li class="list" ><img src="http://a2.att.hudong.com/36/48/19300001357258133412489354717.jpg"  ></li>
      <li class="list" ><img src="http://a0.att.hudong.com/16/12/01300535031999137270128786964.jpg"  ></li>
      <li class="list" ><img src="http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg"  ></li>
      
      </ul>
      `,
      list: [
        "http://a2.att.hudong.com/36/48/19300001357258133412489354717.jpg",
        "http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg",
        "http://a2.att.hudong.com/08/72/01300000165476121273722687045.jpg",
        "http://a0.att.hudong.com/78/52/01200000123847134434529793168.jpg"
      ],
    })
  }
  render() {
    const { list, htmlContent } = this.state;
    return (
      <div ref={(v) => { this.el = v; }} style={{padding:'10px'}}>

        <div style={{'textAlign':'right'}}><input type="button" value="改变内容" onClick={this.changeContent.bind(this)}/></div>
        <div className="topic">富文本：</div>
        <ContentBox htmlContent={htmlContent}/>
        <div className="topic">列表渲染：</div>
        <ul>
          {list.map((item, idx) => (
            <li key={idx} className="list" idx={idx}>
              <img src={item} alt={item} preview="3" />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ImagePreviewContainer(Main);
