import Head from 'next/head'
import tw, { styled } from 'twin.macro'
import { keyframes } from 'styled-components'
import { Github } from 'styled-icons/fa-brands'

const animation = keyframes`
  0% { background-position: 0 74%; }
  50% { background-position: 100% 27%; }
  100% { background-position: 0 74%; }
`

const Container = styled.div`
  ${tw`flex flex-col items-center justify-center h-screen`};
  animation: ${animation} 30s ease infinite;
  background: linear-gradient(270deg, #45dce4, #bd85ea, #ea858d);
  background-size: 600% 600%;
`

const Logo = styled.h1`
  ${tw`p-8 text-transparent text-6xl lg:text-8xl`};
  font-family: 'Pushster';
  background: linear-gradient(
    270deg,
    hsl(206, 100%, 20%),
    hsl(289, 100%, 20%),
    hsl(36, 100%, 20%)
  );
  background-size: 600% 600%;
  background-clip: text;
  animation: ${animation} 30s ease infinite;
`

const Home = () => {
  return (
    <>
      <Head>
        <title>coming soon.</title>
        <meta name="description" content="colorscheme all the things" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Logo>farbenfroh.io</Logo>
        <div tw="text-center my-4">
          <p tw="text-gray-700 text-lg">/ˈfarbənfroː/</p>
          <p tw="text-gray-700 text-xs">[adjective]</p>
          <p tw="text-gray-900 text-xl font-bold">full of colour</p>
        </div>
        <a href="https://github.com/farbenfroh">
          <Github tw="h-12 w-12" />
        </a>
        <p tw="absolute bottom-0 m-2 opacity-30 transition ease-linear hover:-translate-y-1 hover:opacity-100">
          a project by{' '}
          <a href="https://github.com/nekowinston" tw="text-blue-800">
            winston
          </a>
        </p>
      </Container>
    </>
  )
}

export default Home
