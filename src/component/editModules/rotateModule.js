import {checkMode} from './common'

/*

需传入以下五个参数

1.event: 事件

2.center: 旋转中心点

3.start： 旋转起始点

4.origin：坐标系原点

5.callback: 执行move事件时的回调 

*/


export default class RotateModule {
    constructor({event, center, start, origin, callback}) {
        this.event = event;          //事件

        this.callback = callback;    //移动事件时的回调函数

        this.origin = origin;        //原点

        this.center = center;        //中心点
        this.start = start;          //起始点
        this.end = [0, 0];           //结束位置

        this.angle = 0;              //旋转角度

    }

    roateDown(){
        this.roateUp();
        let {isTouch} = checkMode(this.event);

        //定义移动事件
        isTouch ? document.ontouchmove = this.roateMove : document.onmousemove = this.roateMove;

        //定义抬起事件
        isTouch ? document.touchend = this.roateUp: document.onmouseup = this.roateUp;   
    }

    //箭头函数,防止this访问不到
    roateMove = (e)=>{
        let {event} = checkMode(e); //注意要写e...

        //设置结束位置
        this.end = [event.clientX-this.origin[0], event.clientY-this.origin[1]];

        //计算旋转角度
        this.angle = this.getAngle(this.center, this.start, this.end)/Math.PI*180;

        //执行回调
        this.callback(this.angle);

    }

    // 计算旋转角度
    getAngle(center, start, end) {
        // center:中心点   start:开始点   end:结束位置
        let s_c_x = start[0] - center[0],
            s_c_y = start[1] - center[1],
            e_c_x = end[0] - center[0],
            e_c_y = end[1] - center[1];
        
        let c = Math.sqrt(s_c_x * s_c_x + s_c_y * s_c_y) * Math.sqrt(e_c_x * e_c_x + e_c_y * e_c_y);
        if (c === 0) return -1;

        let angle = Math.acos((s_c_x * e_c_x + s_c_y * e_c_y) / c);

        //公式y=k 若y0>k则向右旋转，反之向左旋转 k=0
        if(e_c_y < 0)
            angle = -angle
        return angle;
    }

    roateUp = ()=> {
        document.onmouseup = null;
        document.ontouchmove = null;
        document.touchend = null;
        document.onmousemove = null;
    }
}