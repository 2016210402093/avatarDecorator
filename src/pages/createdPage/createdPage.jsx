import React, {Component} from 'react'
import './createdPage.css'
import { Redirect } from 'react-router-dom';
import {isEditAction} from '../../action/actionCreators'
import { connect } from 'react-redux';


class CreatedPage extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            isContinue: false
        } 
    }

    continueCreate = ()=>{
        const {dispatch} = this.props; 

        localStorage.clear();
        const action = isEditAction(false, '', 'inline')
        dispatch(action);
        this.setState({
            isContinue: true
        })
    }

    render(){

        if(this.state.isContinue) {
            return <Redirect push to='/'></Redirect>
        }
        return (
            <div className='createdPage'>
                <div className="shadowBox">
                    <div className='createdImg'>
                        <img alt={'刷新后请重新生成图片'} src={localStorage.getItem('picUrl')}></img>
                    </div>
                </div>

                <p className='reminder'>生成成功!</p>
                <p className='reminder'>PC端用户右键保存</p>
                <p className='reminder'>移动端用户长按保存</p>

                <button className='getAvatar' onClick={ ()=>this.continueCreate() }> 继续生成 </button>

            </div>
        )
    }
}

const mapStateToDispatch = (dispatch)=>{
    return{
        dispatch
    }
}

export default connect(null, mapStateToDispatch)(CreatedPage)