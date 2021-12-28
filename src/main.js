const sitesStr = localStorage.getItem('sitesStr')
const sitesObj = JSON.parse(sitesStr)
let hashMap = sitesObj || [{ logo: 'W', url: 'https://weibo.com' },
{
    logo: `<svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-bilibili-line"></use>
                </svg>`,
    url: 'https://www.bilibili.com'
},
{
    logo: `<svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-youtube"></use>
            </svg>`,
    url: 'https://www.youtube.com'
},
{
    logo: 'Y',
    url: 'https://www.yueing.org'
},

{
    logo: 'X',
    url: 'https://xiedaimala.com/'
}
]

const simplifyUrl = (url) =>
    url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '')



const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        let logoStr = node.logo

        const $newLi = $(`
        <li>
            <div class="site">
                <div class="logo">${logoStr}</div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="close">
                    <svg class="icon">
                        <use xlink:href="#icon-close"></use>
                    </svg>
                </div>
            </div>
        </li>
        `).insertBefore($lastLi)
        $newLi.on('click', () => { window.open(node.url, '_self') })
        $newLi.on('click', '.close', (e) => {
            e.stopPropagation()
            hashMap.splice(index, 1)
            render()
        })
    })
}

$('.addButton').on('click', () => {
    let url = window.prompt(`请问要添加的网址为：`)
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    }
    console.log(url)
    hashMap.push({ logo: simplifyUrl(url)[0], url: url })
    render()
    const sitesStr = JSON.stringify(hashMap)
    localStorage.setItem('sitesStr', sitesStr)
})

$(document).on('keypress', (e) => {
    const { key } = e
    console.log(e)
    for (let i = 0; i < hashMap.length; i++) {
        let fLetter = hashMap[i].logo.toLowerCase()
        if (hashMap[i].logo.length !== 1) {
            fLetter = simplifyUrl(hashMap[i].url)[0]
        }
        if (fLetter === key) {
            window.open(hashMap[i].url)
        }
    }
})

render()