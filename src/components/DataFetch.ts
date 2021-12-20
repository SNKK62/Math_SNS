

interface actionprop {
    type: string,
    payload: any
}

const dataFetch = (dataState: any, action: actionprop) => {
    switch (action.type) {
        case 'init':
            return {
                isLoading: true,
                post: dataState.post,
                isError: ''
            }
        case 'success':
            return {
                isLoading: false,
                post: action.payload,
                isError: ''
            }
        case 'error':
            return {
                isLoading: false,
                post: {},
                isError: '読み込みに失敗しました'
            }
        default:
            return dataState
    }
}

export default dataFetch