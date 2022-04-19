import {useEffect, useState} from 'react';

function CheckHeight() {

  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
  
    function handleWindowScroll() {
      setWindowHeight(window.innerHeight);
   };

   window.addEventListener("resize", handleWindowScroll)
    
   return () => window.removeEventListener("resize", handleWindowScroll)
  },[]);

  return { windowHeight };
};

export default CheckHeight;