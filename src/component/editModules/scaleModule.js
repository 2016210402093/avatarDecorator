import {checkMode} from './common'

/*

需传入以下十个参数

1.event: 事件

2.areaHeight: 编辑区域高度

3.areaWidth 编辑区域宽度

4.origin：坐标系原点

5.targetHeight: 目标模块高度

6.targetWidth: 目标模块宽度

7.rotateAngle: 目标被已旋转角度

8.isCheck: 是否执行超出边界判断

9.callback: 执行move事件时的回调 

*/

export default class ScaleModule {
    constructor(event, areaHeight, areaWidth, origin, targetHeight, targetWidth, rotateAngle, isCheck, callback){
        this.event = event;                //事件

        this.callback = callback;          //移动事件时的回调函数

        this.origin = origin;              //原点

        this.areaHeight = areaHeight;      //编辑区域高度
        this.areaWidth = areaWidth;        //编辑区域宽度

        this.targetHeight = targetHeight;  //目标模块高度
        this.targetWidth = targetWidth;    //目标模块宽度

        this.rotateAngle = rotateAngle<0 ?rotateAngle+360: rotateAngle;    //目标旋转角度

        this.isCheck = isCheck;            //是否执行超出边界判断
    }

    scaleDown (){
        this.scaleUp();
        let {event, isTouch} = checkMode(this.event);
        
        //获取点击起始点
        this.scaleX = event.clientX;
        this.scaleY = event.clientY;

        isTouch ? document.ontouchmove = this.scaleMove : document.onmousemove = this.scaleMove;
        isTouch ? document.touchend = this.scaleUp : document.onmouseup = this.scaleUp;   
    }

    scaleMove = (e)=>{
        let {event} = checkMode(e);

        // //超出边界判断
        // if(this.isCheck){
        //     if(event.clientX>this.origin[0]+this.areaWidth+10 || event.clientY>this.origin[1]+this.areaHeight+10){
        //         this.scaleUp();
        //         return
        //     }
        // }

        //公式:原长+目前位置长度-起始点长度
        let width, height;

        if(this.rotateAngle === 0) {
            width = this.targetWidth+event.clientX-this.scaleX;
            height =  this.targetHeight+event.clientY-this.scaleY;
        }
        else {
            let temp = this.calcWH(event.clientX-this.scaleX, event.clientY-this.scaleY);

            width = this.targetWidth+temp.x;
            height =  this.targetHeight+temp.y;
        }

        //若长宽小于零,则不允许缩小
        if(width<0) width = 0;
        if(height<0) height = 0;
        
        //更新起始点
        this.scaleX = event.clientX;
        this.scaleY = event.clientY;

        //更新目标长宽
        this.targetWidth = width;
        this.targetHeight = height;

        this.callback(this.targetWidth, this.targetHeight);
    }

    //计算旋转后的长宽
    calcWH(x, y) {
        if(x===0 && y===0) return {x:0, y:0}

        //计算初始角度
        let angle0 = Math.atan(y/x);

        //第二象限
        if(x<0 && y>=0){
            angle0 = Math.PI+angle0;
        }
        //第四象限
        else if(x>=0 && y<0){
            angle0 = 2*Math.PI+angle0;
        }
        

        let len = Math.sqrt(x**2+y**2);

        //计算旋转后的角度
        let angle1 = angle0-this.rotateAngle/180*Math.PI;

        //第三象限
        if(x<0 && y<0) return {x: -len*Math.cos(angle1), y: -len*Math.sin(angle1)}

        return {x: len*Math.cos(angle1), y: len*Math.sin(angle1)}

    }

    scaleUp = ()=>{
        document.onmouseup = null;
        document.ontouchmove = null;
        document.touchend = null;
        document.onmousemove = null;
    }

}