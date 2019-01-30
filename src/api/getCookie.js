import {getCookie} from '../util/cookie'
export function getCookieInfo() {
  const ipAddress = getCookie('ipAddress');
  const port = getCookie('port');
  const baseUrl = 'http://'+ipAddress+':'+port
  const username = getCookie('username');
  return {baseUrl,username}
}

/**
 * 
 * 使用
 * getCookieInfo().baseUrl
 * getCookieInfo().username
 */