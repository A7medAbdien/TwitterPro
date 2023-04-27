import $ from 'jquery'

const URL = "http://127.0.0.1:8000"

export const getTermFreqUni =
    $.ajax({
        url: `${URL}/ch/tf/uni`,
        type: 'GET',
        dataType: 'json',
        success: (res) => {
            return res
        }
    })


export const getTermFreqBi =
    $.ajax({
        url: `${URL}/ch/tf/bi`,
        type: 'GET',
        dataType: 'json',
        success: (res) => {
            return res
        }
    })


export const getUserFreq =
    $.ajax({
        url: `${URL}/ch/user`,
        type: 'GET',
        dataType: 'json',
        success: (res) => {
            return res
        }
    })


export const getTopicFreq =
    $.ajax({
        url: `${URL}/ch/topic`,
        type: 'GET',
        dataType: 'json',
        success: (res) => {
            return res
        }
    })


export const getTimeFreq =
    $.ajax({
        url: `${URL}/ch/time`,
        type: 'GET',
        dataType: 'json',
        success: (res) => {
            return res
        }
    })


export const getComm =
    $.ajax({
        url: `${URL}/ch/comm`,
        type: 'GET',
        dataType: 'json',
        success: (res) => {
            return res
        }
    })


