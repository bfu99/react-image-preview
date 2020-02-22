# bf-react-image-preview
react图片预览


## 开发

```JS
npm run dev
```

## 编译

```JS
npm run build
```

## 安装

```JS
npm install bf-react-image-preview --save
```

## 使用

```js
// 引入组件和方法函数
import ImagePreview, { ImagePreviewContainer, setTargetPreviewAttribe } from 'bf-react-image-preview'


// 作为组件的方式使用
<ImagePreview></ImagePreview>

```

### 引入对象说明

| name | Description   |
| --------   | -----  |
| ImagePreview   | 图片预览组件  |
| ImagePreviewContainer   | 图片预览高阶组件  |
| setTargetPreviewAttribe   | 设置图片预览属性函数  |


### 外部控制组件生成和销毁

```js
    const { list, open, index } = this.state;
    {open && <ImagePreview 
        imgs={list} 
        index={index} 
        onClose={()=>{this.setState({open:false})}} 
    />}
```

### 组件内部控制生成和销毁

```js 

    const { list, open, index } = this.state;
    <ImagePreview 
    visible={open} imgs={list} index={index} 
    onClose={()=>{this.setState({open:false})}}  />

````


### 高阶组件ImagePreviewContainer自动处理图片

高阶组件自动对带有preview属性的标签提取src并且分组，如果标签还有large属性则提取large，然后在高阶组件里面自动实例化预览组件。

高阶组件会在componentDidMount阶段对组件的容器绑定一次click事件，通过冒泡监听每一个图片的点击。

```js 
class Main extends Component {
  constructor(p) {
    super(p);
    this.state = {
      list: [
        "https://www.abc.cc/aa.jpg",
        "https://www.abc.cc/bb.jpg"
      ]
    };
  }

  componentDidMount() {
    // 把富文本里面的图片添加预览属性preview（如果富文本的图片需要预览）
    setTargetPreviewAttribe(this.el, ".content")
  }
  componentDidUpdate(){
    // 把富文本里面的图片添加预览属性preview
    setTargetPreviewAttribe(this.el, ".content")
  }
  
  render() {
    const { list } = this.state;
    return (
      <div ref={(v) => { this.el = v; }}>
        <ul>
        <li class="list" ><img src="https://www.abc.cc/1.jpg" ></li>
        <li class="list" ><img src="https://www.abc.cc/2.jpg" ></li>
        <li class="list" ><img src="https://www.abc.cc/3.jpg" ></li>
        <li class="list" ><img src="https://www.abc.cc/4.jpg" ></li>
      </ul>
        <ul>
          {list.map((item, idx) => (
            <li key={idx} className="list" idx={idx}>
              <img src={item} alt={item} preview="1" />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
// 图片预览高阶组件
export default ImagePreviewContainer(Main);

````


### ImagePreview Props

| 名称    | 描述         | 类型     | 默认 |
|---------|---------------------|----------|---------|
| index   | 打开时需要展示的图片索引        | number   | 0       |
| imgs    | 图片url               | array    | \[\]    |
| visible | 控制显示隐藏，外部控制时该项不传   | bool     | true      |
| options | 参考photoSwipe的option | object   | \{\}    |
| onClose | onClose             | function | \-      |
