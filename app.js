const searchsongs = () => {
    const searchText = document.getElementById('search-field').value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`
    togglespinner();
    fetch(url)
        .then(res => res.json())
        .then(data => displaySongs(data.data))
}

// const enterSearch = document.getElementById('search-field');
// enterSearch.addEventListener("Keypress", function (event){
//         console.log("working");
//     if(event.key == 'Enter'){
//         document.getElementById('search-button').click();
//     }
// });

const displaySongs = songs => {
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = '';
    songs.forEach(song => {
        console.log(song);
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3';
        songDiv.innerHTML = `<div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead"> Album by <span>${song.artist.name}</span></p>
                <p class="author lead"> Album Name: <span>${song.album.title}</span></p>
                <audio controls>
                    <source src="${song.preview}" type="audio/mpeg">
                    Your browser does not support the audio tag.
                </audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="getLyrics('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
            `
        songContainer.appendChild(songDiv);
        togglespinner();
    });
}
const getLyrics = (artist, title) =>{
    const url= `https://api.lyrics.ovh/v1/${artist}/${title}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayLyrics(data.lyrics))
}
const displayLyrics = lyrics => {
    const lyricsDiv = document.getElementById('song-lyrics');
    lyricsDiv.innerText = lyrics;
}
const togglespinner = (show) => {
    const spinner = document.getElementById('loading-spinner');
    const songs = document.getElementById('song-container');
    spinner.classList.toggle('d-none');
    songs.classList.toggle('d-none');
}