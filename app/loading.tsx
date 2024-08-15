import { SiteLogo } from '@/components/svg'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const loading = () => {
  return (
<div className=" h-screen flex items-center justify-center flex-col space-y-2">
      <Image src={SiteLogo} alt="site logo" className=" h-10 w-10 text-primary" />
      <span className=" inline-flex gap-1">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        صبر کنید...
      </span>
    </div>  )
}

export default loading