import React, {Component} from 'react';
import DecorateArea from '../../component/decorateArea/decorateArea'
import PicSelect from '../../component/picSelect/picSelect'
import {cancelDecorationAction} from '../../action/actionCreators'
import {connect} from 'react-redux'


class HomePage extends Component {

    constructor(props){
        super(props);
        this.isEdit = false;
    }

    componentWillUnmount(){
        this.setState = (state, callback) => {
            return
        }
    }

    render(){


        this.isEdit = this.props.isEdit

        return (
            <div>
                <DecorateArea></DecorateArea>
                <PicSelect></PicSelect>
                <button className='getAvatar' onClick = { ()=>this.props.takeScreenshot(this.isEdit) }> 生成头像 </button>
            </div>
        )
    }

}

const mapStateToProps = (state)=>({
    isEdit: state.isEdit
});

const mapStateToDispatch=(dispatch)=>{
    return {
        takeScreenshot: (isEdit) => {
            //若编辑过则可生成截图
            if(isEdit){
                const action = cancelDecorationAction('none')
                dispatch(action)
            }
            else{
                alert('请先上传头像!')
            }
        }
    }
};

export default connect(mapStateToProps,mapStateToDispatch)(HomePage)