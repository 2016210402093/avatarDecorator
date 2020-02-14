import React from 'react'
import css from './picSelect.module.css'

const PicSelectUI = (props)=>{
    return (
        <div className={css.choseArea}>
            <img onClick={ ()=>props.liftSlide() } className={css.arrow} src={require('../../assets/leftArrow.svg')} alt={'左箭头'} ></img>
            <div className={css.picDisplay} id='slideImg' onTouchStart={(e)=>props.slideDown(e)}>
                <div className={css.pad}></div>

                {
                    //require(element) element = ../../assets/author.jpg不可以，很奇怪
                    props.picArray.map((element) => 
                    <img onClick={()=>props.getChosenPic(element.id)} key={element.id} className={css.imgs} src={require('../../'+element.url)} alt=""></img>)
                }

                <div className={css.pad}></div>
            </div>
            <img onClick={ ()=>props.rightSlide() } className={css.arrow} src={require('../../assets/rightArrow.svg')} alt={'左箭头'}></img>
        </div>
    )
}

export default PicSelectUI