function pull_from_abcd(){
  let a = 1
  let tags = $('li.article__tags-item > a').toArray().filter(a=>(a.text.includes('cust'))).map(a=>a.text).pop()
}

(function (){
  jQuery(document).ready(function ($){
    console.log('page article loaded')

  });

})()
