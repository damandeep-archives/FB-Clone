import Image from 'next/image';

import {
    BellIcon,
    ChatIcon,
    ChevronDownIcon,
    HomeIcon,
    UserGroupIcon,
    ViewGridIcon,
} from '@heroicons/react/solid';

import {
    FlagIcon,
    PlayIcon,
    SearchIcon,
    ShoppingCartIcon,
}from '@heroicons/react/outline';
import { signOut, useSession } from 'next-auth/client';
import HeaderIcon from './HeaderIcon';






function Header() {

    const [session]=useSession();

    return (
        <div className='sticky top-0 z-50 bg-white flex items-center p-2 lg:px-5 shadow-md' >
          

          {/* left */}
        <div className="flex items-center">
            <Image src="http://links.papareact.com/5me"
            width={40}
            height={40}
            layout="fixed"
            />
        
            <div className="flex ml-2 items-center rounded-full bg-gray-100 p-2 ">
                <SearchIcon className="h-6 text-gray-600"/>

                <input className='ml-2 items-center bg-transparent
                outline-none flex-shrink placeholder-gray-500
                hidden md:inline-flex' type="text" placeholder="Search Facebook"/>

            </div>
        </div>


          {/* center */}
          <div className="flex justify-center flex-grow">
            <div className="flex space-x-6
            md:space-x-2">
                <HeaderIcon active Icon={HomeIcon}/>
                <HeaderIcon Icon={FlagIcon}/>
                <HeaderIcon Icon={PlayIcon}/>
                <HeaderIcon Icon={ShoppingCartIcon}/>
                <HeaderIcon Icon={UserGroupIcon}/>

            </div>

          </div>
          {/* right */}
          <div className='flex items-center sm:space-x-2 justify-end'>
              {/* Profilepic */}

              <Image
              onClick={signOut}
              className='rounded-full cursor-pointer'
              src={session.user.image}
              width="40"
              height="40"
              layout="fixed"
              />  

              <p className="hidden sm:inline font-semibold pr-3 whitespace-nowrap">{session.user.name}</p>

            <ViewGridIcon className='icon'/>
            <ChatIcon className='icon'/>
            <BellIcon className='icon'/>
            <ChevronDownIcon className='icon'/>



          </div>
        </div>
    )
}

export default Header
