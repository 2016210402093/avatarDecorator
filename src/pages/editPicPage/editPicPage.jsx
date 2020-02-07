import React,{Component} from 'react'
import './editPicPage.css'
import '../homePage/homePage.css'
import  html2Canvas from 'html2canvas'
import { Redirect } from 'react-router-dom';
import {isEditAction} from '../../action/actionCreators'
import MoveModule from '../../component/editModules/moveModule';
import ScaleModule from '../../component/editModules/scaleModule';
import {connect} from 'react-redux'

class EditPicPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            isGotten: false,
            backgroundImage: '',
            needX:0,
            needY:0,
            angle:0,
            style: {
                height: 100,
                width: 100,
            }
        }

        //编辑区域大小
        this.areaHeight = 0; 
        this.areaWidth = 0;

        //原点
        this.origin = [0,0];
    }

    componentWillUnmount(){
        this.setState = (state, callback) => {
            return
        }
    }

    componentDidMount(){
        this.setState({
            backgroundImage: localStorage.getItem('picUrl')
        })
        let element = document.getElementsByClassName('editPic')[0];
        this.areaHeight = element.offsetHeight;
        this.areaWidth = element.offsetWidth;
        this.origin = [0, 0];
        this.setState({
            needX: this.areaWidth/2-50+this.origin[0],
            needY: this.areaHeight/2-50+this.origin[1],
        })
    }


    fnDown = (e)=>{
        //若是扩大则退出
        if(e.target.className === 'child') {
            return;
        }

        let move = new MoveModule(e,(needX, needY)=>{
            //超出边界判断
            if(needX<this.origin[0]){
                needX = this.origin[0];
            }
            else if(needX>this.origin[0]+this.areaWidth-this.state.style.width-2){
                needX = this.origin[0]+this.areaWidth-this.state.style.width-2;
            }
            else if(needY<this.origin[1]){
                needY = this.origin[1];
            }
            else if(needY>this.origin[1]+this.areaHeight-this.state.style.height-2){
                needY = this.origin[1]+this.areaHeight-this.state.style.height-2;
            }

            this.setState({
                needX:needX,
                needY:needY
            });
        })

        move.down();
    }


    scaleDown = (e)=>{
        let scale = new ScaleModule(
            e,
            this.areaHeight,
            this.areaWidth,
            this.origin,
            this.state.style.width,
            this.state.style.height,
            this.state.needX+this.state.style.width,
            this.state.needY+this.state.style.height,
            false,
            (width, height)=>{
                //生成正方形区域
                let len = Math.max(width,height)

                //超出边界判断
                if(this.state.needX+len>this.origin[0]+this.areaWidth ||
                    this.state.needY+len>this.origin[0]+this.areaHeight){
                    scale.scaleUp();
                    return
                }

                let style = Object.assign({}, this.state.style, {width: len}, {height: len})
                this.setState({
                    style: style
                })
            }
        )
        scale.scaleDown();
    }
  

    //获取选择的图片
    getChosenPic = ()=>{
        const {dispatch} = this.props;

        let element = document.getElementsByClassName('editPic')[0];
        this.refs.chosenArea.style.display = 'none'
        html2Canvas(document.getElementById('chosenArea'),{
            x: this.state.needX + element.getBoundingClientRect().left,
            y: this.state.needY + element.getBoundingClientRect().top,
            width: this.state.style.width,
            height: this.state.style.height,
            useCORS: true
        }).then((canvas)=>{
            let context = canvas.getContext('2d');
            // 【重要】关闭抗锯齿
            context.mozImageSmoothingEnabled = false;
            context.webkitImageSmoothingEnabled = false;
            context.msImageSmoothingEnabled = false;
            context.imageSmoothingEnabled = false;
            
            localStorage.setItem('picUrl', canvas.toDataURL());

            this.setState({
                isGotten: true
            });
            const action = isEditAction(true, '', 'inline')
            dispatch(action);
        });
    }

    render(){

        if(this.state.isGotten){
            return <Redirect push to='/'></Redirect>
        }

        return (
            <div className='editArea'>
                <div id='chosenArea'  className='editPic' style={{background: `url(${this.state.backgroundImage}) no-repeat`}}>
                    <div ref='chosenArea'  className='chosenArea' 
                        style={{
                            position: 'absolute',
                            width: this.state.style.width+'px',
                            height: this.state.style.height+'px',
                            left: this.state.needX,
                            top: this.state.needY,
                            transition:'all'
                        }} 
                        onMouseDown={(e)=>this.fnDown(e)} 
                        onTouchStart={(e)=>{this.fnDown(e)}}
                    >


                        <div onMouseDown = {(e)=>this.scaleDown(e)}
                            onTouchStart={(e)=>this.scaleDown(e)} 
                            className='child' 
                            style={{
                                width: '20px',
                                height: '20px', 
                                borderRadius: '10px', 
                                background:`url(${require('../../assets/stretch.svg')}) white`,
                                backgroundSize: 'contain',
                                position: 'absolute', 
                                top: this.state.style.height+'px',
                                left: this.state.style.width+'px'
                            }}
                        >
                        </div>

                    </div>
                </div>

                <p className='tips'>请拖拽矩形区域选择要编辑的头像</p>
                <button className='getAvatar' onClick={()=>{this.getChosenPic()}}>完成</button>
            </div>
        )
    }
}

const mapStateToDispatch = (dispatch)=>{
    return {
        dispatch
    }
}

export default connect(null,mapStateToDispatch)(EditPicPage)