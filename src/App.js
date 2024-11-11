import React, { useState} from 'react';
import { ThemeProvider } from 'styled-components';
import TradingSimulator from './Trade';
import { Window } from 'react95';
import original from 'react95/dist/themes/original';
import RepeatedMarquee from './rmarquee';
import Marquee from 'react-fast-marquee';
import { cn } from './lib/utils';

const reviews = [
  {
    name: "Ansem",
    username: "@blknoiz06",
    body: "invETF is millions coded. will start shilling on X shortly",
    img: "ansem.png",
  },
  {
    name: "Ken Griffin",
    username: "@KenGriffin",
    body: "fund is doubling down on invETF. data points up and to the north",
    img: "ken.png",
  },
  {
    name: "Mitch",
    username: "@idrawline",
    body: "feeling some retardio vibes from this. aping 100 sol see you at 10m's",
    img: "mitch.jpg",
  },
  {
    name: "Nancy Pelosi",
    username: "@SpeakerPelosi",
    body: "due to insider info my entry is 6k. send it higher. copy traders eating",
    img: "nancy.png",
  },
  {
    name: "Wolf Of Crypto",
    username: "@W0LF0FCRYPT0",
    body: "here to shill the f*ck out of this. only up. invETF is the next 100x",
    img: "wolf.png",
  },
  {
    name: "Elon Musk",
    username: "@elonmusk",
    body: "invETF might reach mars before me. inverse Cramer is max alpha",
    img: "elon.png",
  },
];

const ReviewCard = ({ img, name, username, body }) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4 bg-white"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="40" height="40" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-lg font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-base font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-lg">{body}</blockquote>
    </figure>
  );
};

function App() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const contractAddress = 'uploading...';
    navigator.clipboard.writeText(contractAddress).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <ThemeProvider theme={original}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '20px',
          backgroundImage: 'url(/c.gif)',
          backgroundRepeat: 'repeat',
          backgroundSize: 'auto',
          overflow: 'hidden'
        }}
      >
        <div>
          <div className='flex justify-center mb-4'>
            <Window>
              <button
                onClick={handleCopy}
                className='p-1 text-xs md:text-base m-1 bg-zinc-400'
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
              <span className='p-1 text-[9px] md:text-base'>updating...</span>
            </Window>
          </div>
          <Window>
            <div 
              className='flex justify-center items-center'
              style={{
                position: 'relative',
                backgroundImage: 'url(/money.gif)',
                backgroundRepeat: 'repeat',
                backgroundSize: 'auto'
              }}
            >
              <div className=''>
                <div className='h-auto w-[85dvw] py-10 relative'>
                  <div className='absolute top-2 right-2 md:top-5 md:right-5'>
                    <div className='flex justify-center space-x-2 text-lg'>
                      <a href='https://x.com/' className='underline'>
                        Twitter
                      </a>
                      <a href='https://t.me/' className='underline'>
                        Telegram
                      </a>
                    </div>
                  </div>
                  <div className='flex justify-center'>
                    <div className='mb-5'>
                      <img src="header.png" className='w-[300px] md:w-[600px]'></img>
                    </div>
                  </div>
                  <div className='flex justify-center my-10'>
                    <TradingSimulator initialPrice={100}/>
                  </div>
                  <RepeatedMarquee />
                  <RepeatedMarquee direction={'right'} />
                  <div className="relative flex h-min pt-[20%] md:pt-[7.5%] w-full flex-col items-center justify-center overflow-hidden">
                    <div className="w-full relative">
                      <Marquee pauseOnHover={true} speed={80}>
                        {reviews.map((review) => (
                          <div key={review.username} className="mr-4">
                            <ReviewCard {...review} />
                          </div>
                        ))}
                      </Marquee>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Window>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;