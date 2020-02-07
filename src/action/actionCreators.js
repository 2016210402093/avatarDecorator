import {UPDATE_PIC_URL, IS_EDIT, CANCEL_DECORATION} from './actionTypes'

export const updatePicUrlAction = (picUrl)=>({
    type: UPDATE_PIC_URL,
    picUrl
})

export const isEditAction = (isEdit, picUrl, cancelDecoration)=>({
    type: IS_EDIT,
    isEdit,
    picUrl,
    cancelDecoration
})

export const cancelDecorationAction = (cancelDecoration)=>({
    type: CANCEL_DECORATION,
    cancelDecoration
})

