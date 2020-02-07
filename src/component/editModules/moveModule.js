import {checkMode} from './common'


/*

需传入以下两个参数

1.event: 事件

2.callback: 执行move事件时的回调 

*/

export default class MoveModule {
    constructor(event, callback){
        this.event = event;        //事件

        this.disX = 0;             //按下的地方距离元素左侧和上侧的距离
        this.disY = 0;
        
        this.isDown = false;       //是否按下

        this.left = 0;             //返回的组件需要设置的left和top
        this.top = 0;

        this.callback = callback;  //移动事件时的回调函数
    }

    down(){
        this.up()
        this.isDown = true;

        //获取模式
        let {event, isTouch} = checkMode(this.event);

        //兼容ie浏览器,ie中,event对象有srcElement属性,但是没有target属性
        let target = event.target || event.srcElement; 

        //获取按下的地方距离元素左侧和上侧的距离
        this.disX = event.clientX - target.offsetLeft;
        this.disY = event.clientY - target.offsetTop;

        //定义移动事件
        isTouch ? document.ontouchmove = this.move : document.onmousemove = this.move;

        //定义抬起事件
        isTouch ? document.touchend = this.up: document.onmouseup = this.up;   
    }


    //箭头函数,防止this访问不到
    move = (e)=>{
        if(!this.isDown) return

        let {event} = checkMode(e);

        this.left = event.clientX - this.disX;
        this.top = event.clientY - this.disY;

        //执行回调
        this.callback(this.left, this.top);
    }


    up = ()=>{
        this.isDown = false

        //取消监听
        document.onmouseup = null;
        document.ontouchmove = null;
        document.touchend = null;
        document.onmousemove = null;
    }
}