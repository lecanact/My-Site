const API_KEY = "AIzaSyCjhpJ88VvxrkE_DATG0ed51c5gCqp_PSs"
const cx = "621a38269031b4e89"

async function search(query) {
    let results = [];
    try {
        query.replace(" ", "+")
        const response = await fetch(`https://www.googleapis.com/customsearch/v1?&cx=${cx}&alt=json&key=${API_KEY}&q=${encodeURIComponent(query)}`);
        const data = await response.json();
        if (data.items && data.items.length > 0) {
            results = data.items;
        }
    } catch (error) {
        console.error('Error fetching search results:', error);
    }
    return results;
}

let currenturl = window.location.href;
const urlParams = new URLSearchParams(window.location.search);
const queryParam = urlParams.get('q');
if (queryParam) {
    document.getElementById('searchInput').value = queryParam;
    search(queryParam).then(results => {
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '';
        if (results.length > 0) {
            results.forEach(item => {
                const div = document.createElement('div');
                div.innerHTML = item.htmlTitle;
                resultsDiv.appendChild(div);
            });
        } else {
            resultsDiv.textContent = 'No results found.';
        }
    });
    document.title = `Search results for "${queryParam}" - lecanact search`;
    document.getElementById('searchForm').dispatchEvent(new Event('submit'));
}
document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const query = document.getElementById('searchInput').value;
    window.location.href = `/search?q=${encodeURIComponent(query)}`;
});