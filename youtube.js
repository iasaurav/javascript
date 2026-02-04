const app = "1nMOSo-1YmviPyhOo_Vw9dx9v4cPqRpXdHeEcaBiS2H4:1499337155";
  
const [id, gid] = app.trim().split(':');

const link = `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:json&gid=${gid}&range=${range}`;


  
  

let videos = [];
let currentStartIndex = 0;
let player;

// Load YouTube API
const tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
document.body.appendChild(tag);

// Fetch Sheet
fetch(link)
  .then(r => r.text())
  .then(t => {
    const json = JSON.parse(t.substring(47).slice(0, -2));
    videos = json.table.rows.map(r => ({
      id: r.c[0]?.v,
      title: r.c[1]?.v,
      OwnerChannel: r.c[3]?.v,
      
    }));
    renderGrid(videos);
  });

// Render grid
function renderGrid(data) {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  data.forEach(v => {
    const index = videos.indexOf(v);
 //${v.OwnerChannel}
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.id = v.id;
    card.onclick = () => playFrom(index);

    card.innerHTML = `
      <img class="thumb" src="https://img.youtube.com/vi/${v.id}/mqdefault.jpg">
      <div class="title">${v.title}</div>
   
    
    `;

    grid.appendChild(card);
  });
}

// Search filter
document.getElementById("search").addEventListener("input", e => {
  const q = e.target.value.toLowerCase();
  renderGrid(
    videos.filter(v => v.title.toLowerCase().includes(q))
  );
});

// Play
function playFrom(start) {
  currentStartIndex = start;
  loadPlaylist();
}

// Load playlist (200 max)
function loadPlaylist() {
  const ids = videos
    .slice(currentStartIndex, currentStartIndex + 200)
    .map(v => v.id);

  if (!player) {
    player = new YT.Player("player", {
      videoId: ids[0],
      playerVars: {
        autoplay: 1,
        playlist: ids.join(",")
      },
      events: {
        onStateChange
      }
    });
  } else {
    player.loadPlaylist(ids);
  }
}

// Highlight playing
function highlight(id) {
  document.querySelectorAll(".card").forEach(c =>
    c.classList.toggle("active", c.dataset.id === id)
  );
}

// Player events
function onStateChange(e) {
  if (e.data === YT.PlayerState.PLAYING) {
    highlight(player.getVideoData().video_id);
  }

  if (e.data === YT.PlayerState.ENDED) {
    currentStartIndex += 200;
    if (currentStartIndex < videos.length) {
      loadPlaylist();
    }
  }
}

