import React from 'react'

const PicSelectUI = (props)=>{
    return (
        <div className='choseArea'>
            <img onClick={ ()=>props.liftSlide() } className='arrow' src={require('../../assets/leftArrow.svg')} alt={'左箭头'} ></img>
            <div className='picDisplay' id='slideImg' onTouchStart={(e)=>props.slideDown(e)}>
                <div className='pad'></div>

                {
                    //require(element) element = ../../assets/author.jpg不可以，很奇怪
                    props.picArray.map((element) => 
                    <img onClick={()=>props.getChosenPic(element.id)} key={element.id} className='imgs' src={require('../../'+element.url)} alt=""></img>)
                }

                <div className='pad'></div>
            </div>
            <img onClick={ ()=>props.rightSlide() } className='arrow' src={require('../../assets/rightArrow.svg')} alt={'左箭头'}></img>
        </div>
    )
}

export default PicSelectUI