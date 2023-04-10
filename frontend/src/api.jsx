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

export const getUsersFreq = (set) => {
    $.ajax({
        url: `${URL}/ch/users`,
        type: 'GET',
        dataType: 'json',
        success: (res) => {
            set(res)
        }
    })
}

