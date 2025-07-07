import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [videos, setVideos] = useState([]);
  const [message, setMessage] = useState("در حال دریافت اطلاعات...");

  // آدرس بک‌اند خود را اینجا قرار دهید
  // به جای خط قبلی، از این استفاده کنید
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    // به آدرس API که در جنگو ساختیم، درخواست می‌فرستیم
    fetch(`${BACKEND_URL}/api/videos/`)
      .then(response => {
        if (!response.ok) {
          throw new Error("خطا در شبکه یا CORS. بخش بعدی راهنما را ببینید.");
        }
        return response.json();
      })
      .then(data => {
        setVideos(data);
        setMessage(""); // پیغام "در حال دریافت" را حذف کن
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setMessage(error.message); // نمایش خطا در صفحه
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>لیست ویدیوها از سرور من</h1>
        {message && <p>{message}</p>}
        <ul>
          {videos.map(video => (
            <li key={video.id}>{video.title}</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;