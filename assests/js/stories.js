function toggleStory(index) {
    const storyContent = document.getElementById('story' + index);
    const story = document.querySelectorAll('.story')[index];
    
    if (storyContent.classList.contains('active')) {
        storyContent.classList.remove('active');
        story.classList.remove('active');
    } else {
        document.querySelectorAll('.story-content').forEach((content, i) => {
            content.classList.remove('active');
            document.querySelectorAll('.story')[i].classList.remove('active');
        });
        storyContent.classList.add('active');
        story.classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    fetch('../../data/stories.json')
        .then(response => response.json())
        .then(data => {
            const storiesContainer = document.getElementById('stories-container');
            const storyContents = document.getElementById('story-contents');

            data.stories.forEach((story, index) => {
                // Create story element
                const storyDiv = document.createElement('div');
                storyDiv.className = 'story';
                storyDiv.setAttribute('onclick', `toggleStory(${index})`);
                
                const img = document.createElement('img');
                img.src = story.image;
                img.alt = `Story ${index + 1}`;
                
                storyDiv.appendChild(img);
                storiesContainer.appendChild(storyDiv);

                // Create story content element
                const storyContentDiv = document.createElement('div');
                storyContentDiv.className = 'story-content';
                storyContentDiv.id = `story${index}`;
                
                const closeSpan = document.createElement('span');
                closeSpan.className = 'close';
                closeSpan.setAttribute('onclick', `toggleStory(${index})`);
                closeSpan.innerHTML = '';
                
                storyContentDiv.appendChild(closeSpan);

                // Create image element for story content
                const contentImg = document.createElement('img');
                contentImg.src = story.content;
                contentImg.className = 'content-img';
                contentImg.alt = `Story Content ${index + 1}`;
                
                storyContentDiv.appendChild(contentImg);
                storyContents.appendChild(storyContentDiv);
            });
        })
        .catch(error => console.error('Error fetching stories:', error));
});
