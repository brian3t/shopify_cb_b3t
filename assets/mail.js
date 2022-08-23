/**
 * Mail util
 * Need: mail_conf.js
 * toastr
 * jQuery
 * Example: mail.html
 */
jQuery(document).ready(($) => {
  $('input[type="submit"][value="Send"]').on('click', async (btn) => {
    btn = btn.target
    $(btn).prop('disabled', true)
    console.log(`btn click`, btn)
    try {
      const now = (new Date()).toLocaleString()
      let content = $('#ContactFormMessage').val()
      content += ' from: ' + $('#ContactFormEmail').val()
      const to = 'hello@craftbellydelights.com'
      const to_name = $('#ContactFormName').val()
      let mail_res = await $.get(API_ROOT, {act: 'mail', subj: `${SUBJ} ${now}`, to, to_name, cont: content})
      console.log(`Mail API response: `, mail_res)
      if (!mail_res) {
        console.error(`Error calling mail API `, e)
        toastr.error(`Error sending email`)
        return
      }
      if (mail_res.stat && mail_res.stat === 1){
        toastr.success(mail_res.msg)
      }
    } catch (e) {
      console.error(`Error calling mail API `, e)
      toastr.error(`Error sending email`)
    }
    // $(btn).prop('disabled', false)
  })
})
