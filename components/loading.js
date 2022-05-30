import { VscLoading } from 'react-icons/vsc'
function Loading() {
  return (
    <>
      <div className="flex h-96 justify-center">
        <div className="flex items-center text-xl text-blue-500">
          <VscLoading className="mr-3 animate-spin text-4xl" /> Processing...
        </div>
      </div>
    </>
  )
}

export default Loading
