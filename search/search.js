// Main Search Handler (Might make another one to improve this one.)

document.getElementById('searchForm').dispatchEvent(new Event('submit'));
document.getElementById('year').innerHTML = `&copy; ${new Date().getFullYear()} lecanact`;

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
                item.displayLink = item.displayLink.replace("www.", "")
                resultDiv.innerHTML = `
                            <a class="result_title" href="${item.link}" target="${item.link}">${item.title}</a>
                            <p class="result_description">${item.snippet}</p>
                            <a class="result_link" href="${item.link}" target="_blank"> ${item.displayLink}</a>
                        `;
                try {
                    resultsContainer.appendChild(resultDiv);
                } catch (e) {
                    console.error("Error appending search result:", e);
                };
            });
        } else {
            const noResultDiv = document.createElement('div');
            noResultDiv.classList.add('no_result');
            noResultDiv.style.display = 'block';
            noResultDiv.innerHTML = `<p>No results found.</p>`;

            try {
                resultsContainer.appendChild(noResultDiv);
            } catch (e) {
                console.error("Error appending no result message:", e);
            };
        }
    });
    document.title = `Search results for "${queryParam}" - lecanact search`;
}

document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const query = document.getElementById('searchInput').value;
    window.location.href = `/search?q=${encodeURIComponent(query)}`;
});