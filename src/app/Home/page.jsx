import Navbar from '@/components/Navbar/Navbar';

import CyberAwareness from '@/components/background';

export default function Homepage() {
  return (
    <div className='overflow-hidden hide-scrollbar'>
      <Navbar/>
      <CyberAwareness/>
    </div>
  );
}

/*
import image from './image.jpg';
<div className=" pt-16 w-full h-screen bg-center bg-no-repeat bg-cover"
  style={{ backgroundImage: `url(${image.src || image})` }}
>
  </div>

  */
