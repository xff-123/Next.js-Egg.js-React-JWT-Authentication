import Head from 'next/head'

const Layout:React.FC = ({children}) => {
  return (
    <div>
      <Head>
        <title>小帆帆的ssr网站</title>
      </Head>
      {children}
    </div>
  )
}

export default Layout
