import { withProtected } from '../src/hook/route'
import { useRouter } from 'next/router'

const IndexPage = () => {
  const router = useRouter()
  router.push('/login')
  return <></>
}

export default withProtected(IndexPage)
