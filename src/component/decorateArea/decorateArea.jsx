import React, {Component} from 'react';
import DecorateAreaUI from './decorateAreaUI'
import './decorateArea.css'
import { Redirect } from 'react-router-dom';
import  html2Canvas from 'html2canvas'
import store from '../../store'
import MoveModule from '../editModules/moveModule';
import RotateModule from '../editModules/rotateModule';
import ScaleModule from '../editModules/scaleModule';


export default class DecorateArea extends Component{

    constructor(props){
        super(props);

        this.state = {
            cancelDecoration: 'inline', 
            backgroundImage: require('../../assets/add.svg'),
            isEdit: false,
            isCreated: false,
            chosenPicSet: [],  //选中的图片集合
        }

        //编辑区域大小
        this.areaHeight = 0; 
        this.areaWidth = 0;

        //原点
        this.origin = [0,0];

        store.subscribe(this.updateState)
    }

    componentWillUnmount(){
        this.setState = (state, callback) => {
            return
        }
    }

    componentDidMount(){
        let backgroundImage = localStorage.getItem('picUrl');
        if(backgroundImage!==null){
            this.setState({
                backgroundImage: backgroundImage
            }, ()=>{
                let element = document.getElementsByClassName('picBox')[0];
                this.areaHeight = element.offsetHeight;
                this.areaWidth = element.offsetWidth;
                this.origin = [element.getBoundingClientRect().left, element.getBoundingClientRect().top];
            })
        }
    }

    
    // 获取用户上传的图片
    changePic = (e)=>{
        //确保有图片上传
        if(e.target.files[0] !== undefined){
            let file = e.target.files[0];
            if(file.size/1024/1024>3){
                alert('请上传小于3M的头像!');
                return;
            }

            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = ()=>{  // 等待文件阅读器读取完毕再渲染图片
                localStorage.setItem('picUrl', reader.result);
                this.setState({
                    isEdit: true
                })
            }
        }
    }

    //更改选中的图片集合
    updateState = ()=>{

        let info = store.getState();

        if(info.cancelDecoration === 'none'){
            this.setState({
                cancelDecoration: info.cancelDecoration
            }, ()=>{
                html2Canvas(document.getElementById('picInput'), {
                    useCORS: true
                }).then((canvas)=>{
                    let context = canvas.getContext('2d');
                    // 【重要】关闭抗锯齿
                    context.mozImageSmoothingEnabled = false;
                    context.webkitImageSmoothingEnabled = false;
                    context.msImageSmoothingEnabled = false;
                    context.imageSmoothingEnabled = false;
                    const imgUrl = canvas.toDataURL();
                    localStorage.setItem('picUrl', imgUrl)
                    this.setState({
                        isCreated: true
                    })
                })
            });
        }
        else if(info.picUrl!==''){
            let [...picSet] = this.state.chosenPicSet;
            picSet.push({
                picUrl: info.picUrl,
                isDelete: false,
                needX:this.areaWidth/2-35,
                needY:this.areaHeight/2-35,
                angle:0,
                display: 'inline',
                style: {
                    height: 70,
                    width: 70,
                }
            });
            this.setState({
                chosenPicSet: picSet,
            });
        }
    }

    //删除装饰图片
    deletePic = (key)=>{
        let [...chosenPicSet] = this.state.chosenPicSet;
        chosenPicSet[key].display = 'none';

        this.setState({
            chosenPicSet: chosenPicSet
        });
    }


    fnDown = (e, key)=>{
        //若是旋转扩大则退出
        if(e.target.className === 'child') {
            return;
        }

        let move = new MoveModule(e, (left, top)=>{
            let [...chosenPicSet] = this.state.chosenPicSet;
            chosenPicSet[key].needX = left;
            chosenPicSet[key].needY = top; 

            this.setState({
                chosenPicSet: chosenPicSet
            });
        });

        move.down()
    }

    roateDown = (e, key)=>{
        //计算旋转中心点和起始点
        this.center = [this.state.chosenPicSet[key].needX+this.state.chosenPicSet[key].style.width/2, this.state.chosenPicSet[key].needY+this.state.chosenPicSet[key].style.height/2];
        this.start = [this.state.chosenPicSet[key].needX+this.state.chosenPicSet[key].style.width+20, this.state.chosenPicSet[key].needY+this.state.chosenPicSet[key].style.height/2];

        let rotate = new RotateModule(e, this.center, this.start, this.origin, (angle)=>{
            let [...chosenPicSet] = this.state.chosenPicSet;
            chosenPicSet[key].angle = angle;

            this.setState({
                chosenPicSet: chosenPicSet
            });
        });

        rotate.roateDown();
    }

    scaleDown = (e, key)=>{
    
        let scale = new ScaleModule(
            e,
            this.areaHeight,
            this.areaWidth,
            this.origin,
            this.state.chosenPicSet[key].style.height,
            this.state.chosenPicSet[key].style.width,
            this.state.chosenPicSet[key].angle,
            false,
            (width, height)=>{
                let [...chosenPicSet] = this.state.chosenPicSet;
                chosenPicSet[key].style = Object.assign({}, this.state.chosenPicSet[key].style, {width: width}, {height: height})

                this.setState({
                    chosenPicSet: chosenPicSet
                })
            }
        )

        scale.scaleDown();

    }

    render(){

        if(this.state.isCreated){
            return <Redirect push to='/created'></Redirect>
        }

        if(this.state.isEdit){
            return <Redirect push to='/editpic'></Redirect>
        }

        return (
            <DecorateAreaUI
                backgroundImage = {this.state.backgroundImage}
                chosenPicSet = {this.state.chosenPicSet}
                cancelDecoration = {this.state.cancelDecoration}
                changePic = {this.changePic}
                fnDown = {this.fnDown}
                deletePic = {this.deletePic}
                roateDown = {this.roateDown}
                scaleDown = {this.scaleDown}
            ></DecorateAreaUI>
        )
    }
}