// Main Search Handler (Might make another one to improve this one.)

document.getElementById('searchForm').dispatchEvent(new Event('submit'));

const API_KEY = "AIzaSyCjhpJ88VvxrkE_DATG0ed51c5gCqp_PSs";
const cx = "621a38269031b4e89";
const urlParams = new URLSearchParams(window.location.search);
const queryParam = urlParams.get('q');

let currenturl = window.location.href;

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

if (queryParam) {
    document.getElementById('searchInput').value = queryParam;
    search(queryParam).then(results => {
        const resultsContainer = document.getElementById('results');
        resultsContainer.innerHTML = '';
        if (results.length > 0) {
            results.forEach(item => {
                const resultDiv = document.createElement('div');
                resultDiv.classList.add('search_result');
                resultDiv.style.display = 'block';
                resultDiv.innerHTML = `
                            <p class="result_title">${item.title}</p>
                            <p class="result_description">${item.snippet}</p>
                            <a class="result_link" href="${item.link}" target="_blank"> ${item.displayLink}</a>
                        `;
                resultsContainer.appendChild(resultDiv);
            });
        } else {
            const noResultDiv = document.createElement('div');
            noResultDiv.classList.add('no_result');
            noResultDiv.style.display = 'block';
            noResultDiv.innerHTML = `<p>No results found.</p>`;
            resultsContainer.appendChild(noResultDiv);
        }
    });
    document.title = `Search results for "${queryParam}" - lecanact search`;
}

document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const query = document.getElementById('searchInput').value;
    window.location.href = `/search?q=${encodeURIComponent(query)}`;
});