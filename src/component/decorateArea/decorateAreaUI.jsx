import React from 'react'
import css from './decorateArea.module.css'

const DecorateAreaUI = (props)=>{
    return (
        <div>
            <h1 className={css.title}>
                头像编辑器
            </h1>
            <div className={css.picBox}>
                <div id='picInput' style={{background: `url(${props.backgroundImage}) no-repeat`}} className={css.addPic}>


                <input className={css.picInput} type='file' accept="image/*" onChange={(e)=>props.changePic(e)}></input>
                    {
                        props.chosenPicSet.map((element, key)=>
                            <div className={css.chosenBox} key={key}>

                                <div className={css.picList} style={{
                                            position: 'absolute',
                                            display: element.display,
                                            width: element.style.width+'px',
                                            height: element.style.height+'px',
                                            left: element.needX,
                                            top: element.needY,
                                            border: props.cancelDecoration==='inline'?'2px dashed orange':'unset',
                                            background: `url(${require('../../'+element.picUrl)}) no-repeat`,
                                            backgroundSize: 'contain', 
                                            transform:`rotate(${element.angle}deg)`,
                                            WebkitTransform: `rotate(${element.angle}deg)`,
                                            WebkitTransition: 'all',
                                            transition:'all'
                                        }} 
                                        onMouseDown={(e)=>props.fnDown(e, key)} 
                                        onTouchStart={(e)=>{props.fnDown(e, key)}}
                                        >
                               

                                    <div className='child'  onClick={()=>props.deletePic(key)} 
                                        style={{
                                            display: props.cancelDecoration,
                                            position: 'absolute',
                                            left: '-10px',
                                            top: '-10px',
                                            width: '20px',
                                            height: '20px',
                                            borderRadius: '10px',
                                            background:`url(${require('../../assets/delete.svg')}) white`,
                                            backgroundSize: 'contain', 
                                        }}
                                    ></div>

                                    <div onMouseDown = {(e)=>props.roateDown(e, key)}
                                        onTouchStart={(e)=>props.roateDown(e, key)} 
                                        className='child' 
                                        style={{
                                            display: props.cancelDecoration,
                                            width: '20px',
                                            height: '20px', 
                                            borderRadius: '10px', 
                                            background:`url(${require('../../assets/rotate.svg')}) white`,
                                            backgroundSize: 'contain', 
                                            position: 'absolute', 
                                            top: element.style.height/2-10+'px',
                                            left: element.style.width+20+'px'
                                        }}
                                    >
                                    </div>

                                    <div onMouseDown = {(e)=>props.scaleDown(e, key)}
                                        onTouchStart={(e)=>props.scaleDown(e, key)} 
                                        className='child' 
                                        style={{
                                            display: props.cancelDecoration,
                                            width: '20px',
                                            height: '20px', 
                                            borderRadius: '10px', 
                                            background:`url(${require('../../assets/stretch.svg')}) white`,
                                            backgroundSize: 'contain', 
                                            position: 'absolute', 
                                            top: element.style.height+'px',
                                            left: element.style.width+'px'
                                        }}
                                    >
                                    </div>
                                </div>

                            </div>
                        )
                    }
                </div>
            </div>
            <p className='tips'>点击"+"添加图片，点击上传的图片进行更换
            <br/>
            建议图片不大于3M</p>
        </div>
    )
}

export default DecorateAreaUI;