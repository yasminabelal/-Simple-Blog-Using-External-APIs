document.addEventListener('DOMContentLoaded', function() {
    const postsContainer = document.getElementById('postsContainer');
    const postForm = document.getElementById('postForm');
    const toggleFormBtn = document.getElementById('toggleFormBtn');
    const closeFormBtn = document.getElementById('closeFormBtn');
    const addPostBtn = document.getElementById('addPostBtn');
    const postTitleInput = document.getElementById('postTitle');
    const postBodyInput = document.getElementById('postBody');
    const overlay = document.getElementById('overlay');

    function showForm() {
        postForm.classList.add('visible');
        overlay.classList.add('visible');
        postTitleInput.focus();
    }

    function hideForm() {
        postForm.classList.remove('visible');
        overlay.classList.remove('visible');
    }

    toggleFormBtn.addEventListener('click', showForm);
    closeFormBtn.addEventListener('click', hideForm);
    overlay.addEventListener('click', hideForm);

    postForm.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    async function fetchPosts() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=4');
            const posts = await response.json();
            displayPosts(posts);
        } catch (error) {
            console.error('Error fetching posts:', error);
            postsContainer.innerHTML = `
                <div class="error-message">
                    <p>Failed to load posts. Please try again later.</p>
                </div>
            `;
        }
    }

    function displayPosts(posts) {
        postsContainer.innerHTML = '';
        
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'post-card';
            postElement.innerHTML = `
                <h3 class="post-title">${post.title}</h3>
                <p class="post-body">${post.body}</p>
            `;
            postsContainer.appendChild(postElement);
        });
    }

    function addNewPost() {
        const title = postTitleInput.value.trim();
        const body = postBodyInput.value.trim();
        
        if (title && body) {
            const postElement = document.createElement('div');
            postElement.className = 'post-card';
            postElement.innerHTML = `
                <h3 class="post-title">${title}</h3>
                <p class="post-body">${body}</p>
            `;
            
            postsContainer.insertBefore(postElement, postsContainer.firstChild);
            
            postTitleInput.value = '';
            postBodyInput.value = '';
            hideForm();
        } else {
            alert('Please fill in both title and content fields.');
        }
    }

    addPostBtn.addEventListener('click', addNewPost);
    
    
    fetchPosts();
});