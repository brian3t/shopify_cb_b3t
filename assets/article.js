const API_URL = 'https://api.simplre.com/v1/'

async function pull_from_abcd(e){
  let btn = e.target
  let cust_tag = $('li.article__tags-item > a').toArray()
    .filter(a => (a.text.includes('cust')))
    .map(a => a.text).pop()
  if (typeof cust_tag !== 'string') {
    console.error(`Cannot find customer tag. Make sure blog tag is cust_schoolabc`)
    return false
  }
  cust_tag = cust_tag.substr(5)
  let cust_data = await $.getJSON(`${API_URL}camp/`, {school: cust_tag})
  if (! cust_data || cust_data.length !== 1) {
    console.error(`Cannot pull from API. Double check API`)
    return false
  }
  cust_data = cust_data[0]
  $(btn).parent().prepend(JSON.stringify(cust_data))
  let a = 1
}

(function (){
  jQuery(document).ready(function ($){
    console.log('page article loaded')

  });

})()
