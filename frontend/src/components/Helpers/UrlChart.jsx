import BarChar from '../charts/Bar'

const getChartUrl = async (data, layout) => {

    const chartDiv = document.createElement('div')
    chartDiv.setAttribute('id', 'chart')
    chartDiv.style.display = 'none'
    document.body.appendChild(chartDiv)

    // Create the chart in the 'chart' div
    Plotly.newPlot('chart', data, layout)

    // save the chart as a byte array
    return await Plotly.toImage('chart', { format: 'png', width: 800, height: 800 })
}

export const getBarUrl = async (res) => {
    const [trace, layout] = BarChar(
        {
            data: res.data,
            title: res.title,
            xLabel: res.xLabel,
            yLabel: res.yLabel,
            dimension: [500, 500]
        }
    )
    return await getChartUrl(trace, layout)

}

export const getUrlFromData = async (data, chartType) => {

    const res = await data

    const url = {}

    for (const key of Object.keys(res)) {
        url[key] = chartType(res[key])
    }
    return url
}

export const assignUrlToImage = async (res, images) => {
    const promises = Object.values(res)

    try {
        const responses = await Promise.all(promises)
        const resolvedData = {}

        Object.keys(res).forEach((key, index) => {
            resolvedData[key] = responses[index]
        })

        images.map((image) => image.img = resolvedData[image.meta])
    } catch (error) {
        console.error(error)
    }
}
