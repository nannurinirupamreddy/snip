import { useState, useEffect } from 'react'
import './App.css'
import useShortenerStore from '../utils/shotener';

function App() {

  const [url, setUrl] = useState('');
  const {shortenedUrl, shortenUrl} = useShortenerStore();

  useEffect(() => {
    if (shortenedUrl) {
      console.log('Shortened URL:', shortenedUrl);
    }
  }, [shortenedUrl]);

  function handleSubmit(event) {
    event.preventDefault();
    if (url) {
      shortenUrl(url);
    } else {
      console.log('No URL entered.');
    }
  }

  return (
    <>
      <div className="header">
        <h1 className='bracket'>{`[`}</h1>
        <h1 className='text'>snip</h1>
        <h1 className='bracket'>{`]`}</h1>
        <p>paste long. get short. move on.</p>
      </div>
      <div className="form-container">
        <form className="url-form" onSubmit={(e) => handleSubmit(e)}>
          <div className="caption">
            <h4>// shorten url</h4>
          </div>
          <div className="url-input-container">
            <div className="input-wrapper">
              <span className="prompt">{'>'}</span>
              <input
                type="text"
                value={url}
                placeholder="https://your-very-long-url.com/..."
                className='url-input'
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </div>
            <div className="submit-btn">
              <button type="submit" className="shorten-button">shorten →</button>
            </div>
          </div>
        </form>
      </div>
      {shortenedUrl && (
        <div className="result">
          <h4>[snip]ed url:</h4>
          <a href={shortenedUrl} target="_blank">{shortenedUrl}</a>
        </div>
      )}
      <div className="footer">
        <h4>built with <mark>{`<`}node • express • supabase • react{`/>`}</mark></h4>
      </div>
    </>
  )
}

export default App
