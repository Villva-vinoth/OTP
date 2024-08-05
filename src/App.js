import { useState } from 'react';
import './App.css';
import Email from './component/Email';

function App() {

  const [state, setState] = useState(false)

  return (
    <div className='flex items-center justify-center text-[blue] bg-black min-w-full min-h-[100vh] w-[24] hover:min-w-0'>
      {
        state ? (
          <>
            <span >Hello world! </span> &nbsp;
            <span className='motion-safe:animate-bounce text-[black] hover:text-white cursor-pointer' onClick={() => setState(!state)}>this is vinoth</span>
          </>
        ) : (
          <>
            <Email setState={setState}/>
          </>
        )
      }
    </div>
  );
}

export default App;
