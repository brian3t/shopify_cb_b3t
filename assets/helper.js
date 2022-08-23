function truncate(value, limit, suffix = '') {
    let preValue = value.trim()
    
    if (!preValue) return ''
    if (value.length <= limit)  return value
    if (limit <= suffix.length) return value
  
    preValue = preValue.substr(0, limit - suffix.length)
    
    return `${preValue.trim()}${suffix}`
  }
  
  const inputValue = 'Hello world'
  truncate(inputValue, 5) // => 'Hello'
  truncate(inputValue, 5, '...') // => 'He...'


  function camelize(value) {
    return value.removeAbnormal(value)
      .replace(/[\_\-]/g, " ")
      .replace(/\s[a-z]/g, val => val.toUpperCase())
      .replace(/\s+/g, "")
      .replace(/^[A-Z]/g, val => val.toLowerCase())
  }
  
  function removeAbnormal(str) {
    return str.replace(/[^0-9a-zA-Z \_\-]/g, "");
  }