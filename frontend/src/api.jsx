import $ from 'jquery'

const URL = "http://127.0.0.1:8000"

export const getTermFreqUni = (set) => {
    $.ajax({
        url: `${URL}/ch/tf/uni`,
        type: 'GET',
        dataType: 'json',
        success: (res) => {
            set(res)
        }
    })
}

export const getTermFreqBi = (set) => {
    $.ajax({
        url: `${URL}/ch/tf/bi`,
        type: 'GET',
        dataType: 'json',
        success: (res) => {
            set(res)
        }
    })
}

export const getUserFreq = (set) => {
    $.ajax({
        url: `${URL}/ch/user`,
        type: 'GET',
        dataType: 'json',
        success: (res) => {
            set(res)
        }
    })
}

export const getTopicFreq = (set) => {
    $.ajax({
        url: `${URL}/ch/topic`,
        type: 'GET',
        dataType: 'json',
        success: (res) => {
            set(res)
        }
    })
}


export const getTimeFreq = (set) => {
    $.ajax({
        url: `${URL}/ch/time`,
        type: 'GET',
        dataType: 'json',
        success: (res) => {
            set(res)
        }
    })
}



export const getComm = (set) => {
    $.ajax({
        url: `${URL}/ch/comm`,
        type: 'GET',
        dataType: 'json',
        success: (res) => {
            set(res)
        }
    })
}

