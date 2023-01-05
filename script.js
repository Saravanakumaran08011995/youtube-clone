const videoCardContainer = document.querySelector(".body_container")

let apiKey = "AIzaSyCcNdZCASOU66P_2-TG8AQejSke2uL1bLI";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";


fetch(video_http + new URLSearchParams({
    key: apiKey,
    part: "snippet",
    chart: "mostPopular",
    maxResults: 50,
    regionCode: "IN"
  }))
.then(response=> response.json())
.then(data =>{
  data.items.forEach(item =>{
    getChannelIcon(item);
  })
})


const getChannelIcon = (video_data) => {
    fetch(channel_http + new URLSearchParams({
        key: apiKey,
        part: 'snippet',
        id: video_data.snippet.channelId
    }))
    .then(res => res.json())
    .then(data =>{
        // console.log(data)
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        // console.log(video_data)

        makeVideoCard(video_data);
    })

}

const makeVideoCard =(data) =>{
  videoCardContainer.innerHTML +=`
  <div class="card" style="width: 18rem;" onclick="location.href = 'https://youtube.com/watch?v= ${data.id}'">
        <img src="${data.snippet.thumbnails.high.url}" class="card-img-top" alt="default-img">
        <div class="card-body">
          <img src="${data.channelThumbnail}" class="channel-icon" alt="icon">
          <h5 class="card-title">${data.snippet.title}</h5>
          <p class="card-text">${data.snippet.channelTitle}</p>
        </div>
    </div>
  
  `
}

const searchInput = document.querySelector('#navBarSearchForm');
const searchBtn = document.querySelector('.btn');
let searchLink = "https://www.youtube.com/results?search_query=";

searchBtn.addEventListener('click',()=>{
  if(searchInput.value.length){
    location.href = searchLink + searchInput.value;
  }
})