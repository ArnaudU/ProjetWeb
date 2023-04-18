import Api from "../Api";

export async function createMessage(content) {
    return (
        Api.post('/message', content)
            .then(response => {
                return response.status === 200
            })
    )
}

export function getPostsFromId(id) {
    return (
        Api.get(`/message/user/${id}`)
            .then((response) => {
                return response
            })
    )
}

export function getMessage(id) {
    return (
        Api.get(`/message/${id}/get`)
            .then((response) => {
                return response.data
            })
    )
}

export function getRecentPost() {
    return (
        Api.get('/message/recent')
            .then(response => {
                return response
            })
    )
}

export function deleteMessage(msgid) {
    return (
        Api.delete(`message/delete/${msgid}`)
            .then((response) => {
                return response
            })
    )
}

export function likeMessage(msgid) {
    return (
        Api.post(`message/${msgid}/like`)
            .then((response) => {
                return response
            })
    )
}

export function retweetMessage(msgid) {
    return (
        Api.post(`message/${msgid}/retweet`)
            .then((response) => {
                return response
            })
    )
}