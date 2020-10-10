axios = require('axios');
const baseUrl = 'https://api.cardbo.info/api/v3'

const getToken = () => axios.post(baseUrl + '/token',
    {
        username: 'cardboLiffApp',
        password: '555cardboLiffApp555'
    }
).then(res => {
    if (res.status == 201) {
        console.log(res.data)
        return res.data
    } else {
        console.log('get token error')
        // return null
    }
}).catch(error => console.log(error));

const stater = () => {
    console.log('start')
}
const myPromise = (new Promise(stater)
).then(() => {
    getToken();
}).then((data) => { console.log('end') })
