//判断电脑还是手机操作
export const checkMode = (e)=>{
    /*事件兼容IE*/
    let event = e || window.event;
    let isTouch = false;

    if(event.touches) {
        event = event.touches[0];
        isTouch = true;
    }
    return {event: event, isTouch: isTouch}
}
