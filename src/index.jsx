/* eslint-disable no-param-reassign */
import ReactDOM from "react-dom";
import React, { Component } from "react";
import PropTypes from "prop-types";
import PhotoSwipe from "photoswipe";
import PhotoSwipeUIDefault from "photoswipe/dist/photoswipe-ui-default";
import "./style/photoswipe.css"; // eslint-disable-line
import "./style/skin.css"; // eslint-disable-line

/**
 * @description: 图片预览组件
 * @return: 
 */
export default class ImagePreview extends Component {
  static propTypes = {
    // 从0开始
    index: PropTypes.number,
    imgs: PropTypes.arrayOf(PropTypes.string),
    onClose: PropTypes.any,
    visible: PropTypes.bool,
    options: PropTypes.any
  };
  retContainer() {
    if (!this.ImagePreviewNode) {
      const ImagePreviewNode = document.createElement("div");
      ImagePreviewNode.setAttribute("class", "ImagePreview");
      this.ImagePreviewNode = ImagePreviewNode;
      document.body.appendChild(ImagePreviewNode);
    }
    return this.ImagePreviewNode;
  }
  retContent() {
    return (
      <div
        className="pswp"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
        ref={ref => {
          this.el = ref;
        }}
      >
        {/* <!-- Background of PhotoSwipe.
                 It's a separate element as animating opacity is faster than rgba(). --> */}
        <div className="pswp__bg" />

        {/* <!-- Slides wrapper with overflow:hidden. --> */}
        <div className="pswp__scroll-wrap">
          {/* <!-- Container that holds slides.
                     PhotoSwipe keeps only 3 of them in the DOM to save memory.
                     Don't modify these 3 pswp__item elements, data is added later on. --> */}
          <div className="pswp__container">
            <div className="pswp__item" />
            <div className="pswp__item" />
            <div className="pswp__item" />
          </div>

          {/* <!-- Default (PhotoSwipeUIDefault) interface on top of sliding area. Can be changed. --> */}
          <div className="pswp__ui pswp__ui--hidden">
            <div className="pswp__top-bar">
              {/* <!--  Controls are self-explanatory. Order can be changed. --> */}

              <div className="pswp__counter" />

              <button
                className="pswp__button pswp__button--close"
                title="关闭"
              />

              <button
                className="pswp__button pswp__button--zoom"
                title="放大/缩小"
              />

              {/* <!-- Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR -->
                             <!-- element will get className pswp__preloader--active when preloader is running --> */}
              <div className="pswp__preloader">
                <div className="pswp__preloader__icn">
                  <div className="pswp__preloader__cut">
                    <div className="pswp__preloader__donut" />
                  </div>
                </div>
              </div>
            </div>

            <div className="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
              <div className="pswp__share-tooltip" />
            </div>

            <button
              className="pswp__button pswp__button--arrow--left"
              title="上一张"
            />

            <button
              className="pswp__button pswp__button--arrow--right"
              title="下一张"
            />

            <div className="pswp__caption">
              <div className="pswp__caption__center" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  removeLayer() {
    if (!this.ImagePreviewNode) {
      return;
    }
    ReactDOM.unmountComponentAtNode(this.ImagePreviewNode);
    document.body.removeChild(this.ImagePreviewNode);
    this.ImagePreviewNode = null;
  }

  render() {
    return null; //此处需返回null 避免报错
  }
  renderLayer(prevProps) {
    if (!this.props.visible) {
      this.removeLayer();
    } else {
      //当父级模块更新时，直接粗暴地执行渲染，该api跨节点渲染，理同ReactDOM.render
      ReactDOM.unstable_renderSubtreeIntoContainer(
        this,
        this.retContent(),
        this.retContainer()
      );

      if (!prevProps || prevProps.visible !== this.props.visible) {
        setTimeout(() => {
          this.handleOpen();
        }, 200);
      }
    }
  }
  componentDidUpdate(prevProps) {
    this.renderLayer(prevProps);
  }
  componentDidMount() {
    this.renderLayer();
  }
  handleOpen() {
    const { visible } = this.props;
    // 不使用visible模式时 需要满足visible === 'undefined'
    if (visible || typeof visible === "undefined") {
      this.open(this.props.index);
    }
  }

  open = (index = 0) => {
    const { imgs = [], options = {} } = this.props;
    if (!imgs.length) return;
    const pswpElement = this.ImagePreviewNode.querySelector(".pswp");
    // console.log(pswpElement);
    const items = imgs.map(item => ({
      src: item,
      w: 0,
      h: 0
    }));
    // define options (if needed)
    const opts = {
      // optionName: 'option value'
      index, // start at first slide
      ...options
    };

    // Initializes and opens PhotoSwipe
    // console.log(PhotoSwipeUIDefault);

    this.gallery = new PhotoSwipe(
      pswpElement,
      PhotoSwipeUIDefault,
      items,
      opts
    );
    this.gallery.listen("imageLoadComplete", (galleryIndex, item) => {
      if (!item.w || !item.h) {
        const img = new Image();
        img.src = item.src;
        img.onload = () => {
          item.w = img.width;
          item.h = img.height;
          this.gallery.invalidateCurrItems();
          this.gallery.updateSize(true);
        };
      }
    });
    this.gallery.listen("close", () => {
      // console.log("close gallery");
    });
    this.gallery.listen("destroy", () => {
      // console.log("destroy gallery");
      this.props.onClose && this.props.onClose();
    });
    this.gallery.init();
  };
}


/**
 * @description: 给富文本的图片设置预览属性preview
 * @param {object} containerDom 容器dom
*  @param {object} targets 目标
 * @return: 
 */
export const setTargetPreviewAttribe = (containerDom, targets) =>{
  if(targets){
    if(typeof targets == "string"){
      targets = [targets]
    }
    containerDom = containerDom || document
    targets.forEach((item,index)=>{
      let $targets = containerDom.querySelectorAll(item)
      $targets.forEach((subitem,subindex)=>{
        let $img = subitem.querySelectorAll("img")
        $img.forEach((imgitem,imgindex)=>{
          imgitem.setAttribute("preview",`content-${index}`)
        })
      })
    })
  }
}

/**
 * @description: 图片预览高阶组件（容器）
 * @param {object} 被高阶的组件
 * @return: 返回一个新的组件（带图片预览逻辑）
 */
export const ImagePreviewContainer = (WrappedComponent, targets) =>{
  class NewComponent extends Component {
      constructor(p) {
          super(p);
          this.state = {
            open: false,
            index: 0,
            list: []
          };
      }

      openPreview = (index = 0) => {
        if(typeof(index) != "number"){
          index = 0
        }
        this.setState({
          open: true,
          index,
        });
      };
      closePreview = () => {
        this.setState({
          open: false,
        });
      };

      componentWillMount() {
          
      }

      componentDidMount() {
        console.log('ImagePreviewContainer componentDidMount')
        this.documentDom = ReactDOM.findDOMNode(this.childCp)
        this.renderGallery()
      }

      componentDidUpdate(){
        console.log('ImagePreviewContainer componentDidUpdate')
        setTargetPreviewAttribe(this.documentDom,targets)
      }

      componentWillUnmount(){
        this.removeGallery()
      }
      // 图片点击
      bindClick=(documentDom, e)=>{
        let me = this
        // console.log(e)
        if(!e.target.hasAttribute("preview")){
          return
        }
        var eTarget = e.target || e.srcElement;
        var thumbElements;
        var group = eTarget.getAttribute('preview')
        // console.log(group)
        if (group) {
          thumbElements = documentDom.querySelectorAll('[preview="' + group + '"]')
        } else {
          thumbElements = documentDom.querySelectorAll('[preview=""]')
        }
        let list = []
        thumbElements.forEach((ele,eindex)=>{
          if(ele.hasAttribute("large")){
            list.push(ele.getAttribute('large'))
          }
          else{
            list.push(ele.getAttribute('src'))
          }
          if(eTarget === ele){
            me.setState({
              list: list,
              open: true,
              index: eindex
            });
          }
        })
      }

      renderGallery(){
        let me = this
        
        setTargetPreviewAttribe(me.documentDom,targets)
        me.documentDom.addEventListener("click",me.bindClick.bind(this,me.documentDom))
        
      }

      removeGallery(){
        let me = this
        me.documentDom.removeEventListener("click",me.bindClick.bind(this,me.documentDom))
      }

      render() {
        const { list, open, index} = this.state;
          return <>
          <WrappedComponent {...this.props} ref={(v) => { this.childCp = v; }}/>
          <ImagePreview visible={open} imgs={list} index={index} onClose={this.closePreview}></ImagePreview>
          </>
      }
  }

  return NewComponent
}