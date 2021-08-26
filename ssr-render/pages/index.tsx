import { useEffect } from 'react'
import type { NextPage } from 'next'
import { useRouter  } from 'next/router'
import { getCookie } from '../utils/getCookie'


const Home: NextPage = () => {
  const router = useRouter()
  useEffect(() => {
    
    if(getCookie(document.cookie).jwt){
      router.push('/detail')
    } else {
      //重定向到注册
      router.push('/login')
    }
  }, [])
  return (
    <>

    </>
  )
}

export default Home

