import React, {Component} from 'react';
import PicSelectUI from './picSelectUI'
import './picSelect.css'
import {updatePicUrlAction} from '../../action/actionCreators'
import { connect } from 'react-redux';


class PicSelect extends Component {

    constructor(props){
        super(props);
        this.state = {
            picArray: [
                {id: 0, url:'assets/pic0.png'},
                {id: 1, url:'assets/pic1.png'},
                {id: 2, url:'assets/pic2.svg'},
                {id: 3, url:'assets/pic3.svg'},
                {id: 4, url:'assets/pic4.svg'},
                {id: 5, url:'assets/pic5.svg'},
                {id: 6, url:'assets/pic6.svg'},
                {id: 7, url:'assets/pic7.svg'},
                {id: 8, url:'assets/pic8.svg'},
                {id: 9, url:'assets/pic9.svg'},
                {id: 10, url:'assets/pic10.svg'},
            ]
        }
        this.disX = 0;
        this.isDown = false;
    }

    componentWillUnmount(){
        this.setState = (state, callback) => {
            return
        }
    }


    getChosenPic = (id) => {
        const {dispatch} = this.props;

        if(this.props.isEdit) {
            const action = updatePicUrlAction(this.state.picArray[id].url)
            dispatch(action);
        }
        else {
            alert('请先上传头像!')
        }
    }

    liftSlide = ()=>{
        document.getElementById('slideImg').scrollLeft = document.getElementById('slideImg').scrollLeft - 50;
    }

    rightSlide = ()=>{
        document.getElementById('slideImg').scrollLeft = document.getElementById('slideImg').scrollLeft + 50;
    }



    slideDown = (e)=>{
        this.slideUp();
        this.isDown = true;
        let event = e.touches[0];

        this.disX = event.clientX;

        document.ontouchmove = this.slideMove;
        document.touchend = this.slideUp;   
    }

    slideMove = (e)=>{
        if(!this.isDown) return

        let event = e.touches[0];
        document.getElementById('slideImg').scrollLeft = document.getElementById('slideImg').scrollLeft - (event.clientX-this.disX);
        this.disX = event.clientX;
    }

    slideUp = ()=>{
        this.isDown = false
        document.ontouchmove = null;
        document.touchend = null;
    }

    render(){
        return (
            <PicSelectUI
                picArray={this.state.picArray}
                liftSlide = {this.liftSlide}
                rightSlide = {this.rightSlide}
                slideDown = {this.slideDown}
                getChosenPic = {this.getChosenPic}
            ></PicSelectUI>
        )
    }
}

const mapStateToProps = (state)=>({
    isEdit: state.isEdit
})

const mapStateToDispatch = (dispatch)=>{
    return {
        dispatch
    }
}

export default connect(mapStateToProps, mapStateToDispatch)(PicSelect)